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
  opacity = 0.42,
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
        strokeWidth={1.75}
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
  opacity = 0.44,
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
  opacity = 0.38,
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
        strokeWidth={1.5}
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
  opacity = 0.34,
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
 * Dark-background accents below hero/content — footer zone only.
 * (Hero/content decorations live inside those blocks so they aren't covered.)
 */
export function EKDSendFlyerBackgroundDecorations() {
  return (
    <>
      {/* Footer area — delivery trail sweeping in from the right */}
      <MessageTrailDecoration
        flip
        opacity={0.4}
        style={{ bottom: 72, right: 4, zIndex: 1 }}
      />

      {/* Bottom-left corner accent */}
      <PaperPlaneGlyph
        size={28}
        opacity={0.38}
        rotate={-8}
        style={{ bottom: 108, left: 16, zIndex: 1 }}
      />
    </>
  );
}

/** Content-block flank accents — behind copy, above dark canvas */
export function EKDSendFlyerContentDecorations() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <SendTrajectoryArc
        variant="tight"
        flip
        opacity={0.42}
        style={{ top: 48, right: 6 }}
      />
      <PaperPlaneGlyph
        size={34}
        opacity={0.4}
        rotate={12}
        style={{ top: 8, left: 2 }}
      />
      <SendTrajectoryArc
        variant="wide"
        opacity={0.36}
        style={{ bottom: 24, left: 12 }}
      />
    </div>
  );
}

/** Hero-area decorations — above photo gradient, below any hero copy */
export function EKDSendFlyerHeroDecorations() {
  return (
    <>
      {/* Prominent top-right outbound arc — primary visual anchor */}
      <SendTrajectoryArc
        variant="wide"
        opacity={0.52}
        style={{ top: 12, right: 16, zIndex: 2 }}
      />

      {/* Sweeping delivery trail across upper hero */}
      <MessageTrailDecoration
        opacity={0.44}
        style={{ top: 28, left: 8, zIndex: 2 }}
      />

      <SendRadiusRings
        opacity={0.36}
        style={{ top: 8, right: -8, zIndex: 2 }}
      />

      <PaperPlaneGlyph
        size={30}
        opacity={0.48}
        rotate={-24}
        style={{ top: 56, right: 36, zIndex: 2 }}
      />
    </>
  );
}
