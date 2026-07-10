"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  FlyerBackground,
  FlyerContactFooter,
  FlyerHeader,
  flyerCanvasStyle,
} from "@/components/jicf/ekddigital-flyer-chrome";
import { EKDDigitalFlyerShell } from "@/components/jicf/ekddigital-flyer-shell";
import type {
  PricingFlyerVariant,
  PricingTier,
  ServicePricingFlyerConfig,
} from "@/components/jicf/ekddigital-pricing-data";
import {
  FlyerChevronCluster,
  FlyerCircuitAccent,
  FlyerGradientWord,
  FlyerPillImageClip,
  FlyerSectionRule,
} from "@/components/jicf/ekddigital-flyer-motifs";
import {
  FLYER_PAD_X,
  FLYER_SPACE,
  PRICING_FLYER_LAYOUT,
  flyerBulletRowStyle,
  flyerSectionLabelStyle,
} from "@/components/jicf/ekddigital-flyer-spacing";
import {
  GOLD,
  GOLD_LIGHT,
  GOLD_PALE,
} from "@/components/jicf/ekddigital-flyer-theme";

const L = PRICING_FLYER_LAYOUT;

type EKDDigitalServicePricingFlyerProps = {
  config: ServicePricingFlyerConfig;
};

export function EKDDigitalServicePricingFlyer({
  config,
}: EKDDigitalServicePricingFlyerProps) {
  return (
    <EKDDigitalFlyerShell downloadFilename={config.downloadFilename}>
      <PricingFlyerCanvas config={config} />
    </EKDDigitalFlyerShell>
  );
}

function PricingFlyerCanvas({ config }: EKDDigitalServicePricingFlyerProps) {
  const tierCount = config.tiers.length;
  const gridCols =
    tierCount <= 4
      ? `repeat(${tierCount}, minmax(0, 1fr))`
      : "repeat(5, minmax(0, 1fr))";

  const headlineParts = config.heroHeadline.trim().split(/\s+/);
  const accent = headlineParts.pop() ?? "";
  const lead = headlineParts.join(" ");

  return (
    <div style={flyerCanvasStyle}>
      <FlyerBackground watermark={config.watermark} />
      <FlyerHeader
        tagline="Build · Host · Scale"
        websiteUrl={config.productUrl}
        brand={config.brand}
      />

      <PricingHero config={config} lead={lead} accent={accent} />

      <IntroBand config={config} />

      <BulletsBand bullets={config.bullets} variant={config.variant} />

      <PricingTiersSection
        title={config.title}
        sectionLabel={config.sectionLabel}
        tiers={config.tiers}
        footnote={config.footnote}
        gridCols={gridCols}
        variant={config.variant}
      />

      <FlyerContactFooter
        top={L.footerTop}
        compact
        ctaHeadline={config.ctaHeadline ?? "GET STARTED →"}
        websiteUrl={config.productUrl}
      />
    </div>
  );
}

