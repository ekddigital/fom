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

    // Get reactions grouped by emoji with counts
    const reactions = await prisma.reaction.groupBy({
      by: ["emoji"],
      where: {
        targetType,
        targetId,
      },
      _count: {
        id: true,
      },
    });

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    // Get user's reactions if authenticated
    let userReactions: string[] = [];
    if (userId) {
      const userReactionData = await prisma.reaction.findMany({
        where: {
          targetType,
          targetId,
          userId,
        },
        select: {
          emoji: true,
        },
      });
      userReactions = userReactionData.map((r) => r.emoji);
    }

    // Format response
    const formattedReactions = reactions.map((reaction) => ({
      emoji: reaction.emoji,
      count: reaction._count.id,
      hasReacted: userReactions.includes(reaction.emoji),
    }));

    return NextResponse.json({ reactions: formattedReactions });
  } catch (error) {
    console.error("Error fetching reactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch reactions" },
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

    const { targetType, targetId, emoji } = await request.json();

    if (!targetType || !targetId || !emoji) {
      return NextResponse.json(
        { error: "targetType, targetId, and emoji are required" },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    // Check if reaction already exists
    const existingReaction = await prisma.reaction.findUnique({
      where: {
        userId_targetType_targetId_emoji: {
          userId,
          targetType,
          targetId,
          emoji,
        },
      },
    });

    if (existingReaction) {
      // Remove reaction (toggle off)
      await prisma.reaction.delete({
        where: {
          id: existingReaction.id,
        },
      });
    } else {
      // Add reaction
      await prisma.reaction.create({
        data: {
          userId,
          targetType,
          targetId,
          emoji,
        },
      });
    }

    // Return updated reactions
    const reactions = await prisma.reaction.groupBy({
      by: ["emoji"],
      where: {
        targetType,
        targetId,
      },
      _count: {
        id: true,
      },
    });

    const userReactionData = await prisma.reaction.findMany({
      where: {
        targetType,
        targetId,
        userId,
      },
      select: {
        emoji: true,
      },
    });
    const userReactions = userReactionData.map((r) => r.emoji);

    const formattedReactions = reactions.map((reaction) => ({
      emoji: reaction.emoji,
      count: reaction._count.id,
      hasReacted: userReactions.includes(reaction.emoji),
    }));

    return NextResponse.json({ reactions: formattedReactions });
  } catch (error) {
    console.error("Error managing reaction:", error);
    return NextResponse.json(
      { error: "Failed to manage reaction" },
      { status: 500 }
    );
  }
}
