import { FLYER_PORTRAIT_H } from "@/components/jicf/ekddigital-flyer-theme";

/**
 * 8px grid spacing for EKD Digital portrait flyers (540×900).
 * Section gaps 24–32px · subsection 16–20px · list items 10–12px.
 */
export const FLYER_SPACE = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const FLYER_PAD_X = 20;

/** Header (72) + gold rule (3) */
export const FLYER_HEADER_END = 75;

/** Footer block — CTA + contact grid */
export const FLYER_FOOTER_CONTENT_H = 178;

export function flyerFooterTop(contentBottom: number): number {
  const minTop = contentBottom + FLYER_SPACE.lg;
  const maxTop = FLYER_PORTRAIT_H - FLYER_FOOTER_CONTENT_H;
  return Math.min(Math.max(minTop, 520), maxTop);
}

export const CLOUD_FLYER_LAYOUT = {
  heroTop: FLYER_HEADER_END,
  heroHeight: 118,
  taglineTop: FLYER_HEADER_END + 118 + FLYER_SPACE.lg,
  taglineHeight: 36,
  painTop: FLYER_HEADER_END + 118 + FLYER_SPACE.lg + 36 + FLYER_SPACE.xl,
  painMinHeight: 112,
  servicesTop:
    FLYER_HEADER_END +
    118 +
    FLYER_SPACE.lg +
    36 +
    FLYER_SPACE.xl +
    112 +
    FLYER_SPACE.xl +
    8,
  servicesMinHeight: 248,
  footerTop: flyerFooterTop(
    FLYER_HEADER_END +
      118 +
      FLYER_SPACE.lg +
      36 +
      FLYER_SPACE.xl +
      112 +
      FLYER_SPACE.xl +
      8 +
      248 +
      FLYER_SPACE.md,
  ),
} as const;

/** EKDSend promotional flyer — sparse NORASEND-style portrait layout */
export const EKDSEND_PROMO_LAYOUT = {
  headerHeight: 72,
  heroTop: 72,
  heroHeight: 300,
  contentTop: 72 + 300 + FLYER_SPACE.xl,
  footerTop: 768,
} as const;

/** Digital Assets promotional flyer — same sparse portrait rhythm as EKDSend */
export const DIGITAL_ASSETS_PROMO_LAYOUT = {
  headerHeight: 72,
  heroTop: 72,
  heroHeight: 300,
  contentTop: 72 + 300 + FLYER_SPACE.xl,
  footerTop: 768,
} as const;

export const PRICING_FLYER_LAYOUT = {
  heroTop: FLYER_HEADER_END,
  heroHeight: 128,
  introTop: FLYER_HEADER_END + 128 + FLYER_SPACE.lg,
  bulletsTop: FLYER_HEADER_END + 128 + FLYER_SPACE.lg + 40 + FLYER_SPACE.lg,
  tiersTop: FLYER_HEADER_END + 128 + FLYER_SPACE.lg + 40 + FLYER_SPACE.lg + 88 + FLYER_SPACE.xl,
  footerTop: flyerFooterTop(
    FLYER_HEADER_END +
      128 +
      FLYER_SPACE.lg +
      40 +
      FLYER_SPACE.lg +
      88 +
      FLYER_SPACE.xl +
      168,
  ),
} as const;

export const flyerSectionLabelStyle = {
  borderLeft: "3px solid #C9972E",
  paddingLeft: FLYER_SPACE.sm,
  marginBottom: FLYER_SPACE.md,
} as const;

export const flyerBulletRowStyle = {
  display: "flex" as const,
  alignItems: "flex-start" as const,
  gap: FLYER_SPACE.sm,
  marginBottom: FLYER_SPACE.md,
};
