/**
 * Card Templates Initialize API Route
 * POST /api/cards/initialize - Initialize/seed card templates
 */

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CardDatabaseService } from "../../../../lib/services/card-database";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Check if user is admin (you might want to add proper admin check)
    if (!session.user?.email) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    console.log("🚀 Initializing card templates...");

    // Force seed the card templates
    await CardDatabaseService.seedCardTemplates(true, session.user.email);

    // Get the updated templates
    const templates = await CardDatabaseService.getCardTemplates();

    console.log(
      `✅ Successfully initialized ${templates.length} card templates`
    );

    return NextResponse.json({
      success: true,
      message: `Successfully initialized ${templates.length} card templates`,
      templates: templates,
      count: templates.length,
    });
  } catch (error) {
    console.error("❌ Error initializing card templates:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to initialize card templates",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
