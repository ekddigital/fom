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

    // Get users active in the last 15 minutes (consider as "online")
    const fifteenMinutesAgo = new Date();
    fifteenMinutesAgo.setMinutes(fifteenMinutesAgo.getMinutes() - 15);

    const onlineUsers = await prisma.user.count({
      where: {
        lastActive: {
          gte: fifteenMinutesAgo,
        },
      },
    });

    // Get users active in the last 24 hours (consider as "active sessions")
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    const activeSessions = await prisma.user.count({
      where: {
        lastActive: {
          gte: twentyFourHoursAgo,
        },
      },
    });

    // Get users with unverified emails (consider as "pending approvals")
    const pendingApprovals = await prisma.user.count({
      where: {
        emailVerified: null,
      },
    });

    // Calculate server load (simplified - in production this would come from system metrics)
    const totalUsers = await prisma.user.count();
    const loadPercentage = Math.min(
      Math.round((activeSessions / Math.max(totalUsers, 1)) * 100),
      100
    );

    const quickStats = {
      onlineUsers,
      activeSessions,
      pendingApprovals,
      serverLoad: `${loadPercentage}%`,
    };

    return NextResponse.json(quickStats);
  } catch (error) {
    console.error("Error fetching quick stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch quick stats" },
      { status: 500 }
    );
  }
}
