import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { ministryInterests } = body;

    if (!Array.isArray(ministryInterests)) {
      return NextResponse.json(
        { error: "Ministry interests must be an array" },
        { status: 400 }
      );
    }

    // Update user's ministry interests
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ministryInterests: ministryInterests,
      },
    });

    return NextResponse.json({
      message: "Ministry interests updated successfully",
    });
  } catch (error) {
    console.error("Update interests error:", error);
    return NextResponse.json(
      { error: "Failed to update ministry interests" },
      { status: 500 }
    );
  }
}
