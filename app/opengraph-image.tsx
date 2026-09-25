import { brandOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/seo/og-image";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/seo/constants";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;

export default function OpenGraphImage() {
  return brandOgImage({
    title: SITE_TAGLINE,
    subtitle:
      "A Christian ministry preaching the gospel through missions, teaching, and community.",
  });
}
