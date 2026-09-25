import type { MetadataRoute } from "next";

export type PublicRoute = {
  path: string;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority: number;
  /** false = public URL exists but must stay out of the sitemap. */
  index: boolean;
};

/**
 * Inventory of HTML routes. Keep in sync with app/ pages.
 *
 * Indexable marketing / ministry HTML:
 *   `/`, `/about`, `/events`, `/give`, `/contact`,
 *   `/prayer-fasting` (+ published slugs in sitemap.ts),
 *   `/jicf`, `/jicf/fom-conference`, `/jicf/sports-day`,
 *   `/jicf/graduates-celebration`
 *
 * Public but noindex (thin placeholders):
 *   `/sermons`, `/bible-studies`, `/devotionals`, `/testimonies`,
 *   `/mission-reports`, `/resources`, `/study`,
 *   `/community`, `/prayer`, `/groups`, `/fellowship`, `/connect`,
 *   `/ministry`, `/missions`
 *
 * Public tools / share flyers (noindex):
 *   `/verify-certificate`, `/jicf/english-tutoring`, `/jicf/ekddigital/**`,
 *   `/jicf/wedding-certificate`
 *
 * Auth:
 *   `/sign-in`, `/sign-up`, `/auth/**`
 *
 * App / admin / ministry tools (auth wall + noindex):
 *   `/dash/**`, `/admin/**`, `/mgmt/**`,
 *   `/content`, `/manage-events`, `/ministry-certificates`
 *
 * JSON / internals:
 *   `/api/**`
 */
export const PUBLIC_ROUTES: PublicRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1, index: true },
  { path: "/about", changeFrequency: "monthly", priority: 0.8, index: true },
  { path: "/events", changeFrequency: "weekly", priority: 0.8, index: true },
  { path: "/give", changeFrequency: "monthly", priority: 0.6, index: true },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5, index: true },
  {
    path: "/prayer-fasting",
    changeFrequency: "weekly",
    priority: 0.8,
    index: true,
  },
  { path: "/jicf", changeFrequency: "monthly", priority: 0.6, index: true },
  {
    path: "/jicf/fom-conference",
    changeFrequency: "monthly",
    priority: 0.7,
    index: true,
  },
  {
    path: "/jicf/sports-day",
    changeFrequency: "monthly",
    priority: 0.5,
    index: true,
  },
  {
    path: "/jicf/graduates-celebration",
    changeFrequency: "monthly",
    priority: 0.5,
    index: true,
  },
  { path: "/sermons", changeFrequency: "yearly", priority: 0.2, index: false },
  {
    path: "/bible-studies",
    changeFrequency: "yearly",
    priority: 0.2,
    index: false,
  },
  {
    path: "/devotionals",
    changeFrequency: "yearly",
    priority: 0.2,
    index: false,
  },
  {
    path: "/testimonies",
    changeFrequency: "yearly",
    priority: 0.2,
    index: false,
  },
  {
    path: "/mission-reports",
    changeFrequency: "yearly",
    priority: 0.2,
    index: false,
  },
  { path: "/resources", changeFrequency: "yearly", priority: 0.2, index: false },
  { path: "/study", changeFrequency: "yearly", priority: 0.2, index: false },
  {
    path: "/jicf/english-tutoring",
    changeFrequency: "yearly",
    priority: 0.1,
    index: false,
  },
];

export const SITEMAP_ROUTES = PUBLIC_ROUTES.filter((route) => route.index);

export const ROBOTS_DISALLOW = [
  "/admin",
  "/dash",
  "/mgmt",
  "/api/",
  "/sign-in",
  "/sign-up",
  "/auth",
  "/content",
  "/manage-events",
  "/ministry-certificates",
  "/jicf/ekddigital",
  "/jicf/wedding-certificate",
] as const;
