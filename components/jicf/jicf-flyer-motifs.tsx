import type { CSSProperties } from "react";

const JICF_CYAN = "#2596be";
const JICF_GOLD = "#fbbf24";

/** Constellation mesh tuned for JICF navy/teal flyers */
export function JICFMeshConstellation({
  corner = "top-right",
  opacity = 0.2,
}: {
  corner?: "top-right" | "bottom-left";
  opacity?: number;
}) {
  const pos =
    corner === "top-right"
      ? { top: 0, right: 0 }
      : { bottom: 0, left: 0 };

  return (
    <svg
      aria-hidden
      width={120}
      height={100}
      viewBox="0 0 140 120"
      style={{
        position: "absolute",
        pointerEvents: "none",
        zIndex: 1,
        opacity,
        ...pos,
      }}
    >
      <g stroke={JICF_CYAN} strokeWidth={0.7} fill="none">
        <circle cx={18} cy={22} r={2} fill={JICF_CYAN} stroke="none" />
        <circle cx={52} cy={12} r={2} fill={JICF_CYAN} stroke="none" />
        <circle cx={88} cy={28} r={2} fill={JICF_CYAN} stroke="none" />
        <line x1={18} y1={22} x2={52} y2={12} />
        <line x1={52} y1={12} x2={88} y2={28} />
        <line x1={18} y1={22} x2={42} y2={48} />
        <line x1={42} y1={48} x2={76} y2={58} />
      </g>
    </svg>
  );
}

export function JICFCircuitAccent({
  style,
  color = JICF_GOLD,
  opacity = 0.7,
}: {
  style?: CSSProperties;
  color?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden
      width={64}
      height={24}
      viewBox="0 0 72 28"
      style={{ flexShrink: 0, opacity, ...style }}
    >
      <path d="M0 14 H32 L44 26" stroke={color} strokeWidth={1.5} fill="none" />
      <circle cx={58} cy={26} r={5} stroke={color} strokeWidth={1.5} fill="none" />
    </svg>
  );
}

export function JICFThinRule({ style }: { style?: CSSProperties }) {
  return (
    <div
      style={{
        height: 1,
        background: `linear-gradient(to right, transparent, ${JICF_GOLD} 30%, ${JICF_CYAN} 70%, transparent)`,
        ...style,
      }}
    />
  );
}
