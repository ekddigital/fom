import type { CSSProperties } from "react";

/** EKDSend brand gold — matches ekdsend-flyer.tsx */
export const EKDSEND_DECOR_GOLD = "#C8A061";
export const EKDSEND_DECOR_GOLD_LIGHT = "#E8C589";

type DecorProps = {
  style?: CSSProperties;
  opacity?: number;
  color?: string;
  size?: number;
};

/** Curved dashed trajectory with terminal dot — abstract "message sent" arc */
export function SendTrajectoryArc({
  style,
  opacity = 0.28,
  color = EKDSEND_DECOR_GOLD,
  flip = false,
  variant = "wide",
}: DecorProps & { flip?: boolean; variant?: "wide" | "tight" }) {
  const path =
    variant === "wide"
      ? "M 8 92 C 38 18, 88 8, 128 48"
      : "M 4 72 Q 44 8, 88 36";

  return (
    <svg
      aria-hidden
      width={variant === "wide" ? 136 : 92}
      height={variant === "wide" ? 100 : 76}
      viewBox={variant === "wide" ? "0 0 136 100" : "0 0 92 76"}
      style={{
        position: "absolute",
        pointerEvents: "none",
        opacity,
        transform: flip ? "scaleX(-1)" : undefined,
        ...style,
      }}
    >
      <path
        d={path}
        stroke={color}
        strokeWidth={1.25}
        strokeDasharray="5 7"
        strokeLinecap="round"
        fill="none"
      />
      <circle
        cx={variant === "wide" ? 128 : 88}
        cy={variant === "wide" ? 48 : 36}
        r={3.5}
        fill={color}
        opacity={0.85}
      />
      <circle
        cx={variant === "wide" ? 8 : 4}
        cy={variant === "wide" ? 92 : 72}
        r={2}
        fill={color}
        opacity={0.5}
      />
    </svg>
  );
}

/** Minimal abstract paper-plane / send glyph — not a literal airplane */
export function PaperPlaneGlyph({
  style,
  opacity = 0.32,
  color = EKDSEND_DECOR_GOLD,
  size = 36,
  rotate = 0,
}: DecorProps & { rotate?: number }) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 36 36"
      style={{
        position: "absolute",
        pointerEvents: "none",
        opacity,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        ...style,
      }}
    >
      <path
        d="M 4 18 L 32 6 L 20 18 L 32 30 Z"
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path
        d="M 20 18 L 20 28 L 14 22 Z"
        fill={color}
        fillOpacity={0.18}
        stroke={color}
        strokeWidth={1}
        strokeLinejoin="round"
      />
      <line x1={20} y1={18} x2={10} y2={24} stroke={color} strokeWidth={1} opacity={0.55} />
    </svg>
  );
}

/** Broken dashed segments along a swooping delivery path */
export function MessageTrailDecoration({
  style,
  opacity = 0.22,
  color = EKDSEND_DECOR_GOLD_LIGHT,
  flip = false,
}: DecorProps & { flip?: boolean }) {
  return (
    <svg
      aria-hidden
      width={200}
      height={120}
      viewBox="0 0 200 120"
      style={{
        position: "absolute",
        pointerEvents: "none",
        opacity,
        transform: flip ? "scaleX(-1)" : undefined,
        ...style,
      }}
    >
      <path
        d="M 12 98 C 48 72, 72 28, 118 22 S 178 58, 188 88"
        stroke={color}
        strokeWidth={1}
        strokeDasharray="3 9 6 7"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 118 22 C 138 18, 158 32, 168 48"
        stroke={color}
        strokeWidth={0.75}
        strokeDasharray="2 6"
        strokeLinecap="round"
        fill="none"
        opacity={0.6}
      />
      <circle cx={188} cy={88} r={2.5} fill={color} />
      <circle cx={12} cy={98} r={1.5} fill={color} opacity={0.45} />
    </svg>
  );
}

/** Concentric arc rings suggesting broadcast / delivery radius */
export function SendRadiusRings({
  style,
  opacity = 0.14,
  color = EKDSEND_DECOR_GOLD,
}: DecorProps) {
  return (
    <svg
      aria-hidden
      width={160}
      height={160}
      viewBox="0 0 160 160"
      style={{
        position: "absolute",
        pointerEvents: "none",
        opacity,
        ...style,
      }}
    >
      <circle
        cx={80}
        cy={80}
        r={58}
        stroke={color}
        strokeWidth={0.75}
        strokeDasharray="4 10"
        fill="none"
      />
      <circle
        cx={80}
        cy={80}
        r={38}
        stroke={color}
        strokeWidth={0.5}
        strokeDasharray="3 8"
        fill="none"
        opacity={0.7}
      />
      <path
        d="M 80 22 A 58 58 0 0 1 138 80"
        stroke={color}
        strokeWidth={1.25}
        strokeDasharray="6 5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/**
 * Pre-composed placement layer for the EKDSend promo flyer.
 * Background/corner accents — sits behind hero and content (z-index 1).
 */
export function EKDSendFlyerBackgroundDecorations() {
  return (
    <>
      {/* Top-right corner — outbound trajectory */}
      <SendTrajectoryArc
        variant="wide"
        opacity={0.26}
        style={{ top: 88, right: 12, zIndex: 1 }}
      />

      {/* Top-left — small send glyph near header */}
      <PaperPlaneGlyph
        size={28}
        opacity={0.2}
        rotate={-18}
        style={{ top: 82, left: 18, zIndex: 1 }}
      />

      {/* Content block — right flank trajectory */}
      <SendTrajectoryArc
        variant="tight"
        flip
        opacity={0.2}
        style={{ top: 520, right: 8, zIndex: 1 }}
      />

      {/* Content block — left flank plane */}
      <PaperPlaneGlyph
        size={32}
        opacity={0.16}
        rotate={12}
        style={{ top: 480, left: 6, zIndex: 1 }}
      />

      {/* Footer area — subtle trail */}
      <MessageTrailDecoration
        flip
        opacity={0.14}
        style={{ bottom: 48, right: -24, zIndex: 1 }}
      />

      {/* Bottom-left corner accent */}
      <PaperPlaneGlyph
        size={24}
        opacity={0.14}
        rotate={-8}
        style={{ bottom: 100, left: 14, zIndex: 1 }}
      />
    </>
  );
}

/** Hero-area decorations — place inside hero block above image, below text */
export function EKDSendFlyerHeroDecorations() {
  return (
    <>
      <MessageTrailDecoration
        opacity={0.2}
        style={{ top: 40, left: -20, zIndex: 2 }}
      />
      <SendRadiusRings
        opacity={0.14}
        style={{ top: -10, right: -30, zIndex: 2 }}
      />
      <PaperPlaneGlyph
        size={26}
        opacity={0.22}
        rotate={-24}
        style={{ top: 24, right: 28, zIndex: 2 }}
      />
    </>
  );
}
