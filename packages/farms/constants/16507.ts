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
  {
    pid: 3,
    token0: gsysTokens.wgsys,
    token1: gsysTokens.usdc,
    lpAddress: '0xfefd94e63a75b5AE5b91F995a54d1cF79E3922Fd',
    feeAmount: FeeAmount.LOW,
  },
  {
    pid: 4,
    token0: gsysTokens.usdt,
    token1: gsysTokens.bldt,
    lpAddress: '0x83dc244A0Ee5933b0E494A2B9563dF2d6F519C3A',
    feeAmount: FeeAmount.LOW,
  },
  {
    pid: 5,
    token0: gsysTokens.wgsys,
    token1: gsysTokens.bbtc,
    lpAddress: '0x96165F5e73ED28Fe12d1560913aBC97708bE4Ad7',
    feeAmount: FeeAmount.LOWEST,
  },
  {
    pid: 6,
    token0: gsysTokens.wgsys,
    token1: gsysTokens.bbtc,
    lpAddress: '0x755ad9e117866D083828DfBd4D8F70EaAa3fE8BF',
    feeAmount: FeeAmount.LOW,
  },
  {
    pid: 7,
    token0: gsysTokens.wgsys,
    token1: gsysTokens.bbtc,
    lpAddress: '0x36477c434a1d721E7c9E3f87f9752885737f897c',
    feeAmount: FeeAmount.MEDIUM,
  },
  {
    pid: 8,
    token0: gsysTokens.wgsys,
    token1: gsysTokens.bbtc,
    lpAddress: '0x2683FC29350d95E9efBD1727CE12463aF16CD267',
    feeAmount: FeeAmount.HIGH,
  },
  {
    pid: 9,
    token0: gsysTokens.bbtc,
    token1: gsysTokens.bldt,
    lpAddress: '0xb0Ebd8Fc76C4A50f0A33Bd40E6eE29d065BE95e4',
    feeAmount: FeeAmount.LOWEST,
  },
  {
    pid: 10,
    token0: gsysTokens.bbtc,
    token1: gsysTokens.bldt,
    lpAddress: '0xc2523dF76db298239d80Fa6b3a14d54b526EB155',
    feeAmount: FeeAmount.LOW,
  },
  {
    pid: 11,
    token0: gsysTokens.bbtc,
    token1: gsysTokens.bldt,
    lpAddress: '0xB6B62774751f965E3eb68f6D10616ED1211CdeaA',
    feeAmount: FeeAmount.MEDIUM,
  },
  {
    pid: 12,
    token0: gsysTokens.bbtc,
    token1: gsysTokens.bldt,
    lpAddress: '0xb7D0323B9bAD2D444C3c0Bcb6B210Ea62E7075Ad',
    feeAmount: FeeAmount.HIGH,
  },
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
  {
    pid: 3,
    v1pid: 3,
    lpSymbol: 'USDC-GSYS LP',
    lpAddress: '0x52e74b74ed5770571fA5637D93bf50a94d7066f1',
    token: gsysTokens.usdc,
    quoteToken: gsysTokens.wgsys,
    boosted: true,
  },
  {
    pid: 4,
    v1pid: 4,
    lpSymbol: 'GSYS-USDT LP',
    lpAddress: '0x1dc4aFFfe301b649BAaf03c9915DC77733eC6cC0',
    token: gsysTokens.usdt,
    quoteToken: gsysTokens.wgsys,
    boosted: false,
  },
  {
    pid: 5,
    v1pid: 5,
    lpSymbol: 'USDT-USDC LP',
    lpAddress: '0xC207f8AC30a916101a4afED4aaD103F92046D7D4',
    token: gsysTokens.usdt,
    quoteToken: gsysTokens.usdc,
    boosted: false,
  },
  {
    pid: 6,
    v1pid: 6,
    lpSymbol: 'USDT-BLDT LP',
    lpAddress: '0xffc04B33e16C8EaDeaD545de0f105328B4D791D9',
    token: gsysTokens.usdt,
    quoteToken: gsysTokens.bldt,
    boosted: false,
  },
  {
    pid: 7,
    v1pid: 7,
    lpSymbol: 'BBTC-GSYS LP',
    lpAddress: '0xC8f9eb61C47Fddc7bB0B8f13A5b181D134674Ac5',
    token: gsysTokens.bbtc,
    quoteToken: gsysTokens.wgsys,
    boosted: false,
  },
  {
    pid: 8,
    v1pid: 8,
    lpSymbol: 'BBTC-BLDT LP',
    lpAddress: '0x3aA0406EC99B447B14938045f1F095ae5C70E84E',
    token: gsysTokens.bbtc,
    quoteToken: gsysTokens.bldt,
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
