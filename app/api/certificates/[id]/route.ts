import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: certificateId } = await params;

    // Fetch the certificate with full data
    const certificate = await prisma.certificate.findUnique({
      where: { id: certificateId },
      include: {
        template: true,
        issuer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        recipient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!certificate) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }

    console.log("Certificate found:", {
      id: certificate.id,
      templateName: certificate.template?.name,
      hasTemplateData: !!certificate.certificateData,
      templateDataType: typeof certificate.certificateData,
      templateDataKeys:
        certificate.certificateData &&
        typeof certificate.certificateData === "object"
          ? Object.keys(certificate.certificateData)
          : "not an object",
    });

    return NextResponse.json({
      id: certificate.id,
      templateName: certificate.template?.name,
      recipientName:
        `${certificate.recipientFirstName} ${certificate.recipientLastName}`.trim(),
      recipientEmail: certificate.recipientEmail,
      issuerName: `${certificate.issuer?.firstName || ""} ${
        certificate.issuer?.lastName || ""
      }`.trim(),
      issueDate: certificate.issueDate.toISOString(),
      expiryDate: certificate.expiryDate?.toISOString(),
      status: certificate.status,
      templateData: certificate.certificateData, // This contains the full resolved design
      verificationUrl: `/community/verify-certificate?id=${certificate.verificationId}`,
      qrCode: certificate.qrCodeData,
    });
  } catch (error) {
    console.error("Error fetching certificate:", error);
    return NextResponse.json(
      { error: "Failed to fetch certificate" },
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
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: certificateId } = await params;

    // Check if certificate exists
    const certificate = await prisma.certificate.findUnique({
      where: { id: certificateId },
    });

    if (!certificate) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }

    // Instead of actually deleting, we'll mark it as revoked
    const updatedCertificate = await prisma.certificate.update({
      where: { id: certificateId },
      data: {
        status: "revoked",
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Certificate revoked successfully",
      certificate: {
        id: updatedCertificate.id,
        status: updatedCertificate.status,
      },
    });
  } catch (error) {
    console.error("Error revoking certificate:", error);
    return NextResponse.json(
      { error: "Failed to revoke certificate" },
      { status: 500 }
    );
  }
}
