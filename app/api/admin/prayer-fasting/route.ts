import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (
      !user ||
      !["ADMIN", "SUPER_ADMIN", "MINISTRY_LEADER"].includes(user.role)
    ) {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      );
    }

    const sessions = await prisma.prayerFasting.findMany({
      orderBy: {
        sessionDate: "desc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        content: true,
        excerpt: true,
        youtubeVideoId: true,
        speaker: true,
        speakerBio: true,
        sessionDate: true,
        duration: true,
        status: true,
        slug: true,
        viewCount: true,
        shareCount: true,
        createdAt: true,
        updatedAt: true,
        creator: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    // Transform the data
    const transformedSessions = sessions.map((session) => ({
      id: session.id,
      title: session.title,
      description: session.description,
      content: session.content,
      excerpt: session.excerpt,
      youtubeVideoId: session.youtubeVideoId,
      speaker: session.speaker,
      speakerBio: session.speakerBio,
      sessionDate: session.sessionDate.toISOString(),
      duration: session.duration,
      status: session.status,
      slug: session.slug,
      viewCount: session.viewCount,
      shareCount: session.shareCount,
      createdAt: session.createdAt.toISOString(),
      updatedAt: session.updatedAt.toISOString(),
      createdBy: `${session.creator.firstName} ${session.creator.lastName}`,
    }));

    return NextResponse.json({ sessions: transformedSessions });
  } catch (error) {
    console.error("Error fetching prayer fasting sessions:", error);
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Check permissions
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (
      !user ||
      !["ADMIN", "SUPER_ADMIN", "MINISTRY_LEADER"].includes(user.role)
    ) {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      );
    }

    const {
      title,
      description,
      content,
      excerpt,
      youtubeVideoId,
      speaker,
      speakerBio,
      sessionDate,
      duration,
      status,
      slug,
    } = await request.json();

    // Validate required fields
    if (
      !title ||
      !description ||
      !content ||
      !youtubeVideoId ||
      !speaker ||
      !sessionDate ||
      !slug
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if slug is unique
    const existingSession = await prisma.prayerFasting.findUnique({
      where: { slug },
    });

    if (existingSession) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 }
      );
    }

    const newSession = await prisma.prayerFasting.create({
      data: {
        title,
        description,
        content,
        excerpt: excerpt || "",
        youtubeVideoId,
        speaker,
        speakerBio: speakerBio || "",
        sessionDate: new Date(sessionDate),
        duration: duration || "",
        status: status || "UPCOMING",
        slug,
        createdBy: session.user.id,
      },
    });

    return NextResponse.json({
      session: {
        ...newSession,
        sessionDate: newSession.sessionDate.toISOString(),
        createdAt: newSession.createdAt.toISOString(),
        updatedAt: newSession.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error creating prayer fasting session:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}
