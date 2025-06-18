/**
 * JICF Certificate Templates - Main Export
 */

export * from "./constants";
export * from "./sample";

// Re-export all templates as an array for easy access
import { jicfSampleCert } from "./sample";

export const JICF_TEMPLATES = [jicfSampleCert];
