import { ChainId } from '@pancakeswap/sdk'
import { Address } from 'viem'

import { SupportedChainId } from './supportedChains'

export type ContractAddresses<T extends ChainId = SupportedChainId> = {
  [chainId in T]: Address
}

export const ICAKE = {
  [ChainId.BSC]: '0x3C458828D1622F5f4d526eb0d24Da8C4Eb8F07b1',
  [ChainId.BSC_TESTNET]: '0x',
  [ChainId.ETHEREUM]: '0x',
  [ChainId.GSYS]: '0xe7E67b1678dDC1c467BF88173aCe5648F2F228ed',
} as const satisfies ContractAddresses<SupportedChainId>

export const CAKE_VAULT = {
  [ChainId.BSC]: '0x45c54210128a065de780C4B0Df3d16664f7f859e',
  [ChainId.BSC_TESTNET]: '0x1088Fb24053F03802F673b84d16AE1A7023E400b',
  [ChainId.ETHEREUM]: '0x',
  [ChainId.GSYS]: '0x7b6488d38429A1A0eC37aC7550b27e4FCded7220',
} as const satisfies ContractAddresses<SupportedChainId>

export const CAKE_FLEXIBLE_SIDE_VAULT = {
  [ChainId.BSC]: '0x615e896A8C2CA8470A2e9dc2E9552998f8658Ea0',
  [ChainId.BSC_TESTNET]: '0x',
  [ChainId.ETHEREUM]: '0x',
  [ChainId.GSYS]: '0x020eDBd720EE1c68551cb3bc24001D2D3eaBCd37',
} as const satisfies ContractAddresses<SupportedChainId>
