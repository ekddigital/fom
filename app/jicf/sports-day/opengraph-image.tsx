import { brandOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/seo/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "JICF Sports Day 2026";

export default function OpenGraphImage() {
  return brandOgImage({
    title: "JICF Sports Day",
    subtitle: "Sunday, May 17, 2026 — games, fellowship, and recreation.",
    eyebrow: "Jinan International Christian Fellowship",
  });
}
