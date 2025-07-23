import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserRole, Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user has admin privileges
    if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const role = searchParams.get("role") || "";
    const status = searchParams.get("status") || "";

    const skip = (page - 1) * limit;

    // Build where clause
    const where: Prisma.UserWhereInput = {};

    if (search) {
      where.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { email: { contains: search } },
        { username: { contains: search } },
      ];
    }

    if (role && Object.values(UserRole).includes(role as UserRole)) {
      where.role = role as UserRole;
    }

    if (status === "active") {
      where.lastActive = {
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Active in last 30 days
      };
    } else if (status === "inactive") {
      where.lastActive = {
        lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      };
    }

    // Fetch users with pagination
    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          username: true,
          role: true,
          avatarUrl: true,
          joinedDate: true,
          lastActive: true,
          emailVerified: true,
          ministryInterests: true,
          certificateSharingEnabled: true,
          displayNamePreference: true,
          profileVisibility: true,
          _count: {
            select: {
              certificatesReceived: true,
              posts: true,
              prayerRequests: true,
            },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    // Calculate user statistics
    const stats = await prisma.user.groupBy({
      by: ["role"],
      _count: {
        id: true,
      },
    });

    const totalUsers = await prisma.user.count();
    const activeUsers = await prisma.user.count({
      where: {
        lastActive: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    });

    const pendingUsers = await prisma.user.count({
      where: {
        emailVerified: null,
      },
    });

    const userStats = {
      total: totalUsers,
      active: activeUsers,
      pending: pendingUsers,
      inactive: totalUsers - activeUsers,
      byRole: stats.reduce((acc, stat) => {
        acc[stat.role] = stat._count.id;
        return acc;
      }, {} as Record<string, number>),
    };

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
      stats: userStats,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
