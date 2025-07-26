import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
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
      supportingVerses,
      isPublished,
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

    // Check if session exists
    const existingSession = await prisma.prayerFasting.findUnique({
      where: { id },
    });

    if (!existingSession) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Check if slug is unique (excluding current session)
    const slugConflict = await prisma.prayerFasting.findFirst({
      where: {
        slug,
        id: { not: id },
      },
    });

    if (slugConflict) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 }
      );
    }

    const updatedSession = await prisma.prayerFasting.update({
      where: { id },
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
        supportingVerses: supportingVerses || "",
        isPublished: isPublished ?? true,
      },
    });

    return NextResponse.json({
      session: {
        ...updatedSession,
        sessionDate: updatedSession.sessionDate.toISOString(),
        createdAt: updatedSession.createdAt.toISOString(),
        updatedAt: updatedSession.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error updating prayer fasting session:", error);
    return NextResponse.json(
      { error: "Failed to update session" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    // Check if session exists
    const existingSession = await prisma.prayerFasting.findUnique({
      where: { id },
    });

    if (!existingSession) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    await prisma.prayerFasting.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error("Error deleting prayer fasting session:", error);
    return NextResponse.json(
      { error: "Failed to delete session" },
      { status: 500 }
    );
  }
}
