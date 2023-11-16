import { gsysTokens } from '@pancakeswap/tokens'
import { FeeAmount, Pool } from '@pancakeswap/v3-sdk'
import { getAddress } from 'viem'
import { CAKE_GSYS_LP_MAINNET } from './common'
import { defineFarmV3Configs } from '../src/defineFarmV3Configs'
import { SerializedFarmConfig } from '..'

export const farmsV3 = defineFarmV3Configs([
  {
    pid: 1,
    token0: gsysTokens.wgsys,
    token1: gsysTokens.usdt,
    lpAddress: '0xa34A57B29d18b5b4dAa4d81835e72D23dAd7B644',
    feeAmount: FeeAmount.LOW,
  },
  {
    pid: 2,
    token0: gsysTokens.wgsys,
    token1: gsysTokens.bldt,
    lpAddress: '0x7F5C6c79DAdD63D6Cf307b710466aaC23E852DeB',
    feeAmount: FeeAmount.LOW,
  },
  // {
  //   pid: 3,
  //   token0: gsysTokens.wgsys,
  //   token1: gsysTokens.usdc,
  //   lpAddress: '0xfefd94e63a75b5AE5b91F995a54d1cF79E3922Fd',
  //   feeAmount: FeeAmount.LOW,
  // },
  // {
  //   pid: 4,
  //   token0: gsysTokens.wgsys,
  //   token1: gsysTokens.usdc,
  //   lpAddress: '0x165c1d654a124092ebb375f2604d5322673b8b77',
  //   feeAmount: FeeAmount.LOW,
  // },
  // {
  //   pid: 5,
  //   token0: gsysTokens.usdt,
  //   token1: gsysTokens.wgsys,
  //   lpAddress: '0x56f838c8bc45dfc31e4956aae115d83b7b2cd03a',
  //   feeAmount: FeeAmount.LOW,
  // },
  // {
  //   pid: 6,
  //   token0: gsysTokens.usdt,
  //   token1: gsysTokens.eth,
  //   lpAddress: '0xe99b1e1d25e4c5d98afda9a2033a9443b14e45c7',
  //   feeAmount: FeeAmount.LOW,
  // },
  // {
  //   pid: 7,
  //   token0: gsysTokens.usdt,
  //   token1: gsysTokens.wbtc,
  //   lpAddress: '0x2a86b3a98dedda7920b9dd53bbd434254d3aadc8',
  //   feeAmount: FeeAmount.MEDIUM,
  // },
  // keep those farms on top
])

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
   */
  {
    pid: 0,
    v1pid: 0,
    lpSymbol: 'BLDT',
    lpAddress: '0xf3F7Fe5DeB371726d0705536f398a7b0DE38790a',
    token: gsysTokens.syrup,
    quoteToken: gsysTokens.wgsys,
  },
  {
    pid: 2,
    v1pid: 2,
    lpSymbol: 'BLDT-GSYS LP',
    lpAddress: CAKE_GSYS_LP_MAINNET,
    token: gsysTokens.bldt,
    quoteToken: gsysTokens.wgsys,
    boosted: false,
  },
  // {
  //   pid: 3,
  //   v1pid: 3,
  //   lpSymbol: 'USDC-GSYS LP',
  //   lpAddress: '0x52e74b74ed5770571fA5637D93bf50a94d7066f1',
  //   token: gsysTokens.usdc,
  //   quoteToken: gsysTokens.wgsys,
  //   boosted: true,
  // },
  {
    pid: 4,
    v1pid: 4,
    lpSymbol: 'BLDT-USDT LP',
    lpAddress: '0x1dc4aFFfe301b649BAaf03c9915DC77733eC6cC0',
    token: gsysTokens.bldt,
    quoteToken: gsysTokens.usdt,
    boosted: false,
  },
  //    * V3 by order of release (some may be out of PID order due to multiplier boost)
].map((p) => ({
  ...p,
  token: p.token.serialize,
  quoteToken: p.quoteToken.serialize,
  lpAddress: getAddress(p.lpAddress),
}))

export default farms
