import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkRole } from "@/lib/auth"; // Assuming checkRole can be adapted or a new admin check is used
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(_request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if the current user is an Admin
  const isAdmin = await checkRole("ADMIN");
  if (!isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        clerk_id: true, // Changed from clerkId
        email: true,
        name: true,
        role: true,
        avatar_url: true, // Changed from avatarUrl
        created_at: true, // Changed from createdAt
        updated_at: true, // Changed from updatedAt
      },
      orderBy: {
        created_at: "desc", // Changed from createdAt
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("[API_GET_USERS_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
