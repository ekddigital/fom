import { brandOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/seo/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Fishers of Men prayer and fasting";

export default function OpenGraphImage() {
  return brandOgImage({
    title: "Prayer & fasting",
    subtitle: "Monthly sessions of teaching, worship, and intercession.",
  });
}
