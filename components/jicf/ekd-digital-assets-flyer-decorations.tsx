import type { CSSProperties } from "react";

/** Digital Assets brand gold — matches ekd-digital-assets-flyer.tsx / EKDSend */
export const ASSETS_DECOR_GOLD = "#C8A061";
export const ASSETS_DECOR_GOLD_LIGHT = "#E8C589";
/** Slightly brighter gold for path strokes on dark / photo areas */
export const ASSETS_DECOR_GOLD_PATH = "#D4B06E";

/**
 * Right-gutter secure data arc — stays in negative space:
 * hero top-right → down right edge → flanks bullets → arrives at CTA.
 * Avoids headline, subhead, and bullet copy (x ≲ 460).
 */
const SECURE_PATH_D =
  "M 512 88 C 526 168, 518 268, 506 358 C 498 438, 494 518, 490 598 C 484 652, 448 678, 398 692";

const LOCK_ANCHOR = { x: 518, y: 168, rotate: 0 };

const ORIGIN = { x: 512, y: 88 };
const MIDPOINT = { x: 494, y: 518 };
const DESTINATION = { x: 398, y: 692 };

type DecorProps = {
  style?: CSSProperties;
  opacity?: number;
  color?: string;
};

/** Inline padlock glyph — centered on (16,16) in 32×32 space */
function LockGlyphPaths({
  color = ASSETS_DECOR_GOLD_PATH,
  opacity = 1,
}: {
  color?: string;
  opacity?: number;
}) {
  return (
    <g opacity={opacity}>
      <rect
        x={9}
        y={14}
        width={14}
        height={12}
        rx={2}
        fill="none"
        stroke={color}
        strokeWidth={1.65}
      />
      <path
        d="M 11 14 V 10 C 11 6.5 13.5 4 16 4 C 18.5 4 21 6.5 21 10 V 14"
        fill="none"
        stroke={color}
        strokeWidth={1.65}
        strokeLinecap="round"
      />
      <circle cx={16} cy={19} r={1.75} fill={color} opacity={0.85} />
    </g>
  );
}

/** Small file/document node on the path */
function FileNode({
  cx,
  cy,
  color,
  lightColor,
  opacity = 0.7,
}: {
  cx: number;
  cy: number;
  color: string;
  lightColor: string;
  opacity?: number;
}) {
  return (
    <g transform={`translate(${cx - 7}, ${cy - 8})`} opacity={opacity}>
      <rect
        x={2}
        y={2}
        width={10}
        height={12}
        rx={1}
        fill="none"
        stroke={color}
        strokeWidth={1.2}
      />
      <path
        d="M 5 2 L 9 2 L 12 5 L 12 14 L 2 14 L 2 5 Z"
        fill="none"
        stroke={lightColor}
        strokeWidth={0.9}
        opacity={0.75}
      />
      <line x1={4} y1={8} x2={10} y2={8} stroke={color} strokeWidth={0.8} opacity={0.6} />
      <line x1={4} y1={10.5} x2={8} y2={10.5} stroke={color} strokeWidth={0.8} opacity={0.5} />
    </g>
  );
}

/**
 * Single composite SVG spanning the full flyer canvas.
 * Secure connection arc: origin dot → lock on path → file nodes → destination near CTA.
 */
export function ConnectedSecurePath({
  style,
  opacity = 1,
  color = ASSETS_DECOR_GOLD_PATH,
  lightColor = ASSETS_DECOR_GOLD_LIGHT,
}: DecorProps & { lightColor?: string }) {
  const { x: lx, y: ly, rotate } = LOCK_ANCHOR;

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
      {/* Broadcast rings at secure origin */}
      <g opacity={0.5}>
        <circle
          cx={ORIGIN.x}
          cy={ORIGIN.y}
          r={18}
          stroke={color}
          strokeWidth={1}
          strokeDasharray="3 7"
          fill="none"
        />
        <circle
          cx={ORIGIN.x}
          cy={ORIGIN.y}
          r={9}
          stroke={lightColor}
          strokeWidth={0.75}
          strokeDasharray="2 4"
          fill="none"
          opacity={0.85}
        />
      </g>

      {/* Dark halo for contrast on hero photo */}
      <path
        d={SECURE_PATH_D}
        stroke="#1F1C18"
        strokeWidth={3.75}
        strokeDasharray="4 8"
        strokeLinecap="round"
        fill="none"
        opacity={0.45}
      />

      {/* Primary secure connection arc */}
      <path
        d={SECURE_PATH_D}
        stroke={color}
        strokeWidth={2.25}
        strokeDasharray="4 8"
        strokeLinecap="round"
        fill="none"
        opacity={0.68}
      />

      {/* Origin dot */}
      <circle cx={ORIGIN.x} cy={ORIGIN.y} r={3.5} fill={color} opacity={0.95} />
      <circle cx={ORIGIN.x} cy={ORIGIN.y} r={1.75} fill={lightColor} opacity={0.7} />

      {/* Padlock on path — security motif */}
      <g
        transform={`translate(${lx}, ${ly}) rotate(${rotate}) translate(-16, -16)`}
        opacity={0.82}
      >
        <LockGlyphPaths color={color} />
      </g>

      {/* File nodes along the arc */}
      <FileNode cx={508} cy={318} color={color} lightColor={lightColor} opacity={0.62} />
      <FileNode cx={500} cy={438} color={color} lightColor={lightColor} opacity={0.55} />

      {/* Mid-path waypoint */}
      <circle cx={MIDPOINT.x} cy={MIDPOINT.y} r={2.5} fill={lightColor} opacity={0.6} />

      {/* Destination — delivery node near CTA */}
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
 * Canvas-level decorations — secure arc in hero gutter + right margin.
 * Sits above hero imagery, below copy blocks.
 */
export function EKDDigitalAssetsFlyerDecorations() {
  return <ConnectedSecurePath style={{ zIndex: 3 }} />;
}
