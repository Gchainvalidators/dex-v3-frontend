import { ChainId } from '@pancakeswap/sdk'

export const SUPPORTED_CHAIN_IDS = [ChainId.BSC, ChainId.BSC_TESTNET, ChainId.ETHEREUM, ChainId.GSYS] as const

export type SupportedChainId = (typeof SUPPORTED_CHAIN_IDS)[number]
