import { Flex, Text, Button, Spinner, Titi } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'

interface ConfirmStageProps {
  isConfirming: boolean
  handleConfirm: () => void
}

// Buy Flow:
// Shown in case user wants to pay with BNB
// or if user wants to pay with WBNB and it is already approved
// Sell Flow:
// Shown if user adjusts the price or removes NFT from the market
const ConfirmStage: React.FC<React.PropsWithChildren<ConfirmStageProps>> = ({ isConfirming, handleConfirm }) => {
  const { t } = useTranslation()
  return (
    <Flex p="16px" flexDirection="column">
      <Flex alignItems="center">
        <Flex flexDirection="column">
          <Flex alignItems="center">
            <Text fontSize="20px" bold color="secondary">
              {t('Confirm')}
            </Text>
          </Flex>
          <Text small color="textSubtle">
            {t('Please confirm the transaction in your wallet')}
          </Text>
        </Flex>
        <Flex flex="0 0 64px" height="72px" width="64px">
          {/* {isConfirming && <Spinner size={64} />} */}
          {isConfirming && <Titi height={64} width={64} />}
        </Flex>
      </Flex>
      <Button mt="24px" disabled={isConfirming} onClick={handleConfirm} variant="secondary">
        {isConfirming ? `${t('Confirming')}...` : t('Confirm')}
      </Button>
    </Flex>
  )
}

export default ConfirmStage
