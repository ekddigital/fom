/**
 * Professional Certificate Templates for Fishers of Men
 * Beautiful, professional certificate designs with FOM branding
 */

import { TemplateData } from "./certificate";
import { generateWatermarkData } from "./certificate-security";

// FOM Color Palette
export const FOM_COLORS = {
  // Primary colors
  primary: "#0c436a",
  primaryDeep: "#172554",

  // Secondary colors
  secondary: "#2596be",
  accent: "#436c87",
  accentDark: "#2c4a54",

  // Neutral colors
  lightGray: "#bababa",
  darkGray: "#505050",
  veryLightGray: "#e5e5e5",
  mediumGray: "#7c7c7b",
  darkWarmGray: "#5c5c54",
  mediumWarmGray: "#84847c",

  // Standard colors
  white: "#ffffff",
  black: "#000000",
  gold: "#d4af37",
  silver: "#c0c0c0",
};

/**
 * Certificate of Appreciation Template
 * Professional design with FOM branding and covenant verse
 */
export const CERTIFICATE_OF_APPRECIATION_TEMPLATE: TemplateData = {
  name: "Certificate of Appreciation",
  description:
    "Professional certificate for recognizing dedicated service to the organization.",
  elements: [
    // Background border and frame
    {
      id: "outer-border",
      type: "shape",
      content: "",
      position: { x: 20, y: 20, width: 760, height: 560 },
      style: {
        color: FOM_COLORS.primary,
        borderRadius: "8px",
      },
    },
    {
      id: "inner-border",
      type: "shape",
      content: "",
      position: { x: 40, y: 40, width: 720, height: 520 },
      style: {
        color: FOM_COLORS.veryLightGray,
        borderRadius: "4px",
      },
    },

    // Header section with logo and title
    {
      id: "fom-logo",
      type: "image",
      content: "/Logo.png",
      position: { x: 60, y: 60, width: 80, height: 80 },
      style: {},
    },
    {
      id: "ministry-name",
      type: "text",
      content: "FISHERS OF MEN",
      position: { x: 160, y: 70, width: 480, height: 30 },
      style: {
        fontSize: 24,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.primary,
        textAlign: "center",
      },
    },
    {
      id: "ministry-tagline",
      type: "text",
      content: "Bringing Jesus to the World",
      position: { x: 160, y: 100, width: 480, height: 20 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "center",
      },
    },

    // Certificate title
    {
      id: "certificate-title",
      type: "text",
      content: "CERTIFICATE OF APPRECIATION",
      position: { x: 80, y: 160, width: 640, height: 40 },
      style: {
        fontSize: 28,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.primaryDeep,
        textAlign: "center",
      },
    },

    // Decorative line under title
    {
      id: "title-underline",
      type: "shape",
      content: "",
      position: { x: 280, y: 205, width: 240, height: 3 },
      style: {
        color: FOM_COLORS.gold,
        borderRadius: "2px",
      },
    },

    // Main content
    {
      id: "presented-to",
      type: "text",
      content: "This certificate is proudly presented to",
      position: { x: 80, y: 240, width: 640, height: 25 },
      style: {
        fontSize: 16,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "center",
      },
    },
    {
      id: "recipient-name",
      type: "text",
      content: "{{recipientName}}",
      position: { x: 80, y: 275, width: 640, height: 40 },
      style: {
        fontSize: 32,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.primary,
        textAlign: "center",
      },
    },

    // Appreciation text
    {
      id: "appreciation-text",
      type: "text",
      content:
        "In recognition of your unwavering dedication, faithful service, and remarkable commitment to the Fishers of Men organization. Your selfless efforts in touching lives, strengthening our faith community, and advancing God's kingdom have been an inspiration to all.",
      position: { x: 100, y: 330, width: 600, height: 60 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "center",
      },
    },

    // Covenant verse section
    {
      id: "covenant-verse",
      type: "text",
      content:
        '"Do not be afraid, for those who are with us are more than those who are with them"',
      position: { x: 80, y: 415, width: 640, height: 25 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        fontWeight: "italic",
        color: FOM_COLORS.primaryDeep,
        textAlign: "center",
      },
    },
    {
      id: "verse-reference",
      type: "text",
      content: "- 2 Kings 6:16",
      position: { x: 80, y: 440, width: 640, height: 20 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "center",
      },
    },

    // Signature and date section - combined elements for better spacing control
    {
      id: "date-combined",
      type: "text",
      content: "Date: {{issueDate}}",
      position: { x: 100, y: 500, width: 200, height: 20 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "left",
      },
    },
    {
      id: "signature-combined",
      type: "text",
      content: "Authorized by: {{issuerName}}",
      position: { x: 480, y: 500, width: 250, height: 20 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "left",
      },
    },

    // Certificate ID element
    {
      id: "certificate-id",
      type: "text",
      content: "Certificate ID: {{certificateId}}",
      position: { x: 50, y: 530, width: 700, height: 15 },
      style: {
        fontSize: 10,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "center",
      },
    },

    // Security Features Section
    // QR Code for verification
    {
      id: "qr-code",
      type: "image",
      content: "{{qrCode}}", // This will be replaced with the actual QR code path
      position: { x: 650, y: 460, width: 60, height: 60 },
      style: {
        borderRadius: "4px",
      },
    },

    // QR Code label
    {
      id: "qr-label",
      type: "text",
      content: "Scan to verify",
      position: { x: 635, y: 525, width: 90, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "center",
      },
    },

    // Security watermark (visible)
    {
      id: "security-watermark",
      type: "text",
      content: "AUTHENTIC",
      position: { x: 300, y: 300, width: 200, height: 80 },
      style: {
        fontSize: 48,
        fontFamily: "serif",
        fontWeight: "bold",
        color: "rgba(12, 67, 106, 0.08)", // Very light blue, almost transparent
        textAlign: "center",
      },
    },

    // Digital signature indicator
    {
      id: "digital-signature",
      type: "text",
      content: "Digitally Signed & Verified",
      position: { x: 50, y: 545, width: 300, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "left",
      },
    },

    // Verification URL
    {
      id: "verification-url",
      type: "text",
      content: "Verify at: {{verificationUrl}}",
      position: { x: 400, y: 545, width: 350, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "right",
      },
    },

    // Decorative elements
    {
      id: "left-decoration",
      type: "shape",
      content: "",
      position: { x: 60, y: 280, width: 15, height: 15 },
      style: {
        color: FOM_COLORS.gold,
        borderRadius: "50%",
      },
    },
    {
      id: "right-decoration",
      type: "shape",
      content: "",
      position: { x: 725, y: 280, width: 15, height: 15 },
      style: {
        color: FOM_COLORS.gold,
        borderRadius: "50%",
      },
    },
  ],
  pageSettings: {
    width: 800,
    height: 600,
    margin: { top: 20, right: 20, bottom: 20, left: 20 },
    background: {
      color: FOM_COLORS.white,
    },
  },
  fonts: [
    {
      family: "serif",
      variants: ["normal", "bold", "italic"],
    },
  ],
};

/**
 * Certificate of Excellence Template
 * Premium design for outstanding achievements
 */
