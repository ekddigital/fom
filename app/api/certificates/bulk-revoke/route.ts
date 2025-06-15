import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user has admin privileges
    if (
      !session.user.role ||
      (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")
    ) {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      );
    }

    const { certificateIds } = await request.json();

    if (
      !certificateIds ||
      !Array.isArray(certificateIds) ||
      certificateIds.length === 0
    ) {
      return NextResponse.json(
        { error: "No certificate IDs provided" },
        { status: 400 }
      );
    }

    // Validate that all certificates exist
    const certificates = await prisma.certificate.findMany({
      where: { id: { in: certificateIds } },
      select: { id: true, status: true },
    });

    const foundIds = certificates.map((cert) => cert.id);
    const notFoundIds = certificateIds.filter((id) => !foundIds.includes(id));

    if (notFoundIds.length > 0) {
      return NextResponse.json(
        {
          error: `Certificates not found: ${notFoundIds.join(", ")}`,
          notFound: notFoundIds,
          found: foundIds,
        },
        { status: 404 }
      );
    }

    // Update certificates to revoked status in a single transaction
    const updatedCertificates = await prisma.certificate.updateMany({
      where: {
        id: { in: certificateIds },
        status: { not: "revoked" }, // Only update non-revoked certificates
      },
      data: {
        status: "revoked",
        updatedAt: new Date(),
      },
    });

    const alreadyRevoked = certificates.filter(
      (cert) => cert.status === "revoked"
    ).length;

    console.log(`Bulk revoke completed:`, {
      requested: certificateIds.length,
      updated: updatedCertificates.count,
      alreadyRevoked: alreadyRevoked,
      user: session.user.email,
    });

    return NextResponse.json({
      success: true,
      message: `${updatedCertificates.count} certificate(s) revoked successfully`,
      details: {
        certificatesRevoked: updatedCertificates.count,
        alreadyRevoked: alreadyRevoked,
        totalRequested: certificateIds.length,
        requestedIds: certificateIds,
      },
    });
  } catch (error) {
    console.error("Error in bulk revoke:", error);
    return NextResponse.json(
      { error: "Failed to revoke certificates" },
      { status: 500 }
    );
  }
}
