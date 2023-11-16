import { Language } from "../LangSelector/types";
import { FooterLinkType } from "./types";
import { TwitterIcon, TelegramIcon, RedditIcon, InstagramIcon, GithubIcon, DiscordIcon, YoutubeIcon, MediumIcon, GlobeIcon } from "../Svg";

export const footerLinks: FooterLinkType[] = [
  {
    label: "Social Media",
    items: [
      {
        label: "Gchain Twitter",
        href: "https://twitter.com/GenesysChain",
      },
      {
        label: "BlueLotusDAO Twitter",
        href: "https://twitter.com/BlueLotusGSYS",
      },
      {
        label: "Genesys View app Twitter",
        href: "https://twitter.com/GvaApp",
      },
      {
        label: "Genesys Network Discord",
        href: "https://discord.gg/XjHDMXQTjT",
      },
      {
        label: "Blue Hosting Twitter",
        href: "https://twitter.com/BlueHostingGsys",
      },
      {
        label: "Genesys Network Telegram",
        href: "https://web.telegram.org/a/#-1619157049",
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        label: "Customer",
        href: "Support https://docs.pancakeswap.finance/contact-us/customer-support",
      },
      {
        label: "Troubleshooting",
        href: "https://docs.pancakeswap.finance/help/troubleshooting",
      },
      {
        label: "Guides",
        href: "https://docs.pancakeswap.finance/get-started",
      },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        label: "Github",
        href: "https://github.com/pancakeswap",
      },
      {
        label: "Documentation",
        href: "https://docs.pancakeswap.finance",
      },
      {
        label: "Bug Bounty",
        href: "https://app.gitbook.com/@pancakeswap-1/s/pancakeswap/code/bug-bounty",
      },
      {
        label: "Audits",
        href: "https://docs.pancakeswap.finance/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited",
      },
      {
        label: "Careers",
        href: "https://docs.pancakeswap.finance/hiring/become-a-chef",
      },
    ],
  },
];
// export const footerLinks: FooterLinkType[] = [
//   {
//     label: "About",
//     items: [
//       {
//         label: "Contact",
//         href: "https://docs.pancakeswap.finance/contact-us",
//       },
//       {
//         label: "Blog",
//         href: "https://blog.pancakeswap.finance/",
//       },
//       {
//         label: "Community",
//         href: "https://docs.pancakeswap.finance/contact-us/telegram",
//       },
//       {
//         label: "BLDT",
//         href: "https://docs.pancakeswap.finance/tokenomics/cake",
//       },
//       {
//         label: "—",
//       },
//       {
//         label: "Online Store",
//         href: "https://pancakeswap.creator-spring.com/",
//         isHighlighted: true,
//       },
//     ],
//   },
//   {
//     label: "Help",
//     items: [
//       {
//         label: "Customer",
//         href: "Support https://docs.pancakeswap.finance/contact-us/customer-support",
//       },
//       {
//         label: "Troubleshooting",
//         href: "https://docs.pancakeswap.finance/help/troubleshooting",
//       },
//       {
//         label: "Guides",
//         href: "https://docs.pancakeswap.finance/get-started",
//       },
//     ],
//   },
//   {
//     label: "Developers",
//     items: [
//       {
//         label: "Github",
//         href: "https://github.com/pancakeswap",
//       },
//       {
//         label: "Documentation",
//         href: "https://docs.pancakeswap.finance",
//       },
//       {
//         label: "Bug Bounty",
//         href: "https://app.gitbook.com/@pancakeswap-1/s/pancakeswap/code/bug-bounty",
//       },
//       {
//         label: "Audits",
//         href: "https://docs.pancakeswap.finance/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited",
//       },
//       {
//         label: "Careers",
//         href: "https://docs.pancakeswap.finance/hiring/become-a-chef",
//       },
//     ],
//   },
// ];

export const socials = [
  {
    label: "Website",
    icon: GlobeIcon,
    href: "https://genesys.network",
    items: null,
  },
  {
    label: "X",
    icon: TwitterIcon,
    href: "https://twitter.com/BlueLotusGSYS",
    items: null,
  },
  {
    label: "Telegram",
    icon: TelegramIcon,
    href: "https://t.me/GenesysNetwork",
    items: null,
  },
  {
    label: "Discord",
    icon: DiscordIcon,
    href: "https://discord.com/invite/KZns8GPeCm",
    items: null,
  },
  {
    label: "Github",
    icon: GithubIcon,
    href: "https://github.com/GENESYSBLOCKCHAIN",
    items: null,
  },
];

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
