import { ChainId } from '@pancakeswap/sdk'

// export const GRAPH_API_PROFILE = 'https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/profile'
export const GRAPH_API_PROFILE = 'https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/profile'
export const GRAPH_API_PREDICTION_BNB = 'https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/prediction-v2'
export const GRAPH_API_PREDICTION_CAKE = 'https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/prediction-bldt'

export const GRAPH_API_LOTTERY = 'https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/lottery'
export const SNAPSHOT_BASE_URL = process.env.NEXT_PUBLIC_SNAPSHOT_BASE_URL
export const API_PROFILE = 'https://profile.miexs.com'
export const API_NFT = 'https://pancake-nft-api-eight.vercel.app/api/v1'
export const SNAPSHOT_API = `${SNAPSHOT_BASE_URL}/graphql`
export const SNAPSHOT_HUB_API = `${SNAPSHOT_BASE_URL}/api/message`
export const GRAPH_API_POTTERY = 'https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/pottery'
export const ONRAMP_API_BASE_URL = 'https://pcs-onramp-api.com'
export const MOONPAY_BASE_URL = 'https://api.moonpay.com'
export const MOONPAY_SIGN_URL = 'https://pcs-on-ramp-api.com'
/**
 * V1 will be deprecated but is still used to claim old rounds
 */
export const GRAPH_API_PREDICTION_V1 = 'https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/prediction'

export const INFO_CLIENT = 'https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/exchange-bsc'
export const V3_BSC_INFO_CLIENT = `https://open-platform.nodereal.io/${
  process.env.NEXT_PUBLIC_NODE_REAL_API_INFO || process.env.NEXT_PUBLIC_NODE_REAL_API_ETH
}/pancakeswap-v3/graphql`

export const INFO_CLIENT_GSYS = 'https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/exchange-gsys'
export const INFO_CLIENT_ETH = 'https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/exhange-eth'
export const BLOCKS_CLIENT = 'https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/bsc-blocks'
export const BLOCKS_CLIENT_ETH = 'https://thegraph.blue20bridge.io/subgraphs/name/blocklytics/ethereum-blocks'
export const BLOCKS_CLIENT_GSYS = 'https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/blocks'

export const BLOCKS_CLIENT_POLYGON_ZKEVM =
  'https://api.studio.thegraph.com/query/45376/polygon-zkevm-block/version/latest'
export const BLOCKS_CLIENT_ZKSYNC = 'https://api.studio.thegraph.com/query/45376/blocks-zksync/version/latest'
export const STABLESWAP_SUBGRAPH_CLIENT = 'https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/exchange-stableswap'
export const GRAPH_API_NFTMARKET = 'https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/nft-market'
export const GRAPH_HEALTH = 'https://thegraph.blue20bridge.io/index-node/graphql'

export const TC_MOBOX_SUBGRAPH = 'https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/trading-competition-v3'
export const TC_MOD_SUBGRAPH = 'https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/trading-competition-v4'

export const BIT_QUERY = 'https://graphql.bitquery.io'

export const ACCESS_RISK_API = '/api/risk'

export const CELER_API = 'https://api.celerscan.com/scan'

export const INFO_CLIENT_WITH_CHAIN = {
  [ChainId.BSC]: INFO_CLIENT,
  [ChainId.ETHEREUM]: INFO_CLIENT_ETH,
  [ChainId.POLYGON_ZKEVM]: 'https://api.studio.thegraph.com/query/45376/exchange-v2-polygon-zkevm/version/latest',
  [ChainId.ZKSYNC_TESTNET]: 'https://api.studio.thegraph.com/query/45376/exchange-v2-zksync-testnet/version/latest',
  [ChainId.ZKSYNC]: ' https://api.studio.thegraph.com/query/45376/exchange-v2-zksync/version/latest',
  [ChainId.LINEA_TESTNET]: 'https://thegraph.goerli.zkevm.consensys.net/subgraphs/name/gsysswap/exhange-eth/',
  [ChainId.ARBITRUM_ONE]: 'https://thegraph.com/hosted-service/subgraph/chef-jojo/exchange-v2-arb',
  [ChainId.GSYS]: INFO_CLIENT_GSYS,
}

export const BLOCKS_CLIENT_WITH_CHAIN = {
  [ChainId.BSC]: BLOCKS_CLIENT,
  [ChainId.ETHEREUM]: BLOCKS_CLIENT_ETH,
  [ChainId.POLYGON_ZKEVM]: BLOCKS_CLIENT_POLYGON_ZKEVM,
  [ChainId.ZKSYNC]: BLOCKS_CLIENT_ZKSYNC,
  [ChainId.GSYS]: BLOCKS_CLIENT_GSYS,
}

export const ASSET_CDN = 'https://raw.githubusercontent.com/fiwallets/token-list/gsys'

export const V3_SUBGRAPH_URLS = {
  [ChainId.ETHEREUM]: 'https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/exchange-v3-eth',
  [ChainId.GOERLI]: 'https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/exchange-v3-goerli',
  [ChainId.BSC]: `https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/exchange-v3-bsc`,
  [ChainId.BSC_TESTNET]: 'https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/exchange-v3-chapel',
  [ChainId.ARBITRUM_ONE]: 'https://thegraph.com/hosted-service/subgraph/chef-jojo/exchange-v3-arb',
  [ChainId.ARBITRUM_GOERLI]: 'https://thegraph.blue20bridge.io/subgraphs/name/chef-jojo/exhange-v3-arb-goerli',
  [ChainId.POLYGON_ZKEVM]: 'https://api.studio.thegraph.com/query/45376/exchange-v3-polygon-zkevm/v0.0.0',
  [ChainId.POLYGON_ZKEVM_TESTNET]: null,
  [ChainId.ZKSYNC]: 'https://api.studio.thegraph.com/query/45376/exchange-v3-zksync/version/latest',
  [ChainId.ZKSYNC_TESTNET]: 'https://api.studio.thegraph.com/query/45376/exchange-v3-zksync-testnet/version/latest',
  [ChainId.LINEA_TESTNET]:
    'https://thegraph.goerli.zkevm.consensys.net/subgraphs/name/gsysswap/exchange-v3-linea-goerli',
  [ChainId.GSYS]: 'https://thegraph.blue20bridge.io/subgraphs/name/gsysswap/exchange-v3-gsys',
} satisfies Record<ChainId, string | null>

export const TRADING_REWARD_API = 'https://tempdex.genesys.network/api/v1'

export const QUOTING_API = `${process.env.NEXT_PUBLIC_QUOTING_API}/v0/quote`

// export const FARMS_API = 'https://farms-api.pancakeswap.com'
export const FARMS_API = 'https://tempdex.genesys.network/api/farms'

export const MERCURYO_WIDGET_ID = process.env.NEXT_PUBLIC_MERCURYO_WIDGET_ID || '76ba4ff5-2686-4ed4-8666-fadb0d9a5888'
