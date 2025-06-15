import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs";
import puppeteer from "puppeteer";
import {
  HybridCertificateRenderer,
  TemplateData,
  CertificateData,
} from "@/lib/utils/hybrid-certificate-renderer";
import { EKDAssetService } from "@/lib/services/ekd-asset-service";

/**
 * Simplified PDF generation function based on working card renderer approach
 * Enhanced with PDF-optimized QR code handling
 */
async function generateSimplifiedPDF(
  renderer: HybridCertificateRenderer,
  certificateData: CertificateData
): Promise<Buffer> {
  // Use PDF-optimized HTML generation with format-specific QR codes
  const html = await renderer.generateHTMLWithFormat("pdf");

  let browser;
  let page;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--disable-web-security",
        "--allow-running-insecure-content",
        "--force-device-scale-factor=2", // Higher resolution for better QR code rendering
      ],
    });

    page = await browser.newPage();

    // Set viewport to match certificate dimensions with higher resolution
    const templateData = certificateData.templateData as TemplateData;
    const pageSettings = templateData?.pageSettings || {
      width: 800,
      height: 600,
    };

    await page.setViewport({
      width: pageSettings.width,
      height: pageSettings.height,
      deviceScaleFactor: 3, // Higher scale factor for better QR code quality
    });

    // Set content with enhanced QR code handling
    await page.setContent(html, {
      waitUntil: ["load", "domcontentloaded", "networkidle0"],
      timeout: 30000,
    });

    // Wait for fonts and images (especially QR codes) to load completely
    await page.evaluate(() => {
      return Promise.all([
        // Wait for fonts
        "fonts" in document
          ? (document as unknown as { fonts: { ready: Promise<unknown> } })
              .fonts.ready
          : Promise.resolve(),
        // Wait for all images (including QR codes) to load
        Promise.all(
          Array.from(document.images).map(
            (img) =>
              new Promise((resolve) => {
                if (img.complete) {
                  resolve(img);
                } else {
                  img.onload = () => resolve(img);
                  img.onerror = () => resolve(img);
                  // Add timeout to prevent hanging
                  setTimeout(() => resolve(img), 5000);
                }
              })
          )
        ),
      ]);
    });

    // Additional wait to ensure QR codes are fully rendered
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate PDF with exact dimensions and enhanced settings for QR codes
    const pdf = await page.pdf({
      width: `${pageSettings.width}px`,
      height: `${pageSettings.height}px`,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: true,
      format: undefined, // Use custom dimensions
      scale: 1, // Keep scale at 1 to preserve QR code quality
      displayHeaderFooter: false,
      omitBackground: false,
    });

    return Buffer.from(pdf);
  } finally {
    if (page) await page.close();
    if (browser) await browser.close();
  }
}

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

    // Check if certificate is stored in EKD Assets
    const certificateData = certificate.certificateData as Record<
      string,
      unknown
    >;
    const ekdAssetId = certificateData?.ekdAssetId as string;

    if (ekdAssetId) {
      try {
        // Get download URL from EKD Assets
        const downloadUrl = await EKDAssetService.getCertificateDownloadUrl(
          ekdAssetId
        );

        // Redirect to EKD Assets download URL
        return NextResponse.redirect(downloadUrl);
      } catch (error) {
        console.error(
          "EKD Assets download failed, falling back to generation:",
          error
        );
        // Continue to generate on-demand if EKD fails
      }
    }

    // Check if pre-generated file exists (legacy fallback)
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
      // Get the base URL for the website renderer - DECLARE THESE FIRST
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
        console.log("🖼️ Generating PNG certificate...");
        fileBuffer = await renderer.generatePNG();
        contentType = "image/png";
        filename = `${certificate.template?.name || "Certificate"}-${
          certificate.recipientFirstName
        }-${certificate.recipientLastName}.png`;
        console.log(
          `✅ PNG generated successfully, size: ${fileBuffer.length} bytes`
        );
      } else {
        console.log("📄 Generating PDF certificate...");
        try {
          // Use simplified PDF generation based on working card renderer approach
          fileBuffer = await generateSimplifiedPDF(renderer, certificateData);

          // Validate PDF buffer
          if (!fileBuffer || fileBuffer.length === 0) {
            throw new Error("Generated PDF buffer is empty");
          }

          // Check if buffer starts with PDF signature
          const pdfSignature = fileBuffer.subarray(0, 4);
          const isPdfValid = pdfSignature.toString() === "%PDF";

          if (!isPdfValid) {
            console.warn(
              "⚠️ Generated buffer doesn't have valid PDF signature, falling back to PNG"
            );
            throw new Error("Invalid PDF signature");
          }

          contentType = "application/pdf";
          filename = `${certificate.template?.name || "Certificate"}-${
            certificate.recipientFirstName
          }-${certificate.recipientLastName}.pdf`;
          console.log(
            `✅ PDF generated successfully, size: ${fileBuffer.length} bytes, valid: ${isPdfValid}`
          );
        } catch (pdfError) {
          console.error("❌ PDF generation failed:", pdfError);
          // Fallback to PNG if PDF fails
          console.log("🔄 Falling back to PNG generation...");
          fileBuffer = await renderer.generatePNG();
          contentType = "image/png";
          filename = `${certificate.template?.name || "Certificate"}-${
            certificate.recipientFirstName
          }-${certificate.recipientLastName}.png`;
          console.log("✅ PNG fallback generated successfully");
        }
      }
      const headers = new Headers();
      headers.set("Content-Type", contentType);
      headers.set("Content-Disposition", `attachment; filename="${filename}"`);

      // Simplified security headers (based on enhanced renderer approach)
      headers.set("X-Content-Type-Options", "nosniff");
      headers.set("Cache-Control", "no-cache, no-store, must-revalidate");

      // Add content length for proper download handling
      headers.set("Content-Length", fileBuffer.length.toString());

      // Upload to EKD Assets for future downloads (background task)
      if (!ekdAssetId) {
        try {
          const uploadResult = await EKDAssetService.uploadCertificate(
            fileBuffer,
            filename,
            {
              certificateId: certificate.id,
              recipientName: `${certificate.recipientFirstName} ${certificate.recipientLastName}`,
              templateName: certificate.template?.name || "Certificate",
              issueDate: certificate.issueDate.toISOString().split("T")[0],
            }
          );

          // Update database with EKD Asset ID for future downloads
          await prisma.certificate.update({
            where: { id: certificate.id },
            data: {
              certificateData: {
                ...(certificate.certificateData as Record<string, unknown>),
                ekdAssetId: uploadResult.id,
                ekdAccessUrl: uploadResult.access_url,
              },
            },
          });

          console.log(
            `Certificate ${certificate.id} uploaded to EKD Assets: ${uploadResult.id}`
          );
        } catch (uploadError) {
          console.error("Failed to upload to EKD Assets:", uploadError);
          // Continue with download even if upload fails
        }
      }

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
