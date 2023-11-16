import { Heading, Flex, Text, Skeleton, ChartIcon, CommunityIcon, SwapIcon, SwapHome } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import useTheme from 'hooks/useTheme'
import { formatLocalisedCompactNumber } from '@pancakeswap/utils/formatBalance'
import useSWRImmutable from 'swr/immutable'
import IconCard, { IconCardData } from '../IconCard'
import StatCardContent from './StatCardContent'
import GradientLogo from '../GradientLogoSvg'

const Stats = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const { data: tvl } = useSWRImmutable('tvl')
  const { data: txCount } = useSWRImmutable('totalTx30Days')
  const { data: addressCount } = useSWRImmutable('addressCount30Days')
  // const trades = formatLocalisedCompactNumber(txCount)
  // const users = formatLocalisedCompactNumber(addressCount)
  // const tvlString = tvl ? formatLocalisedCompactNumber(tvl) : '-'
  const trades = 'Coming soon'
  const users = 'Coming soon'
  const tvlString = 'Coming soon'

  const tvlText = t('And those users are now entrusting the platform with over $%tvl% in funds.', { tvl: tvlString })
  const [entrusting, inFunds] = tvlText.split(tvlString)

  const UsersCardData: IconCardData = {
    icon: <CommunityIcon color="#0351EA" width="30px" />,
    background: '#ffffff',
  }
  
  const TradesCardData: IconCardData = {
    icon: <SwapHome color="#1BC5DC" width="28px" />,
    background: '#ffffff',
  }
  
  const StakedCardData: IconCardData = {
    icon: <ChartIcon color="#DC781B" width="26px" />,
    background: '#ffffff',
  }

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <GradientLogo height="104px" width="104px" mb="24px" />
      <Heading textAlign="center" scale="xl" color="#122549" mb={30}>
        {t('We Build the Future.')}
      </Heading>
      {/* <Heading textAlign="center" scale="xl" color="#122549" mb={30}>
        {t('Trusted with billions.')}
      </Heading> */}
      <Text textAlign="center" color="#263A4D" mb={'20px'}>
        {t(
          'BlueLotusDao mission is to create a decentralized environment for the community while promoting a responsible and transparent governance.',
        )}
      </Text>
      {/* <Flex flexWrap="wrap">
        <Text display="inline" textAlign="center" color="#263A4D" mb="20px">
          {entrusting}
          <>{tvl ? <>{tvlString}</> : <Skeleton display="inline-block" height={16} width={70} mt="2px" />}</>
          {inFunds}
        </Text>
      </Flex> */}

      <Text textAlign="center" color="#263A4C" bold mb="32px">
        {t('Will you join them?')}
      </Text>

      <Flex maxWidth="100%" flexDirection={['column', null, null, 'row']}>
        <IconCard {...UsersCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <StatCardContent
            headingText={t('%users% users', { users })}
            // headingText={t('%users% users', { users })}
            bodyText={t('in the last 30 days')}
            highlightColor={'#0351EA'}
          />
        </IconCard>
        <IconCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <StatCardContent
            headingText={t('%trades% trades', { trades })}
            bodyText={t('made in the last 30 days')}
            highlightColor={'#1BC5DC'}
          />
        </IconCard>
        <IconCard {...StakedCardData}>
          <StatCardContent
            headingText={t('%tvl% staked', { tvl: tvlString })}
            bodyText={t('Total Value Locked')}
            highlightColor={'#DC781B'}
          />
        </IconCard>
      </Flex>
    </Flex>
  )
}

export default Stats
