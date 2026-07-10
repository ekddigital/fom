import {
  FlyerCircuitAccent,
  FlyerContactGrid,
  FlyerMeshConstellation,
  FlyerSlantedCta,
} from "@/components/jicf/ekddigital-flyer-motifs";
import {
  FLYER_PAD_X,
  FLYER_SPACE,
  PRICING_FLYER_FOOTER,
} from "@/components/jicf/ekddigital-flyer-spacing";
import {
  BG_DARK,
  BG_MID,
  EKD_DIGITAL_WEBSITE,
  FLYER_PORTRAIT_H,
  FLYER_PORTRAIT_W,
  GOLD,
  GOLD_LIGHT,
  GOLD_PALE,
  PARENT_COMPANY_NAME,
  PARENT_COMPANY_URL,
  PARENT_COMPANY_WEBSITE_LABEL,
  contactRowsWithWebsite,
  type FlyerContactRow,
  type ProductFlyerBrand,
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
  websiteUrl?: string;
  brand?: ProductFlyerBrand;
};

export function FlyerHeader({
  tagline = "Build · Host · Scale",
  websiteUrl = EKD_DIGITAL_WEBSITE,
  brand,
}: FlyerHeaderProps) {
  const isProductBrand = Boolean(brand);
  const logoSrc = brand?.logoSrc ?? "/ekddigital.png";
  const logoAlt = brand?.logoAlt ?? "EKD Digital";
  const brandLead = brand?.brandLead ?? "EKD ";
  const brandAccent = brand?.brandAccent ?? "Digital";
  const titleFontSize = isProductBrand ? 20 : 21;
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
            width: isProductBrand ? 44 : 46,
            height: isProductBrand ? 44 : 46,
            borderRadius: isProductBrand ? 10 : "50%",
            overflow: "hidden",
            flexShrink: 0,
            border: isProductBrand
              ? `1.5px solid rgba(200,160,97,0.55)`
              : `2px solid rgba(200,160,97,0.45)`,
            boxShadow: isProductBrand
              ? "0 0 12px rgba(200,160,97,0.2)"
              : "0 0 14px rgba(200,160,97,0.25), 0 0 10px rgba(200,160,97,0.2)",
            background: isProductBrand ? BG_DARK : undefined,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt={logoAlt}
            crossOrigin="anonymous"
            style={{
              width: "100%",
              height: "100%",
              objectFit: isProductBrand ? "contain" : "cover",
              display: "block",
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <p
            style={{
              margin: 0,
              fontSize: titleFontSize,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
            }}
          >
            {brandLead}
            <span style={{ color: GOLD }}>{brandAccent}</span>
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
                fontSize: brand ? 9 : 9.5,
                fontWeight: 700,
                color: brand ? "#a8a29e" : "#e8e6e3",
                letterSpacing: brand ? "0.16em" : "0.14em",
                textTransform: "uppercase",
                lineHeight: 1.15,
                textShadow: brand ? undefined : "0 1px 2px rgba(0,0,0,0.9)",
              }}
            >
              {brand ? "by EKD Digital" : tagline}
            </p>
            {!brand ? <FlyerCircuitAccent opacity={0.4} color={GOLD_LIGHT} /> : null}
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
            {websiteUrl}
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
  websiteUrl?: string;
  contactRows?: readonly FlyerContactRow[];
  /** EKDSend-style compact strip — pricing flyers */
  compact?: boolean;
};

export function FlyerContactFooter({
  top,
  ctaHeadline = "GET YOUR FREE CONSULTATION →",
  ctaSubline = "Kingdom workers · Kingdom solutions — our DNA",
  websiteUrl = EKD_DIGITAL_WEBSITE,
  contactRows,
  compact = false,
}: FlyerContactFooterProps) {
  const rows = contactRows ?? contactRowsWithWebsite(websiteUrl);
  const compactRows = rows.filter(
    (row) => row.label === "Phone / WhatsApp" || row.label === "WeChat ID",
  );

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
          bottom: 0,
          padding: compact
            ? `${FLYER_SPACE.md}px ${FLYER_PAD_X}px ${FLYER_SPACE.lg}px`
            : `${FLYER_SPACE.md}px ${FLYER_PAD_X}px ${FLYER_SPACE.lg}px`,
          boxSizing: "border-box",
          zIndex: 2,
        }}
      >
        {compact ? (
          <CompactFooterBody
            ctaHeadline={ctaHeadline}
            websiteUrl={websiteUrl}
            contactRows={compactRows}
          />
        ) : (
          <FullFooterBody
            ctaHeadline={ctaHeadline}
            ctaSubline={ctaSubline}
            rows={rows}
          />
        )}
      </div>
    </>
  );
}

function FullFooterBody({
  ctaHeadline,
  ctaSubline,
  rows,
}: {
  ctaHeadline: string;
  ctaSubline: string;
  rows: readonly FlyerContactRow[];
}) {
  return (
    <>
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
      <FlyerContactGrid rows={rows} />
      <FlyerParentCompanyLine />
    </>
  );
}

function CompactFooterBody({
  ctaHeadline,
  websiteUrl,
  contactRows,
}: {
  ctaHeadline: string;
  websiteUrl: string;
  contactRows: readonly FlyerContactRow[];
}) {
  const F = PRICING_FLYER_FOOTER;

  return (
    <>
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
      <p
        style={{
          margin: `${F.ctaUrlMarginTop}px 0 0`,
          fontSize: 12,
          fontWeight: 800,
          color: GOLD_LIGHT,
          textAlign: "center",
          letterSpacing: "0.06em",
          lineHeight: 1.25,
        }}
      >
        {websiteUrl}
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
        {contactRows.map((row) => (
          <FooterContactLine
            key={row.label}
            icon={row.icon}
            label={row.label === "Phone / WhatsApp" ? "WhatsApp" : row.label}
            value={row.value}
          />
        ))}
      </div>
      <FlyerParentCompanyLine />
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
            color: GOLD,
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

export const flyerCanvasStyle = {
  position: "relative" as const,
  width: FLYER_PORTRAIT_W,
  height: FLYER_PORTRAIT_H,
  overflow: "hidden" as const,
  fontFamily: "'Arial', 'Helvetica Neue', sans-serif",
};
