import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbCertificateService } from "@/lib/services/certificate-database";

export async function POST() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check authorization (only ADMIN or SUPER_ADMIN can initialize)
    if (
      !session.user.role ||
      (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")
    ) {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      );
    }

    // Initialize the database with default data
    await dbCertificateService.initializeDefaults();

    return NextResponse.json({
      success: true,
      message:
        "Database initialized successfully with default templates and FOM organization",
    });
  } catch (error) {
    console.error("Database initialization error:", error);
    return NextResponse.json(
      {
        error: "Failed to initialize database",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
