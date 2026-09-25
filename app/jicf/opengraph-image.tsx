import { brandOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/seo/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Jinan International Christian Fellowship";

export default function OpenGraphImage() {
  return brandOgImage({
    title: "JICF",
    subtitle:
      "Jinan International Christian Fellowship — an English-speaking church family in Jinan.",
    eyebrow: "Jinan International Christian Fellowship",
  });
}
