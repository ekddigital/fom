"use client";

import { useRef, useState } from "react";
import { Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FlyerChevronCluster,
  FlyerContactGrid,
  FlyerGradientWord,
  FlyerMeshConstellation,
  FlyerSlantedCta,
} from "@/components/jicf/ekddigital-flyer-motifs";
import {
  FLYER_PAD_X,
  FLYER_SPACE,
  INSTAGRAM_FLYER_H,
  INSTAGRAM_FLYER_LAYOUT,
  flyerBulletRowStyle,
  flyerSectionLabelStyle,
} from "@/components/jicf/ekddigital-flyer-spacing";
import { BG_DARK, BG_MID, EKD_DIGITAL_WEBSITE, GOLD_LIGHT } from "@/components/jicf/ekddigital-flyer-theme";

const L = INSTAGRAM_FLYER_LAYOUT;
function EKDDigitalFlyerCanvas() {
  return (
    <div
      style={{
        position: "relative",
        width: 540,
        height: INSTAGRAM_FLYER_H,
        overflow: "hidden",
        fontFamily: "'Arial', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* ── FULL BACKGROUND ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            `linear-gradient(160deg, ${BG_DARK} 0%, ${BG_MID} 45%, ${BG_DARK} 100%)`,
        }}
      />
      <FlyerMeshConstellation corner="top-right" />
      <FlyerMeshConstellation corner="bottom-left" opacity={0.12} />

      {/* ── SUBTLE DOT-GRID TEXTURE ── */}
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

      {/* ── GOLD RADIAL GLOW — top right ── */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,160,97,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── GOLD RADIAL GLOW — bottom left ── */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: -70,
          width: 240,
          height: 240,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,160,97,0.11) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── CODE BRACKET WATERMARK ── */}
      <div
        style={{
          position: "absolute",
          top: 300,
          right: -8,
          fontSize: 130,
          fontWeight: 900,
          color: "rgba(200,160,97,0.045)",
          lineHeight: 1,
          letterSpacing: "-0.05em",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        {"{ }"}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 1 — HEADER  (top: 0, height: 72)
      ══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: L.headerHeight,
          display: "flex",
          alignItems: "center",
          padding: `0 ${FLYER_PAD_X - 2}px`,
          gap: FLYER_SPACE.md - 1,
          background: "rgba(7, 9, 15, 0.98)",
          borderBottom: "2.5px solid #C8A061",
          zIndex: 10,
        }}
      >
        {/* EKD Logo */}
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            border: "2px solid rgba(200,160,97,0.55)",
            boxShadow: "0 0 16px rgba(200,160,97,0.32)",
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

        {/* Brand text */}
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
            EKD <span style={{ color: "#C8A061" }}>Digital</span>
          </p>
          <p
            style={{
              margin: "2px 0 0",
              fontSize: 9.5,
              fontWeight: 700,
              color: "#e8e6e3",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              lineHeight: 1.15,
              textShadow: "0 1px 2px rgba(0,0,0,0.9)",
            }}
          >
            Build · Write · Deliver
          </p>
        </div>

        {/* Website pill */}
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
              color: "#f3e8c8",
              fontWeight: 800,
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
              textShadow: "0 1px 2px rgba(0,0,0,0.75)",
            }}
          >
            {EKD_DIGITAL_WEBSITE}
          </p>
        </div>
      </div>

      {/* ── GOLD GRADIENT SEPARATOR ── */}
      <div
        style={{
          position: "absolute",
          top: L.headerHeight,
          left: 0,
          right: 0,
          height: L.headerRuleHeight,
          background:
            "linear-gradient(to right, transparent, #C8A061 20%, #E8C589 50%, #C8A061 80%, transparent)",
        }}
      />

      {/* ══════════════════════════════════════════════════════════════
          SECTION 2 — DUAL IMAGE STRIP  (top: 75, height: 157)
      ══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          top: L.heroTop,
          left: 0,
          right: 0,
          height: L.heroHeight,
          display: "flex",
          zIndex: 2,
        }}
      >
        {/* ── Left panel: Academic Writing ── */}
        <div
          style={{
            width: 269,
            height: L.heroHeight,
            position: "relative",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/writing.png"
            alt="Academic Writing"
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
              background:
                "linear-gradient(to bottom, rgba(31,28,24,0.28) 0%, rgba(31,28,24,0.08) 45%, rgba(31,28,24,0.76) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 10,
              left: 10,
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 11,
                fontWeight: 800,
                color: "#E8C589",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                textShadow: "0 1px 6px rgba(0,0,0,0.6)",
              }}
            >
              ✍️ Academic Writing
            </p>
            <p
              style={{
                margin: "1px 0 0",
                fontSize: 9.5,
                fontWeight: 600,
                color: "#f8fafc",
                lineHeight: 1.35,
                textShadow: "0 1px 4px rgba(0,0,0,0.85)",
              }}
            >
              Thesis · Papers · Reports
            </p>
          </div>
        </div>

        {/* ── Gold vertical divider ── */}
        <div
          style={{
            width: 2,
            height: L.heroHeight,
            background:
              "linear-gradient(to bottom, transparent 0%, #C8A061 25%, #E8C589 50%, #C8A061 75%, transparent 100%)",
            flexShrink: 0,
          }}
        />

        {/* ── Right panel: App & Web Development ── */}
        <div
          style={{
            flex: 1,
            height: L.heroHeight,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mobile-desk-web.png"
            alt="App and Web Development"
            crossOrigin="anonymous"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(31,28,24,0.28) 0%, rgba(31,28,24,0.08) 45%, rgba(31,28,24,0.76) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              textAlign: "right",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 11,
                fontWeight: 800,
                color: "#E8C589",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                textShadow: "0 1px 6px rgba(0,0,0,0.6)",
              }}
            >
              💻 App Development
            </p>
            <p
              style={{
                margin: "1px 0 0",
                fontSize: 9.5,
                fontWeight: 600,
                color: "#f8fafc",
                lineHeight: 1.35,
                textShadow: "0 1px 4px rgba(0,0,0,0.85)",
              }}
            >
              Web · Mobile · Desktop
            </p>
          </div>
        </div>
      </div>

      {/* ── HOOK TEXT OVERLAY (centred over image strip) ── */}
      <div
        style={{
          position: "absolute",
          top: L.heroTop,
          left: 0,
          right: 0,
          height: L.heroHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 5,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            background: "rgba(31,28,24,0.74)",
            border: "1.5px solid rgba(200,160,97,0.68)",
            borderRadius: 10,
            padding: "9px 18px",
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.45)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 21,
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              textShadow: "0 2px 8px rgba(0,0,0,0.55)",
            }}
          >
            WE BUILD. <FlyerGradientWord>WE WRITE.</FlyerGradientWord>
          </p>
          <p
            style={{
              margin: "3px 0 0",
              fontSize: 8.5,
              fontWeight: 700,
              color: GOLD_LIGHT,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              textShadow: "0 1px 3px rgba(0,0,0,0.8)",
            }}
          >
            Your Academic &amp; Tech Partner
          </p>
        </div>
      </div>
      <FlyerChevronCluster
        style={{ position: "absolute", top: 195, right: 12, zIndex: 6 }}
      />

      {/* ══════════════════════════════════════════════════════════════
          SECTION 3 — PAIN POINTS  (top: 232, height: 120)
      ══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          top: L.painTop,
          left: 0,
          right: 0,
          height: L.painHeight,
          padding: `${FLYER_SPACE.md - 2}px ${FLYER_PAD_X}px ${FLYER_SPACE.md - 5}px`,
          zIndex: 2,
        }}
      >
        {/* Section label */}
        <div style={flyerSectionLabelStyle}>
          <p
            style={{
              margin: 0,
              fontSize: 11,
              fontWeight: 900,
              color: "#E8C589",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              textShadow: "0 1px 2px rgba(0,0,0,0.6)",
            }}
          >
            Sound Familiar?
          </p>
        </div>

        {[
          "Struggling to put your thoughts together in writing?",
          "Getting tough comments from your supervisor or reviewers?",
          "Can\u2019t seem to finish your thesis, paper or final project?",
          "Need an app — Android, iOS, web, or desktop — for your project?",
        ].map((point) => (
          <div
            key={point}
            style={{
              ...flyerBulletRowStyle,
              marginBottom: FLYER_SPACE.xs + 1,
            }}
          >
            <span
              style={{
                color: "#C8A061",
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
                fontSize: 11,
                fontWeight: 600,
                color: "#f1f5f9",
                lineHeight: 1.35,
                textShadow: "0 1px 2px rgba(0,0,0,0.45)",
              }}
            >
              {point}
            </p>
          </div>
        ))}
      </div>

      {/* ── THIN GOLD SEPARATOR ── */}
      <div
        style={{
          position: "absolute",
          top: L.separatorTop,
          left: FLYER_PAD_X,
          right: FLYER_PAD_X,
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(200,160,97,0.4) 20%, rgba(200,160,97,0.4) 80%, transparent)",
        }}
      />

      {/* ══════════════════════════════════════════════════════════════
          SECTION 4 — SERVICES  (top: 353, height: 115)
      ══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          top: L.servicesTop,
          left: 0,
          right: 0,
          height: L.servicesHeight,
          padding: `${FLYER_SPACE.md - 5}px ${FLYER_PAD_X - 2}px ${FLYER_SPACE.md - 2}px`,
          boxSizing: "border-box",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: FLYER_SPACE.lg,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 11,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "0.02em",
            lineHeight: 1.2,
            flexShrink: 0,
            textShadow: "0 1px 2px rgba(0,0,0,0.45)",
          }}
        >
          <span style={{ color: "#E8C589" }}>EKD Digital</span> is here to help
          you with:
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            columnGap: FLYER_SPACE.md - 1,
            rowGap: FLYER_SPACE.md - 2,
            justifyItems: "stretch",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          {(
            [
              { icon: "📄", text: "Academic Papers", highlight: false },
              { icon: "🎓", text: "Thesis & Dissertations", highlight: false },
              { icon: "📱", text: "Android & iOS Apps", highlight: true },
              { icon: "🌐", text: "Websites", highlight: false },
              { icon: "🖥️", text: "Desktop Applications", highlight: false },
              { icon: "✍️", text: "Technical Writing", highlight: true },
            ] as { icon: string; text: string; highlight: boolean }[]
          ).map(({ icon, text, highlight }) => (
            <div
              key={text}
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                minWidth: 0,
                background: highlight
                  ? "rgba(200,160,97,0.2)"
                  : "rgba(255,255,255,0.07)",
                border: highlight
                  ? "1px solid rgba(200,160,97,0.6)"
                  : "1px solid rgba(255,255,255,0.13)",
                borderRadius: 20,
                padding: "6px 9px",
                boxSizing: "border-box",
                fontSize: 13.5,
                lineHeight: 1,
                color: highlight ? "#fffef8" : "#f1f5f9",
                fontWeight: highlight ? 800 : 650,
                boxShadow: highlight ? "0 2px 8px rgba(200,160,97,0.10)" : undefined,
                letterSpacing: "0.01em",
              }}
            >
              <span
                style={{
                  fontSize: 15,
                  lineHeight: 1,
                  flexShrink: 0,
                  display: "block",
                }}
                aria-hidden
              >
                {icon}
              </span>
              <span
                style={{
                  lineHeight: 1.2,
                  whiteSpace: "nowrap",
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOLD GOLD BORDER ── */}
      <div
        style={{
          position: "absolute",
          top: L.footerBorderTop,
          left: 0,
          right: 0,
          height: 2.5,
          background:
            "linear-gradient(to right, transparent, #C8A061 15%, #E8C589 50%, #C8A061 85%, transparent)",
        }}
      />

      {/* ══════════════════════════════════════════════════════════════
          SECTION 5 — CTA + CONTACT  (top: 470.5, bottom: 0 ≈204.5 px)
      ══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          top: L.footerTop,
          left: 0,
          right: 0,
          bottom: 0,
          padding: `${FLYER_SPACE.md - 1}px ${FLYER_PAD_X}px ${FLYER_SPACE.lg}px`,
          background: "rgba(7, 9, 15, 0.98)",
          zIndex: 2,
        }}
      >
        {/* Hope + CTA hook (one-liner from share-note; Kingdom DNA line below) */}
        <p
          style={{
            margin: `0 0 ${FLYER_SPACE.xs}px`,
            fontSize: 10.8,
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            letterSpacing: "0.01em",
            lineHeight: 1.33,
            textShadow: "0 1px 3px rgba(0,0,0,0.5)",
          }}
        >
          Don&apos;t give up in silence—we&apos;re just a{" "}
          <span style={{ color: "#C8A061" }}>button</span> away,
          <br />
          and we help you{" "}
          <span style={{ color: "#E8C589" }}>recover time</span>.
        </p>
        <p
          style={{
            margin: `0 0 ${FLYER_SPACE.md - 2}px`,
            fontSize: 7.6,
            fontWeight: 800,
            color: "#c9a857",
            textAlign: "center",
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            lineHeight: 1.25,
            textShadow: "0 1px 2px rgba(0,0,0,0.45)",
          }}
        >
          Kingdom workers · Kingdom solutions — our DNA
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
            GET YOUR FREE CONSULTATION →
          </p>
        </FlyerSlantedCta>

        <FlyerContactGrid
          rows={[
            {
              icon: "📞",
              label: "Phone / WhatsApp",
              value: "+86 185 0683 2159",
            },
            { icon: "📧", label: "Email", value: "ekd@ekddigital.com" },
            { icon: "💬", label: "WeChat ID", value: "EKD231777285010" },
            {
              icon: "🌐",
              label: "Website",
              value: EKD_DIGITAL_WEBSITE,
              gold: true,
            },
          ]}
        />
      </div>
    </div>
  );
}

