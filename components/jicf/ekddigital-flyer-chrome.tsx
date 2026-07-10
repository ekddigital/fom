import {
  FlyerCircuitAccent,
  FlyerContactGrid,
  FlyerMeshConstellation,
  FlyerSlantedCta,
} from "@/components/jicf/ekddigital-flyer-motifs";
import {
  FLYER_FOOTER_CONTENT_H,
  FLYER_PAD_X,
  FLYER_SPACE,
} from "@/components/jicf/ekddigital-flyer-spacing";
import {
  BG_DARK,
  BG_MID,
  CONTACT_ROWS,
  FLYER_PORTRAIT_H,
  FLYER_PORTRAIT_W,
  GOLD,
  GOLD_LIGHT,
  GOLD_PALE,
  PARENT_COMPANY_NAME,
  PARENT_COMPANY_URL,
  PARENT_COMPANY_WEBSITE_LABEL,
} from "@/components/jicf/ekddigital-flyer-theme";

const parentFooterStyle = {
  margin: "8px 0 0",
  fontSize: 7.5,
  fontWeight: 600,
  color: "#6b7280",
  textAlign: "center" as const,
  lineHeight: 1.3,
};

export function FlyerParentCompanyLine() {
  return (
    <p style={parentFooterStyle}>
      Part of{" "}
      <span style={{ color: "#9ca3af" }}>{PARENT_COMPANY_NAME}</span>
      {" · "}
      <a
        href={PARENT_COMPANY_URL}
        style={{ color: "#9ca3af", textDecoration: "none" }}
      >
        {PARENT_COMPANY_WEBSITE_LABEL}
      </a>
    </p>
  );
}

export function FlyerBackground({ watermark = "☁" }: { watermark?: string }) {
  return (
    <>
      <FlyerBgLayers />
      <FlyerMeshConstellation corner="top-right" />
      <FlyerMeshConstellation corner="bottom-left" opacity={0.14} />
      <FlyerWatermark char={watermark} />
    </>
  );
}

function FlyerBgLayers() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(160deg, ${BG_DARK} 0%, ${BG_MID} 45%, ${BG_DARK} 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(200,160,97,0.04) 1px, transparent 1px), radial-gradient(rgba(200,160,97,0.05) 1px, transparent 1px)",
          backgroundSize: "22px 22px, 20px 20px",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,160,97,0.12) 0%, rgba(200,160,97,0.1) 40%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: -70,
          width: 240,
          height: 240,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,160,97,0.11) 0%, rgba(200,160,97,0.06) 50%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
    </>
  );
}

function FlyerWatermark({ char }: { char: string }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 380,
        right: 6,
        fontSize: 100,
        fontWeight: 900,
        color: "rgba(200,160,97,0.045)",
        lineHeight: 1,
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
      }}
    >
      {char}
    </div>
  );
}

type FlyerHeaderProps = {
  tagline?: string;
};

export function FlyerHeader({ tagline = "Build · Host · Scale" }: FlyerHeaderProps) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(to right, transparent, ${GOLD_LIGHT} 30%, ${GOLD} 70%, transparent)`,
          zIndex: 11,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 72,
          display: "flex",
          alignItems: "center",
          padding: "0 18px",
          gap: 11,
          background: "rgba(31, 28, 24, 0.98)",
          borderBottom: `2.5px solid ${GOLD}`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            border: `2px solid rgba(200,160,97,0.45)`,
            boxShadow:
              "0 0 14px rgba(200,160,97,0.25), 0 0 10px rgba(200,160,97,0.2)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ekddigital.png"
            alt="EKD Digital"
            crossOrigin="anonymous"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <p
            style={{
              margin: 0,
              fontSize: 21,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
            }}
          >
            EKD <span style={{ color: GOLD }}>Digital</span>
          </p>
          <div
            style={{
              margin: "2px 0 0",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 9.5,
                fontWeight: 700,
                color: "#e8e6e3",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                lineHeight: 1.15,
                textShadow: "0 1px 2px rgba(0,0,0,0.9)",
              }}
            >
              {tagline}
            </p>
            <FlyerCircuitAccent opacity={0.4} color={GOLD_LIGHT} />
          </div>
        </div>
        <div
          style={{
            border: "1px solid rgba(200,160,97,0.5)",
            borderRadius: 20,
            padding: "4px 11px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 9,
              color: GOLD_PALE,
              fontWeight: 800,
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
              textShadow: "0 1px 2px rgba(0,0,0,0.75)",
            }}
          >
            ekddigital.com
          </p>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 72,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(to right, transparent, ${GOLD} 20%, ${GOLD_LIGHT} 50%, ${GOLD} 80%, transparent)`,
        }}
      />
    </>
  );
}

type FlyerContactFooterProps = {
  top: number;
  ctaHeadline?: string;
  ctaSubline?: string;
};

export function FlyerContactFooter({
  top,
  ctaHeadline = "GET YOUR FREE CONSULTATION →",
  ctaSubline = "Kingdom workers · Kingdom solutions — our DNA",
}: FlyerContactFooterProps) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: top - 2.5,
          left: 0,
          right: 0,
          height: 2.5,
          background: `linear-gradient(to right, transparent, ${GOLD} 15%, ${GOLD_LIGHT} 50%, ${GOLD} 85%, transparent)`,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(31, 28, 24, 0.98)",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          top,
          left: 0,
          right: 0,
          height: FLYER_FOOTER_CONTENT_H,
          padding: `${FLYER_SPACE.md}px ${FLYER_PAD_X}px ${FLYER_SPACE.lg}px`,
          boxSizing: "border-box",
          zIndex: 2,
        }}
      >
        <p
          style={{
            margin: `0 0 ${FLYER_SPACE.xs}px`,
            fontSize: 10.5,
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            letterSpacing: "0.01em",
            lineHeight: 1.33,
            textShadow: "0 1px 3px rgba(0,0,0,0.5)",
          }}
        >
          Questions? We&apos;re just a{" "}
          <span style={{ color: GOLD_LIGHT }}>button</span> away.
        </p>
        <p
          style={{
            margin: `0 0 ${FLYER_SPACE.sm}px`,
            fontSize: 7.6,
            fontWeight: 800,
            color: "#c9a857",
            textAlign: "center",
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            lineHeight: 1.25,
          }}
        >
          {ctaSubline}
        </p>
        <FlyerSlantedCta>
          <p
            style={{
              margin: 0,
              fontSize: 11.5,
              fontWeight: 900,
              color: BG_DARK,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {ctaHeadline}
          </p>
        </FlyerSlantedCta>
        <FlyerContactGrid rows={CONTACT_ROWS} />
        <FlyerParentCompanyLine />
      </div>
    </>
  );
}

export const flyerCanvasStyle = {
  position: "relative" as const,
  width: FLYER_PORTRAIT_W,
  height: FLYER_PORTRAIT_H,
  overflow: "hidden" as const,
  fontFamily: "'Arial', 'Helvetica Neue', sans-serif",
};
