import { bscTokens } from '@pancakeswap/tokens'
import { FeeAmount, Pool } from '@pancakeswap/v3-sdk'
import { getAddress } from 'viem'
import { CAKE_BNB_LP_MAINNET } from './common'
import { defineFarmV3Configs } from '../src/defineFarmV3Configs'
import { SerializedFarmConfig } from '..'

export const farmsV3 = defineFarmV3Configs([
  {
    pid: 1,
    token0: bscTokens.wbnb,
    token1: bscTokens.usdt,
    lpAddress: '0x16f88d03c7c500b9dE7e0b240476d2aE5Ec029a0',
    feeAmount: FeeAmount.LOW,
  },
  {
    pid: 2,
    token0: bscTokens.wbnb,
    token1: bscTokens.bldt,
    lpAddress: '0xE30C3913BA1e4D276d91dD008077183f883456c0',
    feeAmount: FeeAmount.LOW,
  },
  {
    pid: 3,
    token0: bscTokens.wbnb,
    token1: bscTokens.usdc,
    lpAddress: '0x800AB6D457A00F79C7Ac09214596e27E4252D068',
    feeAmount: FeeAmount.LOW,
  },
])

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
   */
  // {
  //   pid: 0,
  //   v1pid: 0,
  //   lpSymbol: 'BLDT',
  //   lpAddress: '0x7E9808c731ce79B2DfC18B88e3Baad3D115DB102',
  //   token: bscTokens.syrup,
  //   quoteToken: bscTokens.wbnb,
  // },
  // {
  //   pid: 2,
  //   v1pid: 251,
  //   lpSymbol: 'BLDT-BNB LP',
  //   lpAddress: CAKE_BNB_LP_MAINNET,
  //   token: bscTokens.bldt,
  //   quoteToken: bscTokens.wbnb,
  //   boosted: true,
  // },
  // {
  //   pid: 47,
  //   v1pid: 422,
  //   lpSymbol: 'BLDT-USDT LP',
  //   lpAddress: '0xA39Af17CE4a8eb807E076805Da1e2B8EA7D0755b',
  //   token: bscTokens.bldt,
  //   quoteToken: bscTokens.usdt,
  //   boosted: true,
  // },
].map((p) => ({
  ...p,
  token: p.token.serialize,
  quoteToken: p.quoteToken.serialize,
  lpAddress: getAddress(p.lpAddress),
}))

export default farms
