/**
 * JULS Appreciation Certificate Templates
 */

import { CertificateTemplate } from "../types";
import { JULS_COLORS } from "./constants";

export const julsAppreciationCert: CertificateTemplate = {
  id: "juls-appreciation",
  name: "JULS Certificate of Appreciation",
  description:
    "Professional certificate for appreciating scholars for their wonderful contributions to the Jinan Union of Liberian Student and active involvement in student community activities.",
  organization: "juls",
  category: "appreciation",
  elements: [
    // Background and borders
    {
      id: "outer-border",
      type: "shape",
      content: "",
      position: { x: 20, y: 20, width: 760, height: 560 },
      style: {
        color: JULS_COLORS.blue,
        borderRadius: "8px",
      },
    },
    {
      id: "inner-border",
      type: "shape",
      content: "",
      position: { x: 40, y: 40, width: 720, height: 520 },
      style: {
        color: JULS_COLORS.white,
        borderRadius: "4px",
      },
    },

    // Header section with both logos
    {
      id: "juls-logo",
      type: "image",
      content: "/JULS_LOGO.png",
      position: { x: 60, y: 60, width: 80, height: 80 },
      style: {},
    },
    {
      id: "lsuic-logo",
      type: "image",
      content: "/LSUIC_LOGO.png",
      position: { x: 660, y: 60, width: 80, height: 80 },
      style: {},
    },
    {
      id: "organization-name",
      type: "text",
      content: "JINAN UNION OF LIBERIAN STUDENT",
      position: { x: 160, y: 65, width: 480, height: 30 },
      style: {
        fontSize: 22,
        fontFamily: "serif",
        fontWeight: "bold",
        color: JULS_COLORS.blue,
        textAlign: "center",
      },
    },
    {
      id: "parent-organization",
      type: "text",
      content: "Liberian Student Union In China (LSUIC)",
      position: { x: 160, y: 95, width: 480, height: 20 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: JULS_COLORS.red,
        textAlign: "center",
      },
    },
    {
      id: "location-tag",
      type: "text",
      content: "Jinan City, China",
      position: { x: 160, y: 115, width: 480, height: 20 },
      style: {
        fontSize: 11,
        fontFamily: "serif",
        color: JULS_COLORS.darkBlue,
        textAlign: "center",
      },
    },

    // Certificate title
    {
      id: "certificate-title",
      type: "text",
      content: "CERTIFICATE OF APPRECIATION",
      position: { x: 80, y: 170, width: 640, height: 40 },
      style: {
        fontSize: 28,
        fontFamily: "serif",
        fontWeight: "bold",
        color: JULS_COLORS.red,
        textAlign: "center",
      },
    },

    // Presentation text
    {
      id: "presented-to",
      type: "text",
      content: "This certificate is proudly presented to",
      position: { x: 80, y: 230, width: 640, height: 25 },
      style: {
        fontSize: 16,
        fontFamily: "serif",
        color: JULS_COLORS.darkBlue,
        textAlign: "center",
      },
    },

    // Recipient name
    {
      id: "recipient-name",
      type: "text",
      content: "{{recipientName}}",
      position: { x: 100, y: 270, width: 600, height: 50 },
      style: {
        fontSize: 34,
        fontFamily: "serif",
        fontWeight: "bold",
        color: JULS_COLORS.blue,
        textAlign: "center",
      },
    },

    // Description
    {
      id: "description",
      type: "text",
      content:
        "In grateful recognition of your outstanding dedication, active participation, and valuable contributions to the Jinan Union of Liberian Students. Your commitment to excellence and service to the Liberian student community exemplifies the spirit of unity and academic achievement.",
      position: { x: 100, y: 340, width: 600, height: 70 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        color: JULS_COLORS.darkBlue,
        textAlign: "center",
        lineHeight: "1.4",
      },
    },

    // Footer section
    {
      id: "date-issued",
      type: "text",
      content: "Date: {{issueDate}}",
      position: { x: 80, y: 460, width: 200, height: 20 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: JULS_COLORS.darkBlue,
        textAlign: "left",
      },
    },

    {
      id: "certificate-id",
      type: "text",
      content: "Certificate ID: {{certificateId}}",
      position: { x: 300, y: 460, width: 200, height: 20 },
      style: {
        fontSize: 10,
        fontFamily: "serif",
        color: JULS_COLORS.darkBlue,
        textAlign: "center",
      },
    },

    {
      id: "authorized-signature",
      type: "text",
      content: "Authorized by: {{issuerName}}",
      position: { x: 520, y: 460, width: 200, height: 20 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: JULS_COLORS.darkBlue,
        textAlign: "right",
      },
    },

    // QR Code
    {
      id: "qr-verification",
      type: "image",
      content: "{{qrCode}}",
      position: { x: 350, y: 490, width: 100, height: 100 },
      style: {},
    },

    // Decorative elements
    {
      id: "left-accent",
      type: "shape",
      content: "",
      position: { x: 60, y: 300, width: 15, height: 15 },
      style: {
        color: JULS_COLORS.red,
        borderRadius: "50%",
      },
    },
    {
      id: "right-accent",
      type: "shape",
      content: "",
      position: { x: 725, y: 300, width: 15, height: 15 },
      style: {
        color: JULS_COLORS.red,
        borderRadius: "50%",
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
