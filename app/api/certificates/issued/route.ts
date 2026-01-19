import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const templateId = searchParams.get("templateId") || "";

    // Build where clause
    const where: {
      OR?: Array<{
        recipientName?: { contains: string; mode: "insensitive" };
        recipientEmail?: { contains: string; mode: "insensitive" };
        verificationId?: { contains: string; mode: "insensitive" };
      }>;
      status?: string;
      templateId?: string;
    } = {};

    if (search) {
      where.OR = [
        { recipientName: { contains: search, mode: "insensitive" } },
        { recipientEmail: { contains: search, mode: "insensitive" } },
        { verificationId: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (templateId) {
      where.templateId = templateId;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Fetch issued certificates with template information
    const [certificates, total] = await Promise.all([
      prisma.certificate.findMany({
        where,
        include: {
          template: {
            select: {
              id: true,
              name: true,
              category: true,
              typeCode: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.certificate.count({ where }),
    ]);

    // Format the response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formattedCertificates = certificates.map((cert: any) => ({
      id: cert.id,
      templateId: cert.templateId,
      templateName: cert.template?.name || "Unknown Template",
      templateCategory: cert.template?.category || "general",
      recipientName:
        `${cert.recipientFirstName} ${cert.recipientLastName}`.trim(),
      recipientEmail: cert.recipientEmail,
      verificationId: cert.verificationId,
      issueDate: cert.issueDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
      issuedAt: cert.createdAt,
      validFrom: cert.issueDate,
      validUntil: cert.expiryDate,
      status: cert.status || "active",
      additionalData: cert.certificateData,
    }));

    return NextResponse.json({
      success: true,
      certificates: formattedCertificates,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching issued certificates:", error);
    return NextResponse.json(
      { error: "Failed to fetch issued certificates" },
      { status: 500 }
    );
  }
}
