import { ChainId, WGSYS, WETH9, ERC20Token } from '@pancakeswap/sdk'

import { CAKE_GSYS, USDT_GSYS } from './common'

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
    '0xf98758A698FAa2624CD4EB61f1ae054F649c367D',
    18,
    'SYRUP',
    'SyrupBar Token',
    'https://gchainexplorer.genesys.network',
  ),
  usdc: new ERC20Token(
    ChainId.GSYS,
    '0x772Bf1c089463341cD18E1C99FFA10d433e12db4',
    18,
    'USDC',
    'USD Coin from Blue20',
    'https://www.centre.io/usdc',
  ),
}
