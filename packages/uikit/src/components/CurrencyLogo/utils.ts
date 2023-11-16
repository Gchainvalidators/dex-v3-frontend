import { getAddress } from "viem";
import memoize from "lodash/memoize";
import { ChainId, Token, Currency } from "@pancakeswap/sdk";

const mapping: { [key: number]: string } = {
  [ChainId.BSC]: "bsc",
  [ChainId.ETHEREUM]: "ethereum",
  [ChainId.POLYGON_ZKEVM]: "polygonzkevm",
  [ChainId.ARBITRUM_ONE]: "arbitrum",
};

export const getTokenLogoURL = memoize(
  (token?: Token) => {
    if (token && mapping[token.chainId]) {
      return `/images/tokens/${mapping[token.chainId]}/${getAddress(
        token.address
      )}.png`;
    }
    return null;
  },
  (t) => `${t?.chainId}#${t?.address}`
);

export const getTokenLogoURLByAddress = memoize(
  (address?: string, chainId?: number) => {
    if (address && chainId && mapping[chainId]) {
      return `/images/tokens/${mapping[chainId]}/${getAddress(
        address
      )}.png`;
    }
    return null;
  },
  (address, chainId) => `${chainId}#${address}`
);

const chainName: { [key: number]: string } = {
  [ChainId.BSC]: "",
  [ChainId.ETHEREUM]: "eth",
  [ChainId.POLYGON_ZKEVM]: "polygon-zkevm",
  [ChainId.ARBITRUM_ONE]: "arb",
  [ChainId.GSYS]: "gsys",
};

// TODO: move to utils or token-list
export const getTokenListBaseURL = (chainId: number) =>
  `/images/tokens/${chainName[chainId]}`;

export const getTokenListTokenUrl = (token: Token) =>
  chainName[token.chainId]
    ? `/images/tokens/${
        token.chainId === ChainId.BSC ? "" : `${chainName[token.chainId]}/`
      }${token.address}.png`
    : null;

export const getCurrencyLogoUrls = memoize(
  (currency?: Currency): string[] => {
    const trustWalletLogo = getTokenLogoURL(currency?.wrapped);
    const logoUrl = currency ? getTokenListTokenUrl(currency.wrapped) : null;
    return [trustWalletLogo, logoUrl].filter((url) => Boolean(url)) as string[];
  },
  (currency?: Currency) => `logoUrls#${currency?.chainId}#${currency?.wrapped?.address}`
);
