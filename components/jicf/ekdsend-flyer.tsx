"use client";

import type { CSSProperties, ReactNode } from "react";
import { EKDDigitalFlyerShell } from "@/components/jicf/ekddigital-flyer-shell";
import {
  EKDSEND_PROMO_LAYOUT,
  FLYER_PAD_X,
  FLYER_SPACE,
  flyerBulletRowStyle,
} from "@/components/jicf/ekddigital-flyer-spacing";
import {
  FLYER_PORTRAIT_H,
  FLYER_PORTRAIT_W,
} from "@/components/jicf/ekddigital-flyer-theme";
import {
  EKDSendFlyerBackgroundDecorations,
  EKDSendFlyerContentDecorations,
  EKDSendFlyerHeroDecorations,
} from "@/components/jicf/ekdsend-flyer-decorations";

/** EKDSend product brand palette (from mail/docs/ekdsend-flyer-copy.txt) */
const EKDSEND_GOLD = "#C8A061";
const EKDSEND_GOLD_LIGHT = "#E8C589";
const EKDSEND_BG = "#1F1C18";
const EKDSEND_BG_MID = "#2A2520";

const L = EKDSEND_PROMO_LAYOUT;

const HEADLINE = "COMMUNICATIONS THAT DELIVER.";
const SUBHEADLINE =
  "Transactional email and business mailboxes — built for reliability, security, and control.";
const BULLETS = [
  "Transactional email API for apps & businesses",
  "Mailboxes and storage on your own domains",
  "Custom domains with SPF, DKIM, and DMARC verification",
  "Free tier — 100 emails/month, no card needed",
] as const;
const CTA_LABEL = "Get started free →";
const CTA_URL = "es.ekddigital.com";
const CONTACT_PHONE = "+86 185 0683 2159";
const CONTACT_WECHAT = "EKD231777285010";

const canvasStyle = {
  position: "relative" as const,
  width: FLYER_PORTRAIT_W,
  height: FLYER_PORTRAIT_H,
  overflow: "hidden" as const,
  fontFamily: "'Arial', 'Helvetica Neue', sans-serif",
  background: EKDSEND_BG,
};

export const EKDSEND_PROMO_ROUTE = "/jicf/ekddigital/ekdsend";

export function EKDSendFlyerShell() {
  return (
    <EKDDigitalFlyerShell
      downloadFilename="ekdsend-promo-flyer.png"
      exportBackgroundColor={EKDSEND_BG}
    >
      <EKDSendPromoCanvas />
    </EKDDigitalFlyerShell>
  );
}

function EKDSendPromoCanvas() {
  return (
    <div style={canvasStyle}>
      <BackgroundLayers />
      <EKDSendHeader />
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
          background: `linear-gradient(165deg, ${EKDSEND_BG} 0%, ${EKDSEND_BG_MID} 42%, ${EKDSEND_BG} 100%)`,
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
      <EKDSendFlyerBackgroundDecorations />
    </>
  );
}

function EKDSendHeader() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(to right, transparent, ${EKDSEND_GOLD} 35%, ${EKDSEND_GOLD_LIGHT} 65%, transparent)`,
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
          borderBottom: `2px solid ${EKDSEND_GOLD}`,
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
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ekdsend_logo.svg"
            alt="EKDSend"
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
              fontSize: 22,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            EKD<span style={{ color: EKDSEND_GOLD }}>Send</span>
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
              fontSize: 8.5,
              color: EKDSEND_GOLD_LIGHT,
              fontWeight: 800,
              letterSpacing: "0.04em",
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
          background: `linear-gradient(to right, transparent, ${EKDSEND_GOLD} 25%, ${EKDSEND_GOLD_LIGHT} 50%, ${EKDSEND_GOLD} 75%, transparent)`,
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
        src="/ekd/EKDSend.png"
        alt="Professional using EKDSend on laptop"
        crossOrigin="anonymous"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 35%",
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
      <EKDSendFlyerHeroDecorations />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(to right, transparent, ${EKDSEND_GOLD} 20%, ${EKDSEND_GOLD_LIGHT} 50%, ${EKDSEND_GOLD} 80%, transparent)`,
        }}
      />
    </FlyerBlock>
  );
}

function ContentBlock() {
  return (
    <FlyerBlock top={L.contentTop} minHeight={368} padding={`0 ${FLYER_PAD_X}px`}>
      <EKDSendFlyerContentDecorations />
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
          textShadow: "0 1px 3px rgba(0,0,0,0.25)",
        }}
      >
        {HEADLINE}
      </h2>

      <p
        style={{
          margin: `${FLYER_SPACE.lg}px 0 0`,
          fontSize: 14,
          fontWeight: 700,
          color: "#f3f2f0",
          lineHeight: 1.44,
          maxWidth: 420,
        }}
      >
        {SUBHEADLINE}
      </p>

      <div style={{ marginTop: FLYER_SPACE.lg + 4 }}>
        {BULLETS.map((text) => (
          <Bullet key={text} text={text} />
        ))}
      </div>

      <div style={{ marginTop: FLYER_SPACE.lg + 2 }}>
        <div
          style={{
            background: `linear-gradient(135deg, ${EKDSEND_GOLD_LIGHT} 0%, ${EKDSEND_GOLD} 100%)`,
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
              color: EKDSEND_BG,
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
            color: EKDSEND_GOLD_LIGHT,
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
    <div style={{ ...flyerBulletRowStyle, marginBottom: FLYER_SPACE.lg }}>
      <span
        style={{
          color: EKDSEND_GOLD,
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
          top: L.footerTop,
          left: FLYER_PAD_X,
          right: FLYER_PAD_X,
          height: 1,
          background: `linear-gradient(to right, transparent, rgba(200,160,97,0.4) 50%, transparent)`,
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
            color: "#e7e5e4",
            letterSpacing: "0.1em",
            lineHeight: 1.25,
            textTransform: "uppercase",
          }}
        >
          EKDSend by EKD Digital
        </p>
        <p
          style={{
            margin: `3px 0 0`,
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
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            padding: "10px 14px",
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
            color: EKDSEND_GOLD,
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
