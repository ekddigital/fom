import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const targetType = searchParams.get("targetType");
    const targetId = searchParams.get("targetId");

    if (!targetType || !targetId) {
      return NextResponse.json(
        { error: "targetType and targetId are required" },
        { status: 400 }
      );
    }

    const comments = await prisma.comment.findMany({
      where: {
        targetType,
        targetId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
            role: true,
          },
        },
        _count: {
          select: {
            replies: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Build nested comment structure
    const commentsMap = new Map();
    const topLevelComments: typeof comments = [];

    // First pass: create all comment objects
    comments.forEach((comment) => {
      const commentObj = {
        ...comment,
        replies: [],
        createdAt: comment.createdAt.toISOString(),
      };
      commentsMap.set(comment.id, commentObj);
    });

    // Second pass: organize into nested structure
    comments.forEach((comment) => {
      const commentObj = commentsMap.get(comment.id);
      if (comment.parentId) {
        const parent = commentsMap.get(comment.parentId);
        if (parent) {
          parent.replies.push(commentObj);
        }
      } else {
        topLevelComments.push(commentObj);
      }
    });

    return NextResponse.json({ comments: topLevelComments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
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

    const { targetType, targetId, content, parentId } = await request.json();

    if (!targetType || !targetId || !content?.trim()) {
      return NextResponse.json(
        { error: "targetType, targetId, and content are required" },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    // Create the comment
    await prisma.comment.create({
      data: {
        userId,
        targetType,
        targetId,
        content: content.trim(),
        parentId: parentId || null,
      },
    });

    // Return updated comments
    const comments = await prisma.comment.findMany({
      where: {
        targetType,
        targetId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
            role: true,
          },
        },
        _count: {
          select: {
            replies: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Build nested comment structure
    const commentsMap = new Map();
    const topLevelComments: typeof comments = [];

    comments.forEach((comment) => {
      const commentObj = {
        ...comment,
        replies: [],
        createdAt: comment.createdAt.toISOString(),
      };
      commentsMap.set(comment.id, commentObj);
    });

    comments.forEach((comment) => {
      const commentObj = commentsMap.get(comment.id);
      if (comment.parentId) {
        const parent = commentsMap.get(comment.parentId);
        if (parent) {
          parent.replies.push(commentObj);
        }
      } else {
        topLevelComments.push(commentObj);
      }
    });

    return NextResponse.json({ comments: topLevelComments });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
