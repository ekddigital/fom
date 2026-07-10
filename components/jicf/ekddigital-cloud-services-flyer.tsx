"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  FlyerBackground,
  FlyerContactFooter,
  FlyerHeader,
  flyerCanvasStyle,
} from "@/components/jicf/ekddigital-flyer-chrome";
import { EKDDigitalFlyerShell } from "@/components/jicf/ekddigital-flyer-shell";
import {
  DIGITAL_ASSETS_WEBSITE,
  EKD_DIGITAL_WEBSITE,
  EKDSEND_WEBSITE,
} from "@/components/jicf/ekddigital-flyer-theme";
import {
  FlyerChevronCluster,
  FlyerCircuitAccent,
  FlyerGradientWord,
  FlyerPillImageClip,
  FlyerSectionRule,
} from "@/components/jicf/ekddigital-flyer-motifs";
import {
  CLOUD_FLYER_LAYOUT,
  FLYER_PAD_X,
  FLYER_SPACE,
  flyerBulletRowStyle,
  flyerSectionLabelStyle,
} from "@/components/jicf/ekddigital-flyer-spacing";
import { GOLD, GOLD_LIGHT } from "@/components/jicf/ekddigital-flyer-theme";

const L = CLOUD_FLYER_LAYOUT;

const SERVICES = [
  {
    icon: "💻",
    title: "Custom Software",
    subtitle: "Web · Mobile · APIs",
    description: "Full-stack apps, integrations, and technical delivery.",
    cta: "CONTACT US →",
    pricingSlug: null as string | null,
    productUrl: EKD_DIGITAL_WEBSITE,
    highlight: true,
  },
  {
    icon: "📨",
    title: "EKDSend",
    subtitle: "Email · SMS · Voice",
    description: "Unified communications APIs for product teams.",
    cta: "VIEW PRICING →",
    pricingSlug: "ekdsend",
    productUrl: EKDSEND_WEBSITE,
    highlight: true,
  },
  {
    icon: "🗂️",
    title: "Digital Assets",
    subtitle: "DAM · CDN hosting",
    description: "Store, transform, and deliver media globally.",
    cta: "VIEW PRICING →",
    pricingSlug: "digital-assets",
    productUrl: DIGITAL_ASSETS_WEBSITE,
    highlight: false,
  },
  {
    icon: "🔒",
    title: "SSL Certificates",
    subtitle: "Site protection",
    description: "DV, wildcard, and enterprise certificate management.",
    cta: "VIEW PRICING →",
    pricingSlug: "ssl",
    productUrl: EKD_DIGITAL_WEBSITE,
    highlight: false,
  },
  {
    icon: "✉️",
    title: "Transactional Email",
    subtitle: "API delivery at scale",
    description: "Developer-first email API with analytics & webhooks.",
    cta: "VIEW PRICING →",
    pricingSlug: "transactional-email",
    productUrl: EKDSEND_WEBSITE,
    highlight: false,
  },
  {
    icon: "☁️",
    title: "Cloud Hosting",
    subtitle: "Apps · databases · CDN",
    description: "Managed hosting with monitoring and expert ops.",
    cta: "VIEW PRICING →",
    pricingSlug: "hosting",
    productUrl: EKD_DIGITAL_WEBSITE,
    highlight: false,
  },
] as const;

const PAIN_POINTS = [
  "Need reliable email, SMS or voice APIs for your product?",
  "Looking for secure asset storage with global CDN delivery?",
  "Want cloud hosting that scales with your web application?",
  "Need SSL protection and expert software builds—not DIY guesswork?",
] as const;

export function EKDDigitalCloudServicesFlyerShell() {
  return (
    <EKDDigitalFlyerShell downloadFilename="ekddigital-cloud-services-flyer.png">
      <CloudServicesOverviewCanvas />
    </EKDDigitalFlyerShell>
  );
}

function CloudServicesOverviewCanvas() {
  return (
    <div style={flyerCanvasStyle}>
      <FlyerBackground watermark="☁" />
      <FlyerHeader tagline="Build · Host · Scale" />
      <HeroStrip />
      <TaglineBand />
      <PainPointsSection />
      <SectionDivider top={L.servicesTop - FLYER_SPACE.md} />
      <ServicesGrid />
      <FlyerContactFooter
        top={L.footerTop}
        ctaHeadline="GET YOUR FREE CONSULTATION →"
        ctaSubline="Kingdom workers · Kingdom solutions — our DNA"
      />
    </div>
  );
}

function HeroStrip() {
  return (
    <FlyerBlock
      top={L.heroTop}
      minHeight={L.heroHeight}
      style={{ overflow: "hidden" }}
    >
      <FlyerPillImageClip>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/mobile-desk-web.png"
          alt="Software and cloud development"
          crossOrigin="anonymous"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 40%",
            display: "block",
          }}
        />
      </FlyerPillImageClip>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(31,28,24,0.35) 0%, rgba(31,28,24,0.15) 40%, rgba(31,28,24,0.82) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: FLYER_SPACE.md,
          left: FLYER_SPACE.md,
          display: "flex",
          alignItems: "center",
          gap: 6,
          borderLeft: `3px solid ${GOLD}`,
          paddingLeft: FLYER_SPACE.sm,
          zIndex: 3,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 9,
            fontWeight: 800,
            color: GOLD_LIGHT,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
          }}
        >
          Software · Cloud · Communications
        </p>
        <FlyerCircuitAccent opacity={0.4} style={{ marginLeft: 4 }} />
      </div>
      <FlyerChevronCluster
        style={{
          position: "absolute",
          right: FLYER_SPACE.md,
          bottom: FLYER_SPACE.lg,
          zIndex: 4,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            background: "rgba(31,28,24,0.78)",
            border: "1.5px solid rgba(200,160,97,0.68)",
            borderRadius: 10,
            padding: `${FLYER_SPACE.md}px ${FLYER_SPACE.xl}px`,
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            }}
          >
            WE BUILD. <FlyerGradientWord>WE HOST.</FlyerGradientWord>
          </p>
          <p
            style={{
              margin: `${FLYER_SPACE.xs}px 0 0`,
              fontSize: 8,
              fontWeight: 700,
              color: GOLD_LIGHT,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Software of All Kinds · Cloud at Scale
          </p>
        </div>
      </div>
    </FlyerBlock>
  );
}

