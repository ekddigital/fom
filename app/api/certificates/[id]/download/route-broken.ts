import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs";
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
    const format = searchParams.get("format") || "pdf"; // Default to PDF

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

    // Check if pre-generated file exists
    const fileExtension = format.toLowerCase();
    const filePath =
      fileExtension === "pdf" ? certificate.pdfPath : certificate.pngPath;

    if (filePath && filePath !== "") {
      const fullPath = path.join(process.cwd(), "public", filePath);

      if (fs.existsSync(fullPath)) {
        const stats = fs.statSync(fullPath);
        if (!stats.isDirectory()) {
          const fileBuffer = fs.readFileSync(fullPath);
          const headers = new Headers();

          if (fileExtension === "pdf") {
            headers.set("Content-Type", "application/pdf");
            headers.set(
              "Content-Disposition",
              `attachment; filename="${
                certificate.template?.name || "Certificate"
              }-${certificate.recipientFirstName}-${
                certificate.recipientLastName
              }.pdf"`
            );
          } else {
            headers.set("Content-Type", "image/png");
            headers.set(
              "Content-Disposition",
              `attachment; filename="${
                certificate.template?.name || "Certificate"
              }-${certificate.recipientFirstName}-${
                certificate.recipientLastName
              }.png"`
            );
          }

          return new NextResponse(fileBuffer, {
            status: 200,
            headers,
          });
        }
      }
    }

    // Generate file on-demand using certificate renderer
    console.log(
      `Generating ${format.toUpperCase()} for certificate ${certificateId}`
    );

    try {
      // Get the base URL for the website renderer
      const protocol = request.headers.get("x-forwarded-proto") || "http";
      const host = request.headers.get("host") || "localhost:3000";
      const baseUrl = `${protocol}://${host}`;

      // Create CertificateData object from database certificate
      const certificateData = {
        id: certificate.id,
        templateName: certificate.template?.name || "Certificate",
        recipientFirstName: certificate.recipientFirstName,
        recipientLastName: certificate.recipientLastName,
        recipientEmail: certificate.recipientEmail,
        authorizingOfficial: (
          certificate.certificateData as { authorizingOfficial?: string }
        )?.authorizingOfficial, // Extract from stored data
        issueDate: certificate.issueDate,
        templateData: (certificate.certificateData ||
          certificate.template?.templateData) as TemplateData,
        qrCodeData: certificate.qrCodeData, // Include QR code data
        verificationUrl: `${protocol}://${host}/community/verify-certificate?id=${certificate.verificationId}`, // Generate verification URL
        verificationId: certificate.verificationId, // Include verification ID
      };

      const renderer = new HybridCertificateRenderer(certificateData, baseUrl);
      let fileBuffer: Buffer;
      let contentType: string;
      let filename: string;

      if (format.toLowerCase() === "png") {
        fileBuffer = await renderer.generatePNG();
        contentType = "image/png";
        filename = `${certificate.template?.name || "Certificate"}-${
          certificate.recipientFirstName
        }-${certificate.recipientLastName}.png`;
      } else {
        fileBuffer = await renderer.generatePDF();
        contentType = "application/pdf";
        filename = `${certificate.template?.name || "Certificate"}-${
          certificate.recipientFirstName
        }-${certificate.recipientLastName}.pdf`;
      }

      const headers = new Headers();
      headers.set("Content-Type", contentType);
      headers.set("Content-Disposition", `attachment; filename="${filename}"`);

      return new NextResponse(fileBuffer, {
        status: 200,
        headers,
      });
    } catch (error) {
      console.error(`Error generating ${format.toUpperCase()}:`, error);
      return NextResponse.json(
        {
          error: `${format.toUpperCase()} generation failed`,
          message: `Unable to generate ${format.toUpperCase()}. Please use the preview page and print to ${format.toUpperCase()} using your browser.`,
          certificateId: certificate.id,
          viewUrl: `/admin/certificates/flexible-preview?certificateId=${certificate.id}`,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(`Error downloading certificate:`, error);
    return NextResponse.json(
      { error: "Failed to download certificate" },
      { status: 500 }
    );
  }
}
