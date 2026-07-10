import type { CSSProperties } from "react";

/** EKDSend brand gold — matches ekdsend-flyer.tsx */
export const EKDSEND_DECOR_GOLD = "#C8A061";
export const EKDSEND_DECOR_GOLD_LIGHT = "#E8C589";
/** Slightly brighter gold for path strokes on dark / photo areas */
export const EKDSEND_DECOR_GOLD_PATH = "#D4B06E";

/**
 * Right-gutter send trajectory — stays in negative space:
 * hero top-right → down right edge → flanks bullets → arrives at CTA.
 * Avoids headline, subhead, and bullet copy (x ≲ 460).
 */
const SEND_PATH_D =
  "M 514 92 C 528 158, 520 248, 508 338 C 502 418, 500 498, 498 578 C 492 632, 462 664, 412 680";

/** Paper plane on the first hero sweep */
const PLANE_ANCHOR = { x: 522, y: 148, rotate: -16 };

const ORIGIN = { x: 514, y: 92 };
const MIDPOINT = { x: 500, y: 498 };
const DESTINATION = { x: 412, y: 680 };

type DecorProps = {
  style?: CSSProperties;
  opacity?: number;
  color?: string;
};

/** Inline paper-plane glyph — centered on (18,18) in 36×36 space */
function PlaneGlyphPaths({
  color = EKDSEND_DECOR_GOLD_PATH,
  opacity = 1,
}: {
  color?: string;
  opacity?: number;
}) {
  return (
    <g opacity={opacity}>
      <path
        d="M 4 18 L 32 6 L 20 18 L 32 30 Z"
        fill="none"
        stroke={color}
        strokeWidth={1.75}
        strokeLinejoin="round"
      />
      <path
        d="M 20 18 L 20 28 L 14 22 Z"
        fill={color}
        fillOpacity={0.28}
        stroke={color}
        strokeWidth={1.15}
        strokeLinejoin="round"
      />
      <line
        x1={20}
        y1={18}
        x2={10}
        y2={24}
        stroke={color}
        strokeWidth={1.15}
        opacity={0.65}
      />
    </g>
  );
}

/**
 * Single composite SVG spanning the full flyer canvas.
 * One curved trajectory: origin dot (top-right) → plane on path → destination near CTA.
 */
export function ConnectedSendPath({
  style,
  opacity = 1,
  color = EKDSEND_DECOR_GOLD_PATH,
  lightColor = EKDSEND_DECOR_GOLD_LIGHT,
}: DecorProps & { lightColor?: string }) {
  const { x: px, y: py, rotate } = PLANE_ANCHOR;

  return (
    <svg
      aria-hidden
      width={540}
      height={900}
      viewBox="0 0 540 900"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        opacity,
        ...style,
      }}
    >
      {/* Broadcast rings at send origin — centered on path start */}
      <g opacity={0.52}>
        <circle
          cx={ORIGIN.x}
          cy={ORIGIN.y}
          r={20}
          stroke={color}
          strokeWidth={1}
          strokeDasharray="4 8"
          fill="none"
        />
        <circle
          cx={ORIGIN.x}
          cy={ORIGIN.y}
          r={11}
          stroke={lightColor}
          strokeWidth={0.75}
          strokeDasharray="3 5"
          fill="none"
          opacity={0.85}
        />
      </g>

      {/* Dark halo for contrast on hero photo */}
      <path
        d={SEND_PATH_D}
        stroke="#1F1C18"
        strokeWidth={3.75}
        strokeDasharray="5 7"
        strokeLinecap="round"
        fill="none"
        opacity={0.42}
      />

      {/* Primary delivery trajectory — single connected curve */}
      <path
        d={SEND_PATH_D}
        stroke={color}
        strokeWidth={2.25}
        strokeDasharray="5 7"
        strokeLinecap="round"
        fill="none"
        opacity={0.66}
      />

      {/* Origin dot */}
      <circle cx={ORIGIN.x} cy={ORIGIN.y} r={3.5} fill={color} opacity={0.95} />
      <circle cx={ORIGIN.x} cy={ORIGIN.y} r={1.75} fill={lightColor} opacity={0.7} />

      {/* Paper plane ON the path */}
      <g
        transform={`translate(${px}, ${py}) rotate(${rotate}) translate(-18, -18)`}
        opacity={0.82}
      >
        <PlaneGlyphPaths color={color} />
      </g>

      {/* Mid-path waypoint — where curve runs beside bullet list */}
      <circle cx={MIDPOINT.x} cy={MIDPOINT.y} r={2.5} fill={lightColor} opacity={0.6} />

      {/* Destination — delivery arrived near CTA */}
      <circle
        cx={DESTINATION.x}
        cy={DESTINATION.y}
        r={5}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        opacity={0.8}
      />
      <circle cx={DESTINATION.x} cy={DESTINATION.y} r={2.5} fill={color} opacity={0.9} />
      <path
        d={`M ${DESTINATION.x - 4} ${DESTINATION.y} L ${DESTINATION.x - 0.5} ${DESTINATION.y + 4} L ${DESTINATION.x + 5} ${DESTINATION.y - 4}`}
        stroke={color}
        strokeWidth={1.35}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={0.85}
      />
    </svg>
  );
}

/**
 * Canvas-level decorations — unified send path in hero gutter + right margin.
 * Sits above hero imagery, below copy blocks.
 */
export function EKDSendFlyerDecorations() {
  return <ConnectedSendPath style={{ zIndex: 3 }} />;
}

/** @deprecated Use EKDSendFlyerDecorations — kept for import compatibility */
export function EKDSendFlyerBackgroundDecorations() {
  return null;
}

/** @deprecated Use EKDSendFlyerDecorations */
export function EKDSendFlyerContentDecorations() {
  return null;
}

/** @deprecated Use EKDSendFlyerDecorations */
export function EKDSendFlyerHeroDecorations() {
  return null;
}
