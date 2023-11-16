import { languageList, useTranslation } from '@pancakeswap/localization'
import { footerLinks, Menu as UikitMenu, NextLinkFromReactRouter, useModal } from '@pancakeswap/uikit'
import USCitizenConfirmModal from 'components/Modal/USCitizenConfirmModal'
import { NetworkSwitcher } from 'components/NetworkSwitcher'
import PhishingWarningBanner from 'components/PhishingWarningBanner'
import { useCakeBusdPrice } from 'hooks/useBUSDPrice'
import useTheme from 'hooks/useTheme'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { usePhishingBanner } from '@pancakeswap/utils/user'
import { IdType } from 'hooks/useUserIsUsCitizenAcknowledgement'
import GlobalSettings from './GlobalSettings'
import { SettingsMode } from './GlobalSettings/types'
import { useMenuItems } from './hooks/useMenuItems'
import UserMenu from './UserMenu'
import { getActiveMenuItem, getActiveSubMenuItem } from './utils'

const LinkComponent = (linkProps) => {
  return <NextLinkFromReactRouter to={linkProps.href} {...linkProps} prefetch={false} />
}

const Menu = (props) => {
  const { chainId } = useActiveChainId()
  const { isDark, setTheme } = useTheme()
  const cakePriceUsd = useCakeBusdPrice()
  const { currentLanguage, setLanguage, t } = useTranslation()
  const { pathname } = useRouter()
  const [onUSCitizenModalPresent] = useModal(
    <USCitizenConfirmModal title={t('BlueLotusDAO Swap Perpetuals')} id={IdType.PERPETUALS} />,
    false,
    false,
    'usCitizenConfirmModal',
  )
  const [showPhishingWarningBanner] = usePhishingBanner()

  const menuItems = useMenuItems(onUSCitizenModalPresent)

  const activeMenuItem = getActiveMenuItem({ menuConfig: menuItems, pathname })
  const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })

  const toggleTheme = useMemo(() => {
    return () => setTheme(isDark ? 'light' : 'dark')
  }, [setTheme, isDark])

  const getFooterLinks = useMemo(() => {
    return footerLinks(t)
  }, [t])

  const [linkBuy, setLinkBy] = useState('')
  useEffect(() => {
    if(chainId === 56) {
      setLinkBy(
        `${process.env.NEXT_PUBLIC_URL}/swap?outputCurrency=0x7E9808c731ce79B2DfC18B88e3Baad3D115DB102&chainId=56`,
      )
    }
    else if (chainId === 16507) {
      setLinkBy(
        `${process.env.NEXT_PUBLIC_URL}/swap?outputCurrency=0xf3F7Fe5DeB371726d0705536f398a7b0DE38790a&chainId=16507`,
      )
    }
  }, [chainId])

    return (
      <>
        <UikitMenu
          linkComponent={LinkComponent}
          rightSide={
            <>
              <GlobalSettings mode={SettingsMode.GLOBAL} />
              <NetworkSwitcher />
              <UserMenu />
            </>
          }
          chainId={chainId}
          banner={showPhishingWarningBanner && typeof window !== 'undefined' && <PhishingWarningBanner />}
          isDark={isDark}
          toggleTheme={toggleTheme}
          currentLang={currentLanguage.code}
          langs={languageList}
          setLang={setLanguage}
          cakePriceUsd={cakePriceUsd}
          links={menuItems}
          subLinks={activeMenuItem?.hideSubNav || activeSubMenuItem?.hideSubNav ? [] : activeMenuItem?.items}
          footerLinks={getFooterLinks}
          activeItem={activeMenuItem?.href}
          activeSubItem={activeSubMenuItem?.href}
          buyCakeLabel={t('Buy BLDT')}
          buyCakeLink={linkBuy}
          {...props}
        />
      </>
    )
}

export default Menu
