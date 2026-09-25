/**
 * JICF Wedding Certificate — filled Harmon–Barvor record for the designer.
 * Literal text only, so the preview cannot fall back to {brideName} tokens.
 * No QR. Certificate id is JICF-2026-WED-0001.
 */

import { CertificateTemplate } from "../types";
import { JICF_COLORS } from "./constants";

const NAVY = JICF_COLORS.blue;
const RED = JICF_COLORS.red;
const YELLOW = JICF_COLORS.yellow ?? "#efe31e";
const GOLD = JICF_COLORS.gold ?? "#d4af37";
const CREAM = "#fffde7";
const INK = JICF_COLORS.darkGray;

export const jicfWeddingCertificate: CertificateTemplate = {
  id: "jicf-wedding-certificate",
  name: "Wedding Certificate",
  description:
    "Official Jinan International Christian Fellowship marriage certificate for Ruphine Manaweh Harmon and Joshua Bosco Barvor. Landscape, no QR code.",
  organization: "jicf",
  category: "wedding",
  elements: [
    {
      id: "red-rule",
      type: "shape",
      content: "",
      position: { x: 0, y: 0, width: 1000, height: 707 },
      style: { color: RED },
    },
    {
      id: "gold-rule",
      type: "shape",
      content: "",
      position: { x: 8, y: 8, width: 984, height: 691 },
      style: { color: GOLD },
    },
    {
      id: "navy-rule",
      type: "shape",
      content: "",
      position: { x: 14, y: 14, width: 972, height: 679 },
      style: { color: NAVY },
    },
    {
      id: "inner-panel",
      type: "shape",
      content: "",
      position: { x: 20, y: 20, width: 960, height: 667 },
      style: { color: CREAM },
    },
    {
      id: "jicf-logo",
      type: "image",
      content: "/JICF_LOGO1.png",
      position: { x: 48, y: 36, width: 108, height: 108 },
      style: {},
    },
    {
      id: "church-name",
      type: "text",
      content: "JINAN INTERNATIONAL CHRISTIAN FELLOWSHIP",
      position: { x: 170, y: 40, width: 780, height: 32 },
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
      position: { x: 170, y: 70, width: 780, height: 36 },
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
      position: { x: 170, y: 112, width: 780, height: 22 },
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
      content: "WEDDING CERTIFICATE",
      position: { x: 40, y: 150, width: 920, height: 44 },
      style: {
        fontSize: 36,
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
      position: { x: 360, y: 198, width: 280, height: 5 },
      style: { color: YELLOW, borderRadius: "2px" },
    },
    {
      id: "certificate-id",
      type: "text",
      content: "Certificate ID: JICF-2026-WED-0001",
      position: { x: 40, y: 210, width: 920, height: 20 },
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
        "This is to certify that on the 26th day of September, 2026, in Hangzhou, China, Ruphine Manaweh Harmon and Joshua Bosco Barvor were united in marriage.",
      position: { x: 56, y: 246, width: 888, height: 56 },
      style: {
        fontSize: 18,
        fontFamily: "serif",
        color: INK,
        textAlign: "center",
        lineHeight: "1.4",
      },
    },
    {
      id: "covenant",
      type: "text",
      content:
        "According to the ordinance of Christian marriage, they promise to love, honor, and cherish one another, for better or for worse, in sickness and in health, till death do them part.",
      position: { x: 70, y: 312, width: 860, height: 52 },
      style: {
        fontSize: 16,
        fontFamily: "serif",
        fontStyle: "italic",
        color: NAVY,
        textAlign: "center",
        lineHeight: "1.4",
      },
    },
    {
      id: "groom-role",
      type: "text",
      content: "GROOM",
      position: { x: 28, y: 390, width: 180, height: 16 },
      style: {
        fontSize: 11,
        fontFamily: "serif",
        fontWeight: "bold",
        color: NAVY,
        textAlign: "center",
      },
    },
    {
      id: "groom-name",
      type: "text",
      content: "Joshua Bosco Barvor",
      position: { x: 28, y: 408, width: 180, height: 36 },
      style: {
        fontSize: 13,
        fontFamily: "serif",
        fontWeight: "bold",
        color: NAVY,
        textAlign: "center",
      },
    },
    {
      id: "groom-line",
      type: "shape",
      content: "",
      position: { x: 40, y: 520, width: 156, height: 2 },
      style: { color: NAVY },
    },
    {
      id: "groom-sign",
      type: "text",
      content: "Signature",
      position: { x: 28, y: 526, width: 180, height: 16 },
      style: {
        fontSize: 11,
        fontFamily: "serif",
        fontStyle: "italic",
        color: INK,
        textAlign: "center",
      },
    },
    {
      id: "bride-role",
      type: "text",
      content: "BRIDE",
      position: { x: 214, y: 390, width: 190, height: 16 },
      style: {
        fontSize: 11,
        fontFamily: "serif",
        fontWeight: "bold",
        color: NAVY,
        textAlign: "center",
      },
    },
    {
      id: "bride-name",
      type: "text",
      content: "Ruphine Manaweh Harmon",
      position: { x: 214, y: 408, width: 190, height: 40 },
      style: {
        fontSize: 13,
        fontFamily: "serif",
        fontWeight: "bold",
        color: NAVY,
        textAlign: "center",
      },
    },
    {
      id: "bride-line",
      type: "shape",
      content: "",
      position: { x: 228, y: 520, width: 162, height: 2 },
      style: { color: NAVY },
    },
    {
      id: "bride-sign",
      type: "text",
      content: "Signature",
      position: { x: 214, y: 526, width: 190, height: 16 },
      style: {
        fontSize: 11,
        fontFamily: "serif",
        fontStyle: "italic",
        color: INK,
        textAlign: "center",
      },
    },
    {
      id: "witness-1-role",
      type: "text",
      content: "WITNESS 1",
      position: { x: 410, y: 390, width: 170, height: 16 },
      style: {
        fontSize: 11,
        fontFamily: "serif",
        fontWeight: "bold",
        color: NAVY,
        textAlign: "center",
      },
    },
    {
      id: "witness-1-line",
      type: "shape",
      content: "",
      position: { x: 422, y: 520, width: 146, height: 2 },
      style: { color: NAVY },
    },
    {
      id: "witness-1-sign",
      type: "text",
      content: "Signature",
      position: { x: 410, y: 526, width: 170, height: 16 },
      style: {
        fontSize: 11,
        fontFamily: "serif",
        fontStyle: "italic",
        color: INK,
        textAlign: "center",
      },
    },
    {
      id: "witness-2-role",
      type: "text",
      content: "WITNESS 2",
      position: { x: 586, y: 390, width: 170, height: 16 },
      style: {
        fontSize: 11,
        fontFamily: "serif",
        fontWeight: "bold",
        color: NAVY,
        textAlign: "center",
      },
    },
    {
      id: "witness-2-line",
      type: "shape",
      content: "",
      position: { x: 598, y: 520, width: 146, height: 2 },
      style: { color: NAVY },
    },
    {
      id: "witness-2-sign",
      type: "text",
      content: "Signature",
      position: { x: 586, y: 526, width: 170, height: 16 },
      style: {
        fontSize: 11,
        fontFamily: "serif",
        fontStyle: "italic",
        color: INK,
        textAlign: "center",
      },
    },
    {
      id: "pastor-role",
      type: "text",
      content: "PASTOR (OFFICIANT)",
      position: { x: 760, y: 378, width: 210, height: 16 },
      style: {
        fontSize: 11,
        fontFamily: "serif",
        fontWeight: "bold",
        color: NAVY,
        textAlign: "center",
      },
    },
    {
      id: "pastor-name",
      type: "text",
      content: "Pastor Joseph Summers",
      position: { x: 760, y: 396, width: 210, height: 28 },
      style: {
        fontSize: 13,
        fontFamily: "serif",
        fontWeight: "bold",
        color: NAVY,
        textAlign: "center",
      },
    },
    {
      id: "pastor-signature",
      type: "image",
      content: "/pastor_Joe_signaturepng.png",
      position: { x: 790, y: 428, width: 150, height: 52 },
      style: {},
    },
    {
      id: "pastor-date",
      type: "text",
      content: "26th September 2026",
      position: { x: 760, y: 482, width: 210, height: 16 },
      style: {
        fontSize: 11,
        fontFamily: "serif",
        color: INK,
        textAlign: "center",
      },
    },
    {
      id: "pastor-line",
      type: "shape",
      content: "",
      position: { x: 778, y: 520, width: 174, height: 2 },
      style: { color: NAVY },
    },
    {
      id: "pastor-sign",
      type: "text",
      content: "Signature & Date",
      position: { x: 760, y: 526, width: 210, height: 16 },
      style: {
        fontSize: 11,
        fontFamily: "serif",
        fontStyle: "italic",
        color: INK,
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
