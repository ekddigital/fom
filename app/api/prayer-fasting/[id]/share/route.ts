import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.prayerFasting.update({
      where: { id },
      data: {
        shareCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error incrementing share count:", error);
    return NextResponse.json(
      { error: "Failed to increment share count" },
      { status: 500 }
    );
  }
}
