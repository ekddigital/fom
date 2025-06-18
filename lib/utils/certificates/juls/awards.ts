/**
 * JULS Award Certificate Templates
 */

import { CertificateTemplate } from "../types";
import { JULS_COLORS } from "./constants";

export const julsOutstandingAward: CertificateTemplate = {
  id: "juls-outstanding-award",
  name: "JULS Outstanding Contribution Award",
  description:
    "Premium certificate for recognizing members who have made outstanding contributions to work in Jinan city and beyond, demonstrating exceptional leadership and service.",
  organization: "juls",
  category: "award",
  elements: [
    // Gradient background header
    {
      id: "header-ribbon",
      type: "shape",
      content: "",
      position: { x: 0, y: 0, width: 800, height: 140 },
      style: {
        color: JULS_COLORS.blue,
      },
    },
    {
      id: "header-accent",
      type: "shape",
      content: "",
      position: { x: 0, y: 120, width: 800, height: 20 },
      style: {
        color: JULS_COLORS.red,
      },
    },

    // Logos in header
    {
      id: "juls-logo-bg-award",
      type: "shape",
      content: "",
      position: { x: 45, y: 25, width: 90, height: 90 },
      style: {
        color: JULS_COLORS.white,
        borderRadius: "50%",
      },
    },
    {
      id: "juls-logo-award",
      type: "image",
      content: "/JULS_LOGO.png",
      position: { x: 55, y: 38, width: 70, height: 70 },
      style: {},
    },
    {
      id: "lsuic-logo-award",
      type: "image",
      content: "/LSUIC_LOGO.png",
      position: { x: 670, y: 30, width: 80, height: 80 },
      style: {},
    },

    // Header text
    {
      id: "organization-name-award",
      type: "text",
      content: "JINAN UNION OF LIBERIAN STUDENT",
      position: { x: 150, y: 40, width: 500, height: 28 },
      style: {
        fontSize: 24,
        fontFamily: "serif",
        fontWeight: "bold",
        color: JULS_COLORS.white,
        textAlign: "center",
      },
    },
    {
      id: "parent-org-award",
      type: "text",
      content: "Liberian Student Union In China (LSUIC)",
      position: { x: 150, y: 72, width: 500, height: 20 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        color: JULS_COLORS.white,
        textAlign: "center",
      },
    },
    {
      id: "excellence-motto",
      type: "text",
      content: "Excellence Through Unity & Service",
      position: { x: 150, y: 95, width: 500, height: 18 },
      style: {
        fontSize: 13,
        fontFamily: "serif",
        fontStyle: "italic",
        color: JULS_COLORS.white,
        textAlign: "center",
      },
    },

    // Main certificate content
    {
      id: "award-title",
      type: "text",
      content: "OUTSTANDING CONTRIBUTION AWARD",
      position: { x: 50, y: 170, width: 700, height: 45 },
      style: {
        fontSize: 32,
        fontFamily: "serif",
        fontWeight: "bold",
        color: JULS_COLORS.blue,
        textAlign: "center",
      },
    },

    // Presentation text
    {
      id: "award-presentation",
      type: "text",
      content: "This award is presented to",
      position: { x: 100, y: 240, width: 600, height: 25 },
      style: {
        fontSize: 16,
        fontFamily: "serif",
        color: JULS_COLORS.darkBlue,
        textAlign: "center",
      },
    },

    // Recipient name
    {
      id: "recipient-name-award",
      type: "text",
      content: "{{recipientName}}",
      position: { x: 100, y: 280, width: 600, height: 50 },
      style: {
        fontSize: 36,
        fontFamily: "serif",
        fontWeight: "bold",
        color: JULS_COLORS.red,
        textAlign: "center",
      },
    },

    // Achievement description
    {
      id: "achievement-description",
      type: "text",
      content:
        "In recognition of your outstanding contributions, exceptional leadership, and unwavering commitment to advancing the mission of the Jinan Union of Liberian Students. Your dedication to excellence and service to the community embodies the highest ideals of our organization.",
      position: { x: 80, y: 350, width: 640, height: 70 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        color: JULS_COLORS.darkBlue,
        textAlign: "center",
        lineHeight: "1.4",
      },
    },

    // Signature section
    {
      id: "award-date",
      type: "text",
      content: "Awarded: {{issueDate}}",
      position: { x: 80, y: 470, width: 200, height: 20 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: JULS_COLORS.darkBlue,
        textAlign: "left",
      },
    },

    {
      id: "certificate-id-award",
      type: "text",
      content: "Certificate ID: {{certificateId}}",
      position: { x: 300, y: 470, width: 200, height: 20 },
      style: {
        fontSize: 10,
        fontFamily: "serif",
        color: JULS_COLORS.darkBlue,
        textAlign: "center",
      },
    },

    {
      id: "official-signature",
      type: "text",
      content: "Authorized by: {{issuerName}}",
      position: { x: 520, y: 470, width: 200, height: 20 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: JULS_COLORS.darkBlue,
        textAlign: "right",
      },
    },

    // QR Code for verification
    {
      id: "verification-qr",
      type: "image",
      content: "{{qrCode}}",
      position: { x: 350, y: 500, width: 100, height: 100 },
      style: {},
    },

    // Decorative elements
    {
      id: "award-star-left",
      type: "shape",
      content: "",
      position: { x: 50, y: 320, width: 20, height: 20 },
      style: {
        color: JULS_COLORS.gold,
        borderRadius: "50%",
      },
    },
    {
      id: "award-star-right",
      type: "shape",
      content: "",
      position: { x: 730, y: 320, width: 20, height: 20 },
      style: {
        color: JULS_COLORS.gold,
        borderRadius: "50%",
      },
    },

    // Security watermark
    {
      id: "security-watermark",
      type: "text",
      content: "JULS AWARD",
      position: { x: 250, y: 320, width: 300, height: 60 },
      style: {
        fontSize: 36,
        fontFamily: "serif",
        fontWeight: "bold",
        color: "rgba(16, 12, 102, 0.08)",
        textAlign: "center",
      },
    },
  ],
  pageSettings: {
    width: 800,
    height: 600,
    margin: { top: 20, right: 20, bottom: 20, left: 20 },
    background: {
      color: JULS_COLORS.white,
    },
  },
  fonts: [
    {
      family: "serif",
      variants: ["normal", "bold", "italic"],
    },
  ],
};
