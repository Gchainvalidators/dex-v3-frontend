import { TranslateFunction } from '@pancakeswap/localization'
import { SalesSectionProps } from '.'

export const swapSectionData = (t: TranslateFunction): SalesSectionProps => ({
  headingText: t('Permissionless, easy to trade, no registration.'),
  colorHeadingText: '#122549',
  firstColorText: '#0351EA',
  bodyText: t('Trade any tokens in BlueLotusDAO in seconds, as simple as connecting your wallet'),
  reverse: false,
  primaryButton: {
    to: '/swap',
    text: t('Trade Now'),
    external: false,
  },
  // secondaryButton: {
  //   to: 'https://docs.pancakeswap.finance/',
  //   text: t('Learn'),
  //   external: true,
  // },
  images: {
    path: '/images/home/home4/',
    attributes: [
      { src: 'image1', alt: 'image' },
    ],
  },
})

export const earnSectionData = (t: TranslateFunction): SalesSectionProps => ({
  headingText: t('Earn easily with BlueLotusDAO.'),
  colorHeadingText: '#122549',
  firstColorText: '#0351EA',
  bodyText: t('BlueLotusDAO Swap makes it easy to make your crypto work for you.'),
  reverse: true,
  primaryButton: {
    to: '/farms',
    text: t('Explore'),
    external: false,
  },
  // secondaryButton: {
  //   to: 'https://docs.pancakeswap.finance/products/yield-farming',
  //   text: t('Learn'),
  //   external: true,
  // },
  images: {
    path: '/images/home/home5/',
    attributes: [
      { src: 'image1', alt: t('image') },
    ],
  },
})

export const cakeSectionData = (t: TranslateFunction): SalesSectionProps => ({
  headingText: t('Blue Lotus the community token.'),
  colorHeadingText: '#122549',
  firstColorText: '#0351EA',
  bodyText: t(
    'BLDT is the heart of BlueLotusDao. Buy it, win it, farm it, spend it, stake it... Many possibilities at your fingertips.',
  ),
  reverse: false,
  primaryButton: {
    to: '/swap?outputCurrency=0xb4A3F9D3cEce2c298e9b73113f7B6C2B9f9d61fF&chainId=16507',
    text: t('Buy BLDT'),
    external: false,
  },
  // secondaryButton: {
  //   to: 'https://docs.pancakeswap.finance/tokenomics/cake',
  //   text: t('Learn'),
  //   external: true,
  // },

  images: {
    path: '/images/home/cake/',
    attributes: [
      { src: 'image3', alt: t('image') },
      { src: 'image2', alt: t('image') },
      { src: 'image1', alt: t('image') },
    ],
  },
})
