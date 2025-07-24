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

    const userId = session.user.id;

    // Get user's prayer requests count
    const prayerRequestsCount = await prisma.prayerRequest.count({
      where: {
        OR: [{ requesterId: userId }, { anonymous: false }],
      },
    });

    // Get user's certificates count
    const certificatesCount = await prisma.certificate.count({
      where: { issuedTo: userId },
    });

    // Get total community members count
    const communityCount = await prisma.user.count({
      where: {
        emailVerified: { not: null },
      },
    });

    // Calculate engagement (example metric)
    const userActivities = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        lastActive: true,
        createdAt: true,
        _count: {
          select: {
            prayerRequests: true,
            certificatesReceived: true,
          },
        },
      },
    });

    // Calculate a simple engagement score based on activities
    const totalActivities =
      (userActivities?._count.prayerRequests || 0) +
      (userActivities?._count.certificatesReceived || 0);
    const engagementScore = Math.min(totalActivities * 2.5, 100).toFixed(1);

    return NextResponse.json({
      stats: {
        prayerRequests: {
          value: prayerRequestsCount.toString(),
          subtitle: "Active requests",
          trend: "+2 this week",
        },
        certificates: {
          value: certificatesCount > 0 ? certificatesCount.toString() : "0",
          subtitle: "Earned achievements",
          trend: certificatesCount > 0 ? "1 recent" : "Start learning",
        },
        community: {
          value: communityCount.toString(),
          subtitle: "Connected members",
          trend: "+15 this month",
        },
        engagement: {
          value: `${engagementScore}%`,
          subtitle: "Ministry engagement",
          trend: "↗ Growing",
        },
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
