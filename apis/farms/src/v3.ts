/* eslint-disable no-param-reassign, no-await-in-loop */
import { masterChefV3Addresses, FarmV3SupportedChainId } from '@pancakeswap/farms'
import { ChainId, ERC20Token } from '@pancakeswap/sdk'
import { CurrencyAmount } from '@pancakeswap/swap-sdk-core'
import { PositionMath } from '@pancakeswap/v3-sdk'
import { gql, GraphQLClient } from 'graphql-request'
import { Request } from 'itty-router'
import { error, json } from 'itty-router-extras'
import { z } from 'zod'
import { Address } from 'viem'

import { viemProviders } from './provider'

export const V3_SUBGRAPH_CLIENTS = {
  [ChainId.ETHEREUM]: new GraphQLClient('https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/exchange-v3-eth', {
    fetch,
  }),
  [ChainId.GOERLI]: new GraphQLClient('https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/exchange-v3-goerli', {
    fetch,
  }),
  [ChainId.BSC]: new GraphQLClient('https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/exchange-v3-bsc', { fetch }),
  [ChainId.BSC_TESTNET]: new GraphQLClient('https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/exchange-v3-chapel', {
    fetch,
  }),
  [ChainId.ZKSYNC_TESTNET]: new GraphQLClient(
    'https://api.studio.thegraph.com/query/45376/exchange-v3-zksync-testnet/version/latest',
    {
      fetch,
    },
  ),
  [ChainId.POLYGON_ZKEVM]: new GraphQLClient(
    'https://api.studio.thegraph.com/query/45376/exchange-v3-polygon-zkevm/v0.0.0',
    {
      fetch,
    },
  ),
  [ChainId.ZKSYNC]: new GraphQLClient('https://api.studio.thegraph.com/query/45376/exchange-v3-zksync/version/latest', {
    fetch,
  }),
  [ChainId.GSYS]: new GraphQLClient('https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/exchange-v3-gsys', {
    fetch,
  }),
} satisfies Record<Exclude<FarmV3SupportedChainId, ChainId.POLYGON_ZKEVM_TESTNET>, GraphQLClient>

const zChainId = z.enum([
  String(ChainId.BSC),
  String(ChainId.ETHEREUM),
  String(ChainId.GOERLI),
  String(ChainId.BSC_TESTNET),
  String(ChainId.ZKSYNC_TESTNET),
  String(ChainId.POLYGON_ZKEVM),
  String(ChainId.ZKSYNC),
  String(ChainId.GSYS),
])

const zAddress = z.string().regex(/^0x[a-fA-F0-9]{40}$/)

const zParams = z.object({
  chainId: zChainId,
  address: zAddress,
})

