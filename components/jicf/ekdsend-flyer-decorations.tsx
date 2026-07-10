import type { CSSProperties } from "react";

/** EKDSend brand gold — matches ekdsend-flyer.tsx */
export const EKDSEND_DECOR_GOLD = "#C8A061";
export const EKDSEND_DECOR_GOLD_LIGHT = "#E8C589";

/**
 * Full-canvas send trajectory — one continuous cubic-bezier chain.
 * Origin (top-right hero) → mid waypoint (content entry) → destination (CTA).
 */
const SEND_PATH_D =
  "M 492 38 C 518 78, 502 148, 448 198 C 392 248, 318 302, 268 358 C 208 424, 178 508, 212 592 C 248 652, 262 682, 268 698";

/** Paper plane on the first sweep (~t=0.32 of segment 1) */
const PLANE_ANCHOR = { x: 472, y: 102, rotate: -28 };

const ORIGIN = { x: 492, y: 38 };
const MIDPOINT = { x: 268, y: 358 };
const DESTINATION = { x: 268, y: 698 };

type DecorProps = {
  style?: CSSProperties;
  opacity?: number;
  color?: string;
};

/** Inline paper-plane glyph — centered on (18,18) in 36×36 space */
function PlaneGlyphPaths({
  color = EKDSEND_DECOR_GOLD,
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
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path
        d="M 20 18 L 20 28 L 14 22 Z"
        fill={color}
        fillOpacity={0.2}
        stroke={color}
        strokeWidth={1}
        strokeLinejoin="round"
      />
      <line
        x1={20}
        y1={18}
        x2={10}
        y2={24}
        stroke={color}
        strokeWidth={1}
        opacity={0.55}
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
  color = EKDSEND_DECOR_GOLD,
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
      <g opacity={0.38}>
        <circle
          cx={ORIGIN.x}
          cy={ORIGIN.y}
          r={18}
          stroke={color}
          strokeWidth={0.75}
          strokeDasharray="4 9"
          fill="none"
        />
        <circle
          cx={ORIGIN.x}
          cy={ORIGIN.y}
          r={10}
          stroke={lightColor}
          strokeWidth={0.5}
          strokeDasharray="3 6"
          fill="none"
          opacity={0.75}
        />
      </g>

      {/* Primary delivery trajectory — single connected curve */}
      <path
        d={SEND_PATH_D}
        stroke={color}
        strokeWidth={1.75}
        strokeDasharray="5 7"
        strokeLinecap="round"
        fill="none"
        opacity={0.48}
      />

      {/* Origin dot */}
      <circle cx={ORIGIN.x} cy={ORIGIN.y} r={3} fill={color} opacity={0.9} />
      <circle cx={ORIGIN.x} cy={ORIGIN.y} r={1.5} fill={lightColor} opacity={0.6} />

      {/* Paper plane ON the path */}
      <g
        transform={`translate(${px}, ${py}) rotate(${rotate}) translate(-18, -18)`}
        opacity={0.5}
      >
        <PlaneGlyphPaths color={color} />
      </g>

      {/* Mid-path waypoint — subtle pulse where curve enters content */}
      <circle cx={MIDPOINT.x} cy={MIDPOINT.y} r={2} fill={lightColor} opacity={0.45} />

      {/* Destination — delivery arrived near CTA */}
      <circle
        cx={DESTINATION.x}
        cy={DESTINATION.y}
        r={4}
        fill="none"
        stroke={color}
        strokeWidth={1.25}
        opacity={0.7}
      />
      <circle cx={DESTINATION.x} cy={DESTINATION.y} r={2} fill={color} opacity={0.85} />
      <path
        d={`M ${DESTINATION.x - 3.5} ${DESTINATION.y} L ${DESTINATION.x - 0.5} ${DESTINATION.y + 3.5} L ${DESTINATION.x + 4.5} ${DESTINATION.y - 3.5}`}
        stroke={color}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={0.75}
      />
    </svg>
  );
}

/**
 * Canvas-level decorations — one unified send path spanning hero through footer.
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