export const CERTIFICATE_OF_EXCELLENCE_TEMPLATE: TemplateData = {
  name: "Certificate of Excellence",
  description:
    "Premium design for recognizing outstanding achievements and contributions.",
  elements: [
    // Gradient background
    {
      id: "background",
      type: "shape",
      content: "",
      position: { x: 0, y: 0, width: 800, height: 600 },
      style: {
        color: FOM_COLORS.veryLightGray,
      },
    },

    // Header with logo and ribbon design
    {
      id: "header-ribbon",
      type: "shape",
      content: "",
      position: { x: 0, y: 0, width: 800, height: 120 },
      style: {
        color: FOM_COLORS.primary,
      },
    },
    {
      id: "logo-excellence",
      type: "image",
      content: "/Logo.png",
      position: { x: 50, y: 20, width: 80, height: 80 },
      style: {},
    },
    {
      id: "ministry-name-excellence",
      type: "text",
      content: "FISHERS OF MEN",
      position: { x: 150, y: 30, width: 500, height: 30 },
      style: {
        fontSize: 26,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.white,
        textAlign: "center",
      },
    },
    {
      id: "ministry-verse-excellence",
      type: "text",
      content: "Matthew 4:19 - Follow me, and I will make you fishers of men",
      position: { x: 150, y: 65, width: 500, height: 20 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        color: FOM_COLORS.veryLightGray,
        textAlign: "center",
      },
    },

    // Certificate content
    {
      id: "excellence-title",
      type: "text",
      content: "CERTIFICATE OF EXCELLENCE",
      position: { x: 50, y: 160, width: 700, height: 50 },
      style: {
        fontSize: 36,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.primaryDeep,
        textAlign: "center",
      },
    },

    // Star decorations
    {
      id: "star-left",
      type: "text",
      content: "★",
      position: { x: 320, y: 210, width: 30, height: 30 },
      style: {
        fontSize: 24,
        fontFamily: "serif",
        color: FOM_COLORS.gold,
        textAlign: "center",
      },
    },
    {
      id: "star-right",
      type: "text",
      content: "★",
      position: { x: 450, y: 210, width: 30, height: 30 },
      style: {
        fontSize: 24,
        fontFamily: "serif",
        color: FOM_COLORS.gold,
        textAlign: "center",
      },
    },

    // Main content
    {
      id: "excellence-presented",
      type: "text",
      content: "This Certificate of Excellence is awarded to",
      position: { x: 50, y: 260, width: 700, height: 25 },
      style: {
        fontSize: 18,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "center",
      },
    },
    {
      id: "excellence-recipient",
      type: "text",
      content: "{{recipientName}}",
      position: { x: 50, y: 300, width: 700, height: 45 },
      style: {
        fontSize: 38,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.primary,
        textAlign: "center",
      },
    },
    {
      id: "excellence-description",
      type: "text",
      content:
        "For demonstrating exceptional leadership, unwavering faith, and outstanding commitment to advancing God's kingdom through the Fishers of Men organization. Your exemplary service serves as a beacon of hope and inspiration to our entire community.",
      position: { x: 80, y: 360, width: 640, height: 70 },
      style: {
        fontSize: 16,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "center",
      },
    },

    // Covenant verse in elegant box
    {
      id: "verse-box",
      type: "shape",
      content: "",
      position: { x: 100, y: 450, width: 600, height: 80 },
      style: {
        color: FOM_COLORS.primaryDeep,
        borderRadius: "4px",
      },
    },
    {
      id: "covenant-text-excellence",
      type: "text",
      content:
        '"Do not be afraid, for those who are with us are more than those who are with them"',
      position: { x: 120, y: 465, width: 560, height: 25 },
      style: {
        fontSize: 16,
        fontFamily: "serif",
        fontWeight: "italic",
        color: FOM_COLORS.white,
        textAlign: "center",
      },
    },
    {
      id: "covenant-ref-excellence",
      type: "text",
      content: "2 Kings 6:16",
      position: { x: 120, y: 495, width: 560, height: 20 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        color: FOM_COLORS.veryLightGray,
        textAlign: "center",
      },
    },

    // Footer with signatures - combined elements for consistent spacing
    {
      id: "date-excellence-combined",
      type: "text",
      content: "Date: {{issueDate}}",
      position: { x: 100, y: 550, width: 200, height: 20 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        color: FOM_COLORS.primary,
        textAlign: "center",
      },
    },
    {
      id: "signature-excellence-combined",
      type: "text",
      content: "Authorized by: {{issuerName}}",
      position: { x: 500, y: 550, width: 200, height: 20 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        color: FOM_COLORS.primary,
        textAlign: "center",
      },
    },

    // Certificate ID for Excellence template - positioned above footer
    {
      id: "certificate-id-excellence",
      type: "text",
      content: "Certificate ID: {{certificateId}}",
      position: { x: 50, y: 530, width: 700, height: 15 },
      style: {
        fontSize: 10,
        fontFamily: "serif",
        color: FOM_COLORS.lightGray,
        textAlign: "center",
      },
    },

    // Security Features Section for Excellence Template
    // QR Code for verification
    {
      id: "qr-code-excellence",
      type: "image",
      content: "{{qrCode}}",
      position: { x: 650, y: 460, width: 60, height: 60 },
      style: {
        borderRadius: "4px",
      },
    },

    // QR Code label
    {
      id: "qr-label-excellence",
      type: "text",
      content: "Scan to verify",
      position: { x: 635, y: 525, width: 90, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "center",
      },
    },

    // Security watermark (visible)
    {
      id: "security-watermark-excellence",
      type: "text",
      content: "AUTHENTIC",
      position: { x: 300, y: 300, width: 200, height: 80 },
      style: {
        fontSize: 48,
        fontFamily: "serif",
        fontWeight: "bold",
        color: "rgba(12, 67, 106, 0.08)",
        textAlign: "center",
      },
    },

    // Digital signature indicator
    {
      id: "digital-signature-excellence",
      type: "text",
      content: "Digitally Signed & Verified",
      position: { x: 50, y: 545, width: 300, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "left",
      },
    },

    // Verification URL
    {
      id: "verification-url-excellence",
      type: "text",
      content: "Verify at: {{verificationUrl}}",
      position: { x: 400, y: 545, width: 350, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "right",
      },
    },
  ],
  pageSettings: {
    width: 800,
    height: 600,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    background: {
      color: FOM_COLORS.white,
    },
  },
  fonts: [
    {
      family: "serif",
      variants: ["normal", "bold", "italic"],
    },
  ],
};

/**
 * Ministry Leadership Certificate
 * Elegant design for ministry leadership recognition
 */
