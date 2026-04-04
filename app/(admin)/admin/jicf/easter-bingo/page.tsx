"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Printer, Download } from "lucide-react";

// ── JICF Colors ────────────────────────────────────────────────────────────────
const C = {
  navy: "#190570",
  red: "#ed1c24",
  gold: "#d4af37",
  yellow: "#efe31e",
  cream: "#fffef8",
  dark: "#0d0040",
};

// ── 25 Bingo Squares ─────────────────────────────────────────────────────────
// Row-major order. Center (index 12) is FREE.
const SQUARES: string[] = [
  // Row 1 — B column
  "Has arrived in Jinan in the last 6 months",
  "Has 3 or more siblings",
  "Sings in the Worship \u0026 Praise team",
  "Was born in spring\n(Mar, Apr or May)",
  "Has served as an Usher at JICF",

  // Row 2 — I column
  "Has been in China for 7 or more years",
  "Has never gone back home since first arriving in China",
  "Has given a testimony in front of the church",
  "Can speak 3 or more languages",
  "Has served in the Prayer Ministry",

  // Row 3 — N column
  "Has attended a sunrise Easter service before",
  "Has been a part of JICF for more than 2 years",
  "✝ FREE ✝\nWrite your own name",
  "Is meeting someone completely new for the first time today",
  "Can recite John 3:16 from memory",

  // Row 4 — G column
  "Is from a country where French is an official language",
  "Is currently serving in a church ministry",
  "Has celebrated Chinese New Year in China",
  "Has eaten something at a Chinese table they couldn\u2019t identify — and loved it",
  "Joined JICF in 2025 or 2026",

  // Row 5 — O column
  "Can name all 12 disciples of Jesus",
  "Was baptized at JICF",
  "Has taught a Sunday School or Bible Study class",
  "Is currently a university student",
  "Has lived in 3 or more countries",
];

const isFree = (i: number) => i === 12;

