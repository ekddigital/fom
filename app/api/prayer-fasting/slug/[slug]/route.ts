import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const session = await prisma.prayerFasting.findUnique({
      where: {
        slug: slug,
      },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Transform the data to match the frontend interface
    const transformedSession = {
      id: session.id,
      title: session.title,
      description: session.description,
      content: session.content,
      excerpt: session.excerpt || "",
      youtubeVideoId: session.youtubeVideoId,
      speaker: session.speaker,
      speakerBio: session.speakerBio,
      speakerImageUrl: session.speakerImageUrl,
      sessionDate: session.sessionDate.toISOString(),
      duration: session.duration,
      status: session.status,
      viewCount: session.viewCount,
      shareCount: session.shareCount,
      createdAt: session.createdAt.toISOString(),
      updatedAt: session.updatedAt.toISOString(),
    };

    return NextResponse.json({ session: transformedSession });
  } catch (error) {
    console.error("Error fetching prayer fasting session by slug:", error);
    return NextResponse.json(
      { error: "Failed to fetch session" },
      { status: 500 }
    );
  }
}
