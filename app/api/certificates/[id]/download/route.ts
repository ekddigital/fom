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
import { getCertificateConfig } from "@/lib/config/certificate-config";

/**
 * Enhanced PDF generation function with production-ready configuration
 */
async function generateSimplifiedPDF(
  renderer: HybridCertificateRenderer,
  certificateData: CertificateData
): Promise<Buffer> {
  // Use PDF-optimized HTML generation with format-specific QR codes
  const html = await renderer.generateHTMLWithFormat("pdf");

  // Get production configuration
  const config = getCertificateConfig();

  // Check if certificate generation is disabled
  if (config.disabled) {
    throw new Error(
      "Certificate generation is disabled in this environment. Please use the HTML fallback."
    );
  }

  let browser;
  let page;

  try {
    // Production-ready Puppeteer configuration
    const launchOptions: Record<string, unknown> = {
      headless: true,
      args: config.puppeteerArgs,
      timeout: config.timeout,
    };

    // Add executable path if available
    if (config.chromeExecutable) {
      launchOptions.executablePath = config.chromeExecutable;
    }

    browser = await puppeteer.launch(launchOptions);

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
      deviceScaleFactor: config.viewport.deviceScaleFactor,
    });

    // Set content with enhanced QR code handling and increased timeout
    await page.setContent(html, {
      waitUntil: ["load", "domcontentloaded", "networkidle0"],
      timeout: config.timeout,
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
    await new Promise((resolve) => setTimeout(resolve, config.waitTime));

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

      // Enhanced error response with more helpful information
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      console.log(`📊 Certificate generation failed for ${certificate.id}:`, {
        format,
        error: errorMessage,
        certificateId: certificate.id,
        templateName: certificate.template?.name,
        environment: process.env.NODE_ENV,
      });

      return NextResponse.json(
        {
          error: `${format.toUpperCase()} generation failed`,
          message: `Unable to generate ${format.toUpperCase()} due to server constraints. Please try the following alternatives:\n\n1. Use the preview page and print/save as ${format.toUpperCase()}\n2. Try generating a different format\n3. Contact support if this persists`,
          certificateId: certificate.id,
          viewUrl: `/admin/certificates/flexible-preview?certificateId=${certificate.id}`,
          alternatives: [
            {
              method: "preview",
              url: `/admin/certificates/flexible-preview?certificateId=${certificate.id}`,
              description:
                "View certificate in browser and use browser print/save function",
            },
            {
              method: "alternative_format",
              url:
                format === "pdf"
                  ? `/api/certificates/${certificate.id}/download?format=png`
                  : `/api/certificates/${certificate.id}/download?format=pdf`,
              description: `Try downloading as ${
                format === "pdf" ? "PNG" : "PDF"
              } instead`,
            },
            {
              method: "html_fallback",
              url: `/api/certificates/${certificate.id}/download-html`,
              description:
                "Download as HTML page (can be printed to PDF manually)",
            },
          ],
          troubleshooting: {
            commonCauses: [
              "Server resource constraints",
              "Browser engine initialization failure",
              "Memory limitations",
            ],
            suggestedActions: [
              "Use the preview page for manual download",
              "Try again in a few minutes",
              "Contact administrator if problem persists",
            ],
          },
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
