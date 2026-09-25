import type { Metadata } from "next";
import { OG_IMAGES } from "@/lib/seo/og-images";
import { pageMetadata } from "@/lib/seo/page-metadata";

interface PageMetadata {
  title: string;
  description: string;
  url?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

/** @deprecated Prefer pageMetadata() from lib/seo/page-metadata.ts */
export function generateMetadata({
  title,
  description,
  url,
  image,
  imageAlt,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetadata): Metadata {
  return pageMetadata({
    title,
    description,
    path: url || "/",
    image,
    imageAlt,
    type,
    publishedTime,
    modifiedTime,
  });
}

export function generatePrayerFastingMetadata({
  title,
  description,
  slug,
  speaker,
  sessionDate,
  youtubeVideoId,
}: {
  title: string;
  description: string;
  slug: string;
  speaker: string;
  sessionDate: string;
  youtubeVideoId?: string;
}): Metadata {
  const videoThumbnail = youtubeVideoId
    ? `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`
    : OG_IMAGES.prayerFasting;

  return pageMetadata({
    title,
    description: `${description} Speaker: ${speaker}.`,
    path: `/prayer-fasting/${slug}`,
    image: videoThumbnail,
    imageAlt: `${title} — Prayer & fasting`,
    type: "article",
    publishedTime: sessionDate,
  });
}

export function generateSermonMetadata({
  title,
  description,
  slug,
  speaker,
  date,
  youtubeVideoId,
}: {
  title: string;
  description: string;
  slug: string;
  speaker: string;
  date: string;
  youtubeVideoId?: string;
}): Metadata {
  const videoThumbnail = youtubeVideoId
    ? `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`
    : OG_IMAGES.default;

  return pageMetadata({
    title,
    description: `${description} Preached by ${speaker}.`,
    path: `/sermons/${slug}`,
    image: videoThumbnail,
    imageAlt: `${title} — Sermon`,
    type: "article",
    publishedTime: date,
    index: false,
  });
}

export function generateEventMetadata({
  title,
  description,
  slug,
  date,
  location,
}: {
  title: string;
  description: string;
  slug: string;
  date: string;
  location?: string;
}): Metadata {
  return pageMetadata({
    title,
    description: location ? `${description} Location: ${location}.` : description,
    path: `/events/${slug}`,
    type: "article",
    publishedTime: date,
    index: false,
  });
}
