import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  HybridCertificateRenderer,
  TemplateData,
} from "@/lib/utils/hybrid-certificate-renderer";

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
    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format") || "html"; // html, pdf, png

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

    const renderer = new HybridCertificateRenderer(certificateData, baseUrl);

    if (format === "html") {
      // Return HTML for inspection
      const html = await renderer.generateHTMLPreview();
      return new NextResponse(html, {
        status: 200,
        headers: {
          "Content-Type": "text/html",
        },
      });
    } else if (format === "pdf") {
      // Generate and return PDF
      const pdfBuffer = await renderer.generatePDF();
      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="test-certificate-${certificateId}.pdf"`,
        },
      });
    } else if (format === "png") {
      // Generate and return PNG
      const pngBuffer = await renderer.generatePNG();
      return new NextResponse(pngBuffer, {
        status: 200,
        headers: {
          "Content-Type": "image/png",
          "Content-Disposition": `inline; filename="test-certificate-${certificateId}.png"`,
        },
      });
    } else {
      return NextResponse.json(
        { error: "Invalid format. Use 'html', 'pdf', or 'png'" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Test endpoint error:", error);
    return NextResponse.json(
      {
        error: "Test failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