export const MINISTRY_LEADERSHIP_CERTIFICATE: TemplateData = {
  name: "Ministry Leadership Certificate",
  description:
    "Elegant design for recognizing ministry leaders and their service.",
  elements: [
    // Elegant border design
    {
      id: "main-border",
      type: "shape",
      content: "",
      position: { x: 30, y: 30, width: 740, height: 540 },
      style: {
        color: FOM_COLORS.primaryDeep,
        borderRadius: "12px",
      },
    },
    {
      id: "inner-background",
      type: "shape",
      content: "",
      position: { x: 45, y: 45, width: 710, height: 510 },
      style: {
        color: FOM_COLORS.white,
        borderRadius: "8px",
      },
    },

    // Header section
    {
      id: "leadership-header",
      type: "shape",
      content: "",
      position: { x: 45, y: 45, width: 710, height: 100 },
      style: {
        color: FOM_COLORS.accent,
        borderRadius: "8px 8px 0 0",
      },
    },
    {
      id: "logo-leadership",
      type: "image",
      content: "/Logo.png",
      position: { x: 70, y: 65, width: 70, height: 70 },
      style: {},
    },
    {
      id: "header-text-leadership",
      type: "text",
      content: "MINISTRY LEADERSHIP",
      position: { x: 160, y: 70, width: 480, height: 30 },
      style: {
        fontSize: 24,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.white,
        textAlign: "center",
      },
    },
    {
      id: "header-subtext-leadership",
      type: "text",
      content: "Fishers of Men • Servant Leadership Recognition",
      position: { x: 160, y: 100, width: 480, height: 20 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        color: FOM_COLORS.veryLightGray,
        textAlign: "center",
      },
    },

    // Certificate content
    {
      id: "leadership-title",
      type: "text",
      content: "CERTIFICATE OF LEADERSHIP",
      position: { x: 70, y: 180, width: 660, height: 40 },
      style: {
        fontSize: 30,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.primaryDeep,
        textAlign: "center",
      },
    },

    // Decorative elements
    {
      id: "laurel-left",
      type: "text",
      content: "🏆",
      position: { x: 200, y: 230, width: 40, height: 40 },
      style: {
        fontSize: 32,
        textAlign: "center",
      },
    },
    {
      id: "laurel-right",
      type: "text",
      content: "🏆",
      position: { x: 560, y: 230, width: 40, height: 40 },
      style: {
        fontSize: 32,
        textAlign: "center",
      },
    },

    // Main content
    {
      id: "leadership-presented",
      type: "text",
      content: "This certificate is proudly awarded to",
      position: { x: 70, y: 290, width: 660, height: 25 },
      style: {
        fontSize: 16,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "center",
      },
    },
    {
      id: "leadership-recipient",
      type: "text",
      content: "{{recipientName}}",
      position: { x: 70, y: 325, width: 660, height: 40 },
      style: {
        fontSize: 34,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.primary,
        textAlign: "center",
      },
    },
    {
      id: "leadership-description",
      type: "text",
      content:
        "In recognition of outstanding leadership, faithful stewardship, and exceptional dedication to serving God and His people through the Fishers of Men organization. Your servant heart and unwavering commitment continue to impact lives and advance His kingdom.",
      position: { x: 90, y: 380, width: 620, height: 60 },
      style: {
        fontSize: 15,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "center",
      },
    },

    // Covenant verse section
    {
      id: "verse-divider",
      type: "shape",
      content: "",
      position: { x: 300, y: 460, width: 200, height: 2 },
      style: {
        color: FOM_COLORS.accent,
      },
    },
    {
      id: "covenant-leadership",
      type: "text",
      content:
        '"Do not be afraid, for those who are with us are more than those who are with them" - 2 Kings 6:16',
      position: { x: 90, y: 475, width: 620, height: 25 },
      style: {
        fontSize: 13,
        fontFamily: "serif",
        fontWeight: "italic",
        color: FOM_COLORS.accent,
        textAlign: "center",
      },
    },

    // Footer with combined date and signature for minimal spacing
    {
      id: "date-leadership-combined",
      type: "text",
      content: "Date: {{issueDate}}",
      position: { x: 90, y: 520, width: 250, height: 20 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "left",
      },
    },
    {
      id: "signature-leadership-combined",
      type: "text",
      content: "Authorized by: {{issuerName}}",
      position: { x: 460, y: 520, width: 250, height: 20 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "left",
      },
    },

    // Certificate ID for Leadership template - positioned in upper right corner
    {
      id: "certificate-id-leadership",
      type: "text",
      content: "Certificate ID: {{certificateId}}",
      position: { x: 550, y: 80, width: 180, height: 15 },
      style: {
        fontSize: 9,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "right",
      },
    },

    // Security Features Section for Ministry Leadership Template
    // QR Code for verification
    {
      id: "qr-code-leadership",
      type: "image",
      content: "{{qrCode}}",
      position: { x: 650, y: 440, width: 60, height: 60 },
      style: {
        borderRadius: "4px",
      },
    },

    // QR Code label
    {
      id: "qr-label-leadership",
      type: "text",
      content: "Scan to verify",
      position: { x: 635, y: 505, width: 90, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "center",
      },
    },

    // Security watermark (visible)
    {
      id: "security-watermark-leadership",
      type: "text",
      content: "CERTIFIED",
      position: { x: 300, y: 280, width: 200, height: 80 },
      style: {
        fontSize: 48,
        fontFamily: "serif",
        fontWeight: "bold",
        color: "rgba(12, 67, 106, 0.08)",
        textAlign: "center",
      },
    },

    // Digital signature indicator
    {
      id: "digital-signature-leadership",
      type: "text",
      content: "Digitally Signed & Verified",
      position: { x: 50, y: 525, width: 300, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "left",
      },
    },

    // Verification URL
    {
      id: "verification-url-leadership",
      type: "text",
      content: "Verify at: {{verificationUrl}}",
      position: { x: 400, y: 525, width: 350, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "right",
      },
    },
  ],
  pageSettings: {
    width: 800,
    height: 600,
    margin: { top: 30, right: 30, bottom: 30, left: 30 },
    background: {
      color: FOM_COLORS.veryLightGray,
    },
  },
  fonts: [
    {
      family: "serif",
      variants: ["normal", "bold", "italic"],
    },
  ],
};

/**
 * Faithful Service Award Certificate
 * Recognizing long-term dedication and faithful service
 */
export const FAITHFUL_SERVICE_CERTIFICATE: TemplateData = {
  name: "Faithful Service Award",
  description:
    "Distinguished design for long-term faithful service recognition.",
  elements: [
    // Classic parchment-style background
    {
      id: "parchment-bg",
      type: "shape",
      content: "",
      position: { x: 0, y: 0, width: 800, height: 600 },
      style: {
        color: "#faf7f2",
      },
    },
    {
      id: "parchment-border",
      type: "shape",
      content: "",
      position: { x: 25, y: 25, width: 750, height: 550 },
      style: {
        color: FOM_COLORS.primary,
        borderRadius: "6px",
      },
    },
    {
      id: "parchment-inner",
      type: "shape",
      content: "",
      position: { x: 35, y: 35, width: 730, height: 530 },
      style: {
        color: "#fdfcfa",
        borderRadius: "4px",
      },
    },

    // Ornate header
    {
      id: "faithful-logo",
      type: "image",
      content: "/Logo.png",
      position: { x: 360, y: 50, width: 80, height: 80 },
      style: {},
    },
    {
      id: "faithful-org-name",
      type: "text",
      content: "FISHERS OF MEN",
      position: { x: 100, y: 140, width: 600, height: 35 },
      style: {
        fontSize: 28,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.primaryDeep,
        textAlign: "center",
      },
    },
    {
      id: "faithful-subtitle",
      type: "text",
      content: "✦ Ministry of Faith, Service & Leadership ✦",
      position: { x: 100, y: 175, width: 600, height: 20 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        color: FOM_COLORS.accent,
        textAlign: "center",
      },
    },

    // Certificate title with decorative elements
    {
      id: "faithful-title",
      type: "text",
      content: "FAITHFUL SERVICE AWARD",
      position: { x: 100, y: 220, width: 600, height: 40 },
      style: {
        fontSize: 32,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.primary,
        textAlign: "center",
      },
    },

    // Decorative flourishes
    {
      id: "left-flourish",
      type: "text",
      content: "❦",
      position: { x: 200, y: 265, width: 30, height: 30 },
      style: {
        fontSize: 24,
        color: FOM_COLORS.gold,
        textAlign: "center",
      },
    },
    {
      id: "right-flourish",
      type: "text",
      content: "❦",
      position: { x: 570, y: 265, width: 30, height: 30 },
      style: {
        fontSize: 24,
        color: FOM_COLORS.gold,
        textAlign: "center",
      },
    },

    // Main content
    {
      id: "faithful-presented",
      type: "text",
      content: "This certificate is presented with deep gratitude to",
      position: { x: 100, y: 310, width: 600, height: 25 },
      style: {
        fontSize: 16,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "center",
      },
    },
    {
      id: "faithful-recipient",
      type: "text",
      content: "{{recipientName}}",
      position: { x: 100, y: 345, width: 600, height: 40 },
      style: {
        fontSize: 36,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.primaryDeep,
        textAlign: "center",
      },
    },
    {
      id: "faithful-years",
      type: "text",
      content: "For {{serviceYears}} years of faithful service",
      position: { x: 100, y: 395, width: 600, height: 25 },
      style: {
        fontSize: 18,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.accent,
        textAlign: "center",
      },
    },
    {
      id: "faithful-description",
      type: "text",
      content:
        "Your steadfast dedication, unwavering faith, and faithful service to the Fishers of Men organization have been a blessing to countless lives. Through seasons of joy and challenge, your commitment has remained constant, reflecting the heart of a true servant leader.",
      position: { x: 120, y: 430, width: 560, height: 60 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "center",
      },
    },

    // Covenant verse in decorative frame
    {
      id: "verse-frame",
      type: "shape",
      content: "",
      position: { x: 150, y: 500, width: 500, height: 50 },
      style: {
        color: FOM_COLORS.veryLightGray,
        borderRadius: "25px",
      },
    },
    {
      id: "faithful-covenant",
      type: "text",
      content:
        '"Do not be afraid, for those who are with us are more than those who are with them" - 2 Kings 6:16',
      position: { x: 170, y: 515, width: 460, height: 20 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        fontWeight: "italic",
        color: FOM_COLORS.primary,
        textAlign: "center",
      },
    },

    // Signature section - combined elements for minimal spacing
    {
      id: "faithful-date-combined",
      type: "text",
      content: "Date: {{issueDate}}",
      position: { x: 120, y: 570, width: 200, height: 15 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "center",
      },
    },
    {
      id: "faithful-signature-combined",
      type: "text",
      content: "Authorized by: {{issuerName}}",
      position: { x: 480, y: 570, width: 200, height: 15 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "center",
      },
    },

    // Certificate ID element - positioned in upper left corner for elegant placement
    {
      id: "faithful-certificate-id",
      type: "text",
      content: "Certificate ID: {{certificateId}}",
      position: { x: 60, y: 80, width: 200, height: 12 },
      style: {
        fontSize: 9,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "left",
      },
    },

    // Security Features Section for Faithful Service Template
    // QR Code for verification
    {
      id: "qr-code-faithful",
      type: "image",
      content: "{{qrCode}}",
      position: { x: 650, y: 450, width: 60, height: 60 },
      style: {
        borderRadius: "4px",
      },
    },

    // QR Code label
    {
      id: "qr-label-faithful",
      type: "text",
      content: "Scan to verify",
      position: { x: 635, y: 515, width: 90, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "center",
      },
    },

    // Security watermark (visible)
    {
      id: "security-watermark-faithful",
      type: "text",
      content: "FAITHFUL",
      position: { x: 300, y: 300, width: 200, height: 80 },
      style: {
        fontSize: 48,
        fontFamily: "serif",
        fontWeight: "bold",
        color: "rgba(12, 67, 106, 0.08)",
        textAlign: "center",
      },
    },

    // Digital signature indicator
    {
      id: "digital-signature-faithful",
      type: "text",
      content: "Digitally Signed & Verified",
      position: { x: 60, y: 555, width: 300, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "left",
      },
    },

    // Verification URL
    {
      id: "verification-url-faithful",
      type: "text",
      content: "Verify at: {{verificationUrl}}",
      position: { x: 400, y: 555, width: 350, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "right",
      },
    },
  ],
  pageSettings: {
    width: 800,
    height: 600,
    margin: { top: 25, right: 25, bottom: 25, left: 25 },
    background: {
      color: "#faf7f2",
    },
  },
  fonts: [
    {
      family: "serif",
      variants: ["normal", "bold", "italic"],
    },
  ],
};

