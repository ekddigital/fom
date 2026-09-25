import { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { articleLd } from "@/lib/seo/json-ld";
import { OG_IMAGES } from "@/lib/seo/og-images";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { getPublishedPrayerSession } from "@/lib/seo/prayer-sessions";
import { absoluteUrl, getSiteUrl } from "@/lib/seo/site-url";
import PrayerFastingPostClient from "./client";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const session = await getPublishedPrayerSession(slug);

  if (!session) {
    return { robots: { index: false, follow: false } };
  }

  const published = session.sessionDate.toISOString();
  const image = session.youtubeVideoId
    ? `https://img.youtube.com/vi/${session.youtubeVideoId}/maxresdefault.jpg`
    : OG_IMAGES.prayerFasting;

  return pageMetadata({
    title: session.metaTitle?.trim() || session.title,
    description:
      session.metaDescription?.trim() ||
      session.excerpt?.trim() ||
      session.description,
    path: `/prayer-fasting/${slug}`,
    image,
    imageAlt: `${session.title} — Prayer & fasting`,
    type: "article",
    publishedTime: published,
    modifiedTime: session.updatedAt.toISOString(),
  });
}

export default async function PrayerFastingPostPage({ params }: Props) {
  const { slug } = await params;
  const session = await getPublishedPrayerSession(slug);

  if (!session) {
    notFound();
  }

  const origin = getSiteUrl().origin;
  const url = absoluteUrl(`/prayer-fasting/${slug}`);
  const image = session.youtubeVideoId
    ? `https://img.youtube.com/vi/${session.youtubeVideoId}/maxresdefault.jpg`
    : absoluteUrl(OG_IMAGES.prayerFasting);

  return (
    <>
      <JsonLd
        data={articleLd({
          origin,
          url,
          headline: session.title,
          description: session.excerpt?.trim() || session.description,
          image,
          datePublished: session.sessionDate.toISOString(),
          dateModified: session.updatedAt.toISOString(),
          authorName: session.speaker,
        })}
      />
      <PrayerFastingPostClient
        initialSession={{
          id: session.id,
          title: session.title,
          description: session.description,
          content: session.content,
          excerpt: session.excerpt || "",
          youtubeVideoId: session.youtubeVideoId,
          speaker: session.speaker,
          speakerBio: session.speakerBio ?? undefined,
          speakerImageUrl: session.speakerImageUrl ?? undefined,
          sessionDate: session.sessionDate.toISOString(),
          duration: session.duration,
          status: session.status,
          viewCount: session.viewCount,
          shareCount: session.shareCount,
          createdAt: session.createdAt.toISOString(),
          updatedAt: session.updatedAt.toISOString(),
        }}
      />
    </>
  );
}
