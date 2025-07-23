import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");

    const archiveSessions = await prisma.prayerFasting.findMany({
      where: {
        status: "ARCHIVED",
      },
      orderBy: {
        sessionDate: "desc",
      },
      take: limit,
    });

    // Transform the data to match the frontend interface
    const sessions = archiveSessions.map((session) => ({
      id: session.id,
      title: session.title,
      description: session.description,
      content: session.content,
      excerpt: session.excerpt || "",
      youtubeVideoId: session.youtubeVideoId,
      speaker: session.speaker,
      date: session.sessionDate.toISOString(),
      duration: session.duration,
      status: "archived" as const,
      slug: session.slug,
      createdAt: session.createdAt.toISOString(),
      updatedAt: session.updatedAt.toISOString(),
    }));

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("Error fetching archive prayer fasting sessions:", error);
    return NextResponse.json(
      { error: "Failed to fetch archive sessions" },
      { status: 500 }
    );
  }
}
