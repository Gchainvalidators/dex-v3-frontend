/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Router } from 'itty-router'
import { error, json, missing } from 'itty-router-extras'
import { wrapCorsHeader, handleCors, CORS_ALLOW } from '@pancakeswap/worker-utils'
import BigNumber from 'bignumber.js'
import { saveFarms, saveLPsAPR, getCakePrice, saveFarmsV2 } from './handler'
import { farmFetcher, requireChainId } from './helper'
import { getPairsDataV3, handler as v3Handler } from './v3'
import { FarmKV } from './kv'
import BN from 'bignumber.js'
import { getPairsData } from './v2'
import { ChainId } from '@pancakeswap/sdk'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 18,
})

const router = Router()

router.get('/price/cake', async (_, event) => {
  const cache = caches.default
  const cacheResponse = await cache.match(event.request)

  let response
  if (!cacheResponse) {
    // const price = await fetchCakePrice()
    const cakeBusdPrice = await getCakePrice(false)
    const price = new BN(cakeBusdPrice.toSignificant()).toString()
    response = json(
      { price, updatedAt: new Date().toISOString() },
      {
        headers: {
          'Cache-Control': 'public, max-age=10, s-maxage=10',
        },
      },
    )

    event.waitUntil(cache.put(event.request, response.clone()))
  } else {
    response = new Response(cacheResponse.body, cacheResponse)
  }

  return response
})

router.get('/apr', async ({ query }) => {
  if (typeof query?.key === 'string' && query.key === FORCE_UPDATE_KEY) {
    try {
      const result = await Promise.allSettled(farmFetcher.supportedChainId.map((id) => saveLPsAPR(id)))
      return json(result.map((r) => r))
    } catch (err) {
      error(500, { err })
    }
  }
  return error(400, 'no key provided')
})

router.get('/:chainId', async ({ params }, event) => {
  const err = requireChainId(params)
  if (err) return err
  const { chainId } = params!

  const cached = KV_CACHE && (await FarmKV.getFarms(chainId))

  if (!cached || Date.now() - new Date(cached.updatedAt).getTime() > 2 * 1000 * 60) {
    if (KV_CACHE) {
      console.info('no cached found!')
    }
    try {
      const savedFarms = await saveFarms(+chainId, event)

      return json(savedFarms, {
        headers: {
          'Cache-Control': 'public, max-age=60, s-maxage=60',
        },
      })
    } catch (e) {
      console.log(e)
      return error(500, 'Fetch Farms error')
    }
  }

  return json(cached, {
    headers: {
      'Cache-Control': 'public, max-age=60, s-maxage=60',
    },
  })
})

router.get('/:chainId/getfarms', async ({ params }, event) => {
  const err = requireChainId(params)
  if (err) return err
  const chainIdString = params?.chainId
  const chainId = Number(chainIdString)

  console.log(chainId)
  if (chainId != ChainId.GSYS) {
    return json({
      status: false,
      error: 'Chain is not supported',
    })
  }

  const cached = KV_CACHE && (await FarmKV.getFarmsV2(chainId))

  if (!cached || Date.now() - new Date(cached.updatedAt).getTime() > 2 * 1000 * 60) {
    if (KV_CACHE) {
      console.info('no cached found!')
    }
    try {
      const savedFarms = await saveFarmsV2(+chainId, event)

      return json(savedFarms, {
        headers: {
          'Cache-Control': 'public, max-age=60, s-maxage=60',
        },
      })
    } catch (e) {
      console.log(e)
      return error(500, 'Fetch Farms error')
    }
  }

  return json(cached, {
    headers: {
      'Cache-Control': 'public, max-age=60, s-maxage=60',
    },
  })
})

router.get('/v3/:chainId/liquidity/:address', v3Handler)

router.get('/:chainId/getpairs', getPairsData)
router.get('/v3/:chainId/getpairs', getPairsDataV3)

router.all('*', () => missing('Not found'))

router.options('*', handleCors(CORS_ALLOW, `GET, HEAD, OPTIONS`, `referer, origin, content-type`))

addEventListener('fetch', (event) =>
  event.respondWith(
    router
      .handle(event.request, event)
      .then((res) => wrapCorsHeader(event.request, res, { allowedOrigin: CORS_ALLOW })),
  ),
)

addEventListener('scheduled', (event) => {
  event.waitUntil(handleScheduled(event))
})

// eslint-disable-next-line consistent-return
async function handleScheduled(event: ScheduledEvent) {
  switch (event.cron) {
    case '*/1 * * * *':
    case '*/2 * * * *': {
      const result = await Promise.allSettled(farmFetcher.supportedChainId.map((id) => saveFarms(id, event)))
      console.log(result.map((r) => r))
      return result
    }
    case '0 0 * * *': {
      const result = await Promise.allSettled(farmFetcher.supportedChainId.map((id) => saveLPsAPR(id)))
      console.log(result.map((r) => r))
      return result
    }
    default:
      break
  }
}
