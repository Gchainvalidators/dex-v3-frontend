import { ChainId, WGSYS, WETH9, ERC20Token } from '@pancakeswap/sdk'

import { BBTC, CAKE_GSYS, LOTTO, USDC, USDT_GSYS } from './common'

export const gsysTokens = {
  wgsys: WGSYS[ChainId.GSYS],
  // bnb here points to the wbnb contract. Wherever the currency BNB is required, conditional checks for the symbol 'BNB' can be used
  gsys: new ERC20Token(
    ChainId.GSYS,
    '0xAa7aE83eb30DDdd14A017D4222121776317EA8Ba',
    18,
    'GSYS',
    'GSYS',
    'https://gchainexplorer.genesys.network/',
  ),
  bldt: CAKE_GSYS,
  // eth: WETH9[ChainId.GSYS],
  usdt: USDT_GSYS,
  // wbtc: WBTC_GSYS,
  // busd: BUSD_GSYS,
  syrup: new ERC20Token(
    ChainId.GSYS,
    '0xb166F050A98d863636C6188eAFdD51548bEc3a43',
    18,
    'SYRUP',
    'SyrupBar Token',
    'https://gchainexplorer.genesys.network',
  ),
  usdc: USDC[ChainId.GSYS],
  bbtc: BBTC[ChainId.GSYS],
  lotto: LOTTO[ChainId.GSYS],
}
