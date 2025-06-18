/**
 * FOM Card Templates - Main Export
 */

export * from "./constants";
export * from "./graduation";

// Re-export all templates as an array for easy access
import { fomSampleGrad } from "./graduation";

export const FOM_TEMPLATES = [fomSampleGrad];
