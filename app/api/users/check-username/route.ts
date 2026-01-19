import { NextRequest, NextResponse } from "next/server";
import { isUsernameAvailable } from "@/lib/utils/user";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    const excludeUserId = searchParams.get("excludeUserId");

    if (!username) {
      return NextResponse.json(
        {
          success: false,
          message: "Username parameter is required",
        },
        { status: 400 }
      );
    }

    // Validate username format
    if (username.length < 3 || username.length > 30) {
      return NextResponse.json(
        {
          available: false,
          message: "Username must be between 3 and 30 characters",
        },
        { status: 200 }
      );
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return NextResponse.json(
        {
          available: false,
          message:
            "Username can only contain letters, numbers, and underscores",
        },
        { status: 200 }
      );
    }

    const available = await isUsernameAvailable(
      username,
      excludeUserId || undefined
    );

    return NextResponse.json({
      available,
      username,
      message: available
        ? "Username is available"
        : "Username is already taken",
    });
  } catch (error) {
    console.error("Username availability check error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
