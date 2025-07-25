import type { Metadata } from "next";

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

export function generateMetadata({
  title,
  description,
  url,
  image = "/banner.png",
  imageAlt = "Fishers of Men - Bringing Jesus to the World",
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
}: PageMetadata): Metadata {
  const baseUrl = "https://www.fomjesus.org";
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;

  const metadata: Metadata = {
    title,
    description,
    keywords: [
      "Fishers of Men",
      "Christian organization",
      "Gospel",
      "Ministry",
      "Missions",
      "Bible study",
      "Prayer",
      "Community",
      "Faith",
      "Jesus Christ",
      ...(tags || []),
    ],
    authors: author ? [{ name: author }] : [{ name: "Fishers of Men" }],
    creator: "Fishers of Men",
    openGraph: {
      type,
      locale: "en_US",
      url: fullUrl,
      title,
      description,
      siteName: "Fishers of Men",
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
        {
          url: `${baseUrl}/Logo.png`,
          width: 400,
          height: 400,
          alt: "Fishers of Men Logo",
        },
      ],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        author,
        section,
        tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullImageUrl],
      creator: "@fomjesus",
      site: "@fomjesus",
    },
    robots: {
      index: true,
      follow: true,
    },
  };

  return metadata;
}

// Helper function for prayer-fasting posts
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
    : "/banner.png";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    author: {
      "@type": "Person",
      name: speaker,
    },
    publisher: {
      "@type": "Organization",
      name: "Fishers of Men",
      logo: {
        "@type": "ImageObject",
        url: "https://www.fomjesus.org/Logo.png",
      },
    },
    datePublished: sessionDate,
    image: `https://www.fomjesus.org${videoThumbnail}`,
    url: `https://www.fomjesus.org/prayer-fasting/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.fomjesus.org/prayer-fasting/${slug}`,
    },
    articleSection: "Prayer & Fasting",
    keywords: [
      "Prayer",
      "Fasting",
      "Spiritual Growth",
      "Ministry",
      "Christian",
    ],
    ...(youtubeVideoId && {
      video: {
        "@type": "VideoObject",
        name: title,
        description: description,
        thumbnailUrl: `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`,
        uploadDate: sessionDate,
        contentUrl: `https://www.youtube.com/watch?v=${youtubeVideoId}`,
        embedUrl: `https://www.youtube.com/embed/${youtubeVideoId}`,
      },
    }),
  };

  return {
    ...generateMetadata({
      title: `${title} - Prayer & Fasting | Fishers of Men`,
      description: `${description} Speaker: ${speaker}. Join us for this powerful time of prayer and fasting.`,
      url: `/prayer-fasting/${slug}`,
      image: videoThumbnail,
      imageAlt: `${title} - Prayer & Fasting Session`,
      type: "article",
      publishedTime: sessionDate,
      author: speaker,
      section: "Prayer & Fasting",
      tags: ["Prayer", "Fasting", "Spiritual Growth", "Ministry"],
    }),
    other: {
      "application/ld+json": JSON.stringify(structuredData),
    },
  };
} // Helper function for sermons
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
    : "/banner.png";

  return generateMetadata({
    title: `${title} - Sermon | Fishers of Men`,
    description: `${description} Preached by ${speaker}.`,
    url: `/sermons/${slug}`,
    image: videoThumbnail,
    imageAlt: `${title} - Sermon`,
    type: "article",
    publishedTime: date,
    author: speaker,
    section: "Sermons",
    tags: ["Sermon", "Preaching", "Bible Teaching", "Ministry"],
  });
}

// Helper function for events
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
  const eventDescription = location
    ? `${description} Location: ${location}.`
    : description;

  return generateMetadata({
    title: `${title} - Event | Fishers of Men`,
    description: eventDescription,
    url: `/events/${slug}`,
    type: "article",
    publishedTime: date,
    section: "Events",
    tags: ["Event", "Ministry", "Community", "Fellowship"],
  });
}
