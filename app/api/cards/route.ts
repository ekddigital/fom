/**
 * Cards API Route
 * GET /api/cards - Get all cards for the current user
 */

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { CardDatabaseService } from "../../../lib/services/card-database";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    console.log("📋 Fetching cards for user..."); // Get the current user or create if doesn't exist
    const { prisma } = await import("../../../lib/prisma");
    let user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, firstName: true, lastName: true, email: true },
    });

    // If user doesn't exist in database, create them
    if (!user) {
      console.log(`🆕 Creating user record for: ${session.user.email}`);
      try {
        user = await prisma.user.create({
          data: {
            email: session.user.email,
            firstName: session.user.firstName || "User",
            lastName: session.user.lastName || "",
            username: session.user.email.split("@")[0], // Use email prefix as username
            role: "MEMBER", // Default role
            displayNamePreference: "FULL_NAME",
            profileVisibility: "MEMBERS_ONLY",
            certificateSharingEnabled: true,
            lastActive: new Date(),
            joinedDate: new Date(),
          },
          select: { id: true, firstName: true, lastName: true, email: true },
        });
        console.log(
          `✅ Created user record: ${user.firstName} ${user.lastName} (${user.email})`
        );
      } catch (createError) {
        console.error("❌ Failed to create user:", createError);
        return NextResponse.json(
          { error: "Failed to create user record" },
          { status: 500 }
        );
      }
    }

    const cards = await CardDatabaseService.getCardsByUser(user.id);

    console.log(`✅ Found ${cards.length} cards for user`);

    return NextResponse.json({
      success: true,
      cards: cards.map((card) => ({
        id: card.id,
        templateId: card.templateId,
        templateName:
          (card as { template?: { name?: string } }).template?.name ||
          "Unknown Template",
        recipientName: card.recipientName,
        customMessage: card.customMessage,
        createdAt: card.createdAt,
        downloadCount: card.downloadCount,
        viewCount: card.viewCount,
      })),
      message: `Found ${cards.length} cards`,
    });
  } catch (error) {
    console.error("❌ Error fetching cards:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch cards",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
