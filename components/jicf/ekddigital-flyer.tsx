"use client";

import { useRef, useState } from "react";
import { Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── Flyer Canvas ──────────────────────────────────────────────────────────
  540 × 675 px preview → pixelRatio:2 export → 1080 × 1350 px (Instagram 4:5)
  All positions are absolute — no flex:1 spacers — for html-to-image fidelity.

  Section map (cumulative top values):
    Header      :   0 → 72  (72 px)
    Gold line   :  72 → 75  ( 3 px)
    Image strip :  75 → 232 (157 px)
    Pain points : 232 → 352 (120 px)
    Separator   :      352  (  1 px)
    Services    : 353 → 468 (115 px)
    Gold border :      468  ( 2.5px)
    CTA/Contact : 470.5 → 675 (204.5 px)
─────────────────────────────────────────────────────────────────────────── */
function EKDDigitalFlyerCanvas() {
  return (
    <div
      style={{
        position: "relative",
        width: 540,
        height: 675,
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
            "linear-gradient(160deg, #07090f 0%, #0c1221 45%, #07090f 100%)",
        }}
      />

      {/* ── SUBTLE DOT-GRID TEXTURE ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(201,151,46,0.07) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
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
            "radial-gradient(circle, rgba(201,151,46,0.18) 0%, transparent 70%)",
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
            "radial-gradient(circle, rgba(201,151,46,0.11) 0%, transparent 70%)",
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
          color: "rgba(201,151,46,0.045)",
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
          height: 72,
          display: "flex",
          alignItems: "center",
          padding: "0 18px",
          gap: 11,
          background: "rgba(7, 9, 15, 0.98)",
          borderBottom: "2.5px solid #C9972E",
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
            border: "2px solid rgba(201,151,46,0.55)",
            boxShadow: "0 0 16px rgba(201,151,46,0.32)",
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
            EKD <span style={{ color: "#C9972E" }}>Digital</span>
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
            border: "1px solid rgba(201,151,46,0.5)",
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
            ekddigital.com
          </p>
        </div>
      </div>

      {/* ── GOLD GRADIENT SEPARATOR ── */}
      <div
        style={{
          position: "absolute",
          top: 72,
          left: 0,
          right: 0,
          height: 3,
          background:
            "linear-gradient(to right, transparent, #C9972E 20%, #e6b84a 50%, #C9972E 80%, transparent)",
        }}
      />

      {/* ══════════════════════════════════════════════════════════════
          SECTION 2 — DUAL IMAGE STRIP  (top: 75, height: 157)
      ══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          top: 75,
          left: 0,
          right: 0,
          height: 157,
          display: "flex",
          zIndex: 2,
        }}
      >
        {/* ── Left panel: Academic Writing ── */}
        <div
          style={{
            width: 269,
            height: 157,
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
                "linear-gradient(to bottom, rgba(7,9,15,0.28) 0%, rgba(7,9,15,0.08) 45%, rgba(7,9,15,0.76) 100%)",
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
                color: "#e6c258",
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
            height: 157,
            background:
              "linear-gradient(to bottom, transparent 0%, #C9972E 25%, #e6b84a 50%, #C9972E 75%, transparent 100%)",
            flexShrink: 0,
          }}
        />

        {/* ── Right panel: App & Web Development ── */}
        <div
          style={{
            flex: 1,
            height: 157,
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
                "linear-gradient(to bottom, rgba(7,9,15,0.28) 0%, rgba(7,9,15,0.08) 45%, rgba(7,9,15,0.76) 100%)",
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
                color: "#e6c258",
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
          top: 75,
          left: 0,
          right: 0,
          height: 157,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 5,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            background: "rgba(7,9,15,0.74)",
            border: "1.5px solid rgba(201,151,46,0.68)",
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
            WE BUILD. <span style={{ color: "#C9972E" }}>WE WRITE.</span>
          </p>
          <p
            style={{
              margin: "3px 0 0",
              fontSize: 9,
              fontWeight: 700,
              color: "#eef2f7",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textShadow: "0 1px 3px rgba(0,0,0,0.8)",
            }}
          >
            Your Academic &amp; Tech Partner
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 3 — PAIN POINTS  (top: 232, height: 120)
      ══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          top: 232,
          left: 0,
          right: 0,
          height: 120,
          padding: "10px 20px 7px",
          zIndex: 2,
        }}
      >
        {/* Section label */}
        <div
          style={{
            borderLeft: "3px solid #C9972E",
            paddingLeft: 8,
            marginBottom: 8,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 11,
              fontWeight: 900,
              color: "#e6c258",
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
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              marginBottom: 5,
            }}
          >
            <span
              style={{
                color: "#C9972E",
                fontSize: 14,
                fontWeight: 900,
                lineHeight: 1.2,
                flexShrink: 0,
                marginTop: 0,
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
          top: 352,
          left: 20,
          right: 20,
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(201,151,46,0.4) 20%, rgba(201,151,46,0.4) 80%, transparent)",
        }}
      />

      {/* ══════════════════════════════════════════════════════════════
          SECTION 4 — SERVICES  (top: 353, height: 115)
      ══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          top: 353,
          left: 0,
          right: 0,
          height: 115,
          padding: "7px 18px 10px",
          boxSizing: "border-box",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: 16,
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
          <span style={{ color: "#e6c258" }}>EKD Digital</span> is here to help
          you with:
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            columnGap: 7,
            rowGap: 6,
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
                  ? "rgba(201,151,46,0.2)"
                  : "rgba(255,255,255,0.07)",
                border: highlight
                  ? "1px solid rgba(201,151,46,0.6)"
                  : "1px solid rgba(255,255,255,0.13)",
                borderRadius: 20,
                padding: "6px 9px",
                boxSizing: "border-box",
                fontSize: 13.5,
                lineHeight: 1,
                color: highlight ? "#fffef8" : "#f1f5f9",
                fontWeight: highlight ? 800 : 650,
                boxShadow: highlight ? "0 2px 8px rgba(201,151,46,0.10)" : undefined,
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
          top: 468,
          left: 0,
          right: 0,
          height: 2.5,
          background:
            "linear-gradient(to right, transparent, #C9972E 15%, #e6b84a 50%, #C9972E 85%, transparent)",
        }}
      />

      {/* ══════════════════════════════════════════════════════════════
          SECTION 5 — CTA + CONTACT  (top: 470.5, bottom: 0 ≈204.5 px)
      ══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          top: 470.5,
          left: 0,
          right: 0,
          bottom: 0,
          padding: "11px 20px 16px",
          background: "rgba(7, 9, 15, 0.98)",
          zIndex: 2,
        }}
      >
        {/* Hook line */}
        <p
          style={{
            margin: "0 0 6px",
            fontSize: 12.5,
            fontWeight: 900,
            color: "#ffffff",
            textAlign: "center",
            letterSpacing: "0.01em",
            textShadow: "0 1px 3px rgba(0,0,0,0.5)",
          }}
        >
          We&apos;re just a <span style={{ color: "#C9972E" }}>button</span>{" "}
          away —{" "}
          <span
            style={{
              fontWeight: 650,
              fontStyle: "italic",
              color: "#e2e8f0",
              textShadow: "0 1px 2px rgba(0,0,0,0.55)",
            }}
          >
            reach out today!
          </span>
        </p>

        {/* CTA bar */}
        <div
          style={{
            background:
              "linear-gradient(135deg, #a87222 0%, #C9972E 40%, #e6b84a 100%)",
            borderRadius: 7,
            padding: "6px 20px",
            textAlign: "center",
            marginBottom: 6,
            boxShadow: "0 4px 18px rgba(201,151,46,0.35)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 11.5,
              fontWeight: 900,
              color: "#07090f",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            GET YOUR FREE CONSULTATION →
          </p>
        </div>

        {/* Contact 2 × 2 grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6px 14px",
            justifyItems: "center",
            alignItems: "start",
            marginTop: 0,
          }}
        >
          {(
            [
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
                value: "ekddigital.com",
                gold: true,
              },
            ] as {
              icon: string;
              label: string;
              value: string;
              gold?: boolean;
            }[]
          ).map(({ icon, label, value, gold }) => (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1 }}>
                {icon}
              </span>
              <p
                style={{
                  margin: 0,
                  fontSize: 8.2,
                  color: "#c4c9d4",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  lineHeight: 1.2,
                  fontWeight: 800,
                  textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                }}
              >
                {label}
              </p>
              <p
                style={{
                  margin: "1px 0 0",
                  paddingBottom: 1,
                  fontSize: 10.9,
                  color: gold ? "#e6c258" : "#ffffff",
                  fontWeight: 800,
                  lineHeight: 1.28,
                  letterSpacing: "0.01em",
                  textShadow: "0 1px 2px rgba(0,0,0,0.55)",
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
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
        height: 675,
        canvasWidth: 1080,
        canvasHeight: 1350,
        backgroundColor: "#07090f",
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
          style={{ background: "#C9972E", color: "#07090f" }}
          className="hover:opacity-90 font-bold"
        >
          <Download className="size-4 mr-2" />
          {downloading ? "Preparing…" : "Download PNG (1080 × 1350)"}
        </Button>
        <Button
          variant="outline"
          onClick={printFlyer}
          style={{ borderColor: "#C9972E", color: "#C9972E" }}
          className="hover:bg-[#C9972E]/10"
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
          border: "1px solid rgba(201,151,46,0.25)",
        }}
      >
        <div
          ref={flyerRef}
          style={{
            width: 540,
            height: 675,
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
