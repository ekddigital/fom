import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateVerificationId } from "@/lib/utils/certificate";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user has admin privileges
    if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const skip = (page - 1) * limit;

    // Build where clause
    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { recipientFirstName: { contains: search, mode: "insensitive" } },
        { recipientLastName: { contains: search, mode: "insensitive" } },
        { recipientEmail: { contains: search, mode: "insensitive" } },
        { verificationId: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status) {
      where.status = status;
    }

    const [certificates, total] = await Promise.all([
      prisma.certificate.findMany({
        where,
        skip,
        take: limit,
        include: {
          template: {
            select: {
              name: true,
              category: true,
            },
          },
          issuer: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          recipient: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.certificate.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        certificates: certificates.map((cert) => ({
          id: cert.id,
          verificationId: cert.verificationId,
          recipientName: `${cert.recipientFirstName} ${cert.recipientLastName}`,
          recipientEmail: cert.recipientEmail,
          templateName: cert.template.name,
          templateCategory: cert.template.category,
          issueDate: cert.issueDate,
          expiryDate: cert.expiryDate,
          status: cert.status,
          issuerName: `${cert.issuer.firstName} ${cert.issuer.lastName}`,
          certificateData: cert.certificateData,
        })),
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching certificates:", error);
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
    const {
      templateId,
      recipientFirstName,
      recipientLastName,
      recipientEmail,
      certificateData,
      expiryDate,
    } = body;

    // Validate required fields
    if (
      !templateId ||
      !recipientFirstName ||
      !recipientLastName ||
      !recipientEmail
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if template exists and is active
    const template = await prisma.certificateTemplate.findUnique({
      where: { id: templateId },
    });

    if (!template) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      );
    }

    if (!template.isActive) {
      return NextResponse.json(
        { error: "Template is not active" },
        { status: 400 }
      );
    }

    // Check if recipient is a registered user
    const recipientUser = await prisma.user.findUnique({
      where: { email: recipientEmail },
    });

    // Generate verification ID
    const verificationId = await generateVerificationId();

    // Create certificate
    const certificate = await prisma.certificate.create({
      data: {
        templateId,
        recipientFirstName,
        recipientLastName,
        recipientEmail,
        issuedTo: recipientUser?.id,
        issuedBy: session.user.id,
        verificationId,
        certificateData: certificateData || {},
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        // TODO: Generate actual PDF and PNG files
        pdfPath: `/certificates/${verificationId}.pdf`,
        pngPath: `/certificates/${verificationId}.png`,
        qrCodeData: `${process.env.NEXTAUTH_URL}/community/verify-certificate?id=${verificationId}`,
      },
      include: {
        template: {
          select: {
            name: true,
            category: true,
          },
        },
        issuer: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    // TODO: Generate PDF and PNG files here
    // TODO: Send email notification to recipient

    return NextResponse.json(
      {
        success: true,
        data: {
          id: certificate.id,
          verificationId: certificate.verificationId,
          recipientName: `${certificate.recipientFirstName} ${certificate.recipientLastName}`,
          recipientEmail: certificate.recipientEmail,
          templateName: certificate.template.name,
          templateCategory: certificate.template.category,
          issueDate: certificate.issueDate,
          expiryDate: certificate.expiryDate,
          status: certificate.status,
          issuerName: `${certificate.issuer.firstName} ${certificate.issuer.lastName}`,
          certificateData: certificate.certificateData,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error issuing certificate:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
