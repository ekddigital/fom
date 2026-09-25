/**
 * JICF Wedding Certificate — filled Harmon–Barvor record for the designer.
 * Literal text only, so the preview cannot fall back to {brideName} tokens.
 * No QR. Certificate id is JICF-2026-WED-0001.
 */

import { CertificateTemplate } from "../types";
import { JICF_COLORS } from "./constants";

const NAVY = JICF_COLORS.blue;
const RED = JICF_COLORS.red;
const GOLD = JICF_COLORS.gold ?? "#d4af37";
const CREAM = "#fffde7";
const INK = JICF_COLORS.darkGray;

export const jicfWeddingCertificate: CertificateTemplate = {
  id: "jicf-wedding-certificate",
  name: "Marriage Certificate",
  description:
    "Official Jinan International Christian Fellowship marriage certificate for Mr. Joshua Bosco Barvor and Miss Ruphine Manaweh Harmon. Landscape, no QR code.",
  organization: "jicf",
  category: "wedding",
  elements: [
    {
      id: "navy-rule",
      type: "shape",
      content: "",
      position: { x: 0, y: 0, width: 1000, height: 707 },
      style: { color: NAVY },
    },
    {
      id: "inner-panel",
      type: "shape",
      content: "",
      position: { x: 6, y: 6, width: 988, height: 695 },
      style: { color: CREAM },
    },
    {
      id: "jicf-logo",
      type: "image",
      content: "/JICF_LOGO1.png",
      position: { x: 44, y: 28, width: 96, height: 96 },
      style: {},
    },
    {
      id: "church-name",
      type: "text",
      content: "JINAN INTERNATIONAL CHRISTIAN FELLOWSHIP",
      position: { x: 150, y: 32, width: 800, height: 28 },
      style: {
        fontSize: 20,
        fontFamily: "serif",
        fontWeight: "bold",
        color: NAVY,
        textAlign: "center",
      },
    },
    {
      id: "place",
      type: "text",
      content:
        "Building 13, Sanlizhuang Community\nJinan, Shandong, P.R. China",
      position: { x: 150, y: 60, width: 800, height: 34 },
      style: {
        fontSize: 13,
        fontFamily: "serif",
        fontWeight: "bold",
        color: NAVY,
        textAlign: "center",
      },
    },
    {
      id: "church-subtitle",
      type: "text",
      content: "Official Marriage Certification",
      position: { x: 150, y: 96, width: 800, height: 20 },
      style: {
        fontSize: 15,
        fontFamily: "serif",
        fontStyle: "italic",
        fontWeight: "bold",
        color: RED,
        textAlign: "center",
      },
    },
    {
      id: "certificate-title",
      type: "text",
      content: "MARRIAGE CERTIFICATE",
      position: { x: 40, y: 118, width: 920, height: 36 },
      style: {
        fontSize: 32,
        fontFamily: "serif",
        fontWeight: "bold",
        color: NAVY,
        textAlign: "center",
      },
    },
    {
      id: "title-underline",
      type: "shape",
      content: "",
      position: { x: 370, y: 156, width: 260, height: 3 },
      style: { color: GOLD, borderRadius: "2px" },
    },
    {
      id: "certificate-id",
      type: "text",
      content: "Certificate ID: JICF-2026-WED-0001",
      position: { x: 40, y: 164, width: 920, height: 18 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        fontWeight: "bold",
        color: NAVY,
        textAlign: "center",
      },
    },
    {
      id: "certification",
      type: "text",
      content:
        "This is to certify that on the 26th day of September, 2026, a sacred marriage ceremony was solemnly officiated and completed in Hangzhou, China.",
      position: { x: 48, y: 188, width: 904, height: 40 },
      style: {
        fontSize: 15,
        fontFamily: "serif",
        color: INK,
        textAlign: "center",
        lineHeight: "1.35",
      },
    },
    {
      id: "oversight",
      type: "text",
      content:
        "The holy matrimony was celebrated under the authority and pastoral oversight of Jinan International Christian Fellowship, uniting the below two persons in lawful and sacred marriage before God and witnesses.",
      position: { x: 56, y: 228, width: 888, height: 44 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        color: INK,
        textAlign: "center",
        lineHeight: "1.35",
      },
    },
    {
      id: "husband-display",
      type: "text",
      content: "Mr. Joshua Bosco Barvor",
      position: { x: 80, y: 274, width: 840, height: 28 },
      style: {
        fontSize: 22,
        fontFamily: "serif",
        fontWeight: "bold",
        fontStyle: "italic",
        color: RED,
        textAlign: "center",
      },
    },
    {
      id: "wife-display",
      type: "text",
      content: "Miss Ruphine Manaweh Harmon",
      position: { x: 80, y: 302, width: 840, height: 28 },
      style: {
        fontSize: 22,
        fontFamily: "serif",
        fontWeight: "bold",
        fontStyle: "italic",
        color: RED,
        textAlign: "center",
      },
    },
    {
      id: "covenant",
      type: "text",
      content:
        "The two individuals have willingly entered into the covenant of marriage, promising to love, honor, cherish, and abide with one another, for better or for worse, in sickness and in health, till death do them part, according to the sacred teachings of the Christian faith.",
      position: { x: 56, y: 334, width: 888, height: 52 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        fontStyle: "italic",
        color: NAVY,
        textAlign: "center",
        lineHeight: "1.35",
      },
    },
    {
      id: "husband-line",
      type: "shape",
      content: "",
      position: { x: 150, y: 408, width: 280, height: 2 },
      style: { color: NAVY },
    },
    {
      id: "husband-caption",
      type: "text",
      content: "(Husband's signature)",
      position: { x: 130, y: 414, width: 320, height: 16 },
      style: {
        fontSize: 13,
        fontFamily: "serif",
        fontStyle: "italic",
        color: INK,
        textAlign: "center",
      },
    },
    {
      id: "wife-line",
      type: "shape",
      content: "",
      position: { x: 150, y: 468, width: 280, height: 2 },
      style: { color: NAVY },
    },
    {
      id: "wife-caption",
      type: "text",
      content: "(Wife's signature)",
      position: { x: 130, y: 474, width: 320, height: 16 },
      style: {
        fontSize: 13,
        fontFamily: "serif",
        fontStyle: "italic",
        color: INK,
        textAlign: "center",
      },
    },
    {
      id: "witness-1-line",
      type: "shape",
      content: "",
      position: { x: 570, y: 408, width: 280, height: 2 },
      style: { color: NAVY },
    },
    {
      id: "witness-1-sign",
      type: "text",
      content: "(Witness 1)",
      position: { x: 550, y: 414, width: 320, height: 16 },
      style: {
        fontSize: 13,
        fontFamily: "serif",
        fontStyle: "italic",
        color: INK,
        textAlign: "center",
      },
    },
    {
      id: "witness-2-line",
      type: "shape",
      content: "",
      position: { x: 570, y: 468, width: 280, height: 2 },
      style: { color: NAVY },
    },
    {
      id: "witness-2-sign",
      type: "text",
      content: "(Witness 2)",
      position: { x: 550, y: 474, width: 320, height: 16 },
      style: {
        fontSize: 13,
        fontFamily: "serif",
        fontStyle: "italic",
        color: INK,
        textAlign: "center",
      },
    },
    {
      id: "marriage-note",
      type: "text",
      content: "This marriage was celebrated between us",
      position: { x: 180, y: 512, width: 640, height: 18 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        color: INK,
        textAlign: "center",
      },
    },
    {
      id: "presence",
      type: "text",
      content: "In the Presence of",
      position: { x: 250, y: 534, width: 500, height: 18 },
      style: {
        fontSize: 13,
        fontFamily: "serif",
        fontStyle: "italic",
        color: INK,
        textAlign: "center",
      },
    },
    {
      id: "pastor-signature",
      type: "image",
      content: "/pastor_Joe_signaturepng.png",
      position: { x: 420, y: 554, width: 160, height: 40 },
      style: {},
    },
    {
      id: "pastor-name",
      type: "text",
      content: "Pastor Joseph Summers",
      position: { x: 250, y: 598, width: 500, height: 18 },
      style: {
        fontSize: 15,
        fontFamily: "serif",
        fontWeight: "bold",
        color: NAVY,
        textAlign: "center",
      },
    },
    {
      id: "pastor-role",
      type: "text",
      content: "(Officiating Minister)",
      position: { x: 250, y: 618, width: 500, height: 16 },
      style: {
        fontSize: 13,
        fontFamily: "serif",
        fontStyle: "italic",
        color: NAVY,
        textAlign: "center",
      },
    },
    {
      id: "pastor-date",
      type: "text",
      content: "26 September 2026",
      position: { x: 250, y: 636, width: 500, height: 16 },
      style: {
        fontSize: 13,
        fontFamily: "serif",
        fontWeight: "bold",
        color: NAVY,
        textAlign: "center",
      },
    },
  ],
  pageSettings: {
    width: 1000,
    height: 707,
    margin: { top: 12, right: 12, bottom: 12, left: 12 },
    background: { color: CREAM },
  },
  fonts: [{ family: "serif", variants: ["normal", "bold", "italic"] }],
};
