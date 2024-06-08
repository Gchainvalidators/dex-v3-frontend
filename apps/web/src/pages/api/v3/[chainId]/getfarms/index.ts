import { createFarmFetcherV3, fetchCommonTokenUSDValue, supportedChainIdV3 } from '@pancakeswap/farms'
import { priceHelperTokens } from '@pancakeswap/farms/constants/common'
import { farmsV3ConfigChainMap } from '@pancakeswap/farms/constants/v3'
import { TvlMap } from '@pancakeswap/farms/src/fetchFarmsV3'
import { ChainId } from '@pancakeswap/sdk'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { useCakePrice } from '@pancakeswap/utils/useCakePrice'
import BigNumber from 'bignumber.js'
import { FARMS_API } from 'config/constants/endpoints'
import { useCakePriceAsBN } from 'hooks/useCakePriceAsBN'
import { NextApiHandler } from 'next'
import fetchWithTimeout from 'utils/fetchWithTimeout'
import { getViemClients } from 'utils/viem.server'
import { nativeEnum as zNativeEnum } from 'zod'

const farmFetcherV3 = createFarmFetcherV3(getViemClients)

const zChainEnum = zNativeEnum(ChainId)

const handler: NextApiHandler = async (req, res) => {
  const parsed = zChainEnum.safeParse(Number(req.query.chainId))

  if (parsed.success === false) {
    return res.status(400).json(parsed.error)
  }

  const chainId = parsed.data

  if (!farmFetcherV3.isChainSupported(chainId)) {
    return res.status(400).json({ error: 'Chain not supported' })
  }
  const farms = farmsV3ConfigChainMap[chainId]
  const dataCakePrice = await(await fetch('https://bluelotusdao.org/api/farms/price/cake')).json()
  const cakePrice = dataCakePrice.price ? new BigNumber(dataCakePrice.price) : BIG_ZERO

  const commonPrice = await fetchCommonTokenUSDValue(priceHelperTokens[chainId])

  const data = await farmFetcherV3.fetchFarms({
    chainId,
    farms,
    commonPrice,
  })

  const tvls: TvlMap = {}
  if (supportedChainIdV3.includes(chainId)) {
    const results = await Promise.allSettled(
      data.farmsWithPrice.map((f) =>
        fetchWithTimeout(`${FARMS_API}/v3/${chainId}/liquidity/${f.lpAddress}`)
          .then((r) => r.json())
          .catch((err) => {
            console.error(err)
            throw err
          }),
      ),
    )
    results.forEach((r, i) => {
      tvls[data.farmsWithPrice[i].lpAddress] =
        r.status === 'fulfilled' ? { ...r.value.formatted, updatedAt: r.value.updatedAt } : null
    })
  }

  const farmWithPriceAndCakeAPR = data.farmsWithPrice.map((f) => {
    if (!tvls[f.lpAddress]) {
      return f
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tvl = tvls[f.lpAddress]!
    // Mock 1$ tvl if the farm doesn't have lp staked
    if (tvl?.token0 === '0' && tvl?.token1 === '0') {
      const [token0Price, token1Price] = f.token.sortsBefore(f.quoteToken)
        ? [f.tokenPriceBusd, f.quoteTokenPriceBusd]
        : [f.quoteTokenPriceBusd, f.tokenPriceBusd]
      tvl.token0 = token0Price ? String(1 / Number(token0Price)) : '1'
      tvl.token1 = token1Price ? String(1 / Number(token1Price)) : '1'
    }
    const { activeTvlUSD, activeTvlUSDUpdatedAt, cakeApr } = farmFetcherV3.getCakeAprAndTVL(
      f,
      tvl,
      cakePrice.toString(),
      data.cakePerSecond,
    )

    return {
      pid: f.pid,
      name: f.lpSymbol,
      pair: `${f.token0.symbol}-${f.token1.symbol}`,
      pairLink: '',
      logo: '',
      poolRewards: ["BLDT"],
      feeAmount: f.feeAmount,
      apr: cakeApr,
      totalStaked: f.lmPoolLiquidity,
    }
  })

  res.setHeader('Cache-Control', 's-maxage=60, max-age=30, stale-while-revalidate=300')

  return res.status(200).json({
    poolLength: data.poolLength,
    cakePerSecond: data.cakePerSecond,
    totalAllocPoint: data.totalAllocPoint,
    farms: farmWithPriceAndCakeAPR,
  })
}

export default handler
