"use client";

import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import { Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FOM_BRAND, FOM_LOGO } from "@/lib/constants/fom";

/* FOM Conference palette — deep navy, silver, white (logo-aligned) */
const FOM_NAVY_DEEP = "#060d1f";
const FOM_NAVY = "#0c1a3a";
const FOM_NAVY_MID = "#132a52";
const FOM_SILVER = "#b8c0cc";
const FOM_SILVER_LIGHT = "#d4dae3";
const FOM_SILVER_DIM = "rgba(184, 192, 204, 0.55)";
const FOM_NAVY_ACCENT = "#1a2d4a";
const FOM_THEME_BG = "#e8eef5";
const FOM_THEME_SCRIPTURE = "#4a6d9a";

const CONFERENCE_THEME = {
  quote: '"If God be for us.."',
  reference: "Romans 8:31",
} as const;

/** Invitation copy — warm, mission-focused, Romans 8:31 aligned */
const CONFERENCE_INVITE = {
  label: "An Invitation",
  headline: "Come Stand With Fellow Fishers",
  body: "Three days of worship, teaching, and fellowship.",
} as const;

const WECHAT_QR_SRC = "/FOM-WeChat-Group-QR-Code.png";
const WECHAT_QR_LABEL = "Scan to join our WeChat group";

const FLYER_W = 540;

const SANS = "'Arial', 'Helvetica Neue', sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";

/** Typography tiers — second pass for remaining small text */
const TYPE = {
  micro: 9.5,
  caption: 10.5,
  small: 11,
  body: 12,
  scheduleDay: 13,
  scheduleSession: 12.5,
  scheduleNote: 10.5,
  inviteHeadline: 17,
  inviteBody: 10.5,
  themeLabel: 9.5,
  themeQuote: 24,
  themeRef: 12,
  headerBrand: 11,
  headerTitle: 37,
  headerDates: 18,
  headerScripture: 13,
  headerVerse: 12,
  footerTagline: 13,
  footerEst: 10,
  qrLabel: 8.5,
} as const;

/**
 * Sum fixed bands + estimated schedule stack so canvas height fits all content
 * without overlap (Friday highlight block needs extra vertical room).
 */
function computeFlyerLayout() {
  const sectionGap = 8;
  const footerHeight = 58;
  const themeBandHeight = 98;
  const headerBlockHeight = 198;
  const inviteBandHeight = 122;
  const qrDisplaySize = 80;

  const scheduleLabelHeight = 17;
  const scheduleDayGap = 7;
  const dayCardFriday = 132;
  const dayCardSaturday = 92;
  const dayCardSunday = 96;
  const scheduleHeight =
    scheduleLabelHeight +
    scheduleDayGap +
    dayCardFriday +
    scheduleDayGap +
    dayCardSaturday +
    scheduleDayGap +
    dayCardSunday;

  const contentHeight =
    headerBlockHeight +
    sectionGap +
    themeBandHeight +
    sectionGap +
    scheduleHeight +
    sectionGap +
    inviteBandHeight;

  const layoutBuffer = 24;
  const flyerHeight = contentHeight + footerHeight + layoutBuffer;

  return {
    flyerHeight,
    sectionGap,
    footerHeight,
    themeBandHeight,
    inviteBandHeight,
    headerBlockHeight,
    scheduleHeight,
    qrDisplaySize,
  };
}

const LAYOUT = computeFlyerLayout();
const FLYER_H = LAYOUT.flyerHeight;
const SECTION_GAP = LAYOUT.sectionGap;
const FOOTER_HEIGHT = LAYOUT.footerHeight;
const THEME_BAND_HEIGHT = LAYOUT.themeBandHeight;
const INVITE_BAND_HEIGHT = LAYOUT.inviteBandHeight;
const QR_DISPLAY_SIZE = LAYOUT.qrDisplaySize;

function ThemeBand() {
  return (
    <div
      style={{
        flexShrink: 0,
        height: THEME_BAND_HEIGHT,
        backgroundColor: FOM_THEME_BG,
        padding: "11px 22px 13px 26px",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 7,
          backgroundColor: FOM_NAVY_DEEP,
        }}
      />
      <p
        style={{
          margin: 0,
          fontSize: TYPE.themeLabel,
          fontFamily: SANS,
          fontWeight: 800,
          letterSpacing: "0.34em",
          textTransform: "uppercase",
          color: FOM_NAVY,
        }}
      >
        THEME
      </p>
      <div style={{ textAlign: "center", marginTop: 6, paddingLeft: 4 }}>
        <p
          style={{
            margin: 0,
            fontSize: TYPE.themeQuote,
            fontFamily: SANS,
            fontWeight: 700,
            lineHeight: 1.12,
            color: FOM_NAVY_DEEP,
            letterSpacing: "-0.02em",
          }}
        >
          {CONFERENCE_THEME.quote}
        </p>
        <p
          style={{
            margin: "6px 0 0",
            fontSize: TYPE.themeRef,
            fontFamily: SANS,
            fontWeight: 600,
            color: FOM_NAVY,
            letterSpacing: "0.05em",
          }}
        >
          {CONFERENCE_THEME.reference}
        </p>
      </div>
    </div>
  );
}

