import { Text, Flex, Image, Box, BalanceWithLoading } from '@pancakeswap/uikit'
import Divider from 'components/Divider'
import { useTranslation } from '@pancakeswap/localization'
import { tokenImageChainNameMapping } from 'components/TokenImage'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { StaticAmountPropsType } from '../types'

const StaticAmount: React.FC<React.PropsWithChildren<StaticAmountPropsType>> = ({
  stakingSymbol,
  stakingAddress,
  lockedAmount,
  usdValueStaked,
}) => {
  const { t } = useTranslation()
  const { chainId } = useActiveChainId()

  return (
    <>
      <Text color="textSubtle" textTransform="uppercase" bold fontSize="12px">
        {t('Add BLDT to lock')}
      </Text>
      <Flex alignItems="center" justifyContent="space-between" mb="16px">
        <Box>
          <BalanceWithLoading color="text" bold fontSize="16px" value={lockedAmount} decimals={2} />
          <BalanceWithLoading
            value={usdValueStaked}
            fontSize="12px"
            color="textSubtle"
            decimals={2}
            prefix="~"
            unit=" USD"
          />
        </Box>
        <Flex alignItems="center" minWidth="70px">
          <Image
            src={`/images/tokens/${tokenImageChainNameMapping[chainId]}/${stakingAddress}.png`}
            width={24}
            height={24}
            alt={stakingSymbol}
          />
          <Text ml="4px" bold>
            {stakingSymbol}
          </Text>
        </Flex>
      </Flex>
      <Divider />
    </>
  )
}

export default StaticAmount
