import type { MetadataRoute } from "next";
import { ROBOTS_DISALLOW } from "@/lib/seo/public-routes";
import { getSiteUrl } from "@/lib/seo/site-url";

export default function robots(): MetadataRoute.Robots {
  const origin = getSiteUrl().origin;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...ROBOTS_DISALLOW],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
