import { Heading, TextProps } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'

interface HeadingProps extends TextProps {
  text: string,
  firstColor?: string
}

const RowHeading: React.FC<React.PropsWithChildren<HeadingProps>> = ({ text, firstColor, ...props }) => {
  const { theme } = useTheme()
  const split = text.split(' ')
  const firstWord = split[0]
  const remainingWords = split.slice(1).join(' ')
  const color = props.color ? props.color : theme.colors.secondary

  return (
    <Heading {...props} color={color}>
      <span style={{ color: firstColor ? firstColor : theme.colors.secondary }}>{firstWord} </span>
      {remainingWords}
    </Heading>
  )
}

export default RowHeading
