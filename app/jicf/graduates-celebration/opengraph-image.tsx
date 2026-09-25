import { brandOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/seo/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "JICF Graduates Celebration 2026";

export default function OpenGraphImage() {
  return brandOgImage({
    title: "Graduates Celebration",
    subtitle: "Sunday, June 14, 2026 — service 14:30–17:00, dinner after.",
    eyebrow: "Jinan International Christian Fellowship",
  });
}
