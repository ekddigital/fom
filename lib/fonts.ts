/**
 * Font configuration with robust fallbacks
 * Font loaders must be called at module scope for Next.js/Turbopack compatibility
 */

import { Geist, Geist_Mono } from "next/font/google";

// Font loaders MUST be called at module scope (not in try/catch)
// Next.js/Turbopack requires this for proper compilation
// All values must be literal strings, not variables
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "sans-serif",
  ],
  display: "swap", // Improve loading performance
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace",
  ],
  display: "swap",
  preload: true,
});

export { geistSans, geistMono };

// CSS variables for robust font fallback
export const fontVariables = `
  :root {
    --font-geist-sans: ${geistSans.style.fontFamily};
    --font-geist-mono: ${geistMono.style.fontFamily};
    --font-sans: var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    --font-mono: var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  }
`;

// Utility function to get font class names
export function getFontClasses() {
  return {
    sans: geistSans.variable,
    mono: geistMono.variable,
    combined: `${geistSans.variable} ${geistMono.variable}`,
  };
}

// Runtime fallback helper for cases where fonts might not load in the browser
export function getFontFamilyWithFallback(fontType: "sans" | "mono") {
  if (fontType === "sans") {
    return `var(--font-geist-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif)`;
  } else {
    return `var(--font-geist-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace)`;
  }
}
