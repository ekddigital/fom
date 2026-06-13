/**
 * Transactional email pricing for EKD Digital flyers.
 * Synced from mail/src/lib/constants/pricing.ts (TRANSACTIONAL_PRODUCT tiers).
 * Monthly prices only — used on the transactional-email pricing flyer.
 */
export type TransactionalEmailPlan = {
  id: string;
  name: string;
  description: string;
  emailsPerMonth: number | "Unlimited";
  monthlyPrice: number;
  popular?: boolean;
  requiresContact?: boolean;
};

export const TRANSACTIONAL_EMAIL_PLANS: TransactionalEmailPlan[] = [
  {
    id: "transactional-free",
    name: "Free",
    description: "Testing & development",
    emailsPerMonth: 100,
    monthlyPrice: 0,
  },
  {
    id: "transactional-starter",
    name: "Starter",
    description: "Small apps & startups",
    emailsPerMonth: 10_000,
    monthlyPrice: 15,
  },
  {
    id: "transactional-growth",
    name: "Growth",
    description: "Growing applications",
    emailsPerMonth: 50_000,
    monthlyPrice: 49,
    popular: true,
  },
  {
    id: "transactional-scale",
    name: "Scale",
    description: "High-volume senders",
    emailsPerMonth: 200_000,
    monthlyPrice: 149,
  },
  {
    id: "transactional-enterprise",
    name: "Enterprise",
    description: "Large organizations",
    emailsPerMonth: "Unlimited",
    monthlyPrice: 499,
    requiresContact: true,
  },
];

export function formatEmailsPerMonth(count: number | "Unlimited"): string {
  if (count === "Unlimited") return "Unlimited";
  if (count >= 1000) return `${(count / 1000).toLocaleString("en-US")}K / mo`;
  return `${count} / mo`;
}

export function formatMonthlyPrice(price: number, requiresContact?: boolean): string {
  if (requiresContact) return "Contact";
  if (price === 0) return "$0";
  return `$${price}`;
}
