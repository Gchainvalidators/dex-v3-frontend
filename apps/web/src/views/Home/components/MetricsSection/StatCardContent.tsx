import { Heading, Flex, Text, useMatchBreakpoints } from '@pancakeswap/uikit'

const StatCardContent: React.FC<
  React.PropsWithChildren<{ headingText: string; bodyText: string; highlightColor: string }>
> = ({ headingText, bodyText, highlightColor }) => {
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmallerScreen = isMobile || isTablet
  const split = headingText.split(' ')
  const lastWord = split.pop()
  const remainingWords = split.slice(0, split.length).join(' ')

  return (
    <Flex
      minHeight={[null, null, null, '168px']}
      minWidth="232px"
      width="fit-content"
      flexDirection="column"
      justifyContent="flex-end"
      mt={[null, null, null, '64px']}
    >
      {isSmallerScreen && remainingWords.length > 13 ? (
        <Heading color="#122549" scale="lg">
          {remainingWords}
        </Heading>
      ) : (
        <Heading color="#122549" scale="xl">
          {remainingWords}
        </Heading>
      )}
      <Heading color={highlightColor} scale="xl" mb="24px">
        {lastWord}
      </Heading>
      <Text color="#263A4C">{bodyText}</Text>
    </Flex>
  )
}

export default StatCardContent
