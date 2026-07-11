/**
 * Flyer pricing — synced with live product configs:
 * - Transactional / EKDSend: lib/jicf/ekddigital-transactional-pricing.ts (mail TRANSACTIONAL_PRODUCT)
 * - Digital Assets: lib/jicf/ekddigital-assets-pricing.ts (assets DEFAULT_PLANS)
 * - Hosting & SSL: illustrative tiers — no dedicated product catalog in-repo
 */

import {
  DIGITAL_ASSETS_PLANS,
  formatMonthlyPrice as formatAssetsMonthlyPrice,
} from "@/lib/jicf/ekddigital-assets-pricing";
import {
  TRANSACTIONAL_EMAIL_PLANS,
  formatEmailsPerMonth,
  formatMonthlyPrice,
} from "@/lib/jicf/ekddigital-transactional-pricing";
import {
  DIGITAL_ASSETS_PRODUCT_BRAND,
  DIGITAL_ASSETS_WEBSITE,
  EKD_DIGITAL_WEBSITE,
  EKDSEND_PRODUCT_BRAND,
  EKDSEND_WEBSITE,
  type ProductFlyerBrand,
} from "@/components/jicf/ekddigital-flyer-theme";

export type PricingTier = {
  name: string;
  volume: string;
  price: string;
  highlight?: boolean;
  contactOnly?: boolean;
};

/** Visual layout variant per pricing flyer (distinct hero + tier treatment). */
export type PricingFlyerVariant =
  | "hosting"
  | "email"
  | "comms"
  | "assets"
  | "ssl";

export type ServicePricingFlyerConfig = {
  slug: string;
  title: string;
  subtitle: string;
  sectionLabel: string;
  watermark: string;
  variant: PricingFlyerVariant;
  heroLabel: string;
  heroHeadline: string;
  heroSubline: string;
  tagline: string;
  bullets: readonly string[];
  tiers: readonly PricingTier[];
  footnote: string;
  ctaHeadline?: string;
  productUrl: string;
  brand?: ProductFlyerBrand;
  downloadFilename: string;
  metadataTitle: string;
  metadataDescription: string;
};

function usd(monthly: number): string {
  if (monthly === 0) return "$0";
  return `$${monthly % 1 === 0 ? monthly : monthly.toFixed(2)}`;
}

const transactionalEmailTiers: PricingTier[] = TRANSACTIONAL_EMAIL_PLANS.map(
  (plan) => ({
    name: plan.name,
    volume: formatEmailsPerMonth(plan.emailsPerMonth),
    price: formatMonthlyPrice(plan.monthlyPrice, plan.requiresContact),
    highlight: plan.popular,
    contactOnly: plan.requiresContact,
  }),
);

const digitalAssetsTiers: PricingTier[] = DIGITAL_ASSETS_PLANS.map((plan) => ({
  name: plan.name,
  volume: plan.storageLabel,
  price: formatAssetsMonthlyPrice(plan.monthlyPrice, plan.requiresContact),
  highlight: plan.popular,
  contactOnly: plan.requiresContact,
}));

/** Source: mail TRANSACTIONAL_PRODUCT tiers (monthly pricing) */
export const TRANSACTIONAL_EMAIL_PRICING: ServicePricingFlyerConfig = {
  slug: "transactional-email",
  title: "Transactional Email",
  subtitle: "API delivery at scale",
  sectionLabel: "Monthly Plans",
  watermark: "✉",
  variant: "email",
  heroLabel: "Email API · Webhooks · Analytics",
  heroHeadline: "DELIVER AT SCALE.",
  heroSubline: `REST & SMTP · ${EKDSEND_WEBSITE}`,
  tagline:
    "Reliable transactional email for password resets, invoices, and product notifications—built for developers.",
  bullets: [
    "REST & SMTP APIs with real-time webhooks",
    "Custom tracking domains and deliverability tools",
    "From 100 emails/month free to enterprise volume",
  ],
  tiers: transactionalEmailTiers,
  footnote:
    `Dedicated IPs & SLA — contact us · ${EKDSEND_WEBSITE} · Prices from EKDSend mail platform`,
  productUrl: EKDSEND_WEBSITE,
  brand: EKDSEND_PRODUCT_BRAND,
  downloadFilename: "ekddigital-transactional-email-pricing.png",
  metadataTitle: "EKD Digital — Transactional Email Pricing",
  metadataDescription:
    "Transactional email API plans: Free, Starter, Growth, Scale, and Enterprise. Monthly volumes and pricing from the EKDSend platform.",
};

/** Source: mail TRANSACTIONAL_PRODUCT tiers (monthly pricing — es.ekddigital.com) */
export const EKDSEND_PRICING: ServicePricingFlyerConfig = {
  slug: "ekdsend",
  title: "EKDSend",
  subtitle: "Transactional email · Mailboxes",
  sectionLabel: "Monthly Plans",
  watermark: "📨",
  variant: "comms",
  heroLabel: "Email API · Mailboxes · Analytics",
  heroHeadline: "COMMUNICATIONS THAT DELIVER.",
  heroSubline: `REST & SMTP · ${EKDSEND_WEBSITE}`,
  tagline:
    "EKDSend powers transactional email and business mailboxes—reliable delivery, custom domains, and developer-friendly APIs.",
  bullets: [
    "100 emails/month free — no credit card required",
    "REST & SMTP APIs with real-time webhooks",
    "Mailboxes and storage on your own domains",
  ],
  tiers: transactionalEmailTiers,
  footnote:
    `Dedicated IPs & SLA — contact us · ${EKDSEND_WEBSITE} · Prices from EKDSend mail platform`,
  productUrl: EKDSEND_WEBSITE,
  brand: EKDSEND_PRODUCT_BRAND,
  downloadFilename: "ekddigital-ekdsend-pricing.png",
  metadataTitle: "EKD Digital — EKDSend Pricing",
  metadataDescription:
    "EKDSend pricing: Free, Starter, Growth, Scale, and Enterprise transactional email plans. Monthly volumes and pricing from es.ekddigital.com.",
};

