import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import JSZip from "jszip";
import {
  HybridCertificateRenderer,
  TemplateData,
} from "@/lib/utils/hybrid-certificate-renderer";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { certificateIds, format = "pdf" } = body;

    if (
      !certificateIds ||
      !Array.isArray(certificateIds) ||
      certificateIds.length === 0
    ) {
      return NextResponse.json(
        { error: "Certificate IDs are required" },
        { status: 400 }
      );
    }

    // Validate format
    if (!["pdf", "png"].includes(format)) {
      return NextResponse.json(
        { error: "Invalid format. Must be 'pdf' or 'png'" },
        { status: 400 }
      );
    }

    // Fetch all certificates from database
    const certificates = await prisma.certificate.findMany({
      where: {
        id: {
          in: certificateIds,
        },
      },
      include: {
        template: true,
      },
    });

    if (certificates.length === 0) {
      return NextResponse.json(
        { error: "No certificates found" },
        { status: 404 }
      );
    }

    // Create ZIP file
    const zip = new JSZip();
    const failedCertificates: string[] = [];

    console.log(
      `Generating ZIP with ${
        certificates.length
      } certificates in ${format.toUpperCase()} format`
    );

    // Get the base URL for the website renderer - DECLARE THESE FIRST
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const host = request.headers.get("host") || "localhost:3000";
    const baseUrl = `${protocol}://${host}`;

    // Process each certificate
    for (const certificate of certificates) {
      try {
        // Create certificate data object
        const certificateData = {
          id: certificate.id,
          templateName: certificate.template?.name || "Certificate",
          recipientFirstName: certificate.recipientFirstName,
          recipientLastName: certificate.recipientLastName,
          recipientEmail: certificate.recipientEmail,
          authorizingOfficial: (
            certificate.certificateData as { authorizingOfficial?: string }
          )?.authorizingOfficial, // Extract from stored data for pastor name
          issueDate: certificate.issueDate,
          templateData: (certificate.certificateData ||
            certificate.template?.templateData) as TemplateData,
          qrCodeData: certificate.qrCodeData, // Include QR code data
          verificationUrl: `${protocol}://${host}/community/verify-certificate?id=${certificate.verificationId}`, // Generate verification URL
          verificationId: certificate.verificationId, // Include verification ID
        };

        // Generate certificate using hybrid renderer
        const renderer = new HybridCertificateRenderer(
          certificateData,
          baseUrl
        );
        let fileBuffer: Buffer;
        let fileExtension: string;

        if (format === "png") {
          fileBuffer = await renderer.generatePNG();
          fileExtension = "png";
        } else {
          fileBuffer = await renderer.generatePDF();
          fileExtension = "pdf";
        }

        // Create safe filename
        const recipientName =
          `${certificate.recipientFirstName} ${certificate.recipientLastName}`
            .replace(/[^a-zA-Z0-9\s-]/g, "") // Remove special characters
            .replace(/\s+/g, "-") // Replace spaces with hyphens
            .trim();

        const templateName = (certificate.template?.name || "Certificate")
          .replace(/[^a-zA-Z0-9\s-]/g, "") // Remove special characters
          .replace(/\s+/g, "-") // Replace spaces with hyphens
          .trim();

        const filename = `${templateName}_${recipientName}_${certificate.id.slice(
          -8
        )}.${fileExtension}`;

        // Add file to ZIP
        zip.file(filename, fileBuffer);

        console.log(`Added ${filename} to ZIP`);
      } catch (error) {
        console.error(
          `Failed to generate certificate ${certificate.id}:`,
          error
        );
        failedCertificates.push(certificate.id);
      }
    }

    // Generate ZIP buffer
    const zipBuffer = await zip.generateAsync({
      type: "uint8array",
      compression: "DEFLATE",
      compressionOptions: {
        level: 6,
      },
    });

    // Create response headers
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const zipFilename = `certificates_${format}_${timestamp}_${certificates.length}files.zip`;

    const headers = new Headers();
    headers.set("Content-Type", "application/zip");
    headers.set("Content-Disposition", `attachment; filename="${zipFilename}"`);

    // Add information about failed certificates if any
    if (failedCertificates.length > 0) {
      headers.set("X-Failed-Certificates", failedCertificates.join(","));
      headers.set("X-Failed-Count", failedCertificates.length.toString());
    }

    headers.set("X-Total-Certificates", certificates.length.toString());
    headers.set(
      "X-Successful-Certificates",
      (certificates.length - failedCertificates.length).toString()
    );

    console.log(`ZIP generated successfully: ${zipFilename}`);
    console.log(
      `Total: ${certificates.length}, Successful: ${
        certificates.length - failedCertificates.length
      }, Failed: ${failedCertificates.length}`
    );

    return new NextResponse(Buffer.from(zipBuffer), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error generating bulk ZIP download:", error);
    return NextResponse.json(
      {
        error: "Failed to generate ZIP file",
        message:
          "An error occurred while creating the ZIP file. Please try again.",
      },
      { status: 500 }
    );
  }
}
