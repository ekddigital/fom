import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbCertificateService } from "@/lib/services/certificate-database";

export async function POST(req: NextRequest) {
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

    console.log("🔧 Database initialization requested by:", session.user.email);

    // Parse request body for override options
    let forceOverride = false;
    try {
      const body = await req.json();
      forceOverride = body.forceOverride === true;
    } catch {
      // If no body or invalid JSON, use default behavior
    }

    console.log("🔄 Force override mode:", forceOverride);

    if (forceOverride) {
      // Force override - always run initialization
      console.log("🚀 Running forced database initialization with override...");
      await dbCertificateService.initializeDefaults();
    } else {
      // Smart initialization - only if needed
      const templateCount = await dbCertificateService.getTemplateCount();
      if (templateCount === 0) {
        console.log("📋 No templates found, initializing database...");
        await dbCertificateService.initializeDefaults();
      } else {
        console.log(
          `📋 Found ${templateCount} templates, running override update...`
        );
        // Still run initialization to update existing templates with latest designs
        await dbCertificateService.initializeDefaults();
      }
    }

    return NextResponse.json({
      success: true,
      message:
        "Database initialized successfully with default templates and FOM organization",
      forceOverride,
    });
  } catch (error) {
    console.error("❌ Database initialization error:", error);

    return NextResponse.json(
      {
        error: "Failed to initialize database",
        message: error instanceof Error ? error.message : "Unknown error",
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
