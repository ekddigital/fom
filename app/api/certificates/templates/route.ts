import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbCertificateService } from "@/lib/services/certificate-database";
import { z } from "zod";

// Template creation schema
const CreateTemplateSchema = z.object({
  name: z.string().min(1, "Template name is required"),
  description: z.string().optional(),
  category: z.string().optional(),
  templateData: z.record(z.unknown()),
  organizationId: z.string().optional(),
});

// Handler for GET requests to /api/certificates/templates
export async function GET(req: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const organizationId = searchParams.get("organizationId");
    const category = searchParams.get("category");

    // Get templates with optional filters
    const templates = await dbCertificateService.getTemplates({
      organizationId: organizationId || undefined,
      category: category || undefined,
    });

    return NextResponse.json({
      success: true,
      templates,
    });
  } catch (error) {
    console.error("Error in GET /api/certificates/templates:", error);
    return NextResponse.json(
      { error: "Failed to fetch certificate templates" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check authorization (only ADMIN or MINISTRY_LEADER can create templates)
    if (
      !session.user.role ||
      (session.user.role !== "ADMIN" &&
        session.user.role !== "MINISTRY_LEADER" &&
        session.user.role !== "SUPER_ADMIN")
    ) {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const validatedData = CreateTemplateSchema.parse(body);

    // Create the template using our database service
    const template = await dbCertificateService.createTemplate({
      ...validatedData,
      createdById: session.user.id,
    });

    return NextResponse.json({
      success: true,
      template,
    });
  } catch (error: unknown) {
    console.error("Error creating template:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid request data", details: (error as any).errors },
        { status: 400 }
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to create template", message: errorMessage },
      { status: 500 }
    );
  }
}
