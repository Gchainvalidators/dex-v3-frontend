import { ChainId, WETH9 } from '@pancakeswap/sdk'
import { USDC, USDT, BLDT } from './common'

export const zksyncTokens = {
  weth: WETH9[ChainId.ZKSYNC],
  usdc: USDC[ChainId.ZKSYNC],
  usdt: USDT[ChainId.ZKSYNC],
  bldt: BLDT[ChainId.ZKSYNC],
}
