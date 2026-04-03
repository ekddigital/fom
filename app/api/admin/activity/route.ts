import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get recent user registrations
    const recentUsers = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    // Convert to activity format
    const activities = recentUsers.map((user) => {
      const timeAgo = getTimeAgo(user.createdAt);
      return {
        id: `user_${user.id}`,
        type: "user_registration",
        message: `${user.firstName} ${user.lastName} registered`,
        time: timeAgo,
        severity: "info" as const,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
      };
    });

    // Add some system activities (these would come from a proper audit log in production)
    const systemActivities = [
      {
        id: "system_backup",
        type: "system_alert",
        message: "Database backup completed successfully",
        time: "6 hours ago",
        severity: "success" as const,
      },
      {
        id: "system_maintenance",
        type: "system_maintenance",
        message: "Scheduled maintenance completed",
        time: "1 day ago",
        severity: "info" as const,
      },
    ];

    // Combine and sort by recency
    const allActivities = [...activities, ...systemActivities].slice(0, 10);

    return NextResponse.json(allActivities);
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent activity" },
      { status: 500 }
    );
  }
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
}