/**
 * Volunteer Recognition Certificate
 * Modern, clean design for volunteer appreciation
 */
export const VOLUNTEER_RECOGNITION_CERTIFICATE: TemplateData = {
  name: "Volunteer Recognition",
  description:
    "Modern design for appreciating volunteer service and contributions.",
  elements: [
    // Modern gradient background
    {
      id: "modern-bg",
      type: "shape",
      content: "",
      position: { x: 0, y: 0, width: 800, height: 600 },
      style: {
        color: FOM_COLORS.white,
      },
    },

    // Side accent bar
    {
      id: "accent-bar",
      type: "shape",
      content: "",
      position: { x: 0, y: 0, width: 8, height: 600 },
      style: {
        color: FOM_COLORS.secondary,
      },
    },

    // Header section
    {
      id: "volunteer-header",
      type: "shape",
      content: "",
      position: { x: 8, y: 0, width: 792, height: 120 },
      style: {
        color: FOM_COLORS.veryLightGray,
      },
    },
    {
      id: "volunteer-logo",
      type: "image",
      content: "/Logo.png",
      position: { x: 50, y: 20, width: 80, height: 80 },
      style: {},
    },
    {
      id: "volunteer-org",
      type: "text",
      content: "FISHERS OF MEN",
      position: { x: 150, y: 25, width: 500, height: 30 },
      style: {
        fontSize: 24,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.primary,
        textAlign: "left",
      },
    },
    {
      id: "volunteer-tagline",
      type: "text",
      content: "Serving with Heart • Making a Difference",
      position: { x: 150, y: 55, width: 500, height: 20 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        color: FOM_COLORS.accent,
        textAlign: "left",
      },
    },
    {
      id: "volunteer-mission",
      type: "text",
      content: "Bringing Jesus to the World",
      position: { x: 150, y: 75, width: 500, height: 18 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "left",
      },
    },

    // Certificate title
    {
      id: "volunteer-title",
      type: "text",
      content: "VOLUNTEER RECOGNITION",
      position: { x: 50, y: 160, width: 700, height: 40 },
      style: {
        fontSize: 28,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.primaryDeep,
        textAlign: "center",
      },
    },
    {
      id: "volunteer-subtitle",
      type: "text",
      content: "Certificate of Appreciation",
      position: { x: 50, y: 200, width: 700, height: 25 },
      style: {
        fontSize: 16,
        fontFamily: "serif",
        color: FOM_COLORS.secondary,
        textAlign: "center",
      },
    },

    // Modern divider
    {
      id: "modern-divider",
      type: "shape",
      content: "",
      position: { x: 250, y: 235, width: 300, height: 3 },
      style: {
        color: FOM_COLORS.secondary,
        borderRadius: "2px",
      },
    },

    // Main content
    {
      id: "volunteer-presented",
      type: "text",
      content: "This certificate is gratefully presented to",
      position: { x: 50, y: 270, width: 700, height: 25 },
      style: {
        fontSize: 16,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "center",
      },
    },
    {
      id: "volunteer-recipient",
      type: "text",
      content: "{{recipientName}}",
      position: { x: 50, y: 305, width: 700, height: 40 },
      style: {
        fontSize: 32,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.primary,
        textAlign: "center",
      },
    },
    {
      id: "volunteer-hours",
      type: "text",
      content: "For contributing {{volunteerHours}} hours of volunteer service",
      position: { x: 50, y: 355, width: 700, height: 25 },
      style: {
        fontSize: 16,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.accent,
        textAlign: "center",
      },
    },
    {
      id: "volunteer-description",
      type: "text",
      content:
        "Your generous spirit, willing heart, and selfless service have made a meaningful impact in our organization and community. Through your volunteer efforts, you have embodied the love of Christ and helped advance His kingdom here on earth.",
      position: { x: 80, y: 390, width: 640, height: 60 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "center",
      },
    },

    // Covenant verse in modern box
    {
      id: "modern-verse-box",
      type: "shape",
      content: "",
      position: { x: 100, y: 470, width: 600, height: 60 },
      style: {
        color: FOM_COLORS.primary,
        borderRadius: "6px",
      },
    },
    {
      id: "volunteer-verse",
      type: "text",
      content:
        '"Do not be afraid, for those who are with us are more than those who are with them"',
      position: { x: 120, y: 485, width: 560, height: 25 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        fontWeight: "italic",
        color: FOM_COLORS.white,
        textAlign: "center",
      },
    },
    {
      id: "volunteer-verse-ref",
      type: "text",
      content: "2 Kings 6:16",
      position: { x: 120, y: 505, width: 560, height: 15 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: FOM_COLORS.veryLightGray,
        textAlign: "center",
      },
    },

    // Footer
    {
      id: "volunteer-date",
      type: "text",
      content: "Date: {{issueDate}}",
      position: { x: 100, y: 560, width: 200, height: 20 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "left",
      },
    },
    {
      id: "volunteer-signature-combined",
      type: "text",
      content: "Authorized by: {{issuerName}}",
      position: { x: 500, y: 560, width: 250, height: 20 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "left",
      },
    },

    // Certificate ID element - positioned in upper right corner
    {
      id: "volunteer-certificate-id",
      type: "text",
      content: "Certificate ID: {{certificateId}}",
      position: { x: 520, y: 70, width: 220, height: 15 },
      style: {
        fontSize: 9,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "right",
      },
    },

    // Security Features Section for Volunteer Recognition Template
    // QR Code for verification
    {
      id: "qr-code-volunteer",
      type: "image",
      content: "{{qrCode}}",
      position: { x: 650, y: 440, width: 60, height: 60 },
      style: {
        borderRadius: "4px",
      },
    },

    // QR Code label
    {
      id: "qr-label-volunteer",
      type: "text",
      content: "Scan to verify",
      position: { x: 635, y: 505, width: 90, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "center",
      },
    },

    // Security watermark (visible)
    {
      id: "security-watermark-volunteer",
      type: "text",
      content: "VOLUNTEER",
      position: { x: 280, y: 280, width: 240, height: 80 },
      style: {
        fontSize: 48,
        fontFamily: "serif",
        fontWeight: "bold",
        color: "rgba(12, 67, 106, 0.08)",
        textAlign: "center",
      },
    },

    // Digital signature indicator
    {
      id: "digital-signature-volunteer",
      type: "text",
      content: "Digitally Signed & Verified",
      position: { x: 100, y: 545, width: 300, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "left",
      },
    },

    // Verification URL
    {
      id: "verification-url-volunteer",
      type: "text",
      content: "Verify at: {{verificationUrl}}",
      position: { x: 400, y: 545, width: 350, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "right",
      },
    },
  ],
  pageSettings: {
    width: 800,
    height: 600,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    background: {
      color: FOM_COLORS.white,
    },
  },
  fonts: [
    {
      family: "serif",
      variants: ["normal", "bold", "italic"],
    },
  ],
};

