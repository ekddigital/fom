"use client";

import type { CSSProperties, ReactNode } from "react";
import { EKDDigitalFlyerShell } from "@/components/jicf/ekddigital-flyer-shell";
import {
  DIGITAL_ASSETS_PROMO_LAYOUT,
  FLYER_PAD_X,
  FLYER_SPACE,
  PROMO_FLYER_CONTENT,
  PROMO_FLYER_FOOTER,
  flyerBulletRowStyle,
} from "@/components/jicf/ekddigital-flyer-spacing";
import {
  FLYER_PORTRAIT_H,
  FLYER_PORTRAIT_W,
  DIGITAL_ASSETS_PRODUCT_BRAND,
  DIGITAL_ASSETS_WEBSITE,
} from "@/components/jicf/ekddigital-flyer-theme";
import { EKDDigitalAssetsFlyerDecorations } from "@/components/jicf/ekd-digital-assets-flyer-decorations";

/** Digital Assets brand palette — matches EKDSend / EKD Digital gold */
const ASSETS_GOLD = "#C8A061";
const ASSETS_GOLD_LIGHT = "#E8C589";
const ASSETS_BG = "#1F1C18";
const ASSETS_BG_MID = "#2A2520";

const L = DIGITAL_ASSETS_PROMO_LAYOUT;
const C = PROMO_FLYER_CONTENT;
const F = PROMO_FLYER_FOOTER;

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
const CTA_URL = DIGITAL_ASSETS_WEBSITE;
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
          background: `radial-gradient(circle, rgba(200,160,97,0.14) 0%, transparent 70%)`,
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
          background: `radial-gradient(circle, rgba(200,160,97,0.08) 0%, transparent 70%)`,
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
          background: `linear-gradient(to right, transparent, ${ASSETS_GOLD} 35%, ${ASSETS_GOLD_LIGHT} 65%, transparent)`,
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
          background: "rgba(31,28,24,0.98)",
          borderBottom: `2px solid ${ASSETS_GOLD}`,
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
            border: `1.5px solid rgba(200,160,97,0.55)`,
            boxShadow: "0 0 12px rgba(200,160,97,0.2)",
            background: ASSETS_BG,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={DIGITAL_ASSETS_PRODUCT_BRAND.logoSrc}
            alt={DIGITAL_ASSETS_PRODUCT_BRAND.logoAlt}
            crossOrigin="anonymous"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
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
            Digital
            <span style={{ color: ASSETS_GOLD }}>
              {DIGITAL_ASSETS_PRODUCT_BRAND.brandAccent}
            </span>
          </p>
          <p
            style={{
              margin: "2px 0 0",
              fontSize: 9,
              fontWeight: 700,
              color: "#a8a29e",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            by EKD Digital
          </p>
        </div>
        <div
          style={{
            border: `1px solid rgba(200,160,97,0.45)`,
            borderRadius: 20,
            padding: "4px 11px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 8,
              color: ASSETS_GOLD_LIGHT,
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
          background: `linear-gradient(to right, transparent, ${ASSETS_GOLD} 25%, ${ASSETS_GOLD_LIGHT} 50%, ${ASSETS_GOLD} 75%, transparent)`,
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
            "linear-gradient(to bottom, rgba(31,28,24,0.15) 0%, rgba(31,28,24,0.05) 35%, rgba(31,28,24,0.75) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(to right, transparent, ${ASSETS_GOLD} 20%, ${ASSETS_GOLD_LIGHT} 50%, ${ASSETS_GOLD} 80%, transparent)`,
        }}
      />
    </FlyerBlock>
  );
}

function ContentBlock() {
  return (
    <FlyerBlock
      top={L.contentTop}
      minHeight={L.contentMinHeight}
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
            margin: `${C.subheadMarginTop}px 0 0`,
            fontSize: 14,
            fontWeight: 700,
            color: "#f3f2f0",
            lineHeight: 1.44,
            maxWidth: 420,
          }}
        >
          {SUBHEADLINE}
        </p>

        <div style={{ marginTop: C.bulletsMarginTop }}>
          {BULLETS.map((text) => (
            <Bullet key={text} text={text} />
          ))}
        </div>

        <div style={{ marginTop: C.ctaMarginTop }}>
          <div
            style={{
              background: `linear-gradient(135deg, ${ASSETS_GOLD_LIGHT} 0%, ${ASSETS_GOLD} 100%)`,
              padding: "10px 24px",
              textAlign: "center",
              boxShadow: "0 4px 18px rgba(200,160,97,0.35)",
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
              margin: `${C.ctaUrlMarginTop}px 0 0`,
              fontSize: 13,
              fontWeight: 800,
              color: ASSETS_GOLD_LIGHT,
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
    <div style={{ ...flyerBulletRowStyle, marginBottom: C.bulletMarginBottom }}>
      <span
        style={{
          color: ASSETS_GOLD,
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
          color: "#fafaf9",
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
          top: F.top,
          left: FLYER_PAD_X,
          right: FLYER_PAD_X,
          height: 1,
          background: `linear-gradient(to right, transparent, rgba(200,160,97,0.4) 50%, transparent)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: F.top + F.ruleToTitleGap,
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
            color: "#f3f2f0",
            letterSpacing: "0.1em",
            lineHeight: 1.25,
            textTransform: "uppercase",
          }}
        >
          Digital Assets by EKD Digital
        </p>
        <p
          style={{
            margin: `${F.titleToEmailGap}px 0 0`,
            fontSize: 11,
            fontWeight: 700,
            color: "#c9c6c2",
            lineHeight: 1.25,
          }}
        >
          support@ekddigital.com
        </p>
        <div
          style={{
            marginTop: F.contactStripMarginTop,
            display: "flex",
            flexDirection: "column",
            gap: F.contactStripGap,
            padding: F.contactStripPadding,
            border: `1px solid rgba(200,160,97,0.42)`,
            borderRadius: 8,
            background: "rgba(42,37,32,0.6)",
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
            color: ASSETS_GOLD,
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
            color: "#fafaf9",
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
