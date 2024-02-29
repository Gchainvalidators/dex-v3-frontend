import { gsysTokens } from '@pancakeswap/tokens'
import { getAddress } from 'viem'

import { PoolCategory, SerializedPool } from '../../types'

export const livePools: SerializedPool[] = [
  {
    sousId: 0,
    stakingToken: gsysTokens.bldt,
    earningToken: gsysTokens.bldt,
    contractAddress: '0x9140B00Fd81871b7506FB78D348490BA1B61bD85',
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '39',
    isFinished: false,
  },
].map((p) => ({
  ...p,
  contractAddress: getAddress(p.contractAddress),
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize,
}))

// known finished pools
export const finishedPools: SerializedPool[] = []

export const pools: SerializedPool[] = [...livePools, ...finishedPools]
