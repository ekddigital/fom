import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get recent prayer requests
    const recentPrayerRequests = await prisma.prayerRequest.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
      where: {
        OR: [{ anonymous: false }, { requesterId: session.user.id }],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        reactionCount: true,
        requester: {
          select: {
            firstName: true,
            lastName: true,
            username: true,
          },
        },
      },
    });

    // Get upcoming events
    const upcomingEvents = await prisma.event.findMany({
      take: 3,
      orderBy: { startDate: "asc" },
      where: {
        startDate: {
          gte: new Date(),
        },
      },
      select: {
        id: true,
        title: true,
        startDate: true,
        location: true,
      },
    });

    // Format prayer requests
    const formattedPrayerRequests = recentPrayerRequests.map((request) => {
      const reactionCount = request.reactionCount as Record<
        string,
        number
      > | null;
      const prayers = reactionCount?.heart || 0;
      const timeAgo = getTimeAgo(request.createdAt);

      return {
        title: request.title,
        time: timeAgo,
        prayers: prayers,
      };
    });

    // Format events
    const formattedEvents = upcomingEvents.map((event) => {
      const date = formatEventDate(event.startDate);

      return {
        title: event.title,
        date: date,
        location: event.location || "TBD",
      };
    });

    return NextResponse.json({
      prayerRequests: formattedPrayerRequests,
      events: formattedEvents,
    });
  } catch (error) {
    console.error("Recent activities error:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent activities" },
      { status: 500 }
    );
  }
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) {
    return "Less than an hour ago";
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }
}

function formatEventDate(date: Date): string {
  const now = new Date();
  const eventDate = new Date(date);

  // Check if it's today
  if (eventDate.toDateString() === now.toDateString()) {
    return `Today, ${eventDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  }

  // Check if it's this week (next 7 days)
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  if (eventDate < nextWeek) {
    const dayName = eventDate.toLocaleDateString("en-US", { weekday: "long" });
    const time = eventDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${dayName}, ${time}`;
  }

  // For dates further out
  return eventDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
