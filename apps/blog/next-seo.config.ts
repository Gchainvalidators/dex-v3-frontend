import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | PancakeSwap',
  defaultTitle: 'Blog | PancakeSwap',
  description:
    'Cheaper and faster than Uniswap? Discover PancakeSwap, the leading DEX on Gchain with the best farms in DeFi and a lottery for BLDT.',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@PancakeSwap',
    site: '@PancakeSwap',
  },
  openGraph: {
    title: '🥞 PancakeSwap - A next evolution DeFi exchange on Gchain',
    description:
      'The most popular AMM on Gchain! Earn BLDT through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by PancakeSwap), NFTs, and more, on a platform you can trust.',
    images: [{ url: 'https://bluelotusdao.org/images/hero.png' }],
  },
}
