/**
 * JICF Wedding Certificate — editable fields and the Harmon–Barvor record.
 * Certificate ID is the official record id. It is printed as text, never as a QR code.
 */

import { JICF_COLORS } from "@/lib/utils/certificates/jicf/constants";

export const JICF_WEDDING_CERTIFICATE_ID = "JICF-2026-WED-0001";

/** Fellowship home. The wedding itself was held in Hangzhou. */
export const JICF_CHURCH_ADDRESS =
  "Building 13, Sanlizhuang Community, Jinan, Shandong, P.R. China";

/** Same palette as the JICF Certificate of Service. */
export const JICF_WEDDING_COLORS = {
  navy: JICF_COLORS.blue,
  navyDeep: "#0f0340",
  red: JICF_COLORS.red,
  gold: JICF_COLORS.gold ?? "#d4af37",
  yellow: JICF_COLORS.yellow ?? "#efe31e",
  cream: "#fffde7",
  ivory: "#fffef8",
  white: JICF_COLORS.white,
  ink: "#1a1530",
  muted: JICF_COLORS.darkGray,
} as const;

export type JicfWeddingCertificateData = {
  organizationName: string;
  subtitle: string;
  title: string;
  ceremonyDay: string;
  ceremonyMonth: string;
  ceremonyYear: string;
  /** Where the wedding was held. */
  location: string;
  /** Fellowship address. Not the ceremony city. */
  churchAddress: string;
  brideName: string;
  groomName: string;
  covenantText: string;
  officiantHeading: string;
  officiantTestimony: string;
  officiantName: string;
  officiantRole: string;
  officiantSignatureLabel: string;
  witnessHeading: string;
  witnessTestimony: string;
  witness1Name: string;
  witness2Name: string;
  witnessSignatureLabel: string;
  certificateId: string;
};

export const JICF_WEDDING_COVENANT =
  "The two individuals have willingly entered into the covenant of marriage, promising to love, honor, cherish, and abide with one another, for better or for worse, in sickness and in health, till death do them part, according to the sacred teachings of the Christian faith.";

export const JICF_WEDDING_BLANK: JicfWeddingCertificateData = {
  organizationName: "Jinan International Christian Fellowship",
  subtitle: "Official Marriage Certification",
  title: "Wedding Certificate",
  ceremonyDay: "",
  ceremonyMonth: "",
  ceremonyYear: "",
  location: "",
  churchAddress: JICF_CHURCH_ADDRESS,
  brideName: "",
  groomName: "",
  covenantText: JICF_WEDDING_COVENANT,
  officiantHeading: "Officiant Verification",
  officiantTestimony:
    "I hereby solemnly testify that this marriage ceremony has been legally and spiritually performed by me.",
  officiantName: "",
  officiantRole: "Pastor (Officiant)",
  officiantSignatureLabel: "Signature",
  witnessHeading: "Witness Testification",
  witnessTestimony:
    "We, the undersigned witnesses, were present at this holy wedding ceremony and confirm the authenticity of this marriage covenant.",
  witness1Name: "",
  witness2Name: "",
  witnessSignatureLabel: "Signature",
  certificateId: "",
};

/** Official church record. Witness lines stay blank for handwritten signatures. */
export const JICF_WEDDING_HARMON_BARVOR: JicfWeddingCertificateData = {
  ...JICF_WEDDING_BLANK,
  ceremonyDay: "26th",
  ceremonyMonth: "September",
  ceremonyYear: "2026",
  location: "Hangzhou, China",
  churchAddress: JICF_CHURCH_ADDRESS,
  brideName: "Miss Ruphine Manaweh Harmon",
  groomName: "Mr. Joshua Bosco Barvor",
  officiantName: "Pastor Joseph Summers",
  certificateId: JICF_WEDDING_CERTIFICATE_ID,
};

export function certificateSentenceParts(data: JicfWeddingCertificateData): {
  day: string;
  month: string;
  year: string;
  location: string;
  bride: string;
  groom: string;
} {
  return {
    day: data.ceremonyDay.trim() || "____",
    month: data.ceremonyMonth.trim() || "________",
    year: data.ceremonyYear.trim() || "____",
    location: data.location.trim() || "________",
    bride: data.brideName.trim() || "____________",
    groom: data.groomName.trim() || "____________",
  };
}

export function buildCertificationText(data: JicfWeddingCertificateData): string {
  const parts = certificateSentenceParts(data);
  return `This is to certify that on the ${parts.day} day of ${parts.month}, ${parts.year}, a sacred marriage ceremony was solemnly officiated and completed in ${parts.location}.`;
}