const v3PoolAbi = [
  {
    inputs: [],
    name: 'slot0',
    outputs: [
      {
        internalType: 'uint160',
        name: 'sqrtPriceX96',
        type: 'uint160',
      },
      {
        internalType: 'int24',
        name: 'tick',
        type: 'int24',
      },
      {
        internalType: 'uint16',
        name: 'observationIndex',
        type: 'uint16',
      },
      {
        internalType: 'uint16',
        name: 'observationCardinality',
        type: 'uint16',
      },
      {
        internalType: 'uint16',
        name: 'observationCardinalityNext',
        type: 'uint16',
      },
      {
        internalType: 'uint32',
        name: 'feeProtocol',
        type: 'uint32',
      },
      {
        internalType: 'bool',
        name: 'unlocked',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const

const masterchefV3Abi = [
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'poolInfo',
    outputs: [
      { internalType: 'uint256', name: 'allocPoint', type: 'uint256' },
      { internalType: 'contract IPancakeV3Pool', name: 'v3Pool', type: 'address' },
      { internalType: 'address', name: 'token0', type: 'address' },
      { internalType: 'address', name: 'token1', type: 'address' },
      { internalType: 'uint24', name: 'fee', type: 'uint24' },
      { internalType: 'uint256', name: 'totalLiquidity', type: 'uint256' },
      { internalType: 'uint256', name: 'totalBoostLiquidity', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'v3PoolAddressPid',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

const CACHE_TIME = {
  short: 's-maxage=30, max-age=20, stale-while-revalidate=120',
  long: 's-maxage=300, max-age=150, stale-while-revalidate=1200',
}

// getting active "in-range" liquidity for a pool
export const handler = async (req: Request, event: FetchEvent) => {
  const cache = caches.default
  const cacheResponse = await cache.match(event.request)

  let response: Response | undefined

  if (!cacheResponse) {
    response = await handler_(req)
    if (response.status === 200) {
      event.waitUntil(cache.put(event.request, response.clone()))
    }
  } else {
    response = new Response(cacheResponse.body, cacheResponse)
  }

  return response
}

const handler_ = async (req: Request) => {
  const parsed = zParams.safeParse(req.params)

  if (parsed.success === false) {
    return error(400, parsed.error)
  }

  const { chainId: chainIdString, address: address_ } = parsed.data
  const chainId = Number(chainIdString) as Exclude<FarmV3SupportedChainId, ChainId.POLYGON_ZKEVM_TESTNET>

  const address = address_.toLowerCase()

  const masterChefV3Address = masterChefV3Addresses[chainId]

  const client = viemProviders({ chainId })

  const [pid] = await client.multicall({
    contracts: [
      {
        abi: masterchefV3Abi,
        address: masterChefV3Address,
        functionName: 'v3PoolAddressPid',
        args: [address as `0x${string}`],
      },
    ],
    allowFailure: false,
  })

  if (typeof pid !== 'bigint') {
    return error(400, { error: 'Invalid LP address' })
  }

  const [slot0, poolInfo] = await client.multicall({
    contracts: [
      { abi: v3PoolAbi, address: address as Address, functionName: 'slot0' },
      {
        abi: masterchefV3Abi,
        address: masterChefV3Address,
        functionName: 'poolInfo',
        args: [pid],
      },
    ],
    allowFailure: false,
  })

  if (!slot0) {
    return error(404, { error: 'Slot0 not found' })
  }

  if (!poolInfo) {
    return error(404, { error: 'PoolInfo not found' })
  }

  const poolTokens = await V3_SUBGRAPH_CLIENTS[chainId].request(
    gql`
      query pool($poolAddress: String!) {
        pool(id: $poolAddress) {
          token0 {
            id
            decimals
          }
          token1 {
            id
            decimals
          }
        }
      }
    `,
    {
      poolAddress: address,
    },
  )

  const updatedAt = new Date().toISOString()

  const [allocPoint, , , , , totalLiquidity] = poolInfo
  const [sqrtPriceX96, tick] = slot0

  // don't cache when pool is not active or has no liquidity
  if (!allocPoint || !totalLiquidity) {
    return json(
      {
        tvl: {
          token0: '0',
          token1: '0',
        },
        formatted: {
          token0: '0',
          token1: '0',
        },
        updatedAt,
      },
      {
        headers: {
          'Cache-Control': 'no-cache',
        },
      },
    )
  }

  let allActivePositions: any[] = []

  async function fetchPositionByMasterChefId(posId = '0') {
    const resp = await V3_SUBGRAPH_CLIENTS[chainId].request(
      gql`
        query tvl($poolAddress: String!, $owner: String!, $posId: String!, $currentTick: String!) {
          positions(
            where: { pool: $poolAddress, liquidity_gt: "0", owner: $owner, id_gt: $posId }
            first: 1000
            orderBy: id
            tickLower_: { tickIdx_lte: currentTick }
            tickUpper_: { tickIdx_gt: currentTick }
          ) {
            liquidity
            id
            tickUpper {
              tickIdx
            }
            tickLower {
              tickIdx
            }
          }
        }
      `,
      {
        poolAddress: address,
        owner: masterChefV3Address.toLowerCase(),
        currentTick: tick.toString(),
        posId,
      },
    )

    return resp.positions
  }

  let posId = '0'

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const pos = await fetchPositionByMasterChefId(posId)
    allActivePositions = [...allActivePositions, ...pos]
    if (pos.length < 1000) {
      break
    }
    posId = pos[pos.length - 1].id
  }

  console.info('fetching farms active liquidity', {
    address,
    chainId,
    allActivePositions: allActivePositions.length,
  })

  if (allActivePositions.length === 0) {
    return json(
      {
        tvl: {
          token0: '0',
          token1: '0',
        },
        formatted: {
          token0: '0',
          token1: '0',
        },
        updatedAt,
      },
      {
        headers: {
          'Cache-Control': 'no-cache',
        },
      },
    )
  }

  const currentTick = tick
  const sqrtRatio = sqrtPriceX96

  let totalToken0 = 0n
  let totalToken1 = 0n

  for (const position of allActivePositions.filter(
    // double check that the position is within the current tick range
    (p) => +p.tickLower.tickIdx <= currentTick && +p.tickUpper.tickIdx > currentTick,
  )) {
    const token0 = PositionMath.getToken0Amount(
      currentTick,
      +position.tickLower.tickIdx,
      +position.tickUpper.tickIdx,
      sqrtRatio,
      BigInt(position.liquidity),
    )

    const token1 = PositionMath.getToken1Amount(
      currentTick,
      +position.tickLower.tickIdx,
      +position.tickUpper.tickIdx,
      sqrtRatio,
      BigInt(position.liquidity),
    )
    totalToken0 += token0
    totalToken1 += token1
  }

  const curr0 = CurrencyAmount.fromRawAmount(
    new ERC20Token(+chainId, poolTokens.pool.token0.id, +poolTokens.pool.token0.decimals, '0'),
    totalToken0.toString(),
  ).toExact()
  const curr1 = CurrencyAmount.fromRawAmount(
    new ERC20Token(+chainId, poolTokens.pool.token1.id, +poolTokens.pool.token1.decimals, '1'),
    totalToken1.toString(),
  ).toExact()

  return json(
    {
      tvl: {
        token0: totalToken0.toString(),
        token1: totalToken1.toString(),
      },
      formatted: {
        token0: curr0,
        token1: curr1,
      },
      updatedAt,
    },
    {
      headers: {
        'Cache-Control': allActivePositions.length > 50 ? CACHE_TIME.long : CACHE_TIME.short,
      },
    },
  )
}

export const getPairsDataV3 = async (req: Request, event: FetchEvent) => {
  const chainIdString = req.params?.chainId
  const chainId = Number(chainIdString) as Exclude<FarmV3SupportedChainId, ChainId.POLYGON_ZKEVM_TESTNET>
  console.log(chainId)
  if (chainId != ChainId.GSYS) {
    return json({
      status: false,
      error: 'Chain is not supported',
    })
  }
  try {
    const data = await V3_SUBGRAPH_CLIENTS[chainId].request(
      gql`
        query pools {
          pools(orderBy: totalValueLockedUSD, orderDirection: desc) {
            id
            feeTier
            liquidity
            sqrtPrice
            tick
            token0 {
              id
              symbol
              name
              decimals
              derivedETH
            }
            token1 {
              id
              symbol
              name
              decimals
              derivedETH
            }
            token0Price
            token1Price
            volumeUSD
            volumeToken0
            volumeToken1
            txCount
            totalValueLockedToken0
            totalValueLockedToken1
            totalValueLockedUSD
            feesUSD
            protocolFeesUSD
          }
          bundles(where: { id: "1" }) {
            ethPriceUSD
          }
        }
      `,
    )

    const result = data.pools.reduce((accumulator, pair) => {
      accumulator[`${pair.token0.id}_${pair.token1.id}`] = {
        pair_address: pair.id,
        feeTier: pair.feeTier,
        base_id: pair.token0.id,
        base_name: pair.token0.name,
        base_symbol: pair.token0.symbol,
        quote_id: pair.token1.id,
        quote_name: pair.token1.name,
        quote_symbol: pair.token1.symbol,
        base_price: pair.token0Price,
        quote_rice: pair.token1Price,
        base_volume: pair.volumeToken0,
        quote_volume: pair.volumeToken1,
      }
      return accumulator
    }, {})

    return json({
      status: true,
      data: result,
    })
  } catch (e) {
    console.log(e)
    return json({
      status: false,
      error: 'Error',
    })
  }
}
