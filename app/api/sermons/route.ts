import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "recent";
    const series = searchParams.get("series") || "all";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereConditions: Record<string, any> = {};

    // Apply search filter
    if (search) {
      whereConditions.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { speaker: { contains: search, mode: "insensitive" } },
        { transcript: { contains: search, mode: "insensitive" } },
      ];
    }

    // Apply series filter
    if (series !== "all") {
      whereConditions.seriesName = series;
    }

    // Determine sort order
    let orderBy = {};
    switch (sortBy) {
      case "popular":
        orderBy = { viewsCount: "desc" };
        break;
      case "oldest":
        orderBy = { datePreached: "asc" };
        break;
      case "title":
        orderBy = { title: "asc" };
        break;
      case "recent":
      default:
        orderBy = { datePreached: "desc" };
        break;
    }

    const sermons = await prisma.sermon.findMany({
      where: whereConditions,
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
      orderBy,
    });

    // Get unique series
    const allSermons = await prisma.sermon.findMany({
      select: { seriesName: true },
      distinct: ["seriesName"],
    });

    const seriesOptions = allSermons
      .map((s) => s.seriesName)
      .filter(Boolean)
      .sort();

    // Transform the data
    const transformedSermons = sermons.map((sermon) => ({
      id: sermon.id,
      title: sermon.title,
      description: sermon.speaker, // Using speaker as description for now
      content: sermon.transcript || "",
      videoUrl: sermon.videoUrl,
      audioUrl: sermon.audioUrl,
      thumbnailUrl: null, // Not in current schema
      duration: sermon.duration,
      series: sermon.seriesName,
      tags: Array.isArray(sermon.tags) ? (sermon.tags as string[]) : [],
      createdAt: sermon.createdAt.toISOString(),
      publishedAt: sermon.datePreached.toISOString(),
      viewCount: sermon.viewsCount,
      downloadCount: sermon.downloadsCount,
      author: sermon.creator,
      isBookmarked: false, // Would need bookmarks table to implement
    }));

    return NextResponse.json({
      sermons: transformedSermons,
      series: seriesOptions,
      total: transformedSermons.length,
    });
  } catch (error) {
    console.error("Error fetching sermons:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
