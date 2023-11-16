// import { miexsTokens } from '@pancakeswap/tokens'
// import { FeeAmount, Pool } from '@pancakeswap/v3-sdk'
// import { getAddress } from 'viem'
// import { CAKE_MIX_LP_MAINNET } from './common'
// import { defineFarmV3Configs } from '../src/defineFarmV3Configs'
// import { SerializedFarmConfig } from '..'

// export const farmsV3 = defineFarmV3Configs([
//   {
//     pid: 1,
//     token0: miexsTokens.wmix,
//     token1: miexsTokens.bldt,
//     lpAddress: '0x2a1ab0b65d4a1cbc33a74bfc7bf0f88859bab41e',
//     feeAmount: FeeAmount.MEDIUM,
//   },
//   {
//     pid: 2,
//     token0: miexsTokens.bldt,
//     token1: miexsTokens.busd,
//     lpAddress: '0x3383797a3c1a2e79c70fdf3c4ff3130d55ddf31e',
//     feeAmount: FeeAmount.MEDIUM,
//   },
//   {
//     pid: 3,
//     token0: miexsTokens.usdt,
//     token1: miexsTokens.bldt,
//     lpAddress: '0x3b7367a704ff5f0095dfa69514709420d7e3638c',
//     feeAmount: FeeAmount.MEDIUM,
//   },
//   {
//     pid: 4,
//     token0: miexsTokens.wmix,
//     token1: miexsTokens.busd,
//     lpAddress: '0x165c1d654a124092ebb375f2604d5322673b8b77',
//     feeAmount: FeeAmount.LOW,
//   },
//   {
//     pid: 5,
//     token0: miexsTokens.usdt,
//     token1: miexsTokens.wmix,
//     lpAddress: '0x56f838c8bc45dfc31e4956aae115d83b7b2cd03a',
//     feeAmount: FeeAmount.LOW,
//   },
//   {
//     pid: 6,
//     token0: miexsTokens.usdt,
//     token1: miexsTokens.eth,
//     lpAddress: '0xe99b1e1d25e4c5d98afda9a2033a9443b14e45c7',
//     feeAmount: FeeAmount.LOW,
//   },
//   {
//     pid: 7,
//     token0: miexsTokens.usdt,
//     token1: miexsTokens.wbtc,
//     lpAddress: '0x2a86b3a98dedda7920b9dd53bbd434254d3aadc8',
//     feeAmount: FeeAmount.MEDIUM,
//   },
//   // keep those farms on top
// ])

// const farms: SerializedFarmConfig[] = [
//   /**
//    * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
//    */
//   {
//     pid: 0,
//     v1pid: 0,
//     lpSymbol: 'MIES',
//     lpAddress: '0xc4da43EC4C5Ed49dEEc75e1995d095b89b42Aba4',
//     token: miexsTokens.syrup,
//     quoteToken: miexsTokens.wmix,
//   },
//   {
//     pid: 2,
//     v1pid: 2,
//     lpSymbol: 'MIES-MIX LP',
//     lpAddress: CAKE_MIX_LP_MAINNET,
//     token: miexsTokens.bldt,
//     quoteToken: miexsTokens.wmix,
//     boosted: false,
//   },
//   {
//     pid: 3,
//     v1pid: 3,
//     lpSymbol: 'BUSD-MIX LP',
//     lpAddress: '0x48443dc276a7d993e1f6d07fc75f6a67958d64f9',
//     token: miexsTokens.busd,
//     quoteToken: miexsTokens.wmix,
//     boosted: true,
//   },
//   {
//     pid: 5,
//     v1pid: 5,
//     lpSymbol: 'MIES-BUSD LP',
//     lpAddress: '0x795ed1cdf94a56013dd89fcb2e0ed73908bfd35b',
//     token: miexsTokens.bldt,
//     quoteToken: miexsTokens.busd,
//     boosted: false,
//   },
//   //    * V3 by order of release (some may be out of PID order due to multiplier boost)
// ].map((p) => ({
//   ...p,
//   token: p.token.serialize,
//   quoteToken: p.quoteToken.serialize,
//   lpAddress: getAddress(p.lpAddress),
// }))

// export default farms
