import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | PancakeSwap',
  defaultTitle: 'PancakeSwap',
  description:
    'The most popular AMM DEX on Gchain is now on Aptos! Swap your favourite tokens instantly and provide liquidity to start earning from trading fees. Earn BLDT through yield farming, and stake them to earn more tokens, or use them to buy new tokens in initial farm offerings—all on a platform you can trust.',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@PancakeSwap',
    site: '@PancakeSwap',
  },
  openGraph: {
    title: '🥞 PancakeSwap - The most popular DeFi exchange on Gchain, now on Aptos',
    description:
      'The most popular AMM on Gchain is now on Aptos! Swap your favourite tokens instantly and provide liquidity to start earning from trading fees. Earn BLDT through yield farming, and stake them to earn more tokens, or use them to buy new tokens in initial farm offerings—all on a platform you can trust.',
    images: [{ url: 'https://aptos.pancakeswap.finance/images/hero.jpeg' }],
  },
}
