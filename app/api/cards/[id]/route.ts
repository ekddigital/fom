/**
 * Card Preview API Route
 * GET /api/cards/[id] - Get card details for preview
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CardDatabaseService } from "../../../../lib/services/card-database";
import { CardRenderer } from "../../../../lib/utils/card-renderer";
import { CARD_TEMPLATES } from "../../../../lib/utils/card-templates";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id: cardId } = await params;

    console.log(`📋 Fetching card details for: ${cardId}`); // Get the card with template data
    const card = await CardDatabaseService.getCard(cardId);

    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }
    console.log(`✅ Found card: ${card.id}`);

    // Get the template and generate HTML content
    const template = CARD_TEMPLATES.find((t) => t.id === card.templateId);
    if (!template) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      );
    } // Generate HTML content for preview
    const cardRenderer = new CardRenderer(template, {
      id: card.id,
      templateId: card.templateId,
      recipientName: card.recipientName || undefined,
      customMessage: card.customMessage || undefined,
      serviceOutline: card.serviceOutline || undefined,
      eventName: card.eventName || undefined,
      eventDate: card.eventDate || undefined,
      mcName: card.mcName || undefined,
      graduatesList: card.graduatesList || undefined,
      meetOurGraduatesData: card.meetOurGraduatesData || undefined,
      createdAt: card.createdAt,
    }); // Update view count
    await CardDatabaseService.incrementViewCount(cardId);

    const htmlContent = await cardRenderer.generatePreviewHTML();

    return NextResponse.json({
      success: true,
      card,
      htmlContent,
      message: "Card retrieved successfully",
    });
  } catch (error) {
    console.error("❌ Error fetching card:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch card",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id: cardId } = await params;
    console.log(`🗑️ Deleting card: ${cardId}`);

    // Check if card exists and user has permission
    const card = await CardDatabaseService.getCard(cardId);

    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }
    console.log(
      `🔍 Card owner: ${card.createdBy}, Session user: ${session.user?.id}`
    );
    console.log(`🔍 Session user role: ${session.user?.role}`);

    // Check if user owns the card or is admin
    const isOwner = card.createdBy === session.user?.id;
    const isAdmin =
      session.user?.role === "ADMIN" || session.user?.role === "SUPER_ADMIN";

    if (!isOwner && !isAdmin) {
      console.log(
        `❌ Permission denied - Card owner: ${card.createdBy}, User: ${session.user?.id}, Role: ${session.user?.role}`
      );
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
    }

    // Delete the card
    await CardDatabaseService.deleteCard(cardId);

    console.log(`✅ Deleted card: ${cardId}`);

    return NextResponse.json({
      success: true,
      message: "Card deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting card:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete card",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