/**
 * Mission Completion Certificate
 * Adventure-themed design for mission trip participants
 */
export const MISSION_COMPLETION_CERTIFICATE: TemplateData = {
  name: "Mission Completion",
  description:
    "Adventure-themed design for mission trip and outreach completion.",
  elements: [
    // Adventure-themed background
    {
      id: "mission-bg",
      type: "shape",
      content: "",
      position: { x: 0, y: 0, width: 800, height: 600 },
      style: {
        color: "#f8f9fa",
      },
    },

    // Header with compass design
    {
      id: "mission-header",
      type: "shape",
      content: "",
      position: { x: 0, y: 0, width: 800, height: 150 },
      style: {
        color: FOM_COLORS.primaryDeep,
      },
    },
    {
      id: "compass-icon",
      type: "text",
      content: "🧭",
      position: { x: 80, y: 30, width: 80, height: 80 },
      style: {
        fontSize: 64,
        textAlign: "center",
      },
    },
    {
      id: "mission-org-name",
      type: "text",
      content: "FISHERS OF MEN",
      position: { x: 180, y: 35, width: 440, height: 30 },
      style: {
        fontSize: 26,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.white,
        textAlign: "center",
      },
    },
    {
      id: "mission-calling",
      type: "text",
      content: "Great Commission • Global Impact",
      position: { x: 180, y: 65, width: 440, height: 20 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        color: FOM_COLORS.veryLightGray,
        textAlign: "center",
      },
    },
    {
      id: "mission-verse-header",
      type: "text",
      content:
        '"Go therefore and make disciples of all nations" - Matthew 28:19',
      position: { x: 180, y: 85, width: 440, height: 20 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        fontWeight: "italic",
        color: FOM_COLORS.lightGray,
        textAlign: "center",
      },
    },
    {
      id: "mission-logo",
      type: "image",
      content: "/Logo.png",
      position: { x: 640, y: 35, width: 70, height: 70 },
      style: {},
    },

    // Certificate title
    {
      id: "mission-title",
      type: "text",
      content: "MISSION COMPLETION",
      position: { x: 50, y: 190, width: 700, height: 40 },
      style: {
        fontSize: 32,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.primaryDeep,
        textAlign: "center",
      },
    },
    {
      id: "mission-subtitle",
      type: "text",
      content: "Certificate of Achievement",
      position: { x: 50, y: 230, width: 700, height: 25 },
      style: {
        fontSize: 16,
        fontFamily: "serif",
        color: FOM_COLORS.accent,
        textAlign: "center",
      },
    },

    // Adventure icons
    {
      id: "flag-left",
      type: "text",
      content: "🚩",
      position: { x: 200, y: 270, width: 30, height: 30 },
      style: {
        fontSize: 24,
        textAlign: "center",
      },
    },
    {
      id: "flag-right",
      type: "text",
      content: "🚩",
      position: { x: 570, y: 270, width: 30, height: 30 },
      style: {
        fontSize: 24,
        textAlign: "center",
      },
    },

    // Main content
    {
      id: "mission-presented",
      type: "text",
      content: "This certificate is proudly awarded to",
      position: { x: 50, y: 320, width: 700, height: 25 },
      style: {
        fontSize: 16,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "center",
      },
    },
    {
      id: "mission-recipient",
      type: "text",
      content: "{{recipientName}}",
      position: { x: 50, y: 355, width: 700, height: 40 },
      style: {
        fontSize: 34,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.primary,
        textAlign: "center",
      },
    },
    {
      id: "mission-location",
      type: "text",
      content: "For completing the mission to {{missionLocation}}",
      position: { x: 50, y: 405, width: 700, height: 25 },
      style: {
        fontSize: 16,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.secondary,
        textAlign: "center",
      },
    },
    {
      id: "mission-description",
      type: "text",
      content:
        "Your courage to step beyond comfort zones, your heart for the nations, and your commitment to sharing God's love have made an eternal impact. Through this mission, you have been a light in dark places and a vessel of His grace.",
      position: { x: 80, y: 440, width: 640, height: 60 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "center",
      },
    },

    // Covenant verse with border
    {
      id: "mission-verse-border",
      type: "shape",
      content: "",
      position: { x: 100, y: 520, width: 600, height: 40 },
      style: {
        color: FOM_COLORS.accent,
        borderRadius: "20px",
      },
    },
    {
      id: "mission-covenant",
      type: "text",
      content:
        '"Do not be afraid, for those who are with us are more than those who are with them" - 2 Kings 6:16',
      position: { x: 120, y: 530, width: 560, height: 20 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        fontWeight: "italic",
        color: FOM_COLORS.white,
        textAlign: "center",
      },
    },

    // Footer with combined date and signature for minimal spacing
    {
      id: "mission-date-combined",
      type: "text",
      content: "Date: {{issueDate}}",
      position: { x: 100, y: 580, width: 200, height: 15 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "left",
      },
    },
    {
      id: "mission-signature-combined",
      type: "text",
      content: "Authorized by: {{issuerName}}",
      position: { x: 500, y: 580, width: 250, height: 15 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "left",
      },
    },

    // Certificate ID element - positioned in bottom left corner
    {
      id: "mission-certificate-id",
      type: "text",
      content: "Certificate ID: {{certificateId}}",
      position: { x: 50, y: 570, width: 300, height: 12 },
      style: {
        fontSize: 9,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "left",
      },
    },

    // Security Features Section for Mission Completion Template
    // QR Code for verification
    {
      id: "qr-code-mission",
      type: "image",
      content: "{{qrCode}}",
      position: { x: 650, y: 440, width: 60, height: 60 },
      style: {
        borderRadius: "4px",
      },
    },

    // QR Code label
    {
      id: "qr-label-mission",
      type: "text",
      content: "Scan to verify",
      position: { x: 635, y: 505, width: 90, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "center",
      },
    },

    // Security watermark (visible)
    {
      id: "security-watermark-mission",
      type: "text",
      content: "MISSION",
      position: { x: 300, y: 280, width: 200, height: 80 },
      style: {
        fontSize: 48,
        fontFamily: "serif",
        fontWeight: "bold",
        color: "rgba(12, 67, 106, 0.08)",
        textAlign: "center",
      },
    },

    // Digital signature indicator
    {
      id: "digital-signature-mission",
      type: "text",
      content: "Digitally Signed & Verified",
      position: { x: 50, y: 555, width: 300, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "left",
      },
    },

    // Verification URL
    {
      id: "verification-url-mission",
      type: "text",
      content: "Verify at: {{verificationUrl}}",
      position: { x: 400, y: 555, width: 350, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "right",
      },
    },
  ],
  pageSettings: {
    width: 800,
    height: 600,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    background: {
      color: "#f8f9fa",
    },
  },
  fonts: [
    {
      family: "serif",
      variants: ["normal", "bold", "italic"],
    },
  ],
};

