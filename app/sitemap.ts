import type { MetadataRoute } from "next";
import { listPublishedPrayerSessions } from "@/lib/seo/prayer-sessions";
import { SITEMAP_ROUTES } from "@/lib/seo/public-routes";
import { getSiteUrl } from "@/lib/seo/site-url";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getSiteUrl().origin;

  const staticEntries: MetadataRoute.Sitemap = SITEMAP_ROUTES.map((entry) => ({
    url: entry.path === "/" ? `${origin}/` : `${origin}${entry.path}`,
    lastModified: new Date(),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));

  const sessions = await listPublishedPrayerSessions();
  const sessionEntries: MetadataRoute.Sitemap = sessions.map((session) => ({
    url: `${origin}/prayer-fasting/${session.slug}`,
    lastModified: session.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...sessionEntries];
}
