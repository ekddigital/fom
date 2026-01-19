import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbCertificateService } from "@/lib/services/certificate-database";

// Handler for GET, PUT, and DELETE requests to /api/certificates/templates/[id]
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const template = await dbCertificateService.getTemplate(id);

    if (!template) {
      return NextResponse.json(
        { error: "Certificate template not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(template);
  } catch (error) {
    console.error(`Error in GET /api/certificates/templates/${id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch certificate template" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check authorization (only ADMIN or MINISTRY_LEADER can update templates)
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

    const body = await req.json();

    // Update the template
    const template = await dbCertificateService.updateTemplate(id, {
      name: body.name,
      description: body.description,
      category: body.category,
      templateData: body.templateData,
      isActive: body.isActive,
    });

    return NextResponse.json(template);
  } catch (error) {
    console.error(`Error in PUT /api/certificates/templates/${id}:`, error);
    return NextResponse.json(
      { error: "Failed to update certificate template" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check authorization (only ADMIN can delete templates)
    if (
      !session.user.role ||
      (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")
    ) {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      );
    }

    const result = await dbCertificateService.deleteTemplate(id);

    return NextResponse.json(result);
  } catch (error) {
    console.error(`Error in DELETE /api/certificates/templates/${id}:`, error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to delete certificate template";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
