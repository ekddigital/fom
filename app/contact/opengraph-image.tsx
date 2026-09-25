import { brandOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/seo/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Contact Fishers of Men";

export default function OpenGraphImage() {
  return brandOgImage({
    title: "Contact",
    subtitle: "Prayer, pastoral care, ministry questions, and partnership.",
  });
}
