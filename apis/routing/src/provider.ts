import { ChainId } from '@pancakeswap/sdk'
import { OnChainProvider, SubgraphProvider } from '@pancakeswap/smart-router/evm'
import { createPublicClient, http } from 'viem'
import { bsc, bscTestnet, goerli, mainnet, Chain } from 'viem/chains'
import { GraphQLClient } from 'graphql-request'

import { V3_SUBGRAPH_URLS, SupportedChainId } from './constants'

export const gsys = {
  id: 16507,
  name: 'Genesys Mainnet',
  network: 'gsys',
  nativeCurrency: {
    decimals: 18,
    name: 'GSYS',
    symbol: 'GSYS',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.genesys.network'],
    },
    public: {
      http: ['https://rpc.genesys.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Genesys Mainnet',
      url: 'https://gchainexplorer.genesys.network',
    },
  },
  contracts: {
    multicall3: {
      address: '0x90a2377F233E3461BACa6080d4837837d8762927' as `0x${string}`,
      blockCreated: 4_773_657,
    },
  },
  testnet: false,
} as const satisfies Chain

const requireCheck = [ETH_NODE, GOERLI_NODE, BSC_NODE, BSC_TESTNET_NODE, GSYS_NODE]
requireCheck.forEach((node) => {
  if (!node) {
    throw new Error('Missing env var')
  }
})

const mainnetClient = createPublicClient({
  chain: mainnet,
  transport: http(ETH_NODE),
})

const bscClient = createPublicClient({
  chain: bsc,
  transport: http(BSC_NODE),
})

const bscTestnetClient = createPublicClient({
  chain: bscTestnet,
  transport: http(BSC_TESTNET_NODE),
})

const goerliClient = createPublicClient({
  chain: goerli,
  transport: http(GOERLI_NODE),
})

const gsysClient = createPublicClient({
  chain: gsys,
  transport: http(GSYS_NODE),
})

// @ts-ignore
export const viemProviders: OnChainProvider = ({ chainId }: { chainId?: ChainId }) => {
  switch (chainId) {
    case ChainId.ETHEREUM:
      return mainnetClient
    case ChainId.BSC:
      return bscClient
    case ChainId.BSC_TESTNET:
      return bscTestnetClient
    case ChainId.GOERLI:
      return goerliClient
    case ChainId.GSYS:
      return gsysClient
    default:
      return bscClient
  }
}

export const v3SubgraphClients: Record<SupportedChainId, GraphQLClient> = {
  [ChainId.ETHEREUM]: new GraphQLClient(V3_SUBGRAPH_URLS[ChainId.ETHEREUM], { fetch }),
  [ChainId.POLYGON_ZKEVM]: new GraphQLClient(V3_SUBGRAPH_URLS[ChainId.POLYGON_ZKEVM], { fetch }),
  [ChainId.ZKSYNC]: new GraphQLClient(V3_SUBGRAPH_URLS[ChainId.ZKSYNC], { fetch }),
  [ChainId.LINEA_TESTNET]: new GraphQLClient(V3_SUBGRAPH_URLS[ChainId.LINEA_TESTNET], { fetch }),
  [ChainId.GOERLI]: new GraphQLClient(V3_SUBGRAPH_URLS[ChainId.GOERLI], { fetch }),
  [ChainId.BSC]: new GraphQLClient(V3_SUBGRAPH_URLS[ChainId.BSC], { fetch }),
  [ChainId.BSC_TESTNET]: new GraphQLClient(V3_SUBGRAPH_URLS[ChainId.BSC_TESTNET], { fetch }),
  [ChainId.GSYS]: new GraphQLClient(V3_SUBGRAPH_URLS[ChainId.GSYS], { fetch }),
} as const

export const v3SubgraphProvider: SubgraphProvider = ({ chainId = ChainId.BSC }: { chainId?: ChainId }) => {
  return v3SubgraphClients[chainId as SupportedChainId] || v3SubgraphClients[ChainId.BSC]
}
