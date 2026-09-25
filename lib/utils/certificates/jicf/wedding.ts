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
const PAGE = "#fffef8";
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
      id: "red-band",
      type: "shape",
      content: "",
      position: { x: 0, y: 0, width: 1000, height: 707 },
      style: { color: RED },
    },
    {
      id: "inner-panel",
      type: "shape",
      content: "",
      position: { x: 22, y: 22, width: 956, height: 663 },
      style: { color: PAGE },
    },
    {
      id: "jicf-logo",
      type: "image",
      content: "/JICF_LOGO1.png",
      position: { x: 28, y: 26, width: 142, height: 142 },
      style: {},
    },
    {
      id: "church-name",
      type: "text",
      content: "JINAN INTERNATIONAL CHRISTIAN FELLOWSHIP",
      position: { x: 180, y: 30, width: 790, height: 34 },
      style: {
        fontSize: 26,
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
        "Building 13, Sanlizhuang Community, Jinan, Shandong, P.R. China",
      position: { x: 180, y: 66, width: 790, height: 46 },
      style: {
        fontSize: 18,
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
      position: { x: 180, y: 114, width: 790, height: 26 },
      style: {
        fontSize: 18,
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
      position: { x: 40, y: 150, width: 920, height: 46 },
      style: {
        fontSize: 40,
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
      position: { x: 360, y: 200, width: 280, height: 4 },
      style: { color: GOLD, borderRadius: "2px" },
    },
    {
      id: "certificate-id",
      type: "text",
      content: "Certificate ID: JICF-2026-WED-0001",
      position: { x: 40, y: 210, width: 920, height: 24 },
      style: {
        fontSize: 18,
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
      position: { x: 36, y: 240, width: 928, height: 46 },
      style: {
        fontSize: 18,
        fontFamily: "serif",
        color: INK,
        textAlign: "center",
        lineHeight: "1.22",
      },
    },
    {
      id: "oversight",
      type: "text",
      content:
        "The holy matrimony was celebrated under the authority and pastoral oversight of Jinan International Christian Fellowship, uniting the below two persons in lawful and sacred marriage before God and witnesses.",
      position: { x: 36, y: 292, width: 928, height: 48 },
      style: {
        fontSize: 18,
        fontFamily: "serif",
        color: INK,
        textAlign: "center",
        lineHeight: "1.22",
      },
    },
    {
      id: "husband-display",
      type: "text",
      content: "Mr. Joshua Bosco Barvor",
      position: { x: 50, y: 342, width: 900, height: 28 },
      style: {
        fontSize: 24,
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
      position: { x: 50, y: 372, width: 900, height: 28 },
      style: {
        fontSize: 24,
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
      position: { x: 36, y: 402, width: 928, height: 50 },
      style: {
        fontSize: 18,
        fontFamily: "serif",
        fontStyle: "italic",
        color: NAVY,
        textAlign: "center",
        lineHeight: "1.22",
      },
    },
    {
      id: "husband-line",
      type: "shape",
      content: "",
      position: { x: 110, y: 464, width: 310, height: 2 },
      style: { color: NAVY },
    },
    {
      id: "husband-caption",
      type: "text",
      content: "(Husband's signature)",
      position: { x: 90, y: 470, width: 350, height: 20 },
      style: {
        fontSize: 16,
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
      position: { x: 110, y: 506, width: 310, height: 2 },
      style: { color: NAVY },
    },
    {
      id: "wife-caption",
      type: "text",
      content: "(Wife's signature)",
      position: { x: 90, y: 512, width: 350, height: 20 },
      style: {
        fontSize: 16,
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
      position: { x: 580, y: 464, width: 310, height: 2 },
      style: { color: NAVY },
    },
    {
      id: "witness-1-sign",
      type: "text",
      content: "(Witness 1)",
      position: { x: 560, y: 470, width: 350, height: 20 },
      style: {
        fontSize: 16,
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
      position: { x: 580, y: 506, width: 310, height: 2 },
      style: { color: NAVY },
    },
    {
      id: "witness-2-sign",
      type: "text",
      content: "(Witness 2)",
      position: { x: 560, y: 512, width: 350, height: 20 },
      style: {
        fontSize: 16,
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
      position: { x: 150, y: 540, width: 700, height: 20 },
      style: {
        fontSize: 17,
        fontFamily: "serif",
        color: INK,
        textAlign: "center",
      },
    },
    {
      id: "presence",
      type: "text",
      content: "In the Presence of",
      position: { x: 200, y: 560, width: 600, height: 20 },
      style: {
        fontSize: 16,
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
      position: { x: 385, y: 580, width: 230, height: 28 },
      style: {},
    },
    {
      id: "pastor-name",
      type: "text",
      content: "Pastor Joseph Summers",
      position: { x: 180, y: 608, width: 640, height: 20 },
      style: {
        fontSize: 18,
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
      position: { x: 180, y: 628, width: 640, height: 20 },
      style: {
        fontSize: 16,
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
      position: { x: 180, y: 648, width: 640, height: 20 },
      style: {
        fontSize: 16,
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
    background: { color: "#ffffff" },
  },
  fonts: [{ family: "serif", variants: ["normal", "bold", "italic"] }],
};
