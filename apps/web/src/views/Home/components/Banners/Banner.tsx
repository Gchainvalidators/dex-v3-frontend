import { Button, Flex, NextLinkFromReactRouter, Text, useMatchBreakpoints, OpenNewIcon } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import Image from 'next/legacy/image'
import styled, { css } from 'styled-components'

import { ASSET_CDN } from 'config/constants/endpoints'

import { zkSyncBg, zkSyncBunny, zkSyncBgMobile, eraLogo, banner1 } from './images'
import * as S from './Styled'

const pancakeSwapLogo = `/images/banners/ethXpancakeswap.png`

const RightWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  overflow: visible;
  > span:nth-child(1) {
    // TradingRewardButter2
    position: absolute !important;
    right: -42px;
    bottom: -60px;

    ${({ theme }) => theme.mediaQueries.md} {
      right: -42px;
      bottom: -40px;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      right: 0px;
      bottom: 0;
    }
  }

  > span:nth-child(2) {
    // TradingRewardButter2
    position: absolute !important;
    right: 230px;
    top: -10%;
  }
`

const Title = styled.div`
  position: relative;
  font-family: 'Kanit';
  font-size: 25.526px;
  font-style: normal;
  font-weight: 800;
  line-height: 98%;
  padding-right: 80px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 32px;
    margin-bottom: 4px;
    width: 100%;
  }
`

const sharedStyle = css`
  box-shadow: none;
  padding: 6px 12px;
  border-radius: 10px;
  background: #ffffff;
  ${({ theme }) => theme.mediaQueries.sm} {
    border-radius: 10px;
    padding: 12px 24px;
  }
`

const Divider = styled.div`
  height: 15px;
  width: 1px;
  background-color: ${({ theme }) => theme.colors.white};
`

const StyledButtonLeft = styled(Button)`
  ${sharedStyle}
  > div {
    color: #27DBDC;
  }
`

export const Banner = () => {
  const { t } = useTranslation()
  const { isMobile, isDesktop } = useMatchBreakpoints()

  const title = isDesktop ? t('BlueLotusDao Now Live on Gchain') : t('BlueLotusDao Now Live on Gchain')

  return (
    <S.Wrapper
      style={{
        background: `linear-gradient(90deg, #80adfd 0%, #0957dd 100%)`,
        overflow: !isDesktop ? 'hidden' : 'visible',
      }}
    >
      <S.Inner>
        <S.LeftWrapper>
          <Flex alignItems="center" mb="10px" style={{ gap: isMobile ? 10 : 14 }}>
            {/* <Image
              src={pancakeSwapLogo}
              alt="pancakeSwapLogo"
              width={isMobile ? 100 : 132}
              height={isMobile ? 15 : 20}
              unoptimized
            />
            <Divider />
            <Image src={eraLogo} alt="eraLogo" width={isMobile ? 73 : 88} height={isMobile ? 14 : 16} /> */}
          </Flex>
          <Title>{title}</Title>
          {isDesktop && (
            <Text color="white" fontSize={20} fontWeight={700} mb="8px">
              {t('Enjoy the benefits and the security that offer Blue20 network')}
            </Text>
          )}
          <Flex>
            <NextLinkFromReactRouter target="_blank" to="#">
              <StyledButtonLeft scale={['xs', 'sm', 'md']} style={{ borderRadius: isMobile && '20px' }}>
                <Text bold fontSize={['12px', '16px']} mr="4px">
                  {isMobile ? t('Start Now') : t('Get Started')}
                </Text>
                <OpenNewIcon color="#27DBDC" />
              </StyledButtonLeft>
            </NextLinkFromReactRouter>
          </Flex>
        </S.LeftWrapper>
        <RightWrapper>
          {/* {!isDesktop ? (
            <Image src={zkSyncBgMobile} alt="zkSyncBgMobile" width={270} height={239} placeholder="blur" />
          ) : (
            <Image src={zkSyncBg} alt="zkSyncBg" width={624} height={177} placeholder="blur" />
          )} */}
          {isDesktop && <Image src={banner1} alt="banner1" style={{ width: '100%' }} height={242} placeholder="blur" />}
        </RightWrapper>
      </S.Inner>
    </S.Wrapper>
  )
}
