import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | BLDTSwap',
  defaultTitle: 'BLDTSwap',
  description:
    'Cheaper and faster than Uniswap? Discover BLDTSwap, the leading DEX on GSYS Smart Chain (GSYS) with the best farms in DeFi and a lottery for BLDT.',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@BLDTSwap',
    site: '@BLDTSwap',
  },
  openGraph: {
    title: 'BLDTSwap - A next evolution DeFi exchange on GSYS Smart Chain (GSYS)',
    description:
      'BlueLotusDao part of Genesys Network Ecosystem, earn BLDT through farming, staking or lottery,  swap your tokens with security and confidence.',
    images: [{ url: process.env.NEXT_PUBLIC_URL + '/images/hero.png?v=1.2' }],
  },
}
