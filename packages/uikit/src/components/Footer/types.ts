import { Language } from "../LangSelector/types";
import { FlexProps } from "../Box";
import { type } from "os";

export type FooterLinkType = {
  label: string;
  items: { label: string; href?: string; isHighlighted?: boolean }[];
};

export type FooterProps = {
  items: FooterLinkType[];
  buyCakeLabel: string;
  buyCakeLink: string;
  isDark: boolean;
  toggleTheme: (isDark: boolean) => void;
  cakePriceUsd?: number;
  currentLang: string;
  langs: Language[];
  chainId: number;
  setLang: (lang: Language) => void;
} & FlexProps;
