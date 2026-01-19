import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CertificateDebugger } from "@/lib/utils/certificate-debugger";
import { TemplateData } from "@/lib/utils/hybrid-certificate-renderer";

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

    // Fetch the certificate from database
    const certificate = await prisma.certificate.findUnique({
      where: { id: certificateId },
      include: {
        template: true,
      },
    });

    if (!certificate) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }

    // Create CertificateData object from database certificate
    const certificateData = {
      id: certificate.id,
      templateName: certificate.template?.name || "Certificate",
      recipientFirstName: certificate.recipientFirstName,
      recipientLastName: certificate.recipientLastName,
      recipientEmail: certificate.recipientEmail,
      issueDate: certificate.issueDate,
      templateData: (certificate.certificateData ||
        certificate.template?.templateData) as TemplateData,
    };

    // Get the base URL
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const host = request.headers.get("host") || "localhost:3000";
    const baseUrl = `${protocol}://${host}`;

    // Create debug instance and get debug info
    const certDebugger = new CertificateDebugger(certificateData, baseUrl);
    const debugInfo = await certDebugger.getDebugInfo();

    // Test PDF and PNG generation
    const pdfTest = await certDebugger.testPDFGeneration();
    const pngTest = await certDebugger.testPNGGeneration();

    return NextResponse.json({
      certificate: {
        id: certificate.id,
        name: certificate.template?.name || "Certificate",
        recipient: `${certificate.recipientFirstName} ${certificate.recipientLastName}`,
        issueDate: certificate.issueDate,
      },
      debugInfo,
      tests: {
        pdf: pdfTest,
        png: pngTest,
      },
      troubleshooting: {
        tips: [
          "Check if images are accessible from the server",
          "Verify that all image paths are correct",
          "Ensure all fonts are loaded properly",
          "Check if templateData contains valid elements",
        ],
        imageIssues: debugInfo.imageInfo.filter((img) => img.error).length,
        totalImages: debugInfo.imageInfo.length,
      },
    });
  } catch (error) {
    console.error("Debug endpoint error:", error);
    return NextResponse.json(
      {
        error: "Debug failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
