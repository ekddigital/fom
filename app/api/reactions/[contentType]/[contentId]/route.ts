import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ contentType: string; contentId: string }> }
) {
  try {
    const { contentType, contentId } = await params;

    if (!contentType || !contentId) {
      return NextResponse.json(
        { error: "contentType and contentId are required" },
        { status: 400 }
      );
    }

    // Get reactions grouped by emoji with counts
    const reactions = await prisma.reaction.groupBy({
      by: ["emoji"],
      where: {
        targetType: contentType,
        targetId: contentId,
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
          targetType: contentType,
          targetId: contentId,
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

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ contentType: string; contentId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { contentType, contentId } = await params;
    const { emoji } = await request.json();

    if (!contentType || !contentId || !emoji) {
      return NextResponse.json(
        { error: "contentType, contentId, and emoji are required" },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    // Check if user already reacted with this emoji
    const existingReaction = await prisma.reaction.findFirst({
      where: {
        targetType: contentType,
        targetId: contentId,
        userId,
        emoji,
      },
    });

    if (existingReaction) {
      // Remove reaction if it exists
      await prisma.reaction.delete({
        where: {
          id: existingReaction.id,
        },
      });
    } else {
      // Add new reaction
      await prisma.reaction.create({
        data: {
          targetType: contentType,
          targetId: contentId,
          userId,
          emoji,
        },
      });
    }

    // Return updated reactions
    const reactions = await prisma.reaction.groupBy({
      by: ["emoji"],
      where: {
        targetType: contentType,
        targetId: contentId,
      },
      _count: {
        id: true,
      },
    });

    // Get user's updated reactions
    const userReactionData = await prisma.reaction.findMany({
      where: {
        targetType: contentType,
        targetId: contentId,
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
    console.error("Error updating reaction:", error);
    return NextResponse.json(
      { error: "Failed to update reaction" },
      { status: 500 }
    );
  }
}
