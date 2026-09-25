import { brandOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/seo/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Fishers of Men events";

export default function OpenGraphImage() {
  return brandOgImage({
    title: "Events",
    subtitle: "Worship, Bible study, outreach, and gatherings for the church.",
  });
}
