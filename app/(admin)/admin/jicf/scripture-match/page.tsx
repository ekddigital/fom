"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Printer, BookOpen } from "lucide-react";

// ── JICF Colors ───────────────────────────────────────────────────────────────
const C = {
  navy: "#190570",
  red: "#ed1c24",
  gold: "#d4af37",
  yellow: "#efe31e",
  cream: "#fffef8",
  dark: "#0d0040",
  lightGold: "#fdf6dc",
};

type Category = "easter" | "popular" | "harder";

interface Verse {
  id: number;
  ref: string;
  text: string;
  category: Category;
}

const CATEGORY_META: Record<
  Category,
  { label: string; bg: string; color: string }
> = {
  easter: { label: "Easter / Resurrection", bg: "#fef2f2", color: C.red },
  popular: { label: "Popular Verse", bg: "#eff6ff", color: C.navy },
  harder: { label: "Deeper Study", bg: "#f5f3ff", color: "#7c3aed" },
};

// ── 25 Verse Pairs ────────────────────────────────────────────────────────────
// 12 Easter/Resurrection · 8 Popular · 5 Harder
const VERSES: Verse[] = [
  // ── Easter / Resurrection ──────────────────────────────────────────────────
  {
    id: 1,
    ref: "Matthew 28:6",
    category: "easter",
    text: "He is not here; he has risen, just as he said. Come and see the place where he lay.",
  },
  {
    id: 2,
    ref: "John 11:25",
    category: "easter",
    text: "Jesus said to her, \u2018I am the resurrection and the life. The one who believes in me will live, even though they die.\u2019",
  },
  {
    id: 3,
    ref: "Romans 6:9",
    category: "easter",
    text: "For we know that since Christ was raised from the dead, he cannot die again; death no longer has mastery over him.",
  },
  {
    id: 4,
    ref: "1 Corinthians 15:20",
    category: "easter",
    text: "But Christ has indeed been raised from the dead, the firstfruits of those who have fallen asleep.",
  },
  {
    id: 5,
    ref: "Acts 2:24",
    category: "easter",
    text: "But God raised him from the dead, freeing him from the agony of death, because it was impossible for death to keep its hold on him.",
  },
  {
    id: 6,
    ref: "Revelation 1:18",
    category: "easter",
    text: "I am the Living One; I was dead, and now look, I am alive for ever and ever! And I hold the keys of death and Hades.",
  },
  {
    id: 7,
    ref: "Luke 24:6\u20137",
    category: "easter",
    text: "He is not here; he has risen! Remember how he told you, while he was still with you in Galilee: \u2018The Son of Man must be delivered over to the hands of sinners, be crucified and on the third day be raised again.\u2019",
  },
  {
    id: 8,
    ref: "1 Corinthians 15:55",
    category: "easter",
    text: "Where, O death, is your victory? Where, O death, is your sting?",
  },
  {
    id: 9,
    ref: "John 20:29",
    category: "easter",
    text: "Then Jesus told him, \u2018Because you have seen me, you have believed; blessed are those who have not seen and yet have believed.\u2019",
  },
  {
    id: 10,
    ref: "1 Peter 1:3",
    category: "easter",
    text: "Praise be to the God and Father of our Lord Jesus Christ! In his great mercy he has given us new birth into a living hope through the resurrection of Jesus Christ from the dead.",
  },
  {
    id: 11,
    ref: "Isaiah 53:5",
    category: "easter",
    text: "But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed.",
  },
  {
    id: 12,
    ref: "Romans 4:25",
    category: "easter",
    text: "He was delivered over to death for our sins and was raised to life for our justification.",
  },

  // ── Popular / Well-known ───────────────────────────────────────────────────
  {
    id: 13,
    ref: "John 3:16",
    category: "popular",
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
  },
  {
    id: 14,
    ref: "Philippians 4:13",
    category: "popular",
    text: "I can do all this through him who gives me strength.",
  },
  {
    id: 15,
    ref: "Jeremiah 29:11",
    category: "popular",
    text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
  },
  {
    id: 16,
    ref: "Psalm 23:1",
    category: "popular",
    text: "The Lord is my shepherd, I lack nothing.",
  },
  {
    id: 17,
    ref: "Proverbs 3:5\u20136",
    category: "popular",
    text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
  },
  {
    id: 18,
    ref: "Romans 5:8",
    category: "popular",
    text: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.",
  },
  {
    id: 19,
    ref: "Hebrews 13:8",
    category: "popular",
    text: "Jesus Christ is the same yesterday and today and forever.",
  },
  {
    id: 20,
    ref: "Romans 8:28",
    category: "popular",
    text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
  },

  // ── Harder / Deeper Study ──────────────────────────────────────────────────
  {
    id: 21,
    ref: "Colossians 3:1",
    category: "harder",
    text: "Since, then, you have been raised with Christ, set your hearts on things above, where Christ is, seated at the right hand of God.",
  },
  {
    id: 22,
    ref: "Romans 10:9",
    category: "harder",
    text: "If you declare with your mouth, \u2018Jesus is Lord,\u2019 and believe in your heart that God raised him from the dead, you will be saved.",
  },
  {
    id: 23,
    ref: "Galatians 2:20",
    category: "harder",
    text: "I have been crucified with Christ and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me.",
  },
  {
    id: 24,
    ref: "Ephesians 2:8\u20139",
    category: "harder",
    text: "For it is by grace you have been saved, through faith\u2014and this is not from yourselves, it is the gift of God\u2014not by works, so that no one can boast.",
  },
  {
    id: 25,
    ref: "2 Timothy 2:8",
    category: "harder",
    text: "Remember Jesus Christ, raised from the dead, descended from David. This is my gospel.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function ScriptureMatchPage() {
  const [printMode, setPrintMode] = useState<"ref" | "verse" | "all" | "master">("all");

  const handlePrint = (mode: "ref" | "verse" | "all" | "master") => {
    setPrintMode(mode);
    setTimeout(() => window.print(), 120);
  };

  return (
    <>
      {/* ── Global print styles ── */}
      <style>{`
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        @media print {
          body * { visibility: hidden; }
          #scripture-printable, #scripture-printable * { visibility: visible; }
          #scripture-printable { position: fixed; inset: 0; overflow: visible; }
          .no-print { display: none !important; }
        }
        @page { size: A4 portrait; margin: 8mm; }
        .slip { break-inside: avoid; page-break-inside: avoid; }
        .section-break { break-after: page; page-break-after: always; height: 0; }
      `}</style>

      {/* ── Screen toolbar ── */}
      <div className="no-print flex items-start justify-between bg-white border-b px-6 py-4 shadow-sm gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="h-5 w-5" style={{ color: C.navy }} />
            <h1 className="text-xl font-bold" style={{ color: C.navy }}>
              Scripture Match-Up
            </h1>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: C.lightGold, color: C.dark }}
            >
              JICF Easter 2026
            </span>
          </div>
          <p className="text-sm text-gray-500">
            25 verse pairs · 50 slips · up to 50 players
          </p>
          <p className="text-xs text-amber-600 font-medium mt-1">
            ⚠ In the print dialog, enable{" "}
            <strong>Background graphics</strong> to print colors correctly.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          <Button
            variant="outline"
            onClick={() => handlePrint("master")}
            className="gap-2 text-xs"
          >
            <Printer className="h-3.5 w-3.5" />
            Master List
          </Button>
          <Button
            variant="outline"
            onClick={() => handlePrint("ref")}
            className="gap-2 text-xs"
            style={{ borderColor: C.navy, color: C.navy }}
          >
            <Printer className="h-3.5 w-3.5" />
            Reference Slips
          </Button>
          <Button
            variant="outline"
            onClick={() => handlePrint("verse")}
            className="gap-2 text-xs"
            style={{ borderColor: C.red, color: C.red }}
          >
            <Printer className="h-3.5 w-3.5" />
            Verse Slips
          </Button>
          <Button
            onClick={() => handlePrint("all")}
            className="gap-2 text-xs text-white"
            style={{ backgroundColor: C.navy }}
          >
            <Printer className="h-3.5 w-3.5" />
            Print All Slips
          </Button>
        </div>
      </div>

      {/* ── Organizer instructions (screen only) ── */}
      <div className="no-print max-w-4xl mx-auto px-6 py-6 space-y-6">
        {/* How to run */}
        <div className="rounded-xl border-2 p-5" style={{ borderColor: C.gold, backgroundColor: C.lightGold }}>
          <h2 className="font-bold text-base mb-3" style={{ color: C.dark }}>
            ✝ How to Run This Game
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
            {[
              { step: "1", title: "Print & Cut", desc: "Print the Reference slips and Verse slips separately. Cut along the dashed lines." },
              { step: "2", title: "Fold & Separate", desc: "Fold each slip so the text faces in. Place navy slips in one basket, cream slips in another." },
              { step: "3", title: "Distribute", desc: "Each person draws one slip from either basket at random. Tell them NOT to open it yet." },
              { step: "4", title: "Say GO!", desc: "Everyone opens their slip. People with References shout their verse address; people with Verses read their text aloud. They mingle until they find their match!" },
              { step: "5", title: "First 3 Pairs Win", desc: "The first 3 matched pairs to come to you and read the verse together win a prize." },
              { step: "6", title: "Read Aloud", desc: "Once all pairs have matched, go around and have each pair read their completed verse aloud. The room fills with Scripture!" },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                  style={{ backgroundColor: C.navy }}
                >
                  {step}
                </div>
                <div>
                  <div className="font-semibold" style={{ color: C.dark }}>{title}</div>
                  <div className="text-xs text-gray-600 mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verse list by category */}
        <div>
          <h2 className="font-bold text-base mb-3" style={{ color: C.dark }}>
            All 25 Verse Pairs
          </h2>
          <div className="space-y-1">
            {(["easter", "popular", "harder"] as Category[]).map((cat) => (
              <details key={cat} open className="rounded-lg overflow-hidden border">
                <summary
                  className="px-4 py-2 cursor-pointer font-semibold text-sm flex items-center gap-2"
                  style={{ backgroundColor: CATEGORY_META[cat].bg, color: CATEGORY_META[cat].color }}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: CATEGORY_META[cat].color }}
                  />
                  {CATEGORY_META[cat].label} ({VERSES.filter((v) => v.category === cat).length} pairs)
                </summary>
                <div className="divide-y">
                  {VERSES.filter((v) => v.category === cat).map((v) => (
                    <div key={v.id} className="px-4 py-2 flex gap-3 text-sm hover:bg-gray-50">
                      <span
                        className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold shrink-0 mt-0.5"
                        style={{ backgroundColor: CATEGORY_META[cat].color }}
                      >
                        {v.id}
                      </span>
                      <div>
                        <div className="font-semibold text-gray-800">{v.ref}</div>
                        <div className="text-gray-500 text-xs mt-0.5 italic">&ldquo;{v.text}&rdquo;</div>
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* ── PRINTABLE SECTION ── */}
      <div id="scripture-printable" style={{ fontFamily: "Georgia, serif" }}>

        {/* ════════════════ MASTER LIST (organizer reference) ════════════════ */}
        {(printMode === "master") && (
          <div style={{ padding: "10mm", backgroundColor: "#fff" }}>
            {/* Header */}
            <div
              style={{
                backgroundColor: C.navy,
                borderRadius: 6,
                padding: "8px 14px",
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ color: C.gold, fontWeight: "bold", fontSize: 14, letterSpacing: 1 }}>
                JICF · SCRIPTURE MATCH-UP
              </div>
              <div style={{ color: C.yellow, fontSize: 10 }}>ORGANIZER MASTER LIST · Easter 2026</div>
            </div>
            <div style={{ height: 3, backgroundColor: C.gold, marginBottom: 10 }} />

            {/* Instructions to organizer */}
            <div
              style={{
                border: `1px solid ${C.gold}`,
                borderRadius: 6,
                padding: "6px 10px",
                marginBottom: 10,
                backgroundColor: C.lightGold,
                fontSize: 9,
                lineHeight: 1.6,
                color: C.dark,
              }}
            >
              <strong>Keep this sheet with you during the game.</strong> Use pair numbers (#01–#25) to verify matches instantly.
              First 3 pairs to match correctly win a prize. After all match, have each pair read their verse aloud.
            </div>

            {/* Pair grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "5px" }}>
              {VERSES.map((v) => (
                <div
                  key={v.id}
                  style={{
                    border: `1px solid ${CATEGORY_META[v.category].color}`,
                    borderRadius: 5,
                    padding: "5px 7px",
                    backgroundColor: CATEGORY_META[v.category].bg,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        backgroundColor: CATEGORY_META[v.category].color,
                        color: "#fff",
                        fontSize: 8,
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {String(v.id).padStart(2, "0")}
                    </span>
                    <span style={{ fontWeight: "bold", fontSize: 10, color: C.dark }}>{v.ref}</span>
                    <span
                      style={{
                        marginLeft: "auto",
                        fontSize: 7,
                        color: CATEGORY_META[v.category].color,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      {v.category}
                    </span>
                  </div>
                  <div style={{ fontSize: 8, color: "#555", fontStyle: "italic", lineHeight: 1.4 }}>
                    &ldquo;{v.text.length > 100 ? v.text.slice(0, 97) + "…" : v.text}&rdquo;
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 10, borderTop: `2px solid ${C.gold}`, paddingTop: 4, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 8, color: C.dark }}>
                &ldquo;He is risen indeed!&rdquo; · 1 Corinthians 15:20
              </span>
              <span style={{ fontSize: 8, color: C.navy, fontWeight: "bold" }}>
                JICF · JINAN, CHINA · EASTER 2026
              </span>
            </div>
          </div>
        )}

        {/* ════════════════ REFERENCE SLIPS (navy) ════════════════ */}
        {(printMode === "ref" || printMode === "all") && (
          <>
            {/* Section cover page */}
            <div
              style={{
                backgroundColor: C.navy,
                padding: "10mm",
                minHeight: printMode === "ref" ? "0" : "40mm",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderRadius: printMode === "ref" ? 0 : 6,
                marginBottom: printMode === "ref" ? "6mm" : "6mm",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ color: C.gold, fontSize: 10, letterSpacing: 3, fontWeight: "bold", marginBottom: 4 }}>
                  JINAN INTERNATIONAL CHRISTIAN FELLOWSHIP
                </div>
                <div style={{ color: "#fff", fontSize: 18, fontWeight: "bold", letterSpacing: 1 }}>
                  SCRIPTURE MATCH-UP
                </div>
                <div style={{ color: C.yellow, fontSize: 9, marginTop: 3 }}>
                  Easter Celebration · April 5, 2026
                </div>
                <div
                  style={{
                    marginTop: 8,
                    display: "inline-block",
                    border: `1px solid ${C.gold}`,
                    borderRadius: 4,
                    padding: "3px 10px",
                    color: C.gold,
                    fontSize: 9,
                    letterSpacing: 1,
                  }}
                >
                  ✂ SECTION A &nbsp;·&nbsp; REFERENCE SLIPS (navy) &nbsp;·&nbsp; 25 SLIPS
                </div>
                <div style={{ color: C.yellow, fontSize: 8, marginTop: 6, opacity: 0.8 }}>
                  Cut along dashed lines · Fold · Place in basket
                </div>
              </div>
            </div>

            {/* 2-column slip grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "4mm",
                padding: "0 2mm",
              }}
            >
              {VERSES.map((v) => (
                <RefSlip key={v.id} verse={v} />
              ))}
            </div>
          </>
        )}

        {/* Page break between sections */}
        {printMode === "all" && <div className="section-break" />}

        {/* ════════════════ VERSE SLIPS (cream) ════════════════ */}
        {(printMode === "verse" || printMode === "all") && (
          <>
            {/* Section cover */}
            <div
              style={{
                backgroundColor: C.cream,
                border: `3px solid ${C.navy}`,
                padding: "6mm 10mm",
                minHeight: printMode === "verse" ? "0" : "40mm",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderRadius: 6,
                marginBottom: "6mm",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ color: C.navy, fontSize: 10, letterSpacing: 3, fontWeight: "bold", marginBottom: 4 }}>
                  JINAN INTERNATIONAL CHRISTIAN FELLOWSHIP
                </div>
                <div style={{ color: C.dark, fontSize: 18, fontWeight: "bold", letterSpacing: 1 }}>
                  SCRIPTURE MATCH-UP
                </div>
                <div style={{ color: C.red, fontSize: 9, marginTop: 3 }}>
                  Easter Celebration · April 5, 2026
                </div>
                <div
                  style={{
                    marginTop: 8,
                    display: "inline-block",
                    border: `1px solid ${C.navy}`,
                    borderRadius: 4,
                    padding: "3px 10px",
                    color: C.navy,
                    fontSize: 9,
                    letterSpacing: 1,
                  }}
                >
                  ✂ SECTION B &nbsp;·&nbsp; VERSE SLIPS (cream) &nbsp;·&nbsp; 25 SLIPS
                </div>
                <div style={{ color: C.dark, fontSize: 8, marginTop: 6, opacity: 0.7 }}>
                  Cut along dashed lines · Fold · Place in basket
                </div>
              </div>
            </div>

            {/* 2-column slip grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "4mm",
                padding: "0 2mm",
              }}
            >
              {VERSES.map((v) => (
                <VerseSlip key={v.id} verse={v} />
              ))}
            </div>
          </>
        )}

        {/* Footer (only when printing slips) */}
        {printMode !== "master" && (
          <div
            style={{
              marginTop: "6mm",
              borderTop: `2px solid ${C.gold}`,
              paddingTop: 4,
              display: "flex",
              justifyContent: "space-between",
              padding: "4px 2mm",
            }}
          >
            <span style={{ fontSize: 7, color: C.dark }}>
              &ldquo;But now is Christ risen from the dead…&rdquo; — 1 Corinthians 15:20
            </span>
            <span style={{ fontSize: 7, color: C.navy, fontWeight: "bold", letterSpacing: 1 }}>
              JICF · JINAN, CHINA · EASTER 2026
            </span>
          </div>
        )}
      </div>
    </>
  );
}

// ── Reference Slip (navy) ─────────────────────────────────────────────────────
function RefSlip({ verse }: { verse: Verse }) {
  return (
    <div
      className="slip"
      style={{
        border: `2px dashed ${C.gold}`,
        borderRadius: 6,
        backgroundColor: C.navy,
        padding: "6px 9px",
        minHeight: "62mm",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      {/* Scissors hint */}
      <div
        style={{
          position: "absolute",
          top: -10,
          left: 6,
          color: C.gold,
          fontSize: 9,
          opacity: 0.6,
        }}
      >
        ✂
      </div>

      {/* Header */}
      <div
        style={{
          borderBottom: `1px solid ${C.gold}`,
          paddingBottom: 4,
          marginBottom: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            color: C.gold,
            fontSize: 7,
            letterSpacing: 2,
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          ✝ Reference Slip ✝
        </span>
        <span
          style={{
            color: C.gold,
            fontSize: 7,
            fontWeight: "bold",
            opacity: 0.7,
          }}
        >
          #{String(verse.id).padStart(2, "0")}
        </span>
      </div>

      {/* Reference text */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          padding: "4px 0",
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            letterSpacing: 0.5,
            lineHeight: 1.2,
          }}
        >
          {verse.ref}
        </div>
        <div
          style={{
            color: C.gold,
            fontSize: 7.5,
            textAlign: "center",
            opacity: 0.8,
            letterSpacing: 0.5,
          }}
        >
          — New International Version —
        </div>
      </div>

      {/* Prompt */}
      <div
        style={{
          borderTop: `1px solid ${C.gold}`,
          paddingTop: 4,
          marginTop: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ color: C.yellow, fontSize: 7.5, fontStyle: "italic" }}>
          Find the matching verse text!
        </span>
        <span style={{ color: C.gold, fontSize: 6.5, opacity: 0.7 }}>
          JICF · Easter 2026
        </span>
      </div>
    </div>
  );
}

// ── Verse Slip (cream) ────────────────────────────────────────────────────────
function VerseSlip({ verse }: { verse: Verse }) {
  return (
    <div
      className="slip"
      style={{
        border: `2px dashed ${C.navy}`,
        borderRadius: 6,
        backgroundColor: C.cream,
        padding: "6px 9px",
        minHeight: "62mm",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      {/* Scissors hint */}
      <div
        style={{
          position: "absolute",
          top: -10,
          left: 6,
          color: C.navy,
          fontSize: 9,
          opacity: 0.4,
        }}
      >
        ✂
      </div>

      {/* Header */}
      <div
        style={{
          borderBottom: `1px solid ${C.navy}`,
          paddingBottom: 4,
          marginBottom: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            color: C.navy,
            fontSize: 7,
            letterSpacing: 2,
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          ✝ Verse Slip ✝
        </span>
        <span
          style={{
            color: C.navy,
            fontSize: 7,
            fontWeight: "bold",
            opacity: 0.6,
          }}
        >
          #{String(verse.id).padStart(2, "0")}
        </span>
      </div>

      {/* Verse text */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2px 0",
        }}
      >
        <div
          style={{
            color: C.dark,
            fontSize: verse.text.length > 120 ? 8 : verse.text.length > 80 ? 9 : 10,
            fontStyle: "italic",
            textAlign: "center",
            lineHeight: 1.55,
          }}
        >
          &ldquo;{verse.text}&rdquo;
        </div>
      </div>

      {/* Prompt */}
      <div
        style={{
          borderTop: `1px solid ${C.navy}`,
          paddingTop: 4,
          marginTop: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ color: C.red, fontSize: 7.5, fontStyle: "italic" }}>
          Find the matching reference!
        </span>
        <span style={{ color: C.navy, fontSize: 6.5, opacity: 0.7 }}>
          JICF · Easter 2026
        </span>
      </div>
    </div>
  );
}
