import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const currentSession = await prisma.prayerFasting.findFirst({
      where: {
        status: "CURRENT",
      },
      orderBy: {
        sessionDate: "desc",
      },
    });

    if (!currentSession) {
      return NextResponse.json({ session: null });
    }

    // Transform the data to match the frontend interface
    const session = {
      id: currentSession.id,
      title: currentSession.title,
      description: currentSession.description,
      content: currentSession.content,
      excerpt: currentSession.excerpt || "",
      youtubeVideoId: currentSession.youtubeVideoId,
      speaker: currentSession.speaker,
      date: currentSession.sessionDate.toISOString(),
      duration: currentSession.duration,
      status: "current" as const,
      slug: currentSession.slug,
      createdAt: currentSession.createdAt.toISOString(),
      updatedAt: currentSession.updatedAt.toISOString(),
    };

    return NextResponse.json({ session });
  } catch (error) {
    console.error("Error fetching current prayer fasting session:", error);
    return NextResponse.json(
      { error: "Failed to fetch current session" },
      { status: 500 }
    );
  }
}
