"use client";

import type { CSSProperties, ReactNode } from "react";
import { EKDDigitalFlyerShell } from "@/components/jicf/ekddigital-flyer-shell";
import {
  DIGITAL_ASSETS_PROMO_LAYOUT,
  FLYER_PAD_X,
  FLYER_SPACE,
  flyerBulletRowStyle,
} from "@/components/jicf/ekddigital-flyer-spacing";
import {
  FLYER_PORTRAIT_H,
  FLYER_PORTRAIT_W,
} from "@/components/jicf/ekddigital-flyer-theme";
import { EKDDigitalAssetsFlyerDecorations } from "@/components/jicf/ekd-digital-assets-flyer-decorations";

/** Digital Assets product brand palette — cyan on deep navy */
const ASSETS_CYAN = "#38BDF8";
const ASSETS_CYAN_LIGHT = "#7DD3FC";
const ASSETS_BG = "#0A1628";
const ASSETS_BG_MID = "#0F2847";

const L = DIGITAL_ASSETS_PROMO_LAYOUT;

const HEADLINE = "YOUR ASSETS. SECURED.";
const SUBHEADLINE =
  "Enterprise digital asset management with fast global CDN delivery — built for marketing, product, and media teams.";
const BULLETS = [
  "Organize, tag, and version assets in one secure library",
  "Transform and optimize on the edge via global CDN",
  "Team permissions and shareable delivery links",
  "REST API with OpenAPI — developer-ready from day one",
] as const;
const CTA_LABEL = "Start free →";
const CTA_URL = "assets.andgroupco.com";
const CONTACT_PHONE = "+86 185 0683 2159";
const CONTACT_WECHAT = "EKD231777285010";

const canvasStyle = {
  position: "relative" as const,
  width: FLYER_PORTRAIT_W,
  height: FLYER_PORTRAIT_H,
  overflow: "hidden" as const,
  fontFamily: "'Arial', 'Helvetica Neue', sans-serif",
  background: ASSETS_BG,
};

export const DIGITAL_ASSETS_PROMO_ROUTE = "/jicf/ekddigital/digital-assets";

export function EKDDigitalAssetsFlyerShell() {
  return (
    <EKDDigitalFlyerShell
      downloadFilename="ekd-digital-assets-promo-flyer.png"
      exportBackgroundColor={ASSETS_BG}
    >
      <EKDDigitalAssetsPromoCanvas />
    </EKDDigitalFlyerShell>
  );
}

function EKDDigitalAssetsPromoCanvas() {
  return (
    <div style={canvasStyle}>
      <BackgroundLayers />
      <EKDDigitalAssetsFlyerDecorations />
      <DigitalAssetsHeader />
      <HeroImage />
      <ContentBlock />
      <FooterBlock />
    </div>
  );
}

function BackgroundLayers() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(165deg, ${ASSETS_BG} 0%, ${ASSETS_BG_MID} 42%, ${ASSETS_BG} 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -60,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: -50,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
    </>
  );
}

function DigitalAssetsHeader() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(to right, transparent, ${ASSETS_CYAN} 35%, ${ASSETS_CYAN_LIGHT} 65%, transparent)`,
          zIndex: 11,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: L.headerHeight,
          display: "flex",
          alignItems: "center",
          padding: `0 ${FLYER_PAD_X}px`,
          gap: 12,
          background: "rgba(10,22,40,0.98)",
          borderBottom: `2px solid ${ASSETS_CYAN}`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            overflow: "hidden",
            flexShrink: 0,
            border: `1.5px solid rgba(56,189,248,0.55)`,
            boxShadow: "0 0 12px rgba(56,189,248,0.22)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets_logo.svg"
            alt="EKD Digital Assets"
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
              fontSize: 20,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Digital<span style={{ color: ASSETS_CYAN }}>Assets</span>
          </p>
          <p
            style={{
              margin: "2px 0 0",
              fontSize: 9,
              fontWeight: 700,
              color: "#94a3b8",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            by EKD Digital
          </p>
        </div>
        <div
          style={{
            border: `1px solid rgba(56,189,248,0.45)`,
            borderRadius: 20,
            padding: "4px 11px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 8,
              color: ASSETS_CYAN_LIGHT,
              fontWeight: 800,
              letterSpacing: "0.03em",
              whiteSpace: "nowrap",
            }}
          >
            {CTA_URL}
          </p>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: L.headerHeight,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(to right, transparent, ${ASSETS_CYAN} 25%, ${ASSETS_CYAN_LIGHT} 50%, ${ASSETS_CYAN} 75%, transparent)`,
        }}
      />
    </>
  );
}

