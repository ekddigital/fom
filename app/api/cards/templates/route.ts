/**
 * Card Templates API Route
 * GET /api/cards/templates - Get all card templates
 */

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CardDatabaseService } from "../../../../lib/services/card-database";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    console.log("📋 Fetching card templates..."); // Get templates without auto-seeding to prevent infinite loops
    const templates = await CardDatabaseService.getCardTemplates();

    // Temporarily disable auto-seeding to fix loading issue
    // TODO: Re-enable after fixing seeding issues
    /* 
    // Only seed if no templates exist
    if (templates.length === 0) {
      console.log("📋 No templates found, seeding...");
      try {
        // Pass the current user's email for seeding
        await CardDatabaseService.seedCardTemplates(
          false,
          session.user?.email || undefined
        );
        // Re-fetch after seeding
        const newTemplates = await CardDatabaseService.getCardTemplates();
        console.log(
          `✅ Seeded and found ${newTemplates.length} card templates`
        );

        return NextResponse.json({
          success: true,
          templates: newTemplates,
          message: `Seeded and found ${newTemplates.length} card templates`,
        });
      } catch (seedError) {
        console.warn(
          "⚠️ Template seeding failed, returning empty array:",
          seedError
        );
        return NextResponse.json({
          success: true,
          templates: [],
          message: "No templates available and seeding failed",
        });
      }
    }
    */

    console.log(`✅ Found ${templates.length} card templates`);

    return NextResponse.json({
      success: true,
      templates,
      message: `Found ${templates.length} card templates`,
    });
  } catch (error) {
    console.error("❌ Error fetching card templates:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch card templates",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
