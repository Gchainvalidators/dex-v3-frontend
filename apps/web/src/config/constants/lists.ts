import { ChainId } from '@pancakeswap/sdk'

export const PANCAKE_EXTENDED = 'https://tokens.pancakeswap.finance/pancakeswap-extended.json'
export const COINGECKO = 'https://tokens.pancakeswap.finance/coingecko.json'
export const PANCAKE_ETH_DEFAULT = 'https://tokens.pancakeswap.finance/pancakeswap-eth-default.json'
export const PANCAKE_ZKSYNC_DEFAULT = 'https://tokens.pancakeswap.finance/pancakeswap-zksync-default.json'
export const PANCAKE_POLYGON_ZKEVM_DEFAULT = 'https://tokens.pancakeswap.finance/pancakeswap-polygon-zkevm-default.json'
export const PANCAKE_ETH_MM = 'https://tokens.pancakeswap.finance/pancakeswap-eth-mm.json'
export const PANCAKE_BSC_MM = 'https://tokens.pancakeswap.finance/pancakeswap-bnb-mm.json'
export const COINGECKO_ETH = 'https://tokens.coingecko.com/uniswap/all.json'
export const CMC = 'https://tokens.pancakeswap.finance/cmc.json'
export const GSYS_DEFAULT = 'https://raw.githubusercontent.com/Gchainvalidators/dex-assets/main/tokenlist.json'

export const ETH_URLS = [PANCAKE_ETH_DEFAULT, PANCAKE_ETH_MM, COINGECKO_ETH]
export const BSC_URLS = []
// export const BSC_URLS = [PANCAKE_EXTENDED, CMC, COINGECKO, PANCAKE_BSC_MM]
export const POLYGON_ZKEVM_URLS = [PANCAKE_POLYGON_ZKEVM_DEFAULT]
export const ZKSYNC_URLS = [PANCAKE_ZKSYNC_DEFAULT]
export const GSYS_URLS = [GSYS_DEFAULT]

// List of official tokens list
export const OFFICIAL_LISTS = [GSYS_DEFAULT]
// export const OFFICIAL_LISTS = [PANCAKE_EXTENDED, PANCAKE_ETH_DEFAULT, GSYS_DEFAULT]

export const UNSUPPORTED_LIST_URLS: string[] = []
export const WARNING_LIST_URLS: string[] = []

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  ...BSC_URLS,
  ...ETH_URLS,
  ...ZKSYNC_URLS,
  ...POLYGON_ZKEVM_URLS,
  ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
  ...WARNING_LIST_URLS,
  ...GSYS_URLS,
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [
  PANCAKE_EXTENDED,
  PANCAKE_ETH_DEFAULT,
  PANCAKE_ETH_MM,
  PANCAKE_BSC_MM,
  PANCAKE_ETH_DEFAULT,
  PANCAKE_POLYGON_ZKEVM_DEFAULT,
  PANCAKE_ZKSYNC_DEFAULT,
  GSYS_DEFAULT,
]

export const MULTI_CHAIN_LIST_URLS: { [chainId: number]: string[] } = {
  [ChainId.BSC]: BSC_URLS,
  [ChainId.ETHEREUM]: ETH_URLS,
  [ChainId.ZKSYNC]: ZKSYNC_URLS,
  [ChainId.POLYGON_ZKEVM]: POLYGON_ZKEVM_URLS,
  [ChainId.GSYS]: GSYS_URLS,
}
