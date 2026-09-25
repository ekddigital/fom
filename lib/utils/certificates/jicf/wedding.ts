/**
 * JICF Wedding Certificate — filled Harmon–Barvor record.
 * Literal text only. The designer preview strips unknown {{tokens}} down to
 * their names, so this template must not contain brace placeholders.
 * No QR element. Certificate id is plain text.
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
      id: "page-yellow",
      type: "shape",
      content: "",
      position: { x: 0, y: 0, width: 1000, height: 707 },
      style: { color: YELLOW },
    },
    {
      id: "gold-band",
      type: "shape",
      content: "",
      position: { x: 14, y: 14, width: 972, height: 679 },
      style: { color: GOLD },
    },
    {
      id: "inner-panel",
      type: "shape",
      content: "",
      position: { x: 26, y: 26, width: 948, height: 655 },
      style: { color: CREAM },
    },
    {
      id: "jicf-logo",
      type: "image",
      content: "/JICF_LOGO1.png",
      position: { x: 48, y: 40, width: 118, height: 118 },
      style: {},
    },
    {
      id: "church-name",
      type: "text",
      content: "JINAN INTERNATIONAL CHRISTIAN FELLOWSHIP",
      position: { x: 180, y: 48, width: 760, height: 36 },
      style: {
        fontSize: 20,
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
      position: { x: 180, y: 88, width: 760, height: 24 },
      style: {
        fontSize: 16,
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
      position: { x: 48, y: 168, width: 904, height: 42 },
      style: {
        fontSize: 34,
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
      position: { x: 330, y: 214, width: 340, height: 6 },
      style: { color: YELLOW, borderRadius: "3px" },
    },
    {
      id: "certificate-id",
      type: "text",
      content: "Certificate ID: JICF-2026-WED-0001",
      position: { x: 48, y: 226, width: 904, height: 22 },
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
      position: { x: 56, y: 254, width: 888, height: 48 },
      style: {
        fontSize: 16,
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
      position: { x: 56, y: 304, width: 888, height: 52 },
      style: {
        fontSize: 15,
        fontFamily: "serif",
        color: INK,
        textAlign: "center",
        lineHeight: "1.35",
      },
    },
    {
      id: "bride-label",
      type: "text",
      content: "BRIDE",
      position: { x: 56, y: 362, width: 420, height: 16 },
      style: {
        fontSize: 12,
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
      position: { x: 56, y: 380, width: 420, height: 32 },
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
      id: "and-mark",
      type: "text",
      content: "&",
      position: { x: 470, y: 378, width: 60, height: 32 },
      style: {
        fontSize: 22,
        fontFamily: "serif",
        fontWeight: "bold",
        color: GOLD,
        textAlign: "center",
      },
    },
    {
      id: "groom-label",
      type: "text",
      content: "GROOM",
      position: { x: 524, y: 362, width: 420, height: 16 },
      style: {
        fontSize: 12,
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
      position: { x: 524, y: 380, width: 420, height: 32 },
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
      position: { x: 64, y: 422, width: 872, height: 58 },
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
      id: "officiant-heading",
      type: "text",
      content: "OFFICIANT VERIFICATION",
      position: { x: 48, y: 488, width: 440, height: 18 },
      style: {
        fontSize: 13,
        fontFamily: "serif",
        fontWeight: "bold",
        color: NAVY,
        textAlign: "center",
      },
    },
    {
      id: "officiant-testimony",
      type: "text",
      content:
        "I hereby solemnly testify that this marriage ceremony has been legally and spiritually performed by me.",
      position: { x: 48, y: 508, width: 440, height: 36 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: INK,
        textAlign: "center",
        lineHeight: "1.3",
      },
    },
    {
      id: "officiant-name",
      type: "text",
      content: "Pastor (Officiant): Joseph Summers",
      position: { x: 48, y: 544, width: 440, height: 18 },
      style: {
        fontSize: 13,
        fontFamily: "serif",
        fontWeight: "bold",
        color: NAVY,
        textAlign: "center",
      },
    },
    {
      id: "officiant-signature",
      type: "image",
      content: "/pastor_Joe_signaturepng.png",
      position: { x: 150, y: 560, width: 200, height: 48 },
      style: {},
    },
    {
      id: "officiant-date",
      type: "text",
      content: "26 September 2026",
      position: { x: 48, y: 608, width: 440, height: 16 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: INK,
        textAlign: "center",
      },
    },
    {
      id: "officiant-line",
      type: "shape",
      content: "",
      position: { x: 120, y: 628, width: 280, height: 2 },
      style: { color: NAVY },
    },
    {
      id: "officiant-sign-label",
      type: "text",
      content: "Signature & Date",
      position: { x: 120, y: 632, width: 280, height: 16 },
      style: {
        fontSize: 11,
        fontFamily: "serif",
        fontStyle: "italic",
        color: INK,
        textAlign: "center",
      },
    },
    {
      id: "witness-heading",
      type: "text",
      content: "WITNESS TESTIFICATION",
      position: { x: 512, y: 488, width: 440, height: 18 },
      style: {
        fontSize: 13,
        fontFamily: "serif",
        fontWeight: "bold",
        color: NAVY,
        textAlign: "center",
      },
    },
    {
      id: "witness-testimony",
      type: "text",
      content:
        "We, the undersigned witnesses, were present at this holy wedding ceremony and confirm the authenticity of this marriage covenant.",
      position: { x: 512, y: 508, width: 440, height: 40 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: INK,
        textAlign: "center",
        lineHeight: "1.3",
      },
    },
    {
      id: "witness-1-label",
      type: "text",
      content: "Witness 1",
      position: { x: 520, y: 556, width: 190, height: 16 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        fontWeight: "bold",
        color: RED,
        textAlign: "center",
      },
    },
    {
      id: "witness-1-line",
      type: "shape",
      content: "",
      position: { x: 530, y: 628, width: 170, height: 2 },
      style: { color: NAVY },
    },
    {
      id: "witness-1-sign",
      type: "text",
      content: "Signature",
      position: { x: 520, y: 632, width: 190, height: 16 },
      style: {
        fontSize: 11,
        fontFamily: "serif",
        fontStyle: "italic",
        color: INK,
        textAlign: "center",
      },
    },
    {
      id: "witness-2-label",
      type: "text",
      content: "Witness 2",
      position: { x: 740, y: 556, width: 190, height: 16 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        fontWeight: "bold",
        color: RED,
        textAlign: "center",
      },
    },
    {
      id: "witness-2-line",
      type: "shape",
      content: "",
      position: { x: 750, y: 628, width: 170, height: 2 },
      style: { color: NAVY },
    },
    {
      id: "witness-2-sign",
      type: "text",
      content: "Signature",
      position: { x: 740, y: 632, width: 190, height: 16 },
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
    background: { color: YELLOW },
  },
  fonts: [{ family: "serif", variants: ["normal", "bold", "italic"] }],
};
