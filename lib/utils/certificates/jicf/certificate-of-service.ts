/**
 * JICF Certificate of Service Template
 * Restored steward-focused design used for ministry service recognition.
 */

import { CertificateTemplate } from "../types";
import { JICF_COLORS } from "./constants";

export const jicfCertificateOfService: CertificateTemplate = {
  id: "jicf-certificate-of-service",
  name: "Certificate of Service",
  description:
    "Certificate recognizing faithful service in church ministries by JICF.",
  organization: "jicf",
  category: "service",
  elements: [
    {
      id: "outer-border",
      type: "shape",
      content: "",
      position: { x: 20, y: 20, width: 760, height: 560 },
      style: {
        color: JICF_COLORS.red,
        borderRadius: "8px",
      },
    },
    {
      id: "inner-border",
      type: "shape",
      content: "",
      position: { x: 40, y: 40, width: 720, height: 520 },
      style: {
        color: "#fffde7",
        borderRadius: "4px",
      },
    },
    {
      id: "inner-content-area",
      type: "shape",
      content: "",
      position: { x: 60, y: 60, width: 680, height: 480 },
      style: {
        color: JICF_COLORS.white,
        borderRadius: "4px",
      },
    },

    {
      id: "jicf-logo",
      type: "image",
      content: "/JICF_LOGO1.png",
      position: { x: 80, y: 80, width: 80, height: 80 },
      style: {},
    },
    {
      id: "church-name",
      type: "text",
      content: "JINAN INTERNATIONAL CHRISTIAN FELLOWSHIP",
      position: { x: 150, y: 85, width: 460, height: 30 },
      style: {
        fontSize: 18,
        fontFamily: "serif",
        fontWeight: "bold",
        color: JICF_COLORS.blue,
        textAlign: "center",
        lineHeight: "1.2",
      },
    },
    {
      id: "church-subtitle",
      type: "text",
      content: "(JICF)",
      position: { x: 180, y: 115, width: 480, height: 20 },
      style: {
        fontSize: 16,
        fontFamily: "serif",
        fontWeight: "bold",
        color: JICF_COLORS.red,
        textAlign: "center",
      },
    },

    {
      id: "certificate-title",
      type: "text",
      content: "CERTIFICATE OF SERVICE",
      position: { x: 80, y: 180, width: 640, height: 40 },
      style: {
        fontSize: 32,
        fontFamily: "serif",
        fontWeight: "bold",
        color: JICF_COLORS.blue,
        textAlign: "center",
      },
    },
    {
      id: "title-underline",
      type: "shape",
      content: "",
      position: { x: 250, y: 225, width: 300, height: 3 },
      style: {
        color: JICF_COLORS.yellow,
        borderRadius: "2px",
      },
    },

    {
      id: "presentation-text",
      type: "text",
      content: "This certificate is proudly presented to",
      position: { x: 80, y: 250, width: 640, height: 25 },
      style: {
        fontSize: 16,
        fontFamily: "serif",
        color: JICF_COLORS.darkGray,
        textAlign: "center",
      },
    },
    {
      id: "recipient-name",
      type: "text",
      content: "{{recipientName}}",
      position: { x: 80, y: 280, width: 640, height: 50 },
      style: {
        fontSize: 36,
        fontFamily: "serif",
        fontWeight: "bold",
        color: JICF_COLORS.red,
        textAlign: "center",
      },
    },
    {
      id: "recognition-text",
      type: "text",
      content:
        "in recognition to {{gender}} stewardship in the Body of Christ as",
      position: { x: 80, y: 335, width: 640, height: 25 },
      style: {
        fontSize: 16,
        fontFamily: "serif",
        color: JICF_COLORS.darkGray,
        textAlign: "center",
        letterSpacing: "0.5px",
      },
    },
    {
      id: "position-served",
      type: "text",
      content: "{{position}}",
      position: { x: 80, y: 365, width: 640, height: 50 },
      style: {
        fontSize: 22,
        fontFamily: "serif",
        fontWeight: "bold",
        color: JICF_COLORS.blue,
        textAlign: "center",
      },
    },

    {
      id: "bible-verse",
      type: "text",
      content:
        "God is not unjust; he will not forget your work and\nthe love you have shown him as you have helped\nhis people and continue to help them.",
      position: { x: 100, y: 430, width: 600, height: 60 },
      style: {
        fontSize: 13,
        fontFamily: "serif",
        fontStyle: "italic",
        color: JICF_COLORS.darkGray,
        textAlign: "center",
        lineHeight: "1.4",
      },
    },
    {
      id: "verse-reference",
      type: "text",
      content: "Hebrews 6:10 NIV",
      position: { x: 100, y: 495, width: 600, height: 20 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        fontWeight: "bold",
        color: JICF_COLORS.blue,
        textAlign: "center",
      },
    },

    {
      id: "pastor-signature",
      type: "image",
      content: "{{pastorSignature}}",
      group: "signature",
      position: { x: 140, y: 495, width: 130, height: 42 },
      style: {},
    },
    {
      id: "pastor-line",
      type: "shape",
      content: "",
      position: { x: 110, y: 535, width: 160, height: 1 },
      style: {
        color: JICF_COLORS.blue,
      },
    },
    {
      id: "pastor-name",
      type: "text",
      content: "{{pastorName}}",
      position: { x: 80, y: 540, width: 220, height: 18 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        fontWeight: "bold",
        color: JICF_COLORS.blue,
        textAlign: "center",
      },
    },
    {
      id: "pastor-title",
      type: "text",
      content: "JICF Senior Pastor",
      position: { x: 80, y: 558, width: 220, height: 14 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: JICF_COLORS.darkGray,
        textAlign: "center",
      },
    },
    {
      id: "date-line",
      type: "text",
      content: "Date",
      position: { x: 535, y: 523, width: 155, height: 14 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        fontWeight: "bold",
        color: JICF_COLORS.darkGray,
        textAlign: "center",
      },
    },
    {
      id: "issue-date",
      type: "text",
      content: "{{issueDate}}",
      position: { x: 535, y: 540, width: 155, height: 20 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: JICF_COLORS.darkGray,
        textAlign: "center",
      },
    },
    {
      id: "certificate-id-service",
      type: "text",
      content: "Certificate ID: {{certificateId}}",
      position: { x: 300, y: 525, width: 200, height: 15 },
      style: {
        fontSize: 10,
        fontFamily: "serif",
        color: JICF_COLORS.darkGray,
        textAlign: "center",
      },
    },
    {
      id: "digital-verification",
      type: "text",
      content: "Digitally Signed and Verified",
      position: { x: 300, y: 545, width: 200, height: 15 },
      style: {
        fontSize: 10,
        fontFamily: "serif",
        color: JICF_COLORS.blue,
        textAlign: "center",
        fontWeight: "bold",
      },
    },

    {
      id: "qr-code-service",
      type: "image",
      content: "{{qrCode}}",
      position: { x: 630, y: 80, width: 90, height: 90 },
      style: {
        borderRadius: "0px",
      },
    },
    {
      id: "qr-label-service",
      type: "text",
      content: "Scan to verify",
      position: { x: 630, y: 175, width: 90, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: JICF_COLORS.darkGray,
        textAlign: "center",
      },
    },

    {
      id: "left-decoration",
      type: "shape",
      content: "",
      position: { x: 80, y: 250, width: 30, height: 3 },
      style: {
        color: JICF_COLORS.yellow,
        borderRadius: "2px",
      },
    },
    {
      id: "right-decoration",
      type: "shape",
      content: "",
      position: { x: 690, y: 250, width: 30, height: 3 },
      style: {
        color: JICF_COLORS.yellow,
        borderRadius: "2px",
      },
    },
  ],
  pageSettings: {
    width: 800,
    height: 600,
    margin: { top: 20, right: 20, bottom: 20, left: 20 },
    background: {
      color: JICF_COLORS.white,
    },
  },
  fonts: [{ family: "serif", variants: ["normal", "bold", "italic"] }],
};