function HeroImage() {
  return (
    <FlyerBlock
      top={L.heroTop}
      minHeight={L.heroHeight}
      padding="0"
      style={{ overflow: "hidden" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/ekd/assets.png"
        alt="Professional managing secure digital assets"
        crossOrigin="anonymous"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 30%",
          display: "block",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to bottom, rgba(10,22,40,0.12) 0%, rgba(10,22,40,0.04) 35%, rgba(10,22,40,0.78) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(to right, transparent, ${ASSETS_CYAN} 20%, ${ASSETS_CYAN_LIGHT} 50%, ${ASSETS_CYAN} 80%, transparent)`,
        }}
      />
    </FlyerBlock>
  );
}

function ContentBlock() {
  return (
    <FlyerBlock
      top={L.contentTop}
      minHeight={368}
      padding={`0 ${FLYER_PAD_X}px`}
      style={{ zIndex: 4 }}
    >
      <div style={{ position: "relative", zIndex: 1 }}>
        <h2
          style={{
            margin: 0,
            fontSize: 27,
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1.14,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            textShadow: "0 1px 3px rgba(0,0,0,0.3)",
          }}
        >
          {HEADLINE}
        </h2>

        <p
          style={{
            margin: `${FLYER_SPACE.lg}px 0 0`,
            fontSize: 14,
            fontWeight: 700,
            color: "#e2e8f0",
            lineHeight: 1.44,
            maxWidth: 420,
          }}
        >
          {SUBHEADLINE}
        </p>

        <div style={{ marginTop: FLYER_SPACE.lg + 2 }}>
          {BULLETS.map((text) => (
            <Bullet key={text} text={text} />
          ))}
        </div>

        <div style={{ marginTop: FLYER_SPACE.lg }}>
          <div
            style={{
              background: `linear-gradient(135deg, ${ASSETS_CYAN_LIGHT} 0%, ${ASSETS_CYAN} 100%)`,
              padding: "10px 24px",
              textAlign: "center",
              boxShadow: "0 4px 18px rgba(56,189,248,0.35)",
              clipPath:
                "polygon(10px 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0 50%)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 15,
                fontWeight: 900,
                color: ASSETS_BG,
                lineHeight: 1.2,
                letterSpacing: "0.075em",
                textTransform: "uppercase",
              }}
            >
              {CTA_LABEL}
            </p>
          </div>
          <p
            style={{
              margin: `${FLYER_SPACE.xs + 1}px 0 0`,
              fontSize: 13,
              fontWeight: 800,
              color: ASSETS_CYAN_LIGHT,
              textAlign: "center",
              letterSpacing: "0.06em",
              lineHeight: 1.25,
            }}
          >
            {CTA_URL}
          </p>
        </div>
      </div>
    </FlyerBlock>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <div style={{ ...flyerBulletRowStyle, marginBottom: FLYER_SPACE.md + 2 }}>
      <span
        style={{
          color: ASSETS_CYAN,
          fontSize: 17,
          fontWeight: 900,
          flexShrink: 0,
          lineHeight: 1.2,
        }}
      >
        ›
      </span>
      <p
        style={{
          margin: 0,
          fontSize: 13,
          fontWeight: 700,
          color: "#f1f5f9",
          lineHeight: 1.42,
        }}
      >
        {text}
      </p>
    </div>
  );
}

function FooterBlock() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: L.footerTop,
          left: FLYER_PAD_X,
          right: FLYER_PAD_X,
          height: 1,
          background: `linear-gradient(to right, transparent, rgba(56,189,248,0.4) 50%, transparent)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: L.footerTop + FLYER_SPACE.md,
          left: 0,
          right: 0,
          textAlign: "center",
          padding: `0 ${FLYER_PAD_X}px`,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 12.5,
            fontWeight: 800,
            color: "#e2e8f0",
            letterSpacing: "0.1em",
            lineHeight: 1.25,
            textTransform: "uppercase",
          }}
        >
          Digital Assets by EKD Digital
        </p>
        <p
          style={{
            margin: `3px 0 0`,
            fontSize: 11,
            fontWeight: 700,
            color: "#94a3b8",
            lineHeight: 1.25,
          }}
        >
          support@ekddigital.com
        </p>
        <div
          style={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            padding: "10px 14px",
            border: `1px solid rgba(56,189,248,0.42)`,
            borderRadius: 8,
            background: "rgba(15,40,71,0.6)",
          }}
        >
          <FooterContactLine
            icon="📞"
            label="WhatsApp"
            value={CONTACT_PHONE}
          />
          <FooterContactLine icon="💬" label="WeChat" value={CONTACT_WECHAT} />
        </div>
      </div>
    </>
  );
}

function FooterContactLine({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <span style={{ fontSize: 14, lineHeight: 1, flexShrink: 0 }}>{icon}</span>
      <p style={{ margin: 0, lineHeight: 1.2 }}>
        <span
          style={{
            fontSize: 9,
            fontWeight: 800,
            color: ASSETS_CYAN,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <span
          style={{
            marginLeft: 6,
            fontSize: 13,
            fontWeight: 800,
            color: "#f8fafc",
            letterSpacing: "0.02em",
          }}
        >
          {value}
        </span>
      </p>
    </div>
  );
}

function FlyerBlock({
  top,
  minHeight,
  padding = `${FLYER_SPACE.sm}px ${FLYER_PAD_X}px 0`,
  style,
  children,
}: {
  top: number;
  minHeight: number;
  padding?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 0,
        right: 0,
        minHeight,
        padding,
        zIndex: 2,
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
