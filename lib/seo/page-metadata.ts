import type { Metadata } from "next";
import { SITE_NAME } from "./constants";
import { OG_IMAGES } from "./og-images";
import { absoluteUrl, getSiteUrl } from "./site-url";

/** Private trees: admin, dashboard, auth, ministry tools. */
export const noindexMetadata: Metadata = {
  robots: { index: false, follow: false },
};

export type PageMetadataInput = {
  title: string;
  description: string;
  /** Path beginning with `/`. Used for canonical and og:url. */
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  index?: boolean;
  /** Skip the root title template (homepage brand + tagline). */
  absoluteTitle?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
};

function resolveShareImage(image?: string): string {
  const raw = image?.trim() || OG_IMAGES.default;
  if (/^https?:\/\//i.test(raw)) return raw;
  return absoluteUrl(raw);
}

function imageMime(url: string): "image/png" | "image/jpeg" {
  return url.toLowerCase().includes(".jpg") || url.toLowerCase().includes(".jpeg")
    ? "image/jpeg"
    : "image/png";
}

export function pageMetadata(opts: PageMetadataInput): Metadata {
  const origin = getSiteUrl();
  const path = opts.path.startsWith("/") ? opts.path : `/${opts.path}`;
  const url = new URL(path, origin).toString();
  const index = opts.index ?? true;
  const imageUrl = resolveShareImage(opts.image);
  const images = [
    {
      url: imageUrl,
      alt: opts.imageAlt ?? opts.title,
      width: 1200,
      height: 630,
      type: imageMime(imageUrl),
    },
  ];

  return {
    title: opts.absoluteTitle ? { absolute: opts.title } : opts.title,
    description: opts.description,
    alternates: { canonical: url },
    robots: { index, follow: index },
    openGraph: {
      type: opts.type ?? "website",
      siteName: SITE_NAME,
      locale: "en_US",
      title: opts.title,
      description: opts.description,
      url,
      images,
      ...(opts.type === "article"
        ? {
            publishedTime: opts.publishedTime,
            modifiedTime: opts.modifiedTime,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [imageUrl],
    },
  };
}
