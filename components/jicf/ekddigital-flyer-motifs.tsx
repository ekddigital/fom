import type { CSSProperties, ReactNode } from "react";
import { GOLD, GOLD_LIGHT, GOLD_PATH } from "@/components/jicf/ekddigital-flyer-theme";

type MotifProps = {
  style?: CSSProperties;
  opacity?: number;
  color?: string;
};

/** Constellation mesh — corners (Annual Fair reference) */
export function FlyerMeshConstellation({
  corner = "top-right",
  opacity = 0.22,
  color = GOLD_LIGHT,
}: MotifProps & { corner?: "top-right" | "bottom-left" }) {
  const pos =
    corner === "top-right"
      ? { top: 0, right: 0 }
      : { bottom: 0, left: 0 };

  return (
    <svg
      aria-hidden
      width={140}
      height={120}
      viewBox="0 0 140 120"
      style={{
        position: "absolute",
        pointerEvents: "none",
        zIndex: 1,
        opacity,
        ...pos,
      }}
    >
      <g stroke={color} strokeWidth={0.75} fill="none">
        <circle cx={18} cy={22} r={2} fill={color} stroke="none" />
        <circle cx={52} cy={12} r={2} fill={color} stroke="none" />
        <circle cx={88} cy={28} r={2} fill={color} stroke="none" />
        <circle cx={118} cy={8} r={2} fill={color} stroke="none" />
        <circle cx={42} cy={48} r={2} fill={color} stroke="none" />
        <circle cx={76} cy={58} r={2} fill={color} stroke="none" />
        <line x1={18} y1={22} x2={52} y2={12} />
        <line x1={52} y1={12} x2={88} y2={28} />
        <line x1={88} y1={28} x2={118} y2={8} />
        <line x1={18} y1={22} x2={42} y2={48} />
        <line x1={42} y1={48} x2={76} y2={58} />
        <line x1={76} y1={58} x2={88} y2={28} />
        <line x1={42} y1={48} x2={12} y2={72} />
        <line x1={76} y1={58} x2={98} y2={92} />
      </g>
    </svg>
  );
}

/** Circuit trace with 45° bend + terminal circle (Conference reference) */
export function FlyerCircuitAccent({
  style,
  opacity = 0.55,
  color = GOLD_LIGHT,
  flip = false,
}: MotifProps & { flip?: boolean }) {
  return (
    <svg
      aria-hidden
      width={72}
      height={28}
      viewBox="0 0 72 28"
      style={{
        flexShrink: 0,
        opacity,
        transform: flip ? "scaleX(-1)" : undefined,
        ...style,
      }}
    >
      <path
        d="M0 14 H36 L48 26"
        stroke={color}
        strokeWidth={1.5}
        fill="none"
      />
      <circle
        cx={62}
        cy={26}
        r={5}
        stroke={color}
        strokeWidth={1.5}
        fill="none"
      />
    </svg>
  );
}

/** Three chevron arrows (Tech Repair reference) */
export function FlyerChevronCluster({ style, opacity = 0.85 }: MotifProps) {
  return (
    <div
      aria-hidden
      style={{
        display: "flex",
        gap: 3,
        opacity,
        ...style,
      }}
    >
      {[0, 1, 2].map((i) => (
        <svg key={i} width={14} height={22} viewBox="0 0 14 22">
          <path
            d="M2 2 L12 11 L2 20"
            fill="none"
            stroke={GOLD_LIGHT}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.45 + i * 0.25}
          />
        </svg>
      ))}
    </div>
  );
}

/** Slanted-end CTA banner (Tech Repair reference) */
export function FlyerSlantedCta({
  children,
  variant = "gold",
}: {
  children: ReactNode;
  variant?: "gold" | "light";
}) {
  const bg =
    variant === "light"
      ? `linear-gradient(135deg, ${GOLD_LIGHT} 0%, ${GOLD} 55%, ${GOLD_PATH} 100%)`
      : `linear-gradient(135deg, #a87222 0%, ${GOLD} 40%, ${GOLD_LIGHT} 100%)`;

  return (
    <div
      style={{
        background: bg,
        padding: "7px 24px",
        textAlign: "center",
        marginBottom: 10,
        boxShadow:
          variant === "light"
            ? "0 4px 20px rgba(200,160,97,0.35)"
            : "0 4px 18px rgba(200,160,97,0.35)",
        clipPath:
          "polygon(10px 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0 50%)",
      }}
    >
      {children}
    </div>
  );
}

/** Gradient accent on headline word (Tech Repair + Annual Fair) */
export function FlyerGradientWord({
  children,
  from = GOLD_LIGHT,
  to = GOLD,
}: {
  children: ReactNode;
  from?: string;
  to?: string;
}) {
  return (
    <span
      style={{
        background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
}

/** Thin rule with optional wide-tracked label (Annual Fair reference) */
export function FlyerSectionRule({
  label,
  color = "rgba(200,160,97,0.45)",
}: {
  label?: string;
  color?: string;
}) {
  return (
    <div style={{ margin: "6px 0", textAlign: label ? "center" : undefined }}>
      {label ? (
        <p
          style={{
            margin: "0 0 5px",
            fontSize: 7.5,
            fontWeight: 800,
            color: "#9ca3af",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </p>
      ) : null}
      <div
        style={{
          height: 1,
          background: `linear-gradient(to right, transparent, ${color} 25%, ${color} 75%, transparent)`,
        }}
      />
    </div>
  );
}

/** Pill-shaped image frame — left rounded (Conference reference) */
export function FlyerPillImageClip({
  children,
  accentColor = GOLD_LIGHT,
}: {
  children: ReactNode;
  accentColor?: string;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: "0 90px 90px 0",
        overflow: "hidden",
        border: `2.5px solid ${accentColor}`,
        boxShadow: `0 0 24px rgba(200,160,97,0.22), inset 0 0 0 1px rgba(255,255,255,0.08)`,
      }}
    >
      {children}
    </div>
  );
}

/** Bordered info grid for footer contacts (Conference reference) */
export function FlyerContactGrid({
  rows,
}: {
  rows: readonly {
    icon: string;
    label: string;
    value: string;
    gold?: boolean;
  }[];
}) {
  return (
    <div
      style={{
        border: "1.5px solid rgba(200,160,97,0.35)",
        borderRadius: 10,
        padding: "10px 8px 8px",
        background: "rgba(31,28,24,0.55)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <FlyerCircuitAccent
        style={{ position: "absolute", bottom: 6, right: 8 }}
        opacity={0.25}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6px 4px",
        }}
      >
        {rows.map(({ icon, label, value, gold }, idx) => (
          <div
            key={label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "6px 10px",
              borderRight:
                idx % 2 === 0 ? "1px solid rgba(255,255,255,0.12)" : undefined,
              borderBottom:
                idx < 2 ? "1px solid rgba(255,255,255,0.12)" : undefined,
            }}
          >
            <span style={{ fontSize: 14, lineHeight: 1 }}>{icon}</span>
            <p
              style={{
                margin: "2px 0 0",
                fontSize: 7.2,
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: 800,
              }}
            >
              {label}
            </p>
            <p
              style={{
                margin: "1px 0 0",
                fontSize: 9.8,
                color: gold ? GOLD_LIGHT : "#ffffff",
                fontWeight: 800,
                lineHeight: 1.25,
              }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