function PricingHero({
  config,
  lead,
  accent,
}: {
  config: ServicePricingFlyerConfig;
  lead: string;
  accent: string;
}) {
  const variant = config.variant;

  if (variant === "hosting") {
    return (
      <FlyerBlock
        top={L.heroTop}
        minHeight={L.heroHeight}
        style={{ overflow: "hidden", borderBottom: "1px solid rgba(200,160,97,0.2)" }}
      >
        <FlyerPillImageClip accentColor={GOLD}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mobile-desk-web.png"
            alt=""
            crossOrigin="anonymous"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        </FlyerPillImageClip>
        <HeroOverlay gradient="rgba(31,28,24,0.55) 0%, rgba(31,28,24,0.88) 100%" />
        <HeroLabel text={config.heroLabel} position="bottom-left" />
        <HeroHeadlineBox lead={lead} accent={accent} subline={config.heroSubline} borderColor={GOLD} />
      </FlyerBlock>
    );
  }

  if (variant === "assets") {
    return (
      <FlyerBlock top={L.heroTop} minHeight={L.heroHeight} style={{ overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(120deg, rgba(200,160,97,0.22) 0%, rgba(31,28,24,0.95) 55%)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={config.brand?.logoSrc ?? "/assets_logo.svg"}
          alt=""
          crossOrigin="anonymous"
          aria-hidden
          style={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            width: 118,
            height: 118,
            opacity: 0.42,
            objectFit: "contain",
            pointerEvents: "none",
          }}
        />
        <HeroLabel text={config.heroLabel} position="top-left" />
        <HeroHeadlineBox
          lead={lead}
          accent={accent}
          subline={config.heroSubline}
          borderColor={GOLD}
          align="left"
          offsetLeft={FLYER_PAD_X}
        />
        <FlyerChevronCluster
          style={{ position: "absolute", right: FLYER_SPACE.lg, bottom: FLYER_SPACE.lg }}
        />
      </FlyerBlock>
    );
  }

  if (variant === "ssl") {
    return (
      <FlyerBlock top={L.heroTop} minHeight={L.heroHeight}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, rgba(31,28,24,0.4) 0%, rgba(31,28,24,0.96) 100%)`,
            borderBottom: `2px solid ${GOLD}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: FLYER_PAD_X,
            top: 0,
            bottom: 0,
            width: 4,
            background: `linear-gradient(to bottom, ${GOLD}, ${GOLD_LIGHT})`,
            borderRadius: 2,
          }}
        />
        <HeroLabel text={config.heroLabel} position="top-left" indent />
        <HeroHeadlineBox
          lead={lead}
          accent={accent}
          subline={config.heroSubline}
          borderColor={GOLD}
          align="left"
          offsetLeft={FLYER_PAD_X + 12}
        />
      </FlyerBlock>
    );
  }

  if (variant === "comms") {
    return (
      <FlyerBlock top={L.heroTop} minHeight={L.heroHeight}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(200,160,97,0.18) 0%, rgba(31,28,24,0.96) 50%, rgba(200,160,97,0.12) 100%)",
            borderBottom: "1px solid rgba(200,160,97,0.35)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={config.brand?.logoSrc ?? "/ekdsend_logo.svg"}
          alt=""
          crossOrigin="anonymous"
          aria-hidden
          style={{
            position: "absolute",
            right: 20,
            top: "50%",
            transform: "translateY(-50%)",
            width: 108,
            height: 108,
            opacity: 0.38,
            objectFit: "contain",
            pointerEvents: "none",
          }}
        />
        <HeroLabel text={config.heroLabel} position="top-left" />
        <FlyerChevronCluster
          style={{ position: "absolute", right: FLYER_SPACE.lg, top: "42%", marginTop: -11 }}
        />
        <HeroHeadlineBox
          lead={lead}
          accent={accent}
          subline={config.heroSubline}
          borderColor={GOLD_LIGHT}
          compact
        />
      </FlyerBlock>
    );
  }

  // email — compact cyan API hero
  return (
    <FlyerBlock top={L.heroTop} minHeight={L.heroHeight}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(160deg, rgba(200,160,97,0.14) 0%, rgba(31,28,24,0.97) 60%)",
          borderBottom: `1px solid rgba(200,160,97,0.4)`,
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={config.brand?.logoSrc ?? "/ekdsend_logo.svg"}
        alt=""
        crossOrigin="anonymous"
        aria-hidden
        style={{
          position: "absolute",
          right: 20,
          top: "50%",
          transform: "translateY(-50%)",
          width: 108,
          height: 108,
          opacity: 0.36,
          objectFit: "contain",
          pointerEvents: "none",
        }}
      />
      <HeroLabel text={config.heroLabel} position="top-left" />
      <FlyerCircuitAccent
        style={{ position: "absolute", right: FLYER_SPACE.lg, top: FLYER_SPACE.lg }}
        opacity={0.5}
      />
      <HeroHeadlineBox
        lead={lead}
        accent={accent}
        subline={config.heroSubline}
        borderColor={GOLD_LIGHT}
        compact
      />
    </FlyerBlock>
  );
}

