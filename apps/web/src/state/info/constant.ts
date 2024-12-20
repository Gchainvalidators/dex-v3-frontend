import { BLOCKS_CLIENT, BLOCKS_CLIENT_ETH, BLOCKS_CLIENT_ZKSYNC, BLOCKS_CLIENT_GSYS } from 'config/constants/endpoints'
import { infoClientETH, infoClient, infoStableSwapClient, v2Clients } from 'utils/graphql'
import { GraphQLClient } from 'graphql-request'

import { ChainId } from '@pancakeswap/sdk'
import {
  ETH_TOKEN_BLACKLIST,
  PCS_ETH_START,
  PCS_V2_START,
  TOKEN_BLACKLIST,
  BSC_TOKEN_WHITELIST,
  ETH_TOKEN_WHITELIST,
  GSYS_TOKEN_BLACKLIST,
} from 'config/constants/info'
import { bsc, mainnet, polygonZkEvm, zkSync } from 'wagmi/chains'

export type MultiChainName = 'BSC' | 'ETH' | 'POLYGON_ZKEVM' | 'ZKSYNC' | 'GSYS'

export type MultiChainNameExtend = MultiChainName | 'BSC_TESTNET' | 'ZKSYNC_TESTNET'

export const multiChainName: Record<number | string, MultiChainNameExtend> = {
  [ChainId.BSC]: 'BSC',
  [ChainId.ETHEREUM]: 'ETH',
  [ChainId.BSC_TESTNET]: 'BSC_TESTNET',
  [ChainId.POLYGON_ZKEVM]: 'POLYGON_ZKEVM',
  [ChainId.ZKSYNC]: 'ZKSYNC',
  [ChainId.GSYS]: 'GSYS',
}

export const multiChainShortName: Record<number, string> = {
  [ChainId.POLYGON_ZKEVM]: 'zkEVM',
}

export const multiChainQueryMainToken: Record<MultiChainName, string> = {
  BSC: 'BNB',
  ETH: 'ETH',
  POLYGON_ZKEVM: 'ETH',
  ZKSYNC: 'ETH',
  GSYS: 'BNB',
}

export const multiChainBlocksClient: Record<MultiChainNameExtend, string> = {
  BSC: BLOCKS_CLIENT,
  ETH: BLOCKS_CLIENT_ETH,
  BSC_TESTNET: 'https://thegraph.blue20bridge.io/subgraphs/name/lengocphuc99/bsc_testnet-blocks',
  POLYGON_ZKEVM: 'https://api.studio.thegraph.com/query/45376/polygon-zkevm-block/version/latest',
  ZKSYNC_TESTNET: 'https://api.studio.thegraph.com/query/45376/blocks-zksync-testnet/version/latest',
  ZKSYNC: BLOCKS_CLIENT_ZKSYNC,
  GSYS: BLOCKS_CLIENT_GSYS,
}

export const multiChainStartTime = {
  BSC: PCS_V2_START,
  ETH: PCS_ETH_START,
  POLYGON_ZKEVM: 1686236845,
  ZKSYNC: 1690462800, // Thu Jul 27 2023 13:00:00 UTC+0000
  GSYS: 1698960228,
}

export const multiChainId: Record<MultiChainName, ChainId> = {
  BSC: ChainId.BSC,
  ETH: ChainId.ETHEREUM,
  POLYGON_ZKEVM: ChainId.POLYGON_ZKEVM,
  ZKSYNC: ChainId.ZKSYNC,
  GSYS: ChainId.GSYS,
}

export const multiChainPaths = {
  [ChainId.BSC]: '/bsc',
  [ChainId.ETHEREUM]: '/eth',
  [ChainId.POLYGON_ZKEVM]: '/polygon-zkevm',
  [ChainId.ZKSYNC]: `/zksync`,
  [ChainId.GSYS]: '/gsys',
}

export const multiChainQueryClient = {
  BSC: infoClient,
  ETH: infoClientETH,
  POLYGON_ZKEVM: v2Clients[ChainId.POLYGON_ZKEVM],
  ZKSYNC: v2Clients[ChainId.ZKSYNC],
  GSYS: v2Clients[ChainId.GSYS],
}

export const multiChainScan: Record<MultiChainName, string> = {
  BSC: bsc.blockExplorers.etherscan.name,
  ETH: mainnet.blockExplorers.etherscan.name,
  POLYGON_ZKEVM: polygonZkEvm.blockExplorers.default.name,
  ZKSYNC: zkSync.blockExplorers.default.name,
  GSYS: 'https://gchainexplorer.genesys.network',
}

export const multiChainTokenBlackList: Record<MultiChainName, string[]> = {
  BSC: TOKEN_BLACKLIST,
  ETH: ETH_TOKEN_BLACKLIST,
  POLYGON_ZKEVM: ['0x'],
  ZKSYNC: ['0x'],
  GSYS: GSYS_TOKEN_BLACKLIST,
}

export const multiChainTokenWhiteList: Record<MultiChainName, string[]> = {
  BSC: BSC_TOKEN_WHITELIST,
  ETH: ETH_TOKEN_WHITELIST,
  POLYGON_ZKEVM: [],
  ZKSYNC: [],
  GSYS: [],
}

export const getMultiChainQueryEndPointWithStableSwap = (chainName: MultiChainNameExtend): GraphQLClient => {
  const isStableSwap = checkIsStableSwap()
  if (isStableSwap) return infoStableSwapClient
  return multiChainQueryClient[chainName]
}

export const subgraphTokenName = {
  '0x738d96caf7096659db4c1afbf1e1bdfd281f388c': 'Ankr Staked MATIC',
  '0x14016e85a25aeb13065688cafb43044c2ef86784': 'True USD Old',
}

export const subgraphTokenSymbol = {
  '0x14016e85a25aeb13065688cafb43044c2ef86784': 'TUSDOLD',
}

export const checkIsStableSwap = () => window.location.href.includes('stableSwap')
