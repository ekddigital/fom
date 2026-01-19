/**
 * Card Issue API Route
 * POST /api/cards/issue - Create a new card from template
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CardDatabaseService } from "../../../../lib/services/card-database";

interface IssueCardRequest {
  templateId: string;
  recipientName?: string;
  customMessage?: string;
  // Service outline specific fields
  serviceOutline?: string;
  eventName?: string;
  eventDate?: string;
  mcName?: string;
  // Graduates name list specific fields
  graduatesList?: string;
  // Meet Our Graduates specific fields
  meetOurGraduatesData?: string;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    const body: IssueCardRequest = await request.json();
    const {
      templateId,
      recipientName,
      customMessage,
      serviceOutline,
      eventName,
      eventDate,
      mcName,
      graduatesList,
      meetOurGraduatesData,
    } = body;

    console.log(`📋 Creating card with template: ${templateId}`);
    console.log(`🔍 Received data:`, {
      templateId,
      recipientName,
      customMessage,
      serviceOutline,
      eventName,
      eventDate,
      mcName,
      graduatesList,
      meetOurGraduatesData,
    });

    // Validate required fields
    if (!templateId) {
      return NextResponse.json(
        { error: "Template ID is required" },
        { status: 400 }
      );
    } // Get the current user or create if doesn't exist
    const { prisma } = await import("../../../../lib/prisma");
    let user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
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
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
          },
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
    } // Create the card
    const card = await CardDatabaseService.createCard({
      templateId,
      recipientName: recipientName?.trim() || undefined,
      customMessage: customMessage?.trim() || undefined,
      serviceOutline: serviceOutline?.trim() || undefined,
      eventName: eventName?.trim() || undefined,
      eventDate: eventDate?.trim() || undefined,
      mcName: mcName?.trim() || undefined,
      graduatesList: graduatesList?.trim() || undefined,
      meetOurGraduatesData: meetOurGraduatesData?.trim() || undefined,
      createdBy: user.id,
    });

    console.log(`✅ Card created successfully: ${card.id}`);
    return NextResponse.json({
      success: true,
      card: {
        id: card.id,
        templateId: card.templateId,
        recipientName: card.recipientName,
        customMessage: card.customMessage,
        serviceOutline: card.serviceOutline,
        eventName: card.eventName,
        eventDate: card.eventDate,
        mcName: card.mcName,
        createdAt: card.createdAt,
        creator: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
        },
      },
      message: "Card created successfully",
    });
  } catch (error) {
    console.error("❌ Error creating card:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create card",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
