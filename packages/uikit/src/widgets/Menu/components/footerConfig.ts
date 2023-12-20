import { ContextApi } from "@pancakeswap/localization";
import { FooterLinkType } from "../../../components/Footer/types";

export const footerLinks: (t: ContextApi["t"]) => FooterLinkType[] = (t) => [
  {
    label: t("Social Media"),
    items: [
      {
        label: t("Gchain Twitter"),
        href: "https://twitter.com/GenesysChain",
      },
      {
        label: t("BlueLotusDAO Twitter"),
        href: "https://twitter.com/BlueLotusGSYS",
      },
      {
        label: t("Genesys View app Twitter"),
        href: "https://twitter.com/GvaApp",
      },
      {
        label: t("Genesys Network Discord"),
        href: "https://discord.gg/XjHDMXQTjT",
      },
      {
        label: t("Blue Hosting Twitter"),
        href: "https://twitter.com/BlueHostingGsys",
      },
      {
        label: t("Genesys Network Telegram"),
        href: "https://web.telegram.org/a/#-1619157049",
      },
    ],
  },
  {
    label: t("Genesys Network Ecosystem"),
    items: [
      {
        label: t("Genesys Faucet"),
        href: "https://faucet.genesys.network/",
      },
      {
        label: t("Gchain Testnet"),
        href: "https://testnet-gchainexplorer.genesys.network/",
      },
      {
        label: t("Blue Hosting"),
        href: "https://www.bluehostingsys.com/en/",
      },
      {
        label: t("Genesys View app"),
        href: "https://www.genesysviewapp.io/",
      },
      {
        label: t("Genesys Web Wallet"),
        href: "https://genesyswallet.io/#/",
      },
      {
        label: t("BlueLotusDAO"),
        href: "https://www.tempdex.genesys.network/",
      },
      {
        label: t("Genesis of Blue NFT Marketplace"),
        href: "https://www.genesisofblue.io/",
      },
    ],
  },
  {
    label: t("About Gchain"),
    items: [
      {
        label: "Contact Us",
        href: "https://helpdesk.genesys.network/",
      },
      {
        label: "Network Status",
        href: "https://status.genesys.network/",
      },
      {
        label: "API Documentation",
        href: "https://docs.genesys.network/",
      },
      {
        label: "Contact us for banners",
        href: "https://gchainexplorer.genesys.network/address/0xa34A57B29d18b5b4dAa4d81835e72D23dAd7B644#",
      },
      {
        label: "Genesys Network Whitepaper",
        href: "https://genesyblockchain.gitbook.io/genesys-blockchain",
      },
      {
        label: "Brand Assets",
        href: "https://genesyblockchain.gitbook.io/genesys-blockchain/blue-lotus-governance/brand-and-logo",
      },
      {
        label: "Blockscan",
        href: "https://gchainexplorer.genesys.network/address/0xa34A57B29d18b5b4dAa4d81835e72D23dAd7B644#",
      },
      {
        label: "Terms of Service",
        href: "https://genesyblockchain.gitbook.io/genesys-blockchain/genesys-blockchain-gchain/gchain-terms-and-conditions",
      },
    ],
  },
];
