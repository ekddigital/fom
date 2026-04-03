import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if prayer request exists
    const prayerRequest = await prisma.prayerRequest.findUnique({
      where: { id },
    });

    if (!prayerRequest) {
      return NextResponse.json(
        { error: "Prayer request not found" },
        { status: 404 }
      );
    }

    // For now, we'll just add a comment indicating prayer
    // In a full implementation, you might want a separate prayers table
    await prisma.comment.create({
      data: {
        userId: session.user.id,
        targetType: "prayer",
        targetId: id,
        content: "🙏 Praying for this request",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding prayer:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