function HeroOverlay({ gradient }: { gradient: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(to bottom, ${gradient})`,
      }}
    />
  );
}

function HeroLabel({
  text,
  position,
  indent,
}: {
  text: string;
  position: "top-left" | "bottom-left";
  indent?: boolean;
}) {
  const isBottom = position === "bottom-left";
  return (
    <div
      style={{
        position: "absolute",
        ...(isBottom
          ? { bottom: FLYER_SPACE.md, left: FLYER_PAD_X + (indent ? 12 : 0) }
          : { top: FLYER_SPACE.md, left: FLYER_PAD_X + (indent ? 12 : 0) }),
        display: "flex",
        alignItems: "center",
        gap: FLYER_SPACE.sm,
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
        {text}
      </p>
      {!isBottom ? <FlyerCircuitAccent opacity={0.45} /> : null}
    </div>
  );
}

function HeroHeadlineBox({
  lead,
  accent,
  subline,
  borderColor = GOLD_LIGHT,
  align = "center",
  offsetLeft,
  compact,
}: {
  lead: string;
  accent: string;
  subline: string;
  borderColor?: string;
  align?: "center" | "left";
  offsetLeft?: number;
  compact?: boolean;
}) {
  const box = (
    <div
      style={{
        background: "rgba(31,28,24,0.82)",
        border: `1.5px solid ${borderColor}`,
        borderRadius: compact ? 10 : 12,
        padding: compact ? `${FLYER_SPACE.md}px ${FLYER_SPACE.lg}px` : `${FLYER_SPACE.md}px 22px`,
        textAlign: align,
        boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
        maxWidth: align === "left" ? 320 : undefined,
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: compact ? 18 : 20,
          fontWeight: 900,
          color: "#ffffff",
          lineHeight: 1.1,
          letterSpacing: "0.02em",
          textTransform: "uppercase",
        }}
      >
        {lead ? `${lead} ` : null}
        <FlyerGradientWord>{accent}</FlyerGradientWord>
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
        {subline}
      </p>
    </div>
  );

  if (align === "left" && offsetLeft != null) {
    return (
      <div
        style={{
          position: "absolute",
          left: offsetLeft,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
        }}
      >
        {box}
      </div>
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 3,
      }}
    >
      {box}
    </div>
  );
}

function IntroBand({ config }: { config: ServicePricingFlyerConfig }) {
  return (
    <FlyerBlock
      top={L.introTop}
      minHeight={L.introHeight}
      padding={`${FLYER_SPACE.sm}px ${FLYER_PAD_X}px 0`}
    >
      <p
        style={{
          margin: 0,
          fontSize: 10.5,
          fontWeight: 700,
          color: "#f1f5f9",
          textAlign: "left",
          lineHeight: 1.35,
        }}
      >
        <span style={{ color: GOLD_LIGHT, fontWeight: 800 }}>{config.title}</span>{" "}
        — {config.tagline}
      </p>
    </FlyerBlock>
  );
}

function BulletsBand({
  bullets,
  variant,
}: {
  bullets: readonly string[];
  variant: PricingFlyerVariant;
}) {
  const bulletColor = variant === "ssl" ? GOLD_LIGHT : "#f1f5f9";

  return (
    <FlyerBlock
      top={L.bulletsTop}
      minHeight={L.bulletsHeight}
      padding={`0 ${FLYER_PAD_X}px`}
    >
      {variant === "email" ? (
        <p
          style={{
            margin: `0 0 ${FLYER_SPACE.sm}px`,
            fontSize: 8,
            fontWeight: 800,
            color: GOLD_LIGHT,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Why teams choose us
        </p>
      ) : null}
      {bullets.map((point) => (
        <FlyerBullet key={point} text={point} color={bulletColor} />
      ))}
    </FlyerBlock>
  );
}

function FlyerBullet({ text, color }: { text: string; color: string }) {
  return (
    <div style={flyerBulletRowStyle}>
      <span
        style={{
          color: GOLD,
          fontSize: 14,
          fontWeight: 900,
          lineHeight: 1.2,
          flexShrink: 0,
        }}
      >
        ›
      </span>
      <p
        style={{
          margin: 0,
          fontSize: 10.5,
          fontWeight: 600,
          color,
          lineHeight: 1.32,
        }}
      >
        {text}
      </p>
    </div>
  );
}

function PricingTiersSection({
  title,
  sectionLabel,
  tiers,
  footnote,
  gridCols,
  variant,
}: {
  title: string;
  sectionLabel: string;
  tiers: readonly PricingTier[];
  footnote: string;
  gridCols: string;
  variant: PricingFlyerVariant;
}) {
  const tierGap =
    variant === "email" ? FLYER_SPACE.xs : variant === "ssl" ? FLYER_SPACE.md : FLYER_SPACE.sm;

  return (
    <FlyerBlock
      top={L.tiersTop}
      minHeight={L.tiersBlockHeight}
      padding={`${FLYER_SPACE.sm}px ${FLYER_SPACE.lg}px 0`}
    >
      <FlyerSectionRule color="rgba(200,160,97,0.35)" />
      <div style={{ ...flyerSectionLabelStyle, marginTop: FLYER_SPACE.sm }}>
        <p
          style={{
            margin: 0,
            fontSize: 10.5,
            fontWeight: 900,
            color: GOLD_LIGHT,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {title} — {sectionLabel}
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridCols,
          gap: tierGap,
        }}
      >
        {tiers.map((tier) => (
          <PricingTierCard key={tier.name} tier={tier} variant={variant} />
        ))}
      </div>
      <p
        style={{
          margin: `${FLYER_SPACE.md}px 0 0`,
          fontSize: 7.5,
          fontWeight: 600,
          color: "#9ca3af",
          textAlign: "left",
          lineHeight: 1.3,
        }}
      >
        {footnote}
      </p>
    </FlyerBlock>
  );
}

function PricingTierCard({
  tier,
  variant,
}: {
  tier: PricingTier;
  variant: PricingFlyerVariant;
}) {
  const { name, volume, price, highlight, contactOnly } = tier;
  const isSsl = variant === "ssl";

  return (
    <div
      style={{
        background: highlight
          ? isSsl
            ? `linear-gradient(90deg, rgba(168,114,34,0.35) 0%, rgba(200,160,97,0.2) 100%)`
            : "linear-gradient(135deg, rgba(168,114,34,0.35) 0%, rgba(200,160,97,0.28) 100%)"
          : "rgba(255,255,255,0.06)",
        border: highlight
          ? `1.5px solid ${GOLD}`
          : "1px solid rgba(255,255,255,0.12)",
        borderRadius: isSsl ? 6 : 8,
        padding: isSsl ? `${FLYER_SPACE.sm}px ${FLYER_SPACE.md}px` : `${FLYER_SPACE.md}px ${FLYER_SPACE.sm}px`,
        textAlign: isSsl ? "left" : "center",
        boxSizing: "border-box",
        minHeight: isSsl ? 52 : 76,
        display: isSsl ? "flex" : "block",
        alignItems: isSsl ? "center" : undefined,
        justifyContent: isSsl ? "space-between" : undefined,
        gap: isSsl ? FLYER_SPACE.md : undefined,
      }}
    >
      <div style={isSsl ? { flex: 1 } : undefined}>
        {highlight && !isSsl ? (
          <p
            style={{
              margin: `0 0 ${FLYER_SPACE.xs}px`,
              fontSize: 6.5,
              fontWeight: 900,
              color: GOLD_PALE,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Popular
          </p>
        ) : null}
        <p
          style={{
            margin: 0,
            fontSize: 9,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
          }}
        >
          {name}
          {highlight && isSsl ? (
            <span
              style={{
                marginLeft: 6,
                fontSize: 6.5,
                color: GOLD_PALE,
                letterSpacing: "0.06em",
              }}
            >
              POPULAR
            </span>
          ) : null}
        </p>
        {!isSsl ? (
          <p
            style={{
              margin: `${FLYER_SPACE.xs}px 0 0`,
              fontSize: 7,
              fontWeight: 600,
              color: "#c4c9d4",
              lineHeight: 1.2,
            }}
          >
            {volume}
          </p>
        ) : null}
      </div>
      <div style={isSsl ? { textAlign: "right", flexShrink: 0 } : undefined}>
        <p
          style={{
            margin: 0,
            fontSize: contactOnly ? 11 : isSsl ? 13 : 14,
            fontWeight: 900,
            color: highlight ? GOLD_LIGHT : "#ffffff",
            lineHeight: 1,
          }}
        >
          {price}
        </p>
        {isSsl ? (
          <p
            style={{
              margin: `${FLYER_SPACE.xs}px 0 0`,
              fontSize: 7,
              fontWeight: 600,
              color: "#c4c9d4",
            }}
          >
            {volume}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function FlyerBlock({
  top,
  minHeight,
  bottom,
  padding = `${FLYER_SPACE.sm}px ${FLYER_PAD_X}px 0`,
  style,
  children,
}: {
  top: number;
  minHeight?: number;
  bottom?: number;
  padding?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        ...(bottom != null ? { bottom } : {}),
        ...(minHeight != null ? { minHeight } : {}),
        left: 0,
        right: 0,
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
