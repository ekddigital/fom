/**
 * JICF Certificate Templates - Main Export
 */

export * from "./constants";
export * from "./sample";
export * from "./easter-winner";
export * from "./certificate-of-service";

// Re-export all templates as an array for easy access
import { jicfSampleCert } from "./sample";
import { jicfEasterWinnerCert } from "./easter-winner";
import { jicfCertificateOfService } from "./certificate-of-service";

export const JICF_TEMPLATES = [
  jicfSampleCert,
  jicfEasterWinnerCert,
  jicfCertificateOfService,
];
