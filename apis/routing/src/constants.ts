import { ChainId } from '@pancakeswap/sdk'

export const SUPPORTED_CHAINS = [
  ChainId.ETHEREUM,
  ChainId.BSC,
  ChainId.LINEA_TESTNET,
  ChainId.POLYGON_ZKEVM,
  ChainId.ZKSYNC,
  ChainId.BSC_TESTNET,
  ChainId.GOERLI,
  ChainId.GSYS,
] as const

export type SupportedChainId = (typeof SUPPORTED_CHAINS)[number]

export const V3_SUBGRAPH_URLS: Record<SupportedChainId, string> = {
  [ChainId.ETHEREUM]: 'https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/exchange-v3-eth',
  [ChainId.GOERLI]: 'https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/exchange-v3-goerli',
  [ChainId.BSC]: `https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/exchange-v3-bsc`,
  [ChainId.BSC_TESTNET]: 'https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/exchange-v3-chapel',
  [ChainId.POLYGON_ZKEVM]: 'https://api.studio.thegraph.com/query/45376/exchange-v3-polygon-zkevm/v0.0.0',
  [ChainId.ZKSYNC]: 'https://api.studio.thegraph.com/query/45376/exchange-v3-zksync/version/latest',
  [ChainId.LINEA_TESTNET]:
    'https://thegraph.goerli.zkevm.consensys.net/subgraphs/name/gsysswap/exchange-v3-linea-goerli',
  [ChainId.GSYS]: 'https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/exchange-v3-gsys',
}
