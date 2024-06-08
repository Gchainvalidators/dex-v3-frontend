/* eslint-disable no-param-reassign, no-await-in-loop */
import { masterChefV3Addresses, FarmV3SupportedChainId } from '@pancakeswap/farms'
import { ChainId, ERC20Token } from '@pancakeswap/sdk'
import { gql, GraphQLClient } from 'graphql-request'
import { Request } from 'itty-router'
import { z } from 'zod'

import BigNumber from 'bignumber.js'
import { json } from 'itty-router-extras'

interface ReturnShape {
  [tokenIds: string]: {
    pair_address: string
    base_id: string
    base_name: string
    base_symbol: string
    quote_id: string
    quote_name: string
    quote_symbol: string
    last_price: string
    base_volume: string
    quote_volume: string
  }
}

export const V2_SUBGRAPH_CLIENTS = {
  [ChainId.ETHEREUM]: new GraphQLClient('https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/exchange-eth', {
    fetch,
  }),
  [ChainId.GOERLI]: new GraphQLClient('https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/exchange-goerli', {
    fetch,
  }),
  [ChainId.BSC]: new GraphQLClient('https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/exchange-bsc', { fetch }),
  [ChainId.BSC_TESTNET]: new GraphQLClient('https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/exchange-chapel', {
    fetch,
  }),
  [ChainId.ZKSYNC_TESTNET]: new GraphQLClient(
    'https://api.studio.thegraph.com/query/45376/exchange-zksync-testnet/version/latest',
    {
      fetch,
    },
  ),
  [ChainId.POLYGON_ZKEVM]: new GraphQLClient(
    'https://api.studio.thegraph.com/query/45376/exchange-polygon-zkevm/v0.0.0',
    {
      fetch,
    },
  ),
  [ChainId.ZKSYNC]: new GraphQLClient('https://api.studio.thegraph.com/query/45376/exchange-zksync/version/latest', {
    fetch,
  }),
  [ChainId.GSYS]: new GraphQLClient('https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/exchange-gsys', {
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

export const useTopPoolsData = async (req: Request, event: FetchEvent) => {
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
    const data = await V2_SUBGRAPH_CLIENTS[chainId].request(
      gql`
        query pools {
          pairs(where: {}, orderBy: trackedReserveBNB, orderDirection: desc) {
            id
            reserve0
            reserve1
            reserveUSD
            volumeUSD
            token0Price
            token1Price
            token0 {
              id
              symbol
              name
            }
            token1 {
              id
              symbol
              name
            }
          }
        }
      `,
    )
    return json({
      status: true,
      data: data,
    })
  } catch (e) {
    return json({
      status: false,
      error: 'Error',
    })
  }
}

export const getPairsData = async (req: Request, event: FetchEvent) => {
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
    const data = await V2_SUBGRAPH_CLIENTS[chainId].request(
      gql`
        query pools {
          pairs(where: {}, orderBy: trackedReserveBNB, orderDirection: desc) {
            id
            reserve0
            reserve1
            reserveUSD
            volumeUSD
            token0Price
            token1Price
            volumeToken0
            volumeToken1
            token0 {
              id
              symbol
              name
            }
            token1 {
              id
              symbol
              name
            }
          }
        }
      `,
    )

    const result = data.pairs.reduce((accumulator, pair) => {
      accumulator[`${pair.token0.id}_${pair.token1.id}`] = {
        pair_address: pair.id,
        base_id: pair.token0.id,
        base_name: pair.token0.name,
        base_symbol: pair.token0.symbol,
        quote_id: pair.token1.id,
        quote_name: pair.token1.name,
        quote_symbol: pair.token1.symbol,
        last_price:
          pair.reserve0 !== '0' && pair.reserve1 !== '0'
            ? new BigNumber(pair.reserve1).dividedBy(pair.reserve0).toString()
            : '0',
        base_volume: pair.volumeToken0,
        quote_volume: pair.volumeToken1,
      }
      return accumulator
    }, {})

    return json({
      status: true,
      data: result,
      // d: data
    })
  } catch (e) {
    return json({
      status: false,
      error: 'Error',
    })
  }
}

