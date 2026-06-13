/**
 * General Card Templates
 * Templates that can be used across organizations
 */

import { CardTemplate } from "../types";

// General color scheme
const GENERAL_COLORS = {
  primary: "#1f2937",
  secondary: "#374151",
  accent: "#3b82f6",
  white: "#ffffff",
  lightGray: "#f8f9fa",
  darkGray: "#343a40",
};

// Simple graduation blessing template
export const generalGradBlessing: CardTemplate = {
  id: "general-grad-blessing",
  name: "General Graduation Blessing",
  description:
    "A simple graduation blessing card that can be customized for any organization",
  category: "graduation",
  settings: {
    width: 500,
    height: 700,
    backgroundColor: GENERAL_COLORS.white,
  },
  elements: [
    {
      id: "bg-gradient",
      type: "decoration",
      content: `<div style="
        width: 100%;
        height: 100%;
        background: linear-gradient(160deg, #ffffff 0%, #f8fbff 52%, #eef6ff 100%);
        border: 2px solid #dbeafe;
      "></div>`,
      position: { x: 0, y: 0, width: 500, height: 700 },
      style: {
        zIndex: 0,
      },
    },
    {
      id: "soft-motif-top",
      type: "decoration",
      content: `<svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="75" fill="#93c5fd" fill-opacity="0.16"/>
        <circle cx="120" cy="70" r="38" fill="#60a5fa" fill-opacity="0.2"/>
        <circle cx="65" cy="120" r="28" fill="#1d4ed8" fill-opacity="0.16"/>
      </svg>`,
      position: { x: 320, y: 20, width: 140, height: 140 },
      style: {
        zIndex: 1,
      },
    },
    {
      id: "soft-motif-bottom",
      type: "decoration",
      content: `<svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="75" fill="#fda4af" fill-opacity="0.15"/>
        <circle cx="120" cy="85" r="35" fill="#fb7185" fill-opacity="0.18"/>
        <circle cx="60" cy="115" r="26" fill="#e11d48" fill-opacity="0.12"/>
      </svg>`,
      position: { x: 25, y: 520, width: 130, height: 130 },
      style: {
        zIndex: 1,
      },
    },
    {
      id: "jicf-logo",
      type: "image",
      content: "/JICF_LOGO1.png",
      position: { x: 215, y: 40, width: 70, height: 35 },
      style: {
        zIndex: 2,
      },
    },
    {
      id: "title",
      type: "text",
      content: "Congratulations Graduate!",
      position: { x: 50, y: 120, width: 400, height: 60 },
      style: {
        fontSize: 28,
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        color: "#1e3a8a",
        textAlign: "center",
        zIndex: 3,
      },
    },
    {
      id: "blessing",
      type: "text",
      content:
        "May this achievement be the beginning of many great accomplishments to come. Wishing you continued success in all your future endeavors.",
      position: { x: 60, y: 240, width: 380, height: 190 },
      style: {
        fontSize: 16,
        fontFamily: "Georgia, serif",
        color: GENERAL_COLORS.secondary,
        textAlign: "center",
        lineHeight: 1.6,
        zIndex: 3,
      },
    },
    {
      id: "accent-line",
      type: "decoration",
      content: `<div style="width: 220px; height: 2px; background: linear-gradient(to right, transparent, #2563eb, transparent);"></div>`,
      position: { x: 140, y: 455, width: 220, height: 2 },
      style: {
        zIndex: 3,
      },
    },
    {
      id: "organization-name",
      type: "text",
      content: "{{organizationName}}",
      position: { x: 45, y: 495, width: 410, height: 30 },
      style: {
        fontSize: 16,
        fontFamily: "Times New Roman, serif",
        fontWeight: "bold",
        color: "#2563eb",
        textAlign: "center",
        letterSpacing: "0.5px",
        zIndex: 3,
      },
    },
    {
      id: "footer-blessing",
      type: "text",
      content: "Keep shining and keep serving with grace.",
      position: { x: 70, y: 615, width: 360, height: 24 },
      style: {
        fontSize: 14,
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
        color: "#64748b",
        textAlign: "center",
        zIndex: 3,
      },
    },
  ],
};
