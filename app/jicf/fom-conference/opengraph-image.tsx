import { brandOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/seo/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Fishers of Men Conference 2026";

export default function OpenGraphImage() {
  return brandOgImage({
    title: "FOM Conference 2026",
    subtitle: "May 22–24, 2026 — teaching, fellowship, and Sunday games.",
  });
}
