/** EKD Digital canonical brand palette (matches EKDSend promo flyers) */
export const GOLD = "#C8A061";
export const GOLD_LIGHT = "#E8C589";
export const GOLD_PATH = "#D4B06E";
export const GOLD_PALE = "#f3e8c8";
export const BG_DARK = "#1F1C18";
export const BG_MID = "#2A2520";

export const FLYER_PORTRAIT_W = 540;
export const FLYER_PORTRAIT_H = 900;

export const PARENT_COMPANY_NAME = "A.N.D. Group of Companies LLC";
export const PARENT_COMPANY_URL = "https://andgroupco.com";
export const PARENT_COMPANY_WEBSITE_LABEL = "andgroupco.com";

/** Customer-facing production domains (from product codebases / lpad manifests). */
export const EKD_DIGITAL_WEBSITE = "ekddigital.com";
export const EKDSEND_WEBSITE = "es.ekddigital.com";
export const DIGITAL_ASSETS_WEBSITE = "assets.andgroupco.com";

export type ProductFlyerBrand = {
  logoSrc: string;
  logoAlt: string;
  brandLead: string;
  brandAccent: string;
};

/** Product logos copied from mail/ and assets/ into fom/public/. */
export const EKDSEND_PRODUCT_BRAND: ProductFlyerBrand = {
  logoSrc: "/ekdsend_logo.svg",
  logoAlt: "EKDSend",
  brandLead: "EKD",
  brandAccent: "Send",
};

export const DIGITAL_ASSETS_PRODUCT_BRAND: ProductFlyerBrand = {
  logoSrc: "/assets_logo.svg",
  logoAlt: "EKD Digital Assets",
  brandLead: "Digital",
  brandAccent: "Assets",
};

export type FlyerContactRow = {
  icon: string;
  label: string;
  value: string;
  gold: boolean;
};

const BASE_CONTACT_ROWS: readonly FlyerContactRow[] = [
  {
    icon: "📞",
    label: "Phone / WhatsApp",
    value: "+86 185 0683 2159",
    gold: false,
  },
  { icon: "📧", label: "Email", value: "ekd@ekddigital.com", gold: false },
  { icon: "💬", label: "WeChat ID", value: "EKD231777285010", gold: false },
];

export const CONTACT_ROWS: readonly FlyerContactRow[] = [
  ...BASE_CONTACT_ROWS,
  { icon: "🌐", label: "Website", value: EKD_DIGITAL_WEBSITE, gold: true },
];

export function contactRowsWithWebsite(website: string): readonly FlyerContactRow[] {
  return [
    ...BASE_CONTACT_ROWS,
    { icon: "🌐", label: "Website", value: website, gold: true },
  ];
}