function RingDecoration({
  size,
  style,
  opacity = 0.12,
}: {
  size: number;
  style?: CSSProperties;
  opacity?: number;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `1px solid ${FOM_SILVER}`,
        opacity,
        pointerEvents: "none",
        position: "absolute",
        ...style,
      }}
    />
  );
}

function WeChatQrBlock() {
  return (
    <div
      style={{
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        width: QR_DISPLAY_SIZE + 12,
      }}
    >
      <div
        style={{
          width: QR_DISPLAY_SIZE,
          height: QR_DISPLAY_SIZE,
          padding: 6,
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
          borderRadius: 8,
          border: `1px solid rgba(12,26,58,0.12)`,
          boxShadow: "0 2px 8px rgba(6,13,31,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={WECHAT_QR_SRC}
          alt="WeChat group QR code"
          crossOrigin="anonymous"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>
      <p
        style={{
          margin: 0,
          fontSize: TYPE.qrLabel,
          fontFamily: SANS,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: FOM_THEME_SCRIPTURE,
          textAlign: "center",
          lineHeight: 1.25,
          maxWidth: QR_DISPLAY_SIZE + 8,
        }}
      >
        {WECHAT_QR_LABEL}
      </p>
    </div>
  );
}

function InvitationBand() {
  return (
    <div
      style={{
        flexShrink: 0,
        height: INVITE_BAND_HEIGHT,
        backgroundColor: FOM_THEME_BG,
        padding: "10px 18px 10px 26px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 5,
          backgroundColor: FOM_NAVY_ACCENT,
        }}
      />
      <RingDecoration
        size={72}
        style={{ right: -18, bottom: -28 }}
        opacity={0.2}
      />
      <RingDecoration
        size={44}
        style={{ right: 8, bottom: -12 }}
        opacity={0.28}
      />
      <div style={{ flex: 1, minWidth: 0, position: "relative", zIndex: 1 }}>
        <p
          style={{
            margin: 0,
            fontSize: TYPE.themeLabel,
            fontFamily: SANS,
            fontWeight: 800,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: FOM_NAVY_ACCENT,
          }}
        >
          {CONFERENCE_INVITE.label}
        </p>
        <p
          style={{
            margin: "3px 0 0",
            fontSize: TYPE.inviteHeadline,
            fontFamily: SANS,
            fontWeight: 700,
            lineHeight: 1.12,
            color: FOM_NAVY_ACCENT,
            letterSpacing: "-0.01em",
          }}
        >
          {CONFERENCE_INVITE.headline}
        </p>
        <p
          style={{
            margin: "4px 0 0",
            fontSize: TYPE.inviteBody,
            fontFamily: SANS,
            fontWeight: 500,
            lineHeight: 1.3,
            color: FOM_THEME_SCRIPTURE,
          }}
        >
          {CONFERENCE_INVITE.body}
        </p>
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <WeChatQrBlock />
      </div>
    </div>
  );
}

function FlyerHeader() {
  return (
    <div style={{ flexShrink: 0, padding: "20px 22px 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              fontSize: TYPE.headerBrand,
              fontFamily: SANS,
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: FOM_SILVER,
            }}
          >
            {FOM_BRAND.name}
          </p>
          <h1
            style={{
              margin: "6px 0 0",
              fontSize: TYPE.headerTitle,
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            Conference
          </h1>
          <p
            style={{
              margin: "10px 0 0",
              fontSize: TYPE.headerDates,
              fontWeight: 600,
              color: FOM_SILVER_LIGHT,
              letterSpacing: "0.04em",
            }}
          >
            May 22 – 24, 2026
          </p>
          <p
            style={{
              margin: "6px 0 0",
              fontSize: TYPE.headerScripture,
              fontFamily: SANS,
              fontStyle: "italic",
              color: FOM_SILVER_DIM,
              lineHeight: 1.35,
            }}
          >
            {FOM_BRAND.scriptureText}
          </p>
          <p
            style={{
              margin: "2px 0 0",
              fontSize: TYPE.headerVerse,
              fontFamily: SANS,
              color: FOM_SILVER,
              fontWeight: 600,
            }}
          >
            — {FOM_BRAND.scriptureVerse}
          </p>
        </div>

        <div
          style={{
            width: 94,
            height: 94,
            borderRadius: "50%",
            flexShrink: 0,
            padding: 3,
            background: `linear-gradient(145deg, ${FOM_SILVER_LIGHT} 0%, ${FOM_SILVER} 50%, #8a939f 100%)`,
            boxShadow:
              "0 0 24px rgba(184,192,204,0.25), 0 4px 16px rgba(0,0,0,0.45)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              overflow: "hidden",
              background: FOM_NAVY_DEEP,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FOM_LOGO.png}
              alt={FOM_LOGO.alt}
              crossOrigin="anonymous"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 14,
          height: 1,
          background: `linear-gradient(to right, transparent, ${FOM_SILVER} 35%, ${FOM_SILVER_LIGHT} 65%, transparent)`,
          opacity: 0.65,
        }}
      />
    </div>
  );
}

function ScheduleSection() {
  return (
    <div
      style={{
        flexShrink: 0,
        padding: "0 22px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 7,
        textAlign: "center",
      }}
    >
      <p
        style={{
          margin: 0,
          width: "100%",
          fontSize: TYPE.small,
          fontFamily: SANS,
          fontWeight: 800,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: FOM_SILVER,
        }}
      >
        Schedule
      </p>

      <ScheduleDay
        day="Friday · May 22"
        sessions={[
          { label: "Session", time: "1:00 PM – 3:00 PM" },
          {
            label: "Friday Night · All Night",
            time: "12:00 AM – 5:00 AM",
            note: "At Thompson's Place",
            highlight: true,
          },
        ]}
      />

      <ScheduleDay
        day="Saturday · May 23"
        sessions={[
          { label: "Session 1", time: "12:00 PM – 1:30 PM" },
          { label: "Session 2", time: "2:00 PM – 3:00 PM" },
        ]}
      />

      <ScheduleDay
        day="Sunday · May 24"
        sessions={[
          {
            label: "Fellowship",
            time: "Games & fellowship",
            note: "Games, connection, and celebration together",
          },
        ]}
      />
    </div>
  );
}

function FlyerFooter() {
  return (
    <div
      style={{
        flexShrink: 0,
        height: FOOTER_HEIGHT,
        marginTop: "auto",
        background: `linear-gradient(to top, ${FOM_NAVY_DEEP} 0%, rgba(6,13,31,0.92) 100%)`,
        borderTop: `1px solid rgba(184,192,204,0.25)`,
        padding: "10px 22px 14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          overflow: "hidden",
          border: `1px solid ${FOM_SILVER_DIM}`,
          flexShrink: 0,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={FOM_LOGO.png}
          alt=""
          crossOrigin="anonymous"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>
      <p
        style={{
          margin: 0,
          fontSize: TYPE.footerTagline,
          fontFamily: SANS,
          color: FOM_SILVER_LIGHT,
          fontStyle: "italic",
          textAlign: "center",
          flex: 1,
          padding: "0 8px",
        }}
      >
        {FOM_BRAND.tagline}
      </p>
      <p
        style={{
          margin: 0,
          fontSize: TYPE.footerEst,
          fontFamily: SANS,
          fontWeight: 700,
          color: FOM_SILVER,
          letterSpacing: "0.1em",
          whiteSpace: "nowrap",
        }}
      >
        EST. {FOM_BRAND.foundedYear}
      </p>
    </div>
  );
}

function FOMConferenceCanvas() {
  return (
    <div
      style={{
        position: "relative",
        width: FLYER_W,
        height: FLYER_H,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: SERIF,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(165deg, ${FOM_NAVY_DEEP} 0%, ${FOM_NAVY} 42%, ${FOM_NAVY_MID} 100%)`,
        }}
      />

      <RingDecoration size={420} style={{ top: -120, right: -140 }} opacity={0.1} />
      <RingDecoration size={280} style={{ top: -40, right: -70 }} opacity={0.14} />
      <RingDecoration size={360} style={{ bottom: -100, left: -120 }} opacity={0.08} />
      <RingDecoration size={180} style={{ bottom: 40, left: -40 }} opacity={0.12} />

      <div
        style={{
          position: "absolute",
          top: 52,
          right: 28,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184,192,204,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
          gap: SECTION_GAP,
        }}
      >
        <FlyerHeader />
        <ThemeBand />
        <ScheduleSection />
        <InvitationBand />
        <FlyerFooter />
      </div>
    </div>
  );
}

type SessionRow = {
  label: string;
  time: string;
  note?: string;
  highlight?: boolean;
};

function ScheduleDay({
  day,
  sessions,
}: {
  day: string;
  sessions: SessionRow[];
}) {
  return (
    <div
      style={{
        width: "100%",
        background: "rgba(255,255,255,0.04)",
        border: `1px solid rgba(184,192,204,0.22)`,
        borderRadius: 10,
        padding: "7px 12px 9px",
        flexShrink: 0,
        textAlign: "center",
      }}
    >
      <p
        style={{
          margin: "0 0 6px",
          fontSize: TYPE.scheduleDay,
          fontFamily: SANS,
          fontWeight: 800,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: FOM_SILVER_LIGHT,
        }}
      >
        {day}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        {sessions.map((session) => (
          <SessionBlock
            key={`${day}-${session.label}-${session.time}`}
            {...session}
          />
        ))}
      </div>
    </div>
  );
}

function SessionBlock({ label, time, note, highlight }: SessionRow) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: highlight ? "10px 14px" : "3px 0",
        borderRadius: highlight ? 8 : 0,
        background: highlight ? "rgba(184,192,204,0.08)" : "transparent",
        border: highlight ? `1px solid rgba(184,192,204,0.22)` : "none",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          justifyContent: "center",
          gap: "4px 10px",
        }}
      >
        <span
          style={{
            fontSize: TYPE.scheduleSession,
            fontFamily: SANS,
            fontWeight: 700,
            color: "#ffffff",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: TYPE.scheduleSession,
            fontFamily: SANS,
            fontWeight: 600,
            color: FOM_SILVER_LIGHT,
          }}
        >
          {time}
        </span>
      </div>
      {note ? (
        <p
          style={{
            margin: "4px 0 0",
            fontSize: TYPE.scheduleNote,
            fontFamily: SANS,
            color: highlight ? FOM_SILVER_LIGHT : FOM_SILVER_DIM,
            fontStyle: highlight ? "normal" : "italic",
            fontWeight: highlight ? 600 : 400,
            lineHeight: 1.35,
          }}
        >
          {note}
        </p>
      ) : null}
    </div>
  );
}

export function FOMConferenceFlyerShell() {
  const flyerRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const downloadPng = async () => {
    if (!flyerRef.current || downloading) return;
    setDownloading(true);
    try {
      const { toPng } = await import("html-to-image");
      const el = flyerRef.current;

      if ("fonts" in document) {
        await (document as Document & { fonts: { ready: Promise<unknown> } })
          .fonts.ready;
      }

      const dataUrl = await toPng(el, {
        cacheBust: true,
        pixelRatio: 2,
        width: FLYER_W,
        height: FLYER_H,
        canvasWidth: FLYER_W * 2,
        canvasHeight: FLYER_H * 2,
        backgroundColor: FOM_NAVY_DEEP,
      });

      const link = document.createElement("a");
      link.download = "fom-conference-may-2026.png";
      link.href = dataUrl;
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  const printFlyer = () => window.print();

  const exportW = FLYER_W * 2;
  const exportH = FLYER_H * 2;

  return (
    <div className="flex flex-col items-center gap-6 py-8 px-4">
      <div className="flex flex-wrap gap-3 print:hidden">
        <Button
          onClick={() => void downloadPng()}
          disabled={downloading}
          className="bg-[#0c1a3a] hover:bg-[#060d1f] text-white"
        >
          <Download className="size-4 mr-2" />
          {downloading
            ? "Preparing…"
            : `Download PNG (${exportW} × ${exportH})`}
        </Button>
        <Button
          variant="outline"
          onClick={printFlyer}
          className="border-[#b8c0cc] text-[#0c1a3a] hover:bg-[#d4dae3]/40"
        >
          <Printer className="size-4 mr-2" />
          Print / Save PDF
        </Button>
      </div>

      <div
        className="shadow-2xl print:shadow-none"
        style={{
          width: "100%",
          maxWidth: FLYER_W,
          aspectRatio: `${FLYER_W} / ${FLYER_H}`,
          overflow: "hidden",
          borderRadius: 16,
        }}
      >
        <div
          ref={flyerRef}
          style={{
            width: FLYER_W,
            height: FLYER_H,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <FOMConferenceCanvas />
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center print:hidden">
        Preview is {FLYER_W} × {FLYER_H} px · Download exports at {exportW} ×{" "}
        {exportH} px (portrait)
      </p>
    </div>
  );
}
