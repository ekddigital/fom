import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const upcomingSessions = await prisma.prayerFasting.findMany({
      where: {
        status: "UPCOMING",
        isPublished: true, // Only return published sessions
      },
      orderBy: {
        sessionDate: "asc",
      },
      take: 10,
    });

    // Transform the data to match the frontend interface
    const sessions = upcomingSessions.map((session) => ({
      id: session.id,
      title: session.title,
      description: session.description,
      content: session.content,
      excerpt: session.excerpt || "",
      youtubeVideoId: session.youtubeVideoId,
      speaker: session.speaker,
      date: session.sessionDate.toISOString(),
      duration: session.duration,
      status: "upcoming" as const,
      slug: session.slug,
      createdAt: session.createdAt.toISOString(),
      updatedAt: session.updatedAt.toISOString(),
    }));

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("Error fetching upcoming prayer fasting sessions:", error);
    return NextResponse.json(
      { error: "Failed to fetch upcoming sessions" },
      { status: 500 }
    );
  }
}
