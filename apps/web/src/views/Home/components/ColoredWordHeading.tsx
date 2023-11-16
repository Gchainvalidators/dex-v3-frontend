import { useMemo } from 'react'
import { Colors, Heading, TextProps } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import { Color } from 'd3'

interface HeadingProps extends TextProps {
  text: string
  firstColor?: keyof Colors,
  firstColorText?: string
}

const ColoredWordHeading: React.FC<React.PropsWithChildren<HeadingProps>> = ({
  text,
  firstColor,
  firstColorText,
  mb = '24px',
  ...props
}) => {
  const { theme } = useTheme()
  const { firstWord, remainingWords } = useMemo(() => {
    const split = text.split(' ')
    const first = split[0]
    const remaining = split.slice(1).join(' ')
    return { firstWord: first, remainingWords: remaining }
  }, [text])
  const displayedColor = (theme.colors[firstColor] as string) ?? theme.colors.secondary

  return (
    <Heading scale="xl" mb={mb} {...props}>
      <span style={{ color: firstColorText ? firstColorText : displayedColor }}>{firstWord} </span>
      {remainingWords}
    </Heading>
  )
}

export default ColoredWordHeading