/**
 * Baptism Certificate
 * Sacred and elegant design for baptism celebrations
 */
export const BAPTISM_CERTIFICATE: TemplateData = {
  name: "Baptism Certificate",
  description: "Sacred design commemorating the sacrament of baptism.",
  elements: [
    // Sacred background
    {
      id: "baptism-bg",
      type: "shape",
      content: "",
      position: { x: 0, y: 0, width: 800, height: 600 },
      style: {
        color: "#fefefe",
      },
    },

    // Elegant border
    {
      id: "baptism-outer-border",
      type: "shape",
      content: "",
      position: { x: 40, y: 40, width: 720, height: 520 },
      style: {
        color: FOM_COLORS.primaryDeep,
        borderRadius: "10px",
      },
    },
    {
      id: "baptism-inner-border",
      type: "shape",
      content: "",
      position: { x: 50, y: 50, width: 700, height: 500 },
      style: {
        color: FOM_COLORS.white,
        borderRadius: "8px",
      },
    },

    // Sacred symbols header
    {
      id: "cross-symbol",
      type: "text",
      content: "✚",
      position: { x: 375, y: 70, width: 50, height: 50 },
      style: {
        fontSize: 40,
        color: FOM_COLORS.primary,
        textAlign: "center",
      },
    },
    {
      id: "baptism-org",
      type: "text",
      content: "FISHERS OF MEN",
      position: { x: 80, y: 130, width: 640, height: 30 },
      style: {
        fontSize: 24,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.primaryDeep,
        textAlign: "center",
      },
    },
    {
      id: "baptism-church",
      type: "text",
      content: "In the Name of the Father, Son, and Holy Spirit",
      position: { x: 80, y: 160, width: 640, height: 20 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        color: FOM_COLORS.accent,
        textAlign: "center",
      },
    },

    // Certificate title
    {
      id: "baptism-title",
      type: "text",
      content: "CERTIFICATE OF BAPTISM",
      position: { x: 80, y: 200, width: 640, height: 35 },
      style: {
        fontSize: 28,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.primary,
        textAlign: "center",
      },
    },

    // Water wave decorations
    {
      id: "wave-left",
      type: "text",
      content: "〰️",
      position: { x: 180, y: 240, width: 30, height: 20 },
      style: {
        fontSize: 16,
        color: FOM_COLORS.secondary,
        textAlign: "center",
      },
    },
    {
      id: "wave-right",
      type: "text",
      content: "〰️",
      position: { x: 590, y: 240, width: 30, height: 20 },
      style: {
        fontSize: 16,
        color: FOM_COLORS.secondary,
        textAlign: "center",
      },
    },

    // Main content
    {
      id: "baptism-declaration",
      type: "text",
      content: "This certifies that",
      position: { x: 80, y: 280, width: 640, height: 25 },
      style: {
        fontSize: 16,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "center",
      },
    },
    {
      id: "baptism-recipient",
      type: "text",
      content: "{{recipientName}}",
      position: { x: 80, y: 315, width: 640, height: 40 },
      style: {
        fontSize: 32,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.primaryDeep,
        textAlign: "center",
      },
    },
    {
      id: "baptism-action",
      type: "text",
      content: "was baptized by immersion",
      position: { x: 80, y: 365, width: 640, height: 25 },
      style: {
        fontSize: 16,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "center",
      },
    },
    {
      id: "baptism-date-text",
      type: "text",
      content: "on {{baptismDate}}",
      position: { x: 80, y: 390, width: 640, height: 25 },
      style: {
        fontSize: 16,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.accent,
        textAlign: "center",
      },
    },
    {
      id: "baptism-description",
      type: "text",
      content:
        "Having publicly declared faith in Jesus Christ as Lord and Savior, this believer has been buried with Christ in baptism and raised to walk in newness of life. We welcome them into the fellowship of believers and the family of God.",
      position: { x: 100, y: 425, width: 600, height: 60 },
      style: {
        fontSize: 13,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "center",
      },
    },

    // Covenant verse
    {
      id: "baptism-verse",
      type: "text",
      content:
        '"Do not be afraid, for those who are with us are more than those who are with them" - 2 Kings 6:16',
      position: { x: 100, y: 495, width: 600, height: 20 },
      style: {
        fontSize: 11,
        fontFamily: "serif",
        fontWeight: "italic",
        color: FOM_COLORS.accent,
        textAlign: "center",
      },
    },

    // Footer with ministerial information
    {
      id: "baptism-minister",
      type: "text",
      content: "Baptized by: {{issuerName}}",
      position: { x: 100, y: 525, width: 250, height: 15 },
      style: {
        fontSize: 11,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "left",
      },
    },
    {
      id: "baptism-witness",
      type: "text",
      content: "Witnessed by the congregation",
      position: { x: 450, y: 525, width: 250, height: 15 },
      style: {
        fontSize: 11,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "right",
      },
    },

    // Certificate ID for Baptism certificate
    {
      id: "certificate-id-baptism",
      type: "text",
      content: "Certificate ID: {{certificateId}}",
      position: { x: 70, y: 550, width: 660, height: 15 },
      style: {
        fontSize: 9,
        fontFamily: "serif",
        color: FOM_COLORS.accent,
        textAlign: "center",
      },
    },

    // Security Features Section for Baptism Template
    // QR Code for verification
    {
      id: "qr-code-baptism",
      type: "image",
      content: "{{qrCode}}",
      position: { x: 650, y: 420, width: 60, height: 60 },
      style: {
        borderRadius: "4px",
      },
    },

    // QR Code label
    {
      id: "qr-label-baptism",
      type: "text",
      content: "Scan to verify",
      position: { x: 635, y: 485, width: 90, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "center",
      },
    },

    // Security watermark (visible)
    {
      id: "security-watermark-baptism",
      type: "text",
      content: "BAPTIZED",
      position: { x: 290, y: 270, width: 220, height: 80 },
      style: {
        fontSize: 48,
        fontFamily: "serif",
        fontWeight: "bold",
        color: "rgba(12, 67, 106, 0.08)",
        textAlign: "center",
      },
    },

    // Digital signature indicator
    {
      id: "digital-signature-baptism",
      type: "text",
      content: "Digitally Signed & Verified",
      position: { x: 70, y: 535, width: 300, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "left",
      },
    },

    // Verification URL
    {
      id: "verification-url-baptism",
      type: "text",
      content: "Verify at: {{verificationUrl}}",
      position: { x: 400, y: 535, width: 330, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "right",
      },
    },
  ],
  pageSettings: {
    width: 800,
    height: 600,
    margin: { top: 40, right: 40, bottom: 40, left: 40 },
    background: {
      color: "#fefefe",
    },
  },
  fonts: [
    {
      family: "serif",
      variants: ["normal", "bold", "italic"],
    },
  ],
};

/**
 * Youth Achievement Certificate
 * Vibrant and encouraging design for young people
 */
