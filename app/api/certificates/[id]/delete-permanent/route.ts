import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    // Delete associated files if they exist
    try {
      const uploadsDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "certificates"
      );
      const pdfPath = path.join(uploadsDir, `${certificateId}.pdf`);
      const pngPath = path.join(uploadsDir, `${certificateId}.png`);

      // Try to delete PDF file
      try {
        await fs.access(pdfPath);
        await fs.unlink(pdfPath);
        console.log(`Deleted PDF file: ${pdfPath}`);
      } catch {
        // File doesn't exist, ignore
      }

      // Try to delete PNG file
      try {
        await fs.access(pngPath);
        await fs.unlink(pngPath);
        console.log(`Deleted PNG file: ${pngPath}`);
      } catch {
        // File doesn't exist, ignore
      }
    } catch (error) {
      console.error("Error deleting certificate files:", error);
      // Continue with database deletion even if file deletion fails
    }

    // Permanently delete the certificate from database
    await prisma.certificate.delete({
      where: { id: certificateId },
    });

    return NextResponse.json({
      success: true,
      message: "Certificate permanently deleted",
    });
  } catch (error) {
    console.error("Error permanently deleting certificate:", error);
    return NextResponse.json(
      { error: "Failed to permanently delete certificate" },
      { status: 500 }
    );
  }
}
