/**
 * KINGDOM Wedding Reception Card
 * Dongbo Enoch Kwateh & Fero Patience
 * Sat. 30th May, 2026 — Hangzhou City, 2PM
 *
 * Color Palette (KINGDOM Wedding):
 *   Sandstone   #D2B48C  — primary neutral / background
 *   Deep Emerald #00402E — primary accent / border / headers
 *   Coffee Bean  #3E2723 — depth / contrast details
 *   Crisp White  #FFFFFF — plates, floral highlights
 *   Gold Accent  #C9A84C — ornamental highlights
 */

import { CardTemplate } from "../types";

export const KINGDOM_WEDDING_COLORS = {
  sandstone: "#D2B48C",
  sandstoneDark: "#C4A882",
  sandstoneLight: "#EDD9B8",
  emerald: "#00402E",
  emeraldLight: "#005C40",
  coffee: "#3E2723",
  coffeeMid: "#5D3A32",
  white: "#FFFFFF",
  gold: "#C9A84C",
  goldLight: "#E8C97A",
  cream: "#FAF3E8",
};

const W = 600; // square card width
const H = 600; // square card height

export const kingdomWeddingReceptionCard: CardTemplate = {
  id: "kingdom-wedding-reception-2026",
  name: "KINGDOM Wedding — Reception Card",
  description:
    "Luxury square reception admission card for the Dongbo–Fero Royal Kingdom Wedding, 30th May 2026. Deep Emerald, Sandstone & Gold palette.",
  category: "invitation",
  settings: {
    width: W,
    height: H,
    backgroundColor: KINGDOM_WEDDING_COLORS.cream,
  },
  elements: [
    // ─── Full cream-parchment background ───────────────────────────────────
    {
      id: "bg-parchment",
      type: "decoration",
      content: `<div style="
        width:${W}px; height:${H}px;
        background: radial-gradient(ellipse at 50% 0%, #FDF6E9 0%, #F4E8CE 45%, #EDD9B8 100%);
      "></div>`,
      position: { x: 0, y: 0, width: W, height: H },
      style: { zIndex: 1 },
    },

    // ─── Outer gold border ─────────────────────────────────────────────────
    {
      id: "border-outer",
      type: "decoration",
      content: `<div style="
        width:${W - 12}px; height:${H - 12}px;
        border: 3px solid ${KINGDOM_WEDDING_COLORS.gold};
        border-radius: 4px;
      "></div>`,
      position: { x: 6, y: 6, width: W - 12, height: H - 12 },
      style: { zIndex: 5 },
    },

    // ─── Inner emerald border ──────────────────────────────────────────────
    {
      id: "border-inner",
      type: "decoration",
      content: `<div style="
        width:${W - 28}px; height:${H - 28}px;
        border: 1.5px solid ${KINGDOM_WEDDING_COLORS.emerald};
        border-radius: 2px;
        opacity: 0.7;
      "></div>`,
      position: { x: 14, y: 14, width: W - 28, height: H - 28 },
      style: { zIndex: 6 },
    },

    // ─── Top emerald header bar ────────────────────────────────────────────
    {
      id: "header-bar",
      type: "decoration",
      content: `<div style="
        width: ${W - 40}px; height: 38px;
        background: ${KINGDOM_WEDDING_COLORS.emerald};
        border-radius: 2px;
        display: flex; align-items: center; justify-content: center;
      "></div>`,
      position: { x: 20, y: 20, width: W - 40, height: 38 },
      style: { zIndex: 8 },
    },
    {
      id: "header-text",
      type: "text",
      content: "✦  ADMISSION  ✦  CARD  ✦  RECEPTION  ✦",
      position: { x: 20, y: 20, width: W - 40, height: 38 },
      style: {
        fontSize: 11,
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        color: KINGDOM_WEDDING_COLORS.goldLight,
        textAlign: "center",
        letterSpacing: "3px",
        zIndex: 9,
      },
    },

    // ─── Corner ornamental rosettes ────────────────────────────────────────
    {
      id: "corner-tl",
      type: "decoration",
      content: `<div style="
        width:28px; height:28px; border-radius:50%;
        border: 2px solid ${KINGDOM_WEDDING_COLORS.gold};
        display:flex; align-items:center; justify-content:center;
        background: ${KINGDOM_WEDDING_COLORS.emerald};
        color: ${KINGDOM_WEDDING_COLORS.goldLight}; font-size:13px;
      ">✦</div>`,
      position: { x: 5, y: 5, width: 28, height: 28 },
      style: { zIndex: 10 },
    },
    {
      id: "corner-tr",
      type: "decoration",
      content: `<div style="
        width:28px; height:28px; border-radius:50%;
        border: 2px solid ${KINGDOM_WEDDING_COLORS.gold};
        display:flex; align-items:center; justify-content:center;
        background: ${KINGDOM_WEDDING_COLORS.emerald};
        color: ${KINGDOM_WEDDING_COLORS.goldLight}; font-size:13px;
      ">✦</div>`,
      position: { x: W - 33, y: 5, width: 28, height: 28 },
      style: { zIndex: 10 },
    },
    {
      id: "corner-bl",
      type: "decoration",
      content: `<div style="
        width:28px; height:28px; border-radius:50%;
        border: 2px solid ${KINGDOM_WEDDING_COLORS.gold};
        display:flex; align-items:center; justify-content:center;
        background: ${KINGDOM_WEDDING_COLORS.emerald};
        color: ${KINGDOM_WEDDING_COLORS.goldLight}; font-size:13px;
      ">✦</div>`,
      position: { x: 5, y: H - 33, width: 28, height: 28 },
      style: { zIndex: 10 },
    },
    {
      id: "corner-br",
      type: "decoration",
      content: `<div style="
        width:28px; height:28px; border-radius:50%;
        border: 2px solid ${KINGDOM_WEDDING_COLORS.gold};
        display:flex; align-items:center; justify-content:center;
        background: ${KINGDOM_WEDDING_COLORS.emerald};
        color: ${KINGDOM_WEDDING_COLORS.goldLight}; font-size:13px;
      ">✦</div>`,
      position: { x: W - 33, y: H - 33, width: 28, height: 28 },
      style: { zIndex: 10 },
    },

    // ─── Monogram medallion ────────────────────────────────────────────────
    {
      id: "monogram-ring",
      type: "decoration",
      content: `<div style="
        width:64px; height:64px; border-radius:50%;
        background: ${KINGDOM_WEDDING_COLORS.emerald};
        border: 3px solid ${KINGDOM_WEDDING_COLORS.gold};
        box-shadow: 0 0 0 2px ${KINGDOM_WEDDING_COLORS.goldLight};
        display:flex; align-items:center; justify-content:center;
      "></div>`,
      position: { x: W / 2 - 32, y: 70, width: 64, height: 64 },
      style: { zIndex: 12 },
    },
    {
      id: "monogram-letters",
      type: "text",
      content: "E & P",
      position: { x: W / 2 - 32, y: 70, width: 64, height: 64 },
      style: {
        fontSize: 15,
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
        fontWeight: "bold",
        color: KINGDOM_WEDDING_COLORS.goldLight,
        textAlign: "center",
        zIndex: 13,
      },
    },

    // ─── Gold divider line ─────────────────────────────────────────────────
    {
      id: "divider-1",
      type: "decoration",
      content: `<div style="
        width: 440px; height: 1px;
        background: linear-gradient(to right, transparent, ${KINGDOM_WEDDING_COLORS.gold}, ${KINGDOM_WEDDING_COLORS.gold}, transparent);
      "></div>`,
      position: { x: 80, y: 144, width: 440, height: 1 },
      style: { zIndex: 8 },
    },

    // ─── "The Royal Kingdom Wedding" ──────────────────────────────────────
    {
      id: "label-kingdom",
      type: "text",
      content: "THE ROYAL KINGDOM WEDDING",
      position: { x: 40, y: 150, width: W - 80, height: 22 },
      style: {
        fontSize: 10,
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        color: KINGDOM_WEDDING_COLORS.emerald,
        textAlign: "center",
        letterSpacing: "4px",
        zIndex: 9,
      },
    },

    // ─── Calligraphic script "Wedding" ────────────────────────────────────
    {
      id: "script-wedding",
      type: "decoration",
      content: `<div style="
        font-family: 'Georgia', serif;
        font-size: 52px;
        font-style: italic;
        font-weight: bold;
        color: ${KINGDOM_WEDDING_COLORS.coffee};
        text-align: center;
        line-height: 1;
        text-shadow: 1px 1px 0 ${KINGDOM_WEDDING_COLORS.gold};
        width: 100%;
      ">Wedding</div>`,
      position: { x: 40, y: 174, width: W - 80, height: 64 },
      style: { zIndex: 9 },
    },

    // ─── "RECEPTION" subtitle ─────────────────────────────────────────────
    {
      id: "label-reception",
      type: "text",
      content: "— RECEPTION —",
      position: { x: 40, y: 240, width: W - 80, height: 22 },
      style: {
        fontSize: 12,
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        color: KINGDOM_WEDDING_COLORS.emerald,
        textAlign: "center",
        letterSpacing: "6px",
        zIndex: 9,
      },
    },

    // ─── Gold divider + rings ornament ────────────────────────────────────
    {
      id: "divider-rings",
      type: "decoration",
      content: `<div style="
        display:flex; align-items:center; justify-content:center; gap:8px;
        width:100%;
      ">
        <div style="flex:1; height:1px; background: linear-gradient(to right, transparent, ${KINGDOM_WEDDING_COLORS.gold});"></div>
        <div style="font-size:20px; letter-spacing:-4px; color:${KINGDOM_WEDDING_COLORS.gold};">💍</div>
        <div style="flex:1; height:1px; background: linear-gradient(to left, transparent, ${KINGDOM_WEDDING_COLORS.gold});"></div>
      </div>`,
      position: { x: 80, y: 268, width: 440, height: 24 },
      style: { zIndex: 9 },
    },

    // ─── Groom name ────────────────────────────────────────────────────────
    {
      id: "groom-name",
      type: "text",
      content: "DONGBO ENOCH KWATEH",
      position: { x: 40, y: 298, width: W / 2 - 48, height: 36 },
      style: {
        fontSize: 13,
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        color: KINGDOM_WEDDING_COLORS.coffee,
        textAlign: "right",
        letterSpacing: "1px",
        zIndex: 9,
      },
    },

    // ─── "& " connector ───────────────────────────────────────────────────
    {
      id: "connector-and",
      type: "decoration",
      content: `<div style="
        font-family: Georgia, serif;
        font-style: italic;
        font-size: 30px;
        color: ${KINGDOM_WEDDING_COLORS.gold};
        text-align: center;
        line-height: 1;
        width: 100%;
      ">&</div>`,
      position: { x: W / 2 - 18, y: 295, width: 36, height: 42 },
      style: { zIndex: 9 },
    },

    // ─── Bride name ────────────────────────────────────────────────────────
    {
      id: "bride-name",
      type: "text",
      content: "FERO PATIENCE",
      position: { x: W / 2 + 8, y: 298, width: W / 2 - 48, height: 36 },
      style: {
        fontSize: 13,
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        color: KINGDOM_WEDDING_COLORS.coffee,
        textAlign: "left",
        letterSpacing: "1px",
        zIndex: 9,
      },
    },

    // ─── Emerald detail bar (date section) ────────────────────────────────
    {
      id: "date-bar-bg",
      type: "decoration",
      content: `<div style="
        width:${W - 80}px; height:52px;
        background: ${KINGDOM_WEDDING_COLORS.emerald};
        border-radius: 3px;
        border-top: 2px solid ${KINGDOM_WEDDING_COLORS.goldLight};
        border-bottom: 2px solid ${KINGDOM_WEDDING_COLORS.goldLight};
      "></div>`,
      position: { x: 40, y: 344, width: W - 80, height: 52 },
      style: { zIndex: 8 },
    },
    {
      id: "date-text",
      type: "text",
      content: "Saturday · 30th May, 2026",
      position: { x: 40, y: 349, width: W - 80, height: 24 },
      style: {
        fontSize: 14,
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        color: KINGDOM_WEDDING_COLORS.goldLight,
        textAlign: "center",
        letterSpacing: "1px",
        zIndex: 10,
      },
    },
    {
      id: "venue-time-text",
      type: "text",
      content: "Hangzhou City  ·  2:00 PM",
      position: { x: 40, y: 373, width: W - 80, height: 20 },
      style: {
        fontSize: 11,
        fontFamily: "Georgia, serif",
        color: KINGDOM_WEDDING_COLORS.sandstoneLight,
        textAlign: "center",
        letterSpacing: "2px",
        zIndex: 10,
      },
    },

    // ─── Scripture verse ───────────────────────────────────────────────────
    {
      id: "verse",
      type: "text",
      content:
        '"Therefore a man shall leave his father and his mother\nand hold fast to his wife, and they shall become one flesh."\n— Genesis 2:24',
      position: { x: 60, y: 408, width: W - 120, height: 60 },
      style: {
        fontSize: 9.5,
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
        color: KINGDOM_WEDDING_COLORS.coffeeMid,
        textAlign: "center",
        lineHeight: 1.7,
        zIndex: 9,
      },
    },

    // ─── Gold divider ──────────────────────────────────────────────────────
    {
      id: "divider-2",
      type: "decoration",
      content: `<div style="
        width: 320px; height: 1px;
        background: linear-gradient(to right, transparent, ${KINGDOM_WEDDING_COLORS.gold}, transparent);
      "></div>`,
      position: { x: W / 2 - 160, y: 472, width: 320, height: 1 },
      style: { zIndex: 8 },
    },

    // ─── Blessing contribution line ────────────────────────────────────────
    {
      id: "contribution-label",
      type: "text",
      content: "✦  KINGDOM BLESSING  ✦",
      position: { x: 40, y: 478, width: W - 80, height: 18 },
      style: {
        fontSize: 9,
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        color: KINGDOM_WEDDING_COLORS.emerald,
        textAlign: "center",
        letterSpacing: "3px",
        zIndex: 9,
      },
    },
    {
      id: "contribution-text",
      type: "text",
      content:
        "All invitees are invited to bless the couple with a minimum gift\nof ¥100 at the reception. Your presence is our greatest gift.",
      position: { x: 50, y: 497, width: W - 100, height: 36 },
      style: {
        fontSize: 9,
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
        color: KINGDOM_WEDDING_COLORS.coffeeMid,
        textAlign: "center",
        lineHeight: 1.65,
        zIndex: 9,
      },
    },

    // ─── Bottom emerald footer bar ─────────────────────────────────────────
    {
      id: "footer-bar",
      type: "decoration",
      content: `<div style="
        width:${W - 40}px; height:34px;
        background: ${KINGDOM_WEDDING_COLORS.emerald};
        border-radius: 2px;
      "></div>`,
      position: { x: 20, y: H - 54, width: W - 40, height: 34 },
      style: { zIndex: 8 },
    },

    // ─── Recipient name slot ───────────────────────────────────────────────
    {
      id: "recipient-label",
      type: "text",
      content: "GUEST:",
      position: { x: 40, y: H - 50, width: 70, height: 26 },
      style: {
        fontSize: 9,
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        color: KINGDOM_WEDDING_COLORS.goldLight,
        textAlign: "left",
        letterSpacing: "2px",
        zIndex: 10,
      },
    },
    {
      id: "recipient-name",
      type: "text",
      content: "{{recipientName}}",
      position: { x: 110, y: H - 50, width: 270, height: 26 },
      style: {
        fontSize: 11,
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
        color: KINGDOM_WEDDING_COLORS.white,
        textAlign: "left",
        zIndex: 10,
      },
    },
    {
      id: "card-id-label",
      type: "text",
      content: "No.",
      position: { x: W - 110, y: H - 50, width: 28, height: 26 },
      style: {
        fontSize: 8,
        fontFamily: "Georgia, serif",
        color: KINGDOM_WEDDING_COLORS.goldLight,
        textAlign: "right",
        zIndex: 10,
      },
    },
    {
      id: "card-id",
      type: "text",
      content: "{{cardId}}",
      position: { x: W - 80, y: H - 50, width: 60, height: 26 },
      style: {
        fontSize: 8,
        fontFamily: "Georgia, serif",
        color: KINGDOM_WEDDING_COLORS.sandstoneLight,
        textAlign: "right",
        letterSpacing: "1px",
        zIndex: 10,
      },
    },
  ],
};