export const DIGITAL_ASSETS_PRICING: ServicePricingFlyerConfig = {
  slug: "digital-assets",
  title: "Digital Assets",
  subtitle: "DAM · CDN hosting",
  sectionLabel: "Storage Plans",
  watermark: "🗂️",
  variant: "assets",
  heroLabel: "Asset Management · Global CDN",
  heroHeadline: "STORE & DELIVER.",
  heroSubline: `DAM · CDN · ${DIGITAL_ASSETS_WEBSITE}`,
  tagline:
    "Secure digital asset management with fast global CDN delivery for marketing, product, and media teams.",
  bullets: [
    "Organize, tag, and version assets in one library",
    "Transform and optimize on the edge via CDN",
    "Team permissions and shareable delivery links",
  ],
  tiers: digitalAssetsTiers,
  footnote: `Enterprise SLAs & custom entitlements — ${DIGITAL_ASSETS_WEBSITE}/pricing`,
  productUrl: DIGITAL_ASSETS_WEBSITE,
  brand: DIGITAL_ASSETS_PRODUCT_BRAND,
  downloadFilename: "ekddigital-digital-assets-pricing.png",
  metadataTitle: "EKD Digital — Digital Assets Pricing",
  metadataDescription:
    "Digital asset management and CDN hosting plans from EKD Digital.",
};

export const SSL_PRICING: ServicePricingFlyerConfig = {
  slug: "ssl",
  title: "SSL Certificates",
  subtitle: "Site protection",
  sectionLabel: "Annual Certificates",
  watermark: "🔒",
  variant: "ssl",
  heroLabel: "DV · Wildcard · EV",
  heroHeadline: "TRUST & ENCRYPT.",
  heroSubline: "Issuance · Renewal · Support",
  tagline:
    "Protect your domains with managed SSL—installation support, renewal reminders, and expert configuration included.",
  bullets: [
    "Domain-validated certs for standard sites",
    "Wildcard coverage for subdomains",
    "EV and multi-domain options for enterprise",
  ],
  tiers: [
    {
      name: "Standard DV",
      volume: "1 domain / yr",
      price: usd(49),
    },
    {
      name: "Wildcard",
      volume: "*.domain / yr",
      price: usd(199),
      highlight: true,
    },
    {
      name: "Multi-domain",
      volume: "Up to 5 SANs",
      price: usd(149),
    },
    {
      name: "EV / Enterprise",
      volume: "Custom",
      price: "Contact",
      contactOnly: true,
    },
  ],
  footnote: "Installation & renewal management available — contact for bulk or EV quotes",
  productUrl: EKD_DIGITAL_WEBSITE,
  downloadFilename: "ekddigital-ssl-pricing.png",
  metadataTitle: "EKD Digital — SSL Certificate Pricing",
  metadataDescription:
    "SSL certificate pricing: Standard DV, Wildcard, Multi-domain, and Enterprise options.",
};

export const HOSTING_PRICING: ServicePricingFlyerConfig = {
  slug: "hosting",
  title: "Cloud Hosting",
  subtitle: "Apps · databases · CDN",
  sectionLabel: "Hosting Plans",
  watermark: "☁",
  variant: "hosting",
  heroLabel: "Apps · DBs · Edge CDN",
  heroHeadline: "HOST WITH CONFIDENCE.",
  heroSubline: "Scale · Monitor · Deploy",
  tagline:
    "Managed cloud hosting for web apps, APIs, and databases—with monitoring, backups, and expert ops support.",
  bullets: [
    "Container and VM deployments with auto-scaling",
    "Managed databases and object storage",
    "CDN, SSL termination, and uptime monitoring",
  ],
  tiers: [
    {
      name: "Starter",
      volume: "1 app · 2 GB RAM",
      price: usd(19),
    },
    {
      name: "Business",
      volume: "3 apps · 8 GB RAM",
      price: usd(79),
      highlight: true,
    },
    {
      name: "Scale",
      volume: "8 apps · 32 GB RAM",
      price: usd(199),
    },
    {
      name: "Enterprise",
      volume: "Custom",
      price: "Contact",
      contactOnly: true,
    },
  ],
  footnote: "Dedicated clusters & multi-region — contact for architecture review",
  productUrl: EKD_DIGITAL_WEBSITE,
  downloadFilename: "ekddigital-hosting-pricing.png",
  metadataTitle: "EKD Digital — Cloud Hosting Pricing",
  metadataDescription:
    "Cloud hosting plans for applications, databases, and CDN from EKD Digital.",
};

export const ALL_SERVICE_PRICING_CONFIGS: readonly ServicePricingFlyerConfig[] = [
  TRANSACTIONAL_EMAIL_PRICING,
  EKDSEND_PRICING,
  DIGITAL_ASSETS_PRICING,
  SSL_PRICING,
  HOSTING_PRICING,
];

export function getPricingConfigBySlug(
  slug: string,
): ServicePricingFlyerConfig | undefined {
  return ALL_SERVICE_PRICING_CONFIGS.find((c) => c.slug === slug);
}

export const PRICING_ROUTE_PREFIX = "/jicf/ekddigital/services/pricing";

export function pricingFlyerHref(slug: string): string {
  return `${PRICING_ROUTE_PREFIX}/${slug}`;
}
