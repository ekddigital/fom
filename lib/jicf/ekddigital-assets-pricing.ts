/**
 * Digital Assets pricing for EKD Digital flyers.
 * Synced from assets/src/lib/billing/plan-catalog.ts (DEFAULT_PLANS).
 * Monthly prices only — used on the digital-assets pricing flyer.
 */
export type DigitalAssetsPlan = {
  id: string;
  name: string;
  description: string;
  storageLabel: string;
  monthlyPrice: number | null;
  popular?: boolean;
  requiresContact?: boolean;
};

export const DIGITAL_ASSETS_PLANS: DigitalAssetsPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Small projects — free forever",
    storageLabel: "50 MB storage",
    monthlyPrice: 0,
  },
  {
    id: "starter",
    name: "Starter",
    description: "Small production apps",
    storageLabel: "10 GB storage",
    monthlyPrice: 19,
  },
  {
    id: "pro",
    name: "Pro",
    description: "Production apps with higher limits",
    storageLabel: "100 GB storage",
    monthlyPrice: 49,
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom limits, SLA, and dedicated support",
    storageLabel: "Custom",
    monthlyPrice: null,
    requiresContact: true,
  },
];

export function formatMonthlyPrice(
  price: number | null,
  requiresContact?: boolean,
): string {
  if (requiresContact) return "Contact";
  if (price === null) return "Contact";
  if (price === 0) return "$0";
  return `$${price}`;
}