/* ─── Shell (preview + download controls) ────────────────────────────────── */
export function EKDDigitalFlyerShell() {
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
        width: 540,
        height: INSTAGRAM_FLYER_H,
        canvasWidth: 1080,
        canvasHeight: 1350,
        backgroundColor: "#1F1C18",
      });

      const link = document.createElement("a");
      link.download = "ekddigital-services-flyer.png";
      link.href = dataUrl;
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  const printFlyer = () => window.print();

  return (
    <div className="flex flex-col items-center gap-6 py-8 px-4">
      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 print:hidden">
        <Button
          onClick={() => void downloadPng()}
          disabled={downloading}
          style={{ background: "#C8A061", color: "#1F1C18" }}
          className="hover:opacity-90 font-bold"
        >
          <Download className="size-4 mr-2" />
          {downloading ? "Preparing…" : "Download PNG (1080 × 1350)"}
        </Button>
        <Button
          variant="outline"
          onClick={printFlyer}
          style={{ borderColor: "#C8A061", color: "#C8A061" }}
          className="hover:bg-[#C8A061]/10"
        >
          <Printer className="size-4 mr-2" />
          Print / Save PDF
        </Button>
      </div>

      {/* Flyer preview */}
      <div
        className="shadow-2xl print:shadow-none"
        style={{
          width: "100%",
          maxWidth: 540,
          aspectRatio: "4 / 5",
          overflow: "hidden",
          borderRadius: 16,
          border: "1px solid rgba(200,160,97,0.25)",
        }}
      >
        <div
          ref={flyerRef}
          style={{
            width: 540,
            height: INSTAGRAM_FLYER_H,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <EKDDigitalFlyerCanvas />
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center print:hidden">
        Preview is 540 × 675 px · Download exports at 1080 × 1350 px (Instagram
        portrait, 4:5)
      </p>
    </div>
  );
}
