import { Metadata } from "next";
import { notFound } from "next/navigation";
import { generatePrayerFastingMetadata } from "@/lib/metadata";
import PrayerFastingPostClient from "./client";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

async function getPrayerFastingSession(slug: string) {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/prayer-fasting/slug/${slug}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.session;
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const session = await getPrayerFastingSession(slug);

  if (!session) {
    return {
      title: "Prayer & Fasting Session Not Found | Fishers of Men",
      description:
        "The requested prayer and fasting session could not be found.",
    };
  }

  return generatePrayerFastingMetadata({
    title: session.title,
    description: session.description,
    slug: slug,
    speaker: session.speaker,
    sessionDate: session.sessionDate,
    youtubeVideoId: session.youtubeVideoId,
  });
}

export default async function PrayerFastingPostPage({ params }: Props) {
  const { slug } = await params;
  const session = await getPrayerFastingSession(slug);

  if (!session) {
    notFound();
  }

  return <PrayerFastingPostClient initialSession={session} />;
}
