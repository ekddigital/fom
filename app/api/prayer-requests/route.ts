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
    const filter = searchParams.get("filter") || "all";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereConditions: Record<string, any> = {};

    // Apply filters
    if (filter === "my-requests") {
      whereConditions.requesterId = session.user.id;
    } else if (filter === "urgent") {
      whereConditions.urgency = "URGENT";
    } else if (filter === "recent") {
      whereConditions.createdAt = {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
      };
    }

    // Only show active requests
    whereConditions.status = "active";

    const prayerRequests = await prisma.prayerRequest.findMany({
      where: whereConditions,
      include: {
        requester: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: [{ urgency: "desc" }, { createdAt: "desc" }],
    });

    // Get comments count for each prayer request
    const requestIds = prayerRequests.map((req) => req.id);
    const comments = await prisma.comment.findMany({
      where: {
        targetType: "prayer",
        targetId: { in: requestIds },
      },
      select: {
        targetId: true,
      },
    });

    const commentCounts = comments.reduce((acc, comment) => {
      acc[comment.targetId] = (acc[comment.targetId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Transform the data to include counts and user interaction status
    const transformedRequests = prayerRequests.map((request) => ({
      id: request.id,
      title: request.title,
      description: request.description,
      category: request.category,
      urgency: request.urgency,
      isAnonymous: request.anonymous,
      isPrivate: false, // Not implemented in current schema
      isAnswered: request.status === "answered",
      prayerCount: 0, // Would need separate prayers table
      commentCount: commentCounts[request.id] || 0,
      createdAt: request.createdAt.toISOString(),
      updatedAt: request.updatedAt.toISOString(),
      user: request.anonymous ? null : request.requester,
    }));

    return NextResponse.json({
      prayerRequests: transformedRequests,
      total: transformedRequests.length,
    });
  } catch (error) {
    console.error("Error fetching prayer requests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      category = "PERSONAL",
      urgency = "MEDIUM",
      isAnonymous = false,
    } = body;

    if (!title?.trim() || !description?.trim()) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const prayerRequest = await prisma.prayerRequest.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        category,
        urgency,
        anonymous: isAnonymous,
        requesterId: session.user.id,
      },
      include: {
        requester: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
      },
    });

    return NextResponse.json({
      prayerRequest: {
        id: prayerRequest.id,
        title: prayerRequest.title,
        description: prayerRequest.description,
        category: prayerRequest.category,
        urgency: prayerRequest.urgency,
        isAnonymous: prayerRequest.anonymous,
        isPrivate: false,
        isAnswered: prayerRequest.status === "answered",
        prayerCount: 0,
        commentCount: 0,
        createdAt: prayerRequest.createdAt.toISOString(),
        updatedAt: prayerRequest.updatedAt.toISOString(),
        user: prayerRequest.anonymous ? null : prayerRequest.requester,
      },
    });
  } catch (error) {
    console.error("Error creating prayer request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
