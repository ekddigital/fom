import { brandOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/seo/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "About Fishers of Men";

export default function OpenGraphImage() {
  return brandOgImage({
    title: "About us",
    subtitle:
      "Founded in 2019 to preach the gospel and make disciples of all nations.",
  });
}
