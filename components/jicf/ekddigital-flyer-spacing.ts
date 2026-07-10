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

/** Footer block — CTA + 2×2 contact grid + parent line (measured ~200px at 540w) */
export const FLYER_FOOTER_CONTENT_H = 200;

/** Anchor dense 900px flyers so footer sits flush at canvas bottom */
export const FLYER_FOOTER_TOP = FLYER_PORTRAIT_H - FLYER_FOOTER_CONTENT_H;

/**
 * Footer top: at least one section gap below content, but never float mid-canvas
 * when content is short — matches EKDSend's balanced bottom rhythm.
 */
export function flyerFooterTop(contentBottom: number): number {
  return Math.max(contentBottom + FLYER_SPACE.lg, FLYER_FOOTER_TOP);
}

/** EKDSend-style sparse promo content rhythm (headline → subhead → bullets → CTA) */
export const PROMO_FLYER_CONTENT = {
  subheadMarginTop: FLYER_SPACE.lg,
  bulletsMarginTop: FLYER_SPACE.lg + 4,
  bulletMarginBottom: FLYER_SPACE.lg,
  ctaMarginTop: FLYER_SPACE.lg + 2,
  ctaUrlMarginTop: FLYER_SPACE.xs + 1,
} as const;

/** EKDSend-style sparse promo footer rhythm */
export const PROMO_FLYER_FOOTER = {
  top: 768,
  ruleToTitleGap: FLYER_SPACE.md,
  titleToEmailGap: 3,
  contactStripMarginTop: 10,
  contactStripGap: 6,
  contactStripPadding: "10px 14px",
} as const;

/** Shared portrait promo shell (EKDSend gold standard — 540×900) */
export const PROMO_FLYER_LAYOUT = {
  headerHeight: 72,
  heroTop: 72,
  heroHeight: 300,
  contentTop: 72 + 300 + FLYER_SPACE.xl,
  contentMinHeight: 368,
  footerTop: PROMO_FLYER_FOOTER.top,
} as const;

/** EKDSend promotional flyer — sparse NORASEND-style portrait layout */
export const EKDSEND_PROMO_LAYOUT = PROMO_FLYER_LAYOUT;

/** Digital Assets promotional flyer — same sparse portrait rhythm as EKDSend */
export const DIGITAL_ASSETS_PROMO_LAYOUT = PROMO_FLYER_LAYOUT;

/** Instagram 4:5 services flyer (540×675) */
export const INSTAGRAM_FLYER_H = 675;
export const INSTAGRAM_FLYER_LAYOUT = {
  headerHeight: 72,
  headerRuleHeight: 3,
  heroTop: FLYER_HEADER_END,
  heroHeight: 157,
  painTop: FLYER_HEADER_END + 157,
  painHeight: 120,
  separatorTop: FLYER_HEADER_END + 157 + 120,
  servicesTop: FLYER_HEADER_END + 157 + 120 + 1,
  servicesHeight: 115,
  footerBorderTop: FLYER_HEADER_END + 157 + 120 + 1 + 115,
  footerTop: FLYER_HEADER_END + 157 + 120 + 1 + 115 + 2.5,
} as const;

function buildCloudFlyerLayout() {
  const heroHeight = 122;
  const taglineHeight = 36;
  const painMinHeight = 100;
  const heroTop = FLYER_HEADER_END;
  const taglineTop = heroTop + heroHeight + FLYER_SPACE.md;
  const painTop = taglineTop + taglineHeight + FLYER_SPACE.lg;
  const servicesTop = painTop + painMinHeight + FLYER_SPACE.lg;
  const footerTop = FLYER_FOOTER_TOP;
  const servicesFooterGap = FLYER_SPACE.md;

  return {
    heroTop,
    heroHeight,
    taglineTop,
    taglineHeight,
    painTop,
    painMinHeight,
    servicesTop,
    servicesBottom: FLYER_PORTRAIT_H - footerTop + servicesFooterGap,
    footerTop,
  };
}

export const CLOUD_FLYER_LAYOUT = buildCloudFlyerLayout();

function buildPricingFlyerLayout() {
  const heroHeight = 118;
  const introHeight = 34;
  const bulletsMinHeight = 62;
  const heroTop = FLYER_HEADER_END;
  const introTop = heroTop + heroHeight + FLYER_SPACE.md;
  const bulletsTop = introTop + introHeight + FLYER_SPACE.md;
  const tiersTop = bulletsTop + bulletsMinHeight + FLYER_SPACE.lg;
  const footerTop = FLYER_FOOTER_TOP;
  /** Gap between pricing block bottom edge and footer rule */
  const tiersFooterGap = FLYER_SPACE.md;

  return {
    heroTop,
    heroHeight,
    introTop,
    introHeight,
    bulletsTop,
    bulletsMinHeight,
    tiersTop,
    tiersBottom: FLYER_PORTRAIT_H - footerTop + tiersFooterGap,
    footerTop,
  };
}

export const PRICING_FLYER_LAYOUT = buildPricingFlyerLayout();

export const flyerSectionLabelStyle = {
  borderLeft: "3px solid #C8A061",
  paddingLeft: FLYER_SPACE.sm,
  marginBottom: FLYER_SPACE.md,
} as const;

export const flyerBulletRowStyle = {
  display: "flex" as const,
  alignItems: "flex-start" as const,
  gap: FLYER_SPACE.sm,
  marginBottom: FLYER_SPACE.md,
};
