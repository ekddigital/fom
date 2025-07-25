import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const currentSessions = await prisma.prayerFasting.findMany({
      where: {
        status: "CURRENT",
        isPublished: true, // Only return published sessions
      },
      orderBy: {
        sessionDate: "desc",
      },
    });

    // Transform the data to match the frontend interface
    const sessions = currentSessions.map((session) => ({
      id: session.id,
      title: session.title,
      description: session.description,
      content: session.content,
      excerpt: session.excerpt || "",
      youtubeVideoId: session.youtubeVideoId,
      speaker: session.speaker,
      date: session.sessionDate.toISOString(),
      duration: session.duration,
      status: "current" as const,
      slug: session.slug,
      createdAt: session.createdAt.toISOString(),
      updatedAt: session.updatedAt.toISOString(),
    }));

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("Error fetching current prayer fasting sessions:", error);
    return NextResponse.json(
      { error: "Failed to fetch current sessions" },
      { status: 500 }
    );
  }
}