function TaglineBand() {
  return (
    <FlyerBlock
      top={L.taglineTop}
      minHeight={L.taglineHeight}
      padding={`${FLYER_SPACE.sm}px ${FLYER_PAD_X}px 0`}
    >
      <p
        style={{
          margin: 0,
          fontSize: 10.5,
          fontWeight: 700,
          color: "#f1f5f9",
          textAlign: "center",
          lineHeight: 1.35,
        }}
      >
        <span style={{ color: GOLD_LIGHT, fontWeight: 800 }}>EKD Digital</span>{" "}
        builds custom software and runs the cloud platforms your business depends
        on—from APIs to hosting.
      </p>
    </FlyerBlock>
  );
}

function PainPointsSection() {
  return (
    <FlyerBlock
      top={L.painTop}
      minHeight={L.painMinHeight}
      padding={`${FLYER_SPACE.sm}px ${FLYER_PAD_X}px ${FLYER_SPACE.md}px`}
    >
      <SectionLabel>Sound Familiar?</SectionLabel>
      {PAIN_POINTS.map((point) => (
        <Bullet key={point} text={point} />
      ))}
    </FlyerBlock>
  );
}

function ServicesGrid() {
  return (
    <FlyerBlock
      top={L.servicesTop}
      minHeight={L.servicesMinHeight}
      padding={`${FLYER_SPACE.sm}px ${FLYER_SPACE.lg}px`}
    >
      <p
        style={{
          margin: `0 0 ${FLYER_SPACE.md}px`,
          fontSize: 11,
          fontWeight: 800,
          color: "#ffffff",
        }}
      >
        <span style={{ color: GOLD_LIGHT }}>Our services</span> — overview
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          columnGap: FLYER_SPACE.sm,
          rowGap: FLYER_SPACE.sm,
        }}
      >
        {SERVICES.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
      <p
        style={{
          margin: `${FLYER_SPACE.md}px 0 0`,
          fontSize: 7.5,
          fontWeight: 600,
          color: "#9ca3af",
          textAlign: "center",
          lineHeight: 1.25,
        }}
      >
        Detailed pricing on individual flyers · Custom software — contact us
      </p>
    </FlyerBlock>
  );
}

type Service = (typeof SERVICES)[number];

function ServiceCard({ service }: { service: Service }) {
  const pathHint = service.productUrl;

  return (
    <div
      style={{
        background: service.highlight
          ? "rgba(200,160,97,0.18)"
          : "rgba(255,255,255,0.07)",
        border: service.highlight
          ? "1px solid rgba(200,160,97,0.55)"
          : "1px solid rgba(255,255,255,0.13)",
        borderRadius: 8,
        padding: `${FLYER_SPACE.sm}px ${FLYER_SPACE.sm}px`,
        boxSizing: "border-box",
        minHeight: 74,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p style={{ margin: 0, fontSize: 12, lineHeight: 1 }} aria-hidden>
        {service.icon}
      </p>
      <p
        style={{
          margin: `${FLYER_SPACE.xs}px 0 0`,
          fontSize: 9.5,
          fontWeight: 800,
          color: "#ffffff",
          lineHeight: 1.15,
        }}
      >
        {service.title}
      </p>
      <p
        style={{
          margin: "1px 0 0",
          fontSize: 7.5,
          fontWeight: 600,
          color: "#c4c9d4",
        }}
      >
        {service.subtitle}
      </p>
      <p
        style={{
          margin: `${FLYER_SPACE.xs}px 0 0`,
          fontSize: 7.2,
          fontWeight: 600,
          color: "#e2e8f0",
          lineHeight: 1.25,
          flex: 1,
        }}
      >
        {service.description}
      </p>
      <p
        style={{
          margin: `${FLYER_SPACE.xs}px 0 0`,
          fontSize: 7,
          fontWeight: 800,
          color: GOLD_LIGHT,
          letterSpacing: "0.06em",
        }}
      >
        {service.cta}
      </p>
      <p
        style={{
          margin: "1px 0 0",
          fontSize: 6.2,
          fontWeight: 600,
          color: "#6b7280",
          lineHeight: 1.2,
        }}
      >
        {pathHint}
      </p>
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div style={flyerSectionLabelStyle}>
      <p
        style={{
          margin: 0,
          fontSize: 11,
          fontWeight: 900,
          color: GOLD_LIGHT,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
        }}
      >
        {children}
      </p>
    </div>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <div style={flyerBulletRowStyle}>
      <span style={{ color: GOLD, fontSize: 14, fontWeight: 900, flexShrink: 0 }}>
        ›
      </span>
      <p
        style={{
          margin: 0,
          fontSize: 10.5,
          fontWeight: 600,
          color: "#f1f5f9",
          lineHeight: 1.32,
        }}
      >
        {text}
      </p>
    </div>
  );
}

function SectionDivider({ top }: { top: number }) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: FLYER_PAD_X,
        right: FLYER_PAD_X,
        zIndex: 2,
      }}
    >
      <FlyerSectionRule color="rgba(200,160,97,0.35)" />
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
