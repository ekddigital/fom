import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const certificates = await prisma.certificate.findMany({
      where: {
        issuedTo: session.user.id,
      },
      include: {
        template: {
          select: {
            id: true,
            name: true,
            category: true,
            description: true,
          },
        },
        issuer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: { issueDate: "desc" },
    });

    const transformedCertificates = certificates.map((cert) => ({
      id: cert.id,
      certificateNumber: cert.verificationId,
      courseName: cert.template.name,
      description: cert.template.description,
      issueDate: cert.issueDate.toISOString(),
      expiryDate: cert.expiryDate?.toISOString(),
      grade: null, // Not in current schema
      creditsEarned: null, // Not in current schema
      isVerified: cert.status === "active",
      isPublic: true, // Assuming public for now
      certificateUrl: cert.pdfPath,
      verificationUrl: `${process.env.NEXT_PUBLIC_APP_URL}/verify-certificate/${cert.verificationId}`,
      template: {
        id: cert.template.id,
        name: cert.template.name,
        category: cert.template.category,
        difficulty: "INTERMEDIATE", // Default value since not in schema
        estimatedHours: 10, // Default value since not in schema
      },
      issuer: {
        id: cert.issuer.id,
        organizationName: "Fishers of Men",
        logoUrl: cert.issuer.avatarUrl,
      },
      recipient: {
        id: cert.issuedTo || "",
        firstName: cert.recipientFirstName,
        lastName: cert.recipientLastName,
      },
    }));

    return NextResponse.json({
      certificates: transformedCertificates,
      total: transformedCertificates.length,
    });
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