export const YOUTH_ACHIEVEMENT_CERTIFICATE: TemplateData = {
  name: "Youth Achievement",
  description:
    "Vibrant design celebrating young people's achievements and growth.",
  elements: [
    // Colorful background
    {
      id: "youth-bg",
      type: "shape",
      content: "",
      position: { x: 0, y: 0, width: 800, height: 600 },
      style: {
        color: "#f0f8ff",
      },
    },

    // Dynamic header
    {
      id: "youth-header-bg",
      type: "shape",
      content: "",
      position: { x: 0, y: 0, width: 800, height: 140 },
      style: {
        color: FOM_COLORS.secondary,
      },
    },
    {
      id: "youth-star-1",
      type: "text",
      content: "⭐",
      position: { x: 60, y: 30, width: 40, height: 40 },
      style: {
        fontSize: 32,
        textAlign: "center",
      },
    },
    {
      id: "youth-star-2",
      type: "text",
      content: "⭐",
      position: { x: 700, y: 30, width: 40, height: 40 },
      style: {
        fontSize: 32,
        textAlign: "center",
      },
    },
    {
      id: "youth-org-name",
      type: "text",
      content: "FISHERS OF MEN",
      position: { x: 150, y: 25, width: 500, height: 30 },
      style: {
        fontSize: 24,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.white,
        textAlign: "center",
      },
    },
    {
      id: "youth-ministry",
      type: "text",
      content: "YOUTH MINISTRY",
      position: { x: 150, y: 55, width: 500, height: 25 },
      style: {
        fontSize: 20,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.veryLightGray,
        textAlign: "center",
      },
    },
    {
      id: "youth-slogan",
      type: "text",
      content: "Growing Strong • Living Bold • Serving Christ",
      position: { x: 150, y: 85, width: 500, height: 20 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        color: FOM_COLORS.lightGray,
        textAlign: "center",
      },
    },
    {
      id: "youth-logo",
      type: "image",
      content: "/Logo.png",
      position: { x: 365, y: 105, width: 70, height: 70 },
      style: {},
    },

    // Certificate title
    {
      id: "youth-title",
      type: "text",
      content: "YOUTH ACHIEVEMENT AWARD",
      position: { x: 50, y: 200, width: 700, height: 40 },
      style: {
        fontSize: 28,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.primaryDeep,
        textAlign: "center",
      },
    },

    // Fun decorative elements
    {
      id: "rocket-left",
      type: "text",
      content: "🚀",
      position: { x: 150, y: 250, width: 40, height: 40 },
      style: {
        fontSize: 32,
        textAlign: "center",
      },
    },
    {
      id: "rocket-right",
      type: "text",
      content: "🚀",
      position: { x: 610, y: 250, width: 40, height: 40 },
      style: {
        fontSize: 32,
        textAlign: "center",
      },
    },

    // Main content
    {
      id: "youth-presented",
      type: "text",
      content: "This award is presented with pride to",
      position: { x: 50, y: 310, width: 700, height: 25 },
      style: {
        fontSize: 16,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "center",
      },
    },
    {
      id: "youth-recipient",
      type: "text",
      content: "{{recipientName}}",
      position: { x: 50, y: 345, width: 700, height: 40 },
      style: {
        fontSize: 32,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.primary,
        textAlign: "center",
      },
    },
    {
      id: "youth-achievement",
      type: "text",
      content: "For outstanding achievement in {{achievementArea}}",
      position: { x: 50, y: 395, width: 700, height: 25 },
      style: {
        fontSize: 16,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.secondary,
        textAlign: "center",
      },
    },
    {
      id: "youth-description",
      type: "text",
      content:
        "Your enthusiasm, dedication, and heart for God have been an inspiration to everyone around you. Keep growing in wisdom and faith, and remember that with God, all things are possible!",
      position: { x: 80, y: 430, width: 640, height: 50 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "center",
      },
    },

    // Covenant verse in colorful box
    {
      id: "youth-verse-box",
      type: "shape",
      content: "",
      position: { x: 100, y: 490, width: 600, height: 50 },
      style: {
        color: FOM_COLORS.primaryDeep,
        borderRadius: "25px",
      },
    },
    {
      id: "youth-covenant",
      type: "text",
      content:
        '"Do not be afraid, for those who are with us are more than those who are with them" - 2 Kings 6:16',
      position: { x: 120, y: 505, width: 560, height: 20 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        fontWeight: "italic",
        color: FOM_COLORS.white,
        textAlign: "center",
      },
    },

    // Footer with combined date and signature for minimal spacing
    {
      id: "youth-date-combined",
      type: "text",
      content: "Date: {{issueDate}}",
      position: { x: 100, y: 565, width: 200, height: 15 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "left",
      },
    },
    {
      id: "youth-signature-combined",
      type: "text",
      content: "Authorized by: {{issuerName}}",
      position: { x: 500, y: 565, width: 250, height: 15 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "left",
      },
    },

    // Certificate ID for Youth Achievement
    {
      id: "certificate-id-youth",
      type: "text",
      content: "Certificate ID: {{certificateId}}",
      position: { x: 50, y: 585, width: 700, height: 15 },
      style: {
        fontSize: 10,
        fontFamily: "serif",
        color: FOM_COLORS.secondary,
        textAlign: "center",
      },
    },

    // Security Features Section for Youth Achievement Template
    // QR Code for verification
    {
      id: "qr-code-youth",
      type: "image",
      content: "{{qrCode}}",
      position: { x: 650, y: 440, width: 60, height: 60 },
      style: {
        borderRadius: "4px",
      },
    },

    // QR Code label
    {
      id: "qr-label-youth",
      type: "text",
      content: "Scan to verify",
      position: { x: 635, y: 505, width: 90, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "center",
      },
    },

    // Security watermark (visible)
    {
      id: "security-watermark-youth",
      type: "text",
      content: "YOUTH",
      position: { x: 320, y: 280, width: 160, height: 80 },
      style: {
        fontSize: 48,
        fontFamily: "serif",
        fontWeight: "bold",
        color: "rgba(12, 67, 106, 0.08)",
        textAlign: "center",
      },
    },

    // Digital signature indicator
    {
      id: "digital-signature-youth",
      type: "text",
      content: "Digitally Signed & Verified",
      position: { x: 50, y: 570, width: 300, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "left",
      },
    },

    // Verification URL
    {
      id: "verification-url-youth",
      type: "text",
      content: "Verify at: {{verificationUrl}}",
      position: { x: 400, y: 570, width: 350, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "right",
      },
    },
  ],
  pageSettings: {
    width: 800,
    height: 600,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    background: {
      color: "#f0f8ff",
    },
  },
  fonts: [
    {
      family: "serif",
      variants: ["normal", "bold", "italic"],
    },
  ],
};

/**
 * Executive Director Appreciation Certificate
 * Elegant and honorable design for executive leadership recognition
 */
