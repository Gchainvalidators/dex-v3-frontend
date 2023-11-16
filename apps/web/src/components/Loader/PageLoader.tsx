import styled from 'styled-components'
import { Spinner, Titi } from '@pancakeswap/uikit'
import Page from '../Layout/Page'

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageLoader: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Wrapper>
      {/* <Spinner /> */}
      <Titi />
    </Wrapper>
  )
}

export default PageLoader
