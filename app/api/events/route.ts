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
    const type = searchParams.get("type") || "all";
    const time = searchParams.get("time") || "upcoming";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereConditions: Record<string, any> = {};

    // Apply search filter
    if (search) {
      whereConditions.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
      ];
    }

    // Apply type filter
    if (type !== "all") {
      whereConditions.eventType = type;
    }

    // Apply time filter
    const now = new Date();
    switch (time) {
      case "upcoming":
        whereConditions.startDate = { gte: now };
        break;
      case "this-week":
        const weekEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        whereConditions.startDate = { gte: now, lte: weekEnd };
        break;
      case "this-month":
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        whereConditions.startDate = { gte: now, lte: monthEnd };
        break;
      case "past":
        whereConditions.endDate = { lt: now };
        break;
      // "all" - no date filter
    }

    const events = await prisma.event.findMany({
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
        registrations: {
          select: {
            id: true,
            userId: true,
          },
        },
      },
      orderBy: { startDate: "asc" },
    });

    // Transform the data
    const transformedEvents = events.map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      type: event.eventType,
      startDate: event.startDate.toISOString(),
      endDate: event.endDate?.toISOString(),
      location: event.location,
      virtualLink: null, // Not in current schema
      isVirtual: false, // Not in current schema
      maxAttendees: event.maxParticipants,
      registrationRequired: event.registrationRequired,
      registrationDeadline: event.registrationDeadline?.toISOString(),
      tags: [], // Not in current schema
      createdAt: event.createdAt.toISOString(),
      organizer: event.creator,
      attendeeCount: event.registrations.length,
      isRegistered: event.registrations.some(
        (reg) => reg.userId === session.user.id
      ),
      imageUrl: event.featuredImage,
    }));

    return NextResponse.json({
      events: transformedEvents,
      total: transformedEvents.length,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
