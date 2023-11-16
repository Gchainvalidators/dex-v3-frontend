import Trans from 'components/Trans'
import { VaultKey } from 'state/types'
import { gsysTokens } from '@pancakeswap/tokens'

export const vaultPoolConfig = {
  [VaultKey.CakeVaultV1]: {
    name: <Trans>Auto BLDT</Trans>,
    description: <Trans>Automatic restaking</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 380000n,
    tokenImage: {
      primarySrc: `/images/tokens/gsys/${gsysTokens.bldt.address}.png`,
      secondarySrc: '/images/autorenew.svg',
    },
  },
  [VaultKey.CakeVault]: {
    name: <Trans>Stake BLDT</Trans>,
    description: <Trans>Stake, Earn – And more!</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 1100000n,
    tokenImage: {
      primarySrc: `/images/tokens/gsys/${gsysTokens.bldt.address}.png`,
      secondarySrc: '/images/autorenew.svg',
    },
  },
  [VaultKey.CakeFlexibleSideVault]: {
    name: <Trans>Flexible BLDT</Trans>,
    description: <Trans>Flexible staking on the side.</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 500000n,
    tokenImage: {
      primarySrc: `/images/tokens/gsys/${gsysTokens.bldt.address}.png`,
      secondarySrc: '/images/autorenew.svg',
    },
  },
  [VaultKey.IfoPool]: {
    name: 'IFO BLDT',
    description: <Trans>Stake BLDT to participate in IFOs</Trans>,
    autoCompoundFrequency: 1,
    gasLimit: 500000n,
    tokenImage: {
      primarySrc: `/images/tokens/gsys/${gsysTokens.bldt.address}.png`,
      secondarySrc: `/images/ifo-pool-icon.svg`,
    },
  },
} as const
