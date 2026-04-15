import { FOM_BRAND } from "@/lib/constants/fom";

export const FOM_LETTERHEAD = {
  title: "FISHERS OF MEN (FOM)",
  location: "Hangzhou City, Zhejiang Province",
  email: "fishersofmen@fomjesus.com",
  website: "https://fomjesus.org",
  phones: ["+8618506832159", "+8618506832316", "+8619558111273"],
} as const;

export const FOM_COVENANT_LINE = `"${FOM_BRAND.covenantText}" - ${FOM_BRAND.covenantVerse}`;

export const FOM_TAGLINE_LINE = `"${FOM_BRAND.greatCommissionText}" - ${FOM_BRAND.greatCommission}`;