// ── Component ─────────────────────────────────────────────────────────────────
export default function EasterBingoPage() {
  const handlePrint = () => window.print();

  return (
    <>
      {/* ── Print styles ── */}
      <style>{`
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        @media print {
          body * { visibility: hidden; }
          #bingo-printable, #bingo-printable * { visibility: visible; }
          #bingo-printable { position: fixed; inset: 0; }
          #no-print { display: none !important; }
        }
        @page { size: A4 portrait; margin: 0; }
      `}</style>

      {/* ── Screen toolbar ── */}
      <div
        id="no-print"
        className="flex items-center justify-between bg-white border-b px-6 py-3 shadow-sm"
      >
        <div>
          <h1 className="text-xl font-bold" style={{ color: C.navy }}>
            JICF Easter Bingo Card
          </h1>
          <p className="text-sm text-gray-500">
            Print one copy per player · ~50–60 copies recommended
          </p>
          <p className="text-xs text-amber-600 font-medium mt-1">
            ⚠ In the print dialog, enable <strong>Background graphics</strong> to print colors correctly.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handlePrint} className="gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button
            onClick={handlePrint}
            className="gap-2 text-white"
            style={{ backgroundColor: C.red }}
          >
            <Download className="h-4 w-4" />
            Save as PDF
          </Button>
        </div>
      </div>

      {/* ── Printable card ── */}
      <div
        id="bingo-printable"
        style={{
          width: "210mm",
          minHeight: "297mm",
          margin: "0 auto",
          backgroundColor: C.cream,
          fontFamily: "Georgia, serif",
          display: "flex",
          flexDirection: "column",
          padding: "10mm 10mm 8mm",
          boxSizing: "border-box",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            backgroundColor: C.navy,
            borderRadius: "6px 6px 0 0",
            padding: "8px 14px 6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left: cross emblem */}
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              backgroundColor: C.gold,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ color: C.navy, fontSize: 22, fontWeight: "bold" }}>
              ✝
            </span>
          </div>

          {/* Centre text */}
          <div style={{ textAlign: "center", flex: 1, padding: "0 10px" }}>
            <div
              style={{
                color: C.gold,
                fontSize: "11px",
                letterSpacing: "2px",
                fontWeight: "bold",
              }}
            >
              JINAN INTERNATIONAL CHRISTIAN FELLOWSHIP
            </div>
            <div
              style={{
                color: "#fff",
                fontSize: "20px",
                fontWeight: "bold",
                marginTop: 2,
                letterSpacing: "1px",
              }}
            >
              EASTER HUMAN BINGO
            </div>
            <div style={{ color: C.yellow, fontSize: "10px", marginTop: 1 }}>
              Easter Celebration · April 5, 2026 · &ldquo;He is risen indeed!&rdquo; ✝
            </div>
          </div>

          {/* Right: JICF badge */}
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              border: `2px solid ${C.gold}`,
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              padding: 2,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/JICF_LOGO1.png"
              alt="JICF"
              style={{ width: 34, height: 34, objectFit: "contain" }}
            />
          </div>
        </div>

        {/* ── Gold accent bar ── */}
        <div style={{ height: 4, backgroundColor: C.gold }} />

        {/* ── Instructions ── */}
        <div
          style={{
            backgroundColor: C.navy,
            padding: "5px 14px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <span style={{ color: C.yellow, fontSize: "9px", lineHeight: "1.5" }}>
            <strong style={{ color: "#fff" }}>HOW TO PLAY: </strong>
            You have <strong style={{ color: C.yellow }}>15 minutes</strong> — walk around and find someone who matches each square. Ask them to{" "}
            <strong style={{ color: C.gold }}>sign their name</strong> in that box.{" "}
            Each person may sign your card <strong style={{ color: C.gold }}>only once</strong>.{" "}
            When time is called, the player with the{" "}
            <strong style={{ color: C.gold }}>most completed rows, columns, or diagonals</strong> shouts{" "}
            <strong style={{ color: C.yellow }}>&ldquo;ALLELUIA!&rdquo;</strong> and wins!{" "}
            <strong style={{ color: C.gold }}>Grand Prize:</strong>{" "}
            <strong style={{ color: C.yellow }}>fill all 24 squares!</strong>
          </span>
        </div>

        {/* ── Red divider ── */}
        <div style={{ height: 3, backgroundColor: C.red }} />

        {/* ── Player name line ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "5px 4px",
            borderBottom: `1px solid ${C.gold}`,
            marginBottom: 6,
          }}
        >
          <span
            style={{ fontSize: "10px", color: C.dark, whiteSpace: "nowrap" }}
          >
            Player Name:
          </span>
          <div
            style={{
              flex: 1,
              borderBottom: `1.5px solid ${C.navy}`,
              height: 16,
            }}
          />
          <span
            style={{ fontSize: "10px", color: C.dark, whiteSpace: "nowrap", marginLeft: 16 }}
          >
            Home Country:
          </span>
          <div
            style={{
              flex: 1,
              borderBottom: `1.5px solid ${C.navy}`,
              height: 16,
            }}
          />
        </div>

        {/* ── B·I·N·G·O column headers ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 3,
            marginBottom: 3,
          }}
        >
          {["B", "I", "N", "G", "O"].map((letter) => (
            <div
              key={letter}
              style={{
                backgroundColor: C.red,
                color: "#fff",
                fontWeight: "bold",
                fontSize: "18px",
                textAlign: "center",
                padding: "4px 0",
                borderRadius: "3px",
                letterSpacing: "2px",
              }}
            >
              {letter}
            </div>
          ))}
        </div>

        {/* ── 5×5 Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 3,
            flex: 1,
          }}
        >
          {SQUARES.map((text, i) => (
            <BingoCell key={i} text={text} free={isFree(i)} index={i} />
          ))}
        </div>

        {/* ── Footer ── */}
        <div
          style={{
            marginTop: 6,
            borderTop: `2px solid ${C.gold}`,
            paddingTop: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "8px", color: C.dark }}>
            &ldquo;But now is Christ risen from the dead...&rdquo; — 1 Corinthians 15:20
          </span>
          <span
            style={{
              fontSize: "8px",
              color: C.navy,
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            JICF · JINAN, CHINA · EASTER 2026
          </span>
        </div>
      </div>
    </>
  );
}

// ── Bingo Cell ─────────────────────────────────────────────────────────────────
function BingoCell({
  text,
  free,
}: {
  text: string;
  free: boolean;
  index: number;
}) {
  return (
    <div
      style={{
        border: `1.5px solid ${free ? C.gold : C.navy}`,
        borderRadius: "4px",
        backgroundColor: free ? C.navy : C.cream,
        padding: "4px 5px 3px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 88,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle corner accent for non-free cells */}
      {!free && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 6,
            height: 6,
            backgroundColor: C.gold,
            borderBottomRightRadius: "4px",
          }}
        />
      )}

      {/* Question / label text */}
      <div
        style={{
          fontSize: free ? "12px" : "8.5px",
          fontWeight: free ? "bold" : "normal",
          color: free ? C.yellow : C.dark,
          textAlign: "center",
          lineHeight: 1.35,
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          whiteSpace: "pre-line",
          padding: "2px 2px 0",
        }}
      >
        {text}
      </div>

      {/* Signature area */}
      {!free && (
        <div style={{ marginTop: 4 }}>
          <div
            style={{
              borderBottom: `1px solid ${C.navy}`,
              height: 14,
              width: "100%",
              opacity: 0.6,
            }}
          />
          <div
            style={{
              fontSize: "6.5px",
              color: C.navy,
              textAlign: "center",
              opacity: 0.7,
              marginTop: 1,
            }}
          >
            signature
          </div>
        </div>
      )}
    </div>
  );
}
