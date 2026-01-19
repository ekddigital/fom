import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Generate type code from template name
function generateTypeCode(name: string): string {
  const nameUpper = name.toUpperCase();

  if (nameUpper.includes("APPRECIATION")) return "APP";
  if (nameUpper.includes("EXCELLENCE")) return "EXC";
  if (nameUpper.includes("LEADERSHIP")) return "LED";
  if (nameUpper.includes("SERVICE") || nameUpper.includes("FAITHFUL"))
    return "SRV";
  if (nameUpper.includes("VOLUNTEER")) return "VOL";
  if (nameUpper.includes("MISSION")) return "MSN";
  if (nameUpper.includes("BAPTISM")) return "BAP";
  if (nameUpper.includes("YOUTH")) return "YTH";
  if (nameUpper.includes("EXECUTIVE") || nameUpper.includes("DIRECTOR"))
    return "EXD";
  if (nameUpper.includes("CHAIRPERSON")) return "CHR";
  if (nameUpper.includes("COMPLETION")) return "CMP";
  if (nameUpper.includes("RECOGNITION")) return "REC";

  // Default: use first 3 letters of the template name
  return name
    .replace(/[^A-Z]/g, "")
    .substring(0, 3)
    .padEnd(3, "X");
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user has admin privileges
    if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const templates = await prisma.certificateTemplate.findMany({
      include: {
        creator: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        _count: {
          select: {
            certificates: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: templates.map((template) => ({
        id: template.id,
        name: template.name,
        description: template.description,
        category: template.category,
        isActive: template.isActive,
        createdAt: template.createdAt,
        createdBy: `${template.creator.firstName} ${template.creator.lastName}`,
        certificatesIssued: template._count.certificates,
        templateData: template.templateData,
      })),
    });
  } catch (error) {
    console.error("Error fetching certificate templates:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user has admin privileges
    if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { name, description, category, templateData } = body;

    // Validate required fields
    if (!name || !description || !category || !templateData) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = [
      "baptism",
      "confirmation",
      "course",
      "training",
      "volunteer",
      "mission",
    ];
    if (!validCategories.includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    const template = await prisma.certificateTemplate.create({
      data: {
        name,
        description,
        category,
        typeCode: generateTypeCode(name),
        templateData,
        createdBy: session.user.id,
      },
    });

    // Get creator info separately
    const creator = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { firstName: true, lastName: true },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: template.id,
          name: template.name,
          description: template.description,
          category: template.category,
          typeCode: template.typeCode,
          isActive: template.isActive,
          createdAt: template.createdAt,
          createdBy: creator
            ? `${creator.firstName} ${creator.lastName}`
            : "Unknown",
          certificatesIssued: 0,
          templateData: template.templateData,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating certificate template:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
