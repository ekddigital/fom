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

    // Get current date and month boundaries
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Get total users
    const totalUsers = await prisma.user.count();

    // Get active users (logged in within last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const activeUsers = await prisma.user.count({
      where: {
        lastActive: {
          gte: thirtyDaysAgo,
        },
      },
    });

    // Get new users this month
    const newUsersThisMonth = await prisma.user.count({
      where: {
        createdAt: {
          gte: startOfMonth,
        },
      },
    });

    // Get new users last month for comparison
    const newUsersLastMonth = await prisma.user.count({
      where: {
        createdAt: {
          gte: startOfLastMonth,
          lte: endOfLastMonth,
        },
      },
    });

    // Get events this month (assuming you have an Event model)
    // For now, we'll use a placeholder
    const eventsThisMonth = 0; // TODO: Implement when Event model exists

    // Get prayer requests (assuming you have a PrayerRequest model)
    // For now, we'll use a placeholder
    const prayerRequests = 0; // TODO: Implement when PrayerRequest model exists

    // Calculate growth percentages
    const userGrowthChange =
      newUsersLastMonth > 0
        ? `${Math.round(
            ((newUsersThisMonth - newUsersLastMonth) / newUsersLastMonth) * 100
          )}%`
        : "+100%";

    // Calculate active users change (30 days ago vs 60 days ago)
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
    const activeUsersLastPeriod = await prisma.user.count({
      where: {
        lastActive: {
          gte: sixtyDaysAgo,
          lt: thirtyDaysAgo,
        },
      },
    });

    const activeUsersChange =
      activeUsersLastPeriod > 0
        ? `${Math.round(
            ((activeUsers - activeUsersLastPeriod) / activeUsersLastPeriod) *
              100
          )}%`
        : "+100%";

    const stats = {
      totalUsers,
      activeUsers,
      newUsersThisMonth,
      eventsThisMonth,
      prayerRequests,
      systemHealth: "99.9%", // TODO: Implement real system health check
      storageUsed: "45%", // TODO: Implement real storage usage
      userGrowthChange,
      activeUsersChange,
      eventsChange: "+0%", // TODO: Calculate when events are implemented
      prayerRequestsChange: "+0%", // TODO: Calculate when prayer requests are implemented
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch admin stats" },
      { status: 500 }
    );
  }
}
