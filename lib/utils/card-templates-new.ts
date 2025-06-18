/**
 * Card Templates - Central Hub
 * This file imports and re-exports all card templates from organized directories
 */

// Import types
export * from "./cards/types";

// Import all templates from the organized structure
import { JICF_TEMPLATES } from "./cards/jicf";
import { JULS_TEMPLATES } from "./cards/juls";
import { FOM_TEMPLATES } from "./cards/fom";
import { GENERAL_TEMPLATES } from "./cards/general";

// Re-export for backward compatibility and easy access
export * from "./cards/jicf";
export * from "./cards/juls";
export * from "./cards/fom";
export * from "./cards/general";

// Export unified template arrays
export const CARD_TEMPLATES = [
  ...JICF_TEMPLATES,
  ...JULS_TEMPLATES,
  ...FOM_TEMPLATES,
  ...GENERAL_TEMPLATES,
];

// Utility functions
export const getCardTemplate = (templateId: string) => {
  return CARD_TEMPLATES.find((template) => template.id === templateId);
};

export const getCardTemplatesByCategory = (category: string) => {
  return CARD_TEMPLATES.filter((template) => template.category === category);
};

export const getCardTemplatesByOrganization = (org: string) => {
  switch (org.toLowerCase()) {
    case "jicf":
      return JICF_TEMPLATES;
    case "juls":
      return JULS_TEMPLATES;
    case "fom":
      return FOM_TEMPLATES;
    case "general":
      return GENERAL_TEMPLATES;
    default:
      return [];
  }
};
