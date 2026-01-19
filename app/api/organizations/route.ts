import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbCertificateService } from "@/lib/services/certificate-database";
import { z } from "zod";

// Organization creation/update schema
const OrganizationSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  tagline: z.string().optional(),
  logo: z.string().optional(),
  colors: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
    text: z.string(),
  }),
  covenantVerse: z
    .object({
      text: z.string(),
      reference: z.string(),
    })
    .optional(),
  leadership: z
    .object({
      executiveDirector: z.string().optional(),
      chairperson: z.string().optional(),
      secretary: z.string().optional(),
    })
    .optional(),
});

// GET /api/organizations - List all organizations
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only admins can view all organizations
    if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      );
    }

    const organizations = await dbCertificateService.getOrganizations();

    return NextResponse.json({
      success: true,
      organizations,
    });
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return NextResponse.json(
      { error: "Failed to fetch organizations" },
      { status: 500 }
    );
  }
}

// POST /api/organizations - Create new organization
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only super admins can create organizations
    if (session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = OrganizationSchema.parse(body);

    const organization = await dbCertificateService.createOrganization({
      ...validatedData,
      leadership: validatedData.leadership || {},
    });

    return NextResponse.json({
      success: true,
      organization,
    });
  } catch (error: unknown) {
    console.error("Error creating organization:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        {
          error: "Invalid request data",
          details:
            error instanceof Error && "errors" in error
              ? (error as { errors: unknown }).errors
              : "Validation failed",
        },
        { status: 400 }
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to create organization", message: errorMessage },
      { status: 500 }
    );
  }
}
