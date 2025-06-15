import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

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
      select: { id: true },
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

    let deletedFiles = 0;
    let fileErrors = 0;

    // Delete associated files
    const uploadsDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "certificates"
    );

    await Promise.allSettled(
      certificateIds.map(async (certificateId) => {
        try {
          const pdfPath = path.join(uploadsDir, `${certificateId}.pdf`);
          const pngPath = path.join(uploadsDir, `${certificateId}.png`);

          // Try to delete PDF file
          try {
            await fs.access(pdfPath);
            await fs.unlink(pdfPath);
            deletedFiles++;
            console.log(`Deleted PDF file: ${pdfPath}`);
          } catch {
            // File doesn't exist, ignore
          }

          // Try to delete PNG file
          try {
            await fs.access(pngPath);
            await fs.unlink(pngPath);
            deletedFiles++;
            console.log(`Deleted PNG file: ${pngPath}`);
          } catch {
            // File doesn't exist, ignore
          }
        } catch (error) {
          console.error(
            `Error deleting files for certificate ${certificateId}:`,
            error
          );
          fileErrors++;
        }
      })
    );

    // Delete certificates from database in a single transaction
    const deletedCertificates = await prisma.certificate.deleteMany({
      where: { id: { in: certificateIds } },
    });

    console.log(`Bulk permanent delete completed:`, {
      requested: certificateIds.length,
      deleted: deletedCertificates.count,
      filesDeleted: deletedFiles,
      fileErrors: fileErrors,
      user: session.user.email,
    });

    return NextResponse.json({
      success: true,
      message: `${deletedCertificates.count} certificate(s) permanently deleted`,
      details: {
        certificatesDeleted: deletedCertificates.count,
        filesDeleted: deletedFiles,
        fileErrors: fileErrors,
        requestedIds: certificateIds,
      },
    });
  } catch (error) {
    console.error("Error in bulk permanent delete:", error);
    return NextResponse.json(
      { error: "Failed to permanently delete certificates" },
      { status: 500 }
    );
  }
}
