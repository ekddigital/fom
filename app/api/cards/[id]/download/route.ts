/**
 * Card Download API Route
 * GET /api/cards/[id]/download?format=png|pdf
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import { CardDatabaseService } from "../../../../../lib/services/card-database";
import { CardRenderer } from "../../../../../lib/utils/card-renderer";
import { getCardTemplate } from "../../../../../lib/utils/card-templates";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format") || "png";

    if (!["png", "pdf"].includes(format)) {
      return NextResponse.json(
        { error: "Invalid format. Must be png or pdf" },
        { status: 400 }
      );
    }

    console.log(`📥 Downloading card: ${id} in ${format.toUpperCase()} format`);

    // Get the card from database
    const card = await CardDatabaseService.getCard(id);

    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    // Get the template data
    const template = getCardTemplate(card.templateId);

    if (!template) {
      return NextResponse.json(
        { error: "Card template not found" },
        { status: 404 }
      );
    } // Create card data for rendering
    const cardData = {
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
    };

    // Create renderer
    const renderer = new CardRenderer(template, cardData);

    let fileBuffer: Buffer;
    let contentType: string;
    let filename: string;

    try {
      if (format === "pdf") {
        console.log("📄 Generating PDF card...");
        fileBuffer = await renderer.generatePDF();
        contentType = "application/pdf";
        filename = `${template.name.replace(/[^a-zA-Z0-9]/g, "-")}-${
          card.id
        }.pdf`;
      } else {
        console.log("🖼️ Generating PNG card...");
        fileBuffer = await renderer.generatePNG();
        contentType = "image/png";
        filename = `${template.name.replace(/[^a-zA-Z0-9]/g, "-")}-${
          card.id
        }.png`;
      }

      if (!fileBuffer || fileBuffer.length === 0) {
        throw new Error(`Generated ${format.toUpperCase()} buffer is empty`);
      }

      console.log(
        `✅ ${format.toUpperCase()} generated successfully, size: ${
          fileBuffer.length
        } bytes`
      );

      // Increment download count
      await CardDatabaseService.incrementDownloadCount(card.id);

      // Set response headers
      const headers = new Headers();
      headers.set("Content-Type", contentType);
      headers.set("Content-Disposition", `attachment; filename="${filename}"`);
      headers.set("Content-Length", fileBuffer.length.toString());
      headers.set("X-Content-Type-Options", "nosniff");
      headers.set("Cache-Control", "no-cache, no-store, must-revalidate");

      return new NextResponse(fileBuffer, {
        status: 200,
        headers,
      });
    } catch (generationError) {
      console.error(
        `❌ ${format.toUpperCase()} generation failed:`,
        generationError
      );

      return NextResponse.json(
        {
          success: false,
          error: `Failed to generate ${format.toUpperCase()}`,
          details:
            generationError instanceof Error
              ? generationError.message
              : "Unknown error",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("❌ Error in card download:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to download card",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