export const EXECUTIVE_DIRECTOR_APPRECIATION_CERTIFICATE: TemplateData = {
  name: "Executive Director Appreciation",
  description:
    "Elegant design for honoring executive directors and organizational leaders.",
  elements: [
    // Royal background
    {
      id: "pastor-bg",
      type: "shape",
      content: "",
      position: { x: 0, y: 0, width: 800, height: 600 },
      style: {
        color: "#f9f9f9",
      },
    },

    // Ornate border design
    {
      id: "pastor-border-outer",
      type: "shape",
      content: "",
      position: { x: 20, y: 20, width: 760, height: 560 },
      style: {
        color: FOM_COLORS.primaryDeep,
        borderRadius: "15px",
      },
    },
    {
      id: "pastor-border-middle",
      type: "shape",
      content: "",
      position: { x: 30, y: 30, width: 740, height: 540 },
      style: {
        color: FOM_COLORS.gold,
        borderRadius: "12px",
      },
    },
    {
      id: "pastor-border-inner",
      type: "shape",
      content: "",
      position: { x: 40, y: 40, width: 720, height: 520 },
      style: {
        color: FOM_COLORS.white,
        borderRadius: "10px",
      },
    },

    // Header with crown symbol
    {
      id: "crown-symbol",
      type: "text",
      content: "👑",
      position: { x: 375, y: 60, width: 50, height: 50 },
      style: {
        fontSize: 40,
        textAlign: "center",
      },
    },
    {
      id: "pastor-org-name",
      type: "text",
      content: "FISHERS OF MEN",
      position: { x: 70, y: 120, width: 660, height: 30 },
      style: {
        fontSize: 26,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.primaryDeep,
        textAlign: "center",
      },
    },
    {
      id: "pastor-scripture",
      type: "text",
      content: '"Follow me, and I will make you fishers of men" - Matthew 4:19',
      position: { x: 70, y: 150, width: 660, height: 20 },
      style: {
        fontSize: 13,
        fontFamily: "serif",
        fontWeight: "italic",
        color: FOM_COLORS.accent,
        textAlign: "center",
      },
    },

    // Certificate title
    {
      id: "pastor-title",
      type: "text",
      content: "EXECUTIVE DIRECTOR APPRECIATION",
      position: { x: 70, y: 190, width: 660, height: 40 },
      style: {
        fontSize: 30,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.primary,
        textAlign: "center",
      },
    },
    {
      id: "pastor-subtitle",
      type: "text",
      content: "Certificate of Honor & Gratitude",
      position: { x: 70, y: 230, width: 660, height: 25 },
      style: {
        fontSize: 16,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "center",
      },
    },

    // Decorative elements
    {
      id: "pastor-dove-left",
      type: "text",
      content: "🕊️",
      position: { x: 150, y: 270, width: 40, height: 40 },
      style: {
        fontSize: 28,
        textAlign: "center",
      },
    },
    {
      id: "pastor-dove-right",
      type: "text",
      content: "🕊️",
      position: { x: 610, y: 270, width: 40, height: 40 },
      style: {
        fontSize: 28,
        textAlign: "center",
      },
    },

    // Main content
    {
      id: "pastor-presented",
      type: "text",
      content:
        "This certificate is presented with deep appreciation and respect to",
      position: { x: 70, y: 320, width: 660, height: 25 },
      style: {
        fontSize: 15,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "center",
      },
    },
    {
      id: "pastor-recipient",
      type: "text",
      content: "{{recipientName}}",
      position: { x: 70, y: 355, width: 660, height: 40 },
      style: {
        fontSize: 32,
        fontFamily: "serif",
        fontWeight: "bold",
        color: FOM_COLORS.primaryDeep,
        textAlign: "center",
      },
    },
    {
      id: "pastor-description",
      type: "text",
      content:
        "For your exceptional leadership, strategic vision, and dedicated service to God's mission. Your commitment to guiding our organization and advancing God's kingdom has been transformational. Through your leadership, countless lives have been touched and our community has flourished.",
      position: { x: 90, y: 405, width: 620, height: 70 },
      style: {
        fontSize: 14,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "center",
      },
    },

    // Pastoral verse
    {
      id: "pastoral-verse-box",
      type: "shape",
      content: "",
      position: { x: 100, y: 490, width: 600, height: 50 },
      style: {
        color: FOM_COLORS.primaryDeep,
        borderRadius: "8px",
      },
    },
    {
      id: "pastoral-verse",
      type: "text",
      content:
        '"Be shepherds of God\'s flock... being examples to the flock" - 1 Peter 5:2-3',
      position: { x: 120, y: 500, width: 560, height: 15 },
      style: {
        fontSize: 12,
        fontFamily: "serif",

        fontWeight: "italic",
        color: FOM_COLORS.white,
        textAlign: "center",
      },
    },
    {
      id: "pastor-covenant",
      type: "text",
      content:
        '"Do not be afraid, for those who are with us are more than those who are with them" - 2 Kings 6:16',
      position: { x: 120, y: 520, width: 560, height: 15 },
      style: {
        fontSize: 11,
        fontFamily: "serif",
        fontWeight: "italic",
        color: FOM_COLORS.lightGray,
        textAlign: "center",
      },
    },

    // Footer with logo
    {
      id: "pastor-logo",
      type: "image",
      content: "/Logo.png",
      position: { x: 100, y: 560, width: 40, height: 40 },
      style: {},
    },
    {
      id: "pastor-date-combined",
      type: "text",
      content: "Date: {{issueDate}}",
      position: { x: 160, y: 575, width: 200, height: 15 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "left",
      },
    },
    {
      id: "pastor-signature-combined",
      type: "text",
      content: "Authorized by: {{issuerName}}",
      position: { x: 440, y: 575, width: 260, height: 15 },
      style: {
        fontSize: 12,
        fontFamily: "serif",
        color: FOM_COLORS.darkGray,
        textAlign: "left",
      },
    },

    // Certificate ID element - positioned discretely in bottom center
    {
      id: "pastor-certificate-id",
      type: "text",
      content: "Certificate ID: {{certificateId}}",
      position: { x: 200, y: 565, width: 400, height: 12 },
      style: {
        fontSize: 9,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "center",
      },
    },

    // Security Features Section for Executive Director Template
    // QR Code for verification
    {
      id: "qr-code-pastor",
      type: "image",
      content: "{{qrCode}}",
      position: { x: 650, y: 420, width: 60, height: 60 },
      style: {
        borderRadius: "4px",
      },
    },

    // QR Code label
    {
      id: "qr-label-pastor",
      type: "text",
      content: "Scan to verify",
      position: { x: 635, y: 485, width: 90, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "center",
      },
    },

    // Security watermark (visible)
    {
      id: "security-watermark-pastor",
      type: "text",
      content: "LEADERSHIP",
      position: { x: 280, y: 280, width: 240, height: 80 },
      style: {
        fontSize: 48,
        fontFamily: "serif",
        fontWeight: "bold",
        color: "rgba(12, 67, 106, 0.08)",
        textAlign: "center",
      },
    },

    // Digital signature indicator
    {
      id: "digital-signature-pastor",
      type: "text",
      content: "Digitally Signed & Verified",
      position: { x: 100, y: 550, width: 300, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "left",
      },
    },

    // Verification URL
    {
      id: "verification-url-pastor",
      type: "text",
      content: "Verify at: {{verificationUrl}}",
      position: { x: 400, y: 550, width: 300, height: 12 },
      style: {
        fontSize: 8,
        fontFamily: "serif",
        color: FOM_COLORS.mediumGray,
        textAlign: "right",
      },
    },
  ],
  pageSettings: {
    width: 800,
    height: 600,
    margin: { top: 20, right: 20, bottom: 20, left: 20 },
    background: {
      color: "#f9f9f9",
    },
  },
  fonts: [
    {
      family: "serif",
      variants: ["normal", "bold", "italic"],
    },
  ],
};

/**
 * All available certificate templates
 */
export const CERTIFICATE_TEMPLATES = [
  CERTIFICATE_OF_APPRECIATION_TEMPLATE,
  CERTIFICATE_OF_EXCELLENCE_TEMPLATE,
  MINISTRY_LEADERSHIP_CERTIFICATE,
  FAITHFUL_SERVICE_CERTIFICATE,
  VOLUNTEER_RECOGNITION_CERTIFICATE,
  MISSION_COMPLETION_CERTIFICATE,
  BAPTISM_CERTIFICATE,
  YOUTH_ACHIEVEMENT_CERTIFICATE,
  EXECUTIVE_DIRECTOR_APPRECIATION_CERTIFICATE,
] as const;

/**
 * Get a template by name
 */
export function getCertificateTemplate(name: string): TemplateData | undefined {
  return CERTIFICATE_TEMPLATES.find((template) => template.name === name);
}

/**
 * Get all template names
 */
export function getCertificateTemplateNames(): string[] {
  return CERTIFICATE_TEMPLATES.map((template) => template.name!);
}

/**
 * Apply security watermark to a template
 */
export function addSecurityWatermark(
  template: TemplateData,
  certificateId: string
): TemplateData {
  const watermark = generateWatermarkData(certificateId);

  const watermarkElement = {
    id: "security-watermark",
    type: "text" as const,
    content: watermark.text,
    position: {
      x: watermark.position.x,
      y: watermark.position.y,
      width: 120,
      height: 20,
    },
    style: {
      fontSize: 8,
      fontFamily: "monospace",
      color: "#f0f0f0", // Very light gray, barely visible
      textAlign: "center" as const,
      opacity: 0.3,
      transform: `rotate(${watermark.position.rotation}deg)`,
    },
  };

  return {
    ...template,
    elements: [...template.elements, watermarkElement],
  };
}
