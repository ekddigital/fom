import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbCertificateService } from "@/lib/services/certificate-database";
import { generateEnhancedQRCodeData } from "@/lib/utils/certificate";
import { z, ZodError } from "zod";
import { Prisma } from "@prisma/client";

// Request validation schema
const IssueCertificateSchema = z.object({
  templateName: z.string().min(1, "Template name is required"),
  recipientName: z.string().min(1, "Recipient name is required"),
  recipientEmail: z.string().email("Valid email is required"),
  authorizingOfficial: z.string().optional(), // Optional authorizing official field (like "Hetawk", "Executive Director", etc.)
  issueDate: z.string().optional(), // Optional custom issue date in YYYY-MM-DD format
  customFields: z.record(z.unknown()).optional(),
  securityLevel: z.enum(["BASIC", "STANDARD", "HIGH"]).optional(),
  organizationId: z.string().optional(),
  validityPeriod: z.union([z.number().positive(), z.null()]).optional(), // null = never expires

  // JICF Certificate of Service specific fields
  gender: z.enum(["Male", "Female"]).optional(), // For determining his/her in template
  position: z.string().optional(), // Position(s) served in ministry
  pastorName: z.string().optional(), // Pastor name for signature area
  pastorSignature: z.string().optional(), // Custom pastor signature path, defaults to /pastor_Joe_signaturepng.png
});

export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check authorization (only ADMIN or MINISTRY_LEADER can issue certificates)
    if (
      !session.user.role ||
      (session.user.role !== "ADMIN" &&
        session.user.role !== "MINISTRY_LEADER" &&
        session.user.role !== "SUPER_ADMIN")
    ) {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const validatedData = IssueCertificateSchema.parse(body);

    // Initialize database service if needed (only if templates don't exist)
    try {
      const templateCount = await dbCertificateService.getTemplateCount();
      if (templateCount === 0) {
        console.log("📋 No templates found, initializing database...");
        await dbCertificateService.initializeDefaults();
      }
    } catch (initError) {
      console.error("❌ Failed to initialize database:", initError);
      // Continue without initialization - the template lookup will handle missing templates
    }

    // Get the actual template data from the database
    const templateName = validatedData.templateName;
    console.log("Looking for template:", templateName);

    // Find the template in the database by ID or slug
    const template = await dbCertificateService.getTemplateByIdOrSlug(
      templateName
    );

    if (!template) {
      return NextResponse.json(
        {
          error: `Template '${templateName}' not found. Please check the template name.`,
        },
        { status: 404 }
      );
    }

    console.log("Found template:", {
      id: template.id,
      name: template.name,
      hasTemplateData: !!template.templateData,
      templateDataType: typeof template.templateData,
    });

    // Use the actual template data from the database
    let fullTemplateDesignData: Prisma.JsonObject;

    // Pre-generate the certificate ID so we can inject it into the template
    const { generateCertificateId } = await import("@/lib/utils/certificate");

    // Get the next sequence number for this template
    const existingCount =
      await dbCertificateService.getCertificateCountByTemplate(templateName);
    const certificateId = generateCertificateId(
      templateName,
      existingCount + 1
    );

    if (template.templateData && typeof template.templateData === "object") {
      // We have the actual beautiful template data
      fullTemplateDesignData = JSON.parse(
        JSON.stringify(template.templateData)
      ) as Prisma.JsonObject;

      // Customize the template with recipient and issuer information
      const defaultIssuerName =
        `${session.user.firstName || ""} ${
          session.user.lastName || ""
        }`.trim() || session.user.email;

      // Use provided authorizing official or fall back to the session user's name
      const issuerDisplayName =
        validatedData.authorizingOfficial || defaultIssuerName;

      // Use provided issue date or default to current date
      const issueDate = validatedData.issueDate
        ? new Date(validatedData.issueDate).toLocaleDateString()
        : new Date().toLocaleDateString();

      // Update dynamic fields in the template if they exist
      if (
        fullTemplateDesignData.elements &&
        Array.isArray(fullTemplateDesignData.elements)
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const elements = fullTemplateDesignData.elements as any[];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        elements.forEach((element: any) => {
          if (element.content && typeof element.content === "string") {
            const originalContent = element.content;

            // Replace placeholders with actual values - try multiple formats
            element.content = element.content
              // Double curly brace format (templates)
              .replace(/\{\{recipientName\}\}/g, validatedData.recipientName)
              .replace(/\{\{issuerName\}\}/g, issuerDisplayName)
              .replace(/\{\{issueDate\}\}/g, issueDate)
              .replace(/\{\{certificateId\}\}/g, certificateId)
              // JICF Certificate of Service specific replacements
              .replace(
                /\{\{gender\}\}/g,
                validatedData.gender === "Male"
                  ? "his"
                  : validatedData.gender === "Female"
                  ? "her"
                  : "his/her"
              )
              .replace(
                /\{\{position\}\}/g,
                validatedData.position || "Ministry Position"
              )
              .replace(
                /\{\{pastorName\}\}/g,
                validatedData.pastorName || "Pst. Joseph G. Summers"
              )
              .replace(
                /\{\{pastorSignature\}\}/g,
                validatedData.pastorSignature || "/pastor_Joe_signaturepng.png"
              )
              // Single curly brace format
              .replace(/\{recipientName\}/g, validatedData.recipientName)
              .replace(/\{issuerName\}/g, issuerDisplayName)
              .replace(/\{issueDate\}/g, issueDate)
              .replace(/\{certificateId\}/g, certificateId)
              .replace(
                /\{gender\}/g,
                validatedData.gender === "Male"
                  ? "his"
                  : validatedData.gender === "Female"
                  ? "her"
                  : "his/her"
              )
              .replace(
                /\{position\}/g,
                validatedData.position || "Ministry Position"
              )
              .replace(
                /\{pastorName\}/g,
                validatedData.pastorName || "Pst. Joseph G. Summers"
              )
              .replace(
                /\{pastorSignature\}/g,
                validatedData.pastorSignature || "/pastor_Joe_signaturepng.png"
              )
              // Plain text replacements
              .replace(/Sample Recipient/g, validatedData.recipientName)
              .replace(/System Administrator/g, issuerDisplayName)
              // Date patterns
              .replace(/6\/13\/2025/g, issueDate)
              .replace(/Date: 6\/13\/2025/g, `Date: ${issueDate}`)
              // Certificate ID patterns
              .replace(/FOM-\d{4}-[A-Z]{3}-\d{4}-[A-Z0-9]{2}/g, certificateId)
              // Issuer patterns
              .replace(
                /Authorized by: System Administrator/g,
                `Authorized by: ${issuerDisplayName}`
              )
              .replace(
                /Issued by: System Administrator/g,
                `Issued by: ${issuerDisplayName}`
              )
              .replace(
                /Baptized by: System Administrator/g,
                `Baptized by: ${issuerDisplayName}`
              );

            // Log replacement for debugging
            if (originalContent !== element.content) {
              console.log(`Replaced content in element:`, {
                original: originalContent,
                updated: element.content,
              });
            }

            // Dynamic sizing for JICF Certificate of Service position field
            if (element.id === "position-served" && validatedData.position) {
              const positionText = validatedData.position;
              const textLength = positionText.length;

              // Calculate optimal font size and height based on text length and content
              let fontSize = 22; // Default size
              let height = 30; // Default height

              // Count semicolons and line breaks to determine if text spans multiple lines
              const semicolonCount = (positionText.match(/;/g) || []).length;
              const hasMultipleRoles = semicolonCount > 0;

              if (textLength > 80 || (hasMultipleRoles && textLength > 50)) {
                // Very long text or multiple roles - much smaller font, more height
                fontSize = 14;
                height = 60;
              } else if (
                textLength > 60 ||
                (hasMultipleRoles && textLength > 30)
              ) {
                // Long text with multiple roles - smaller font, more height
                fontSize = 16;
                height = 50;
              } else if (textLength > 40) {
                // Medium-long text - medium font
                fontSize = 18;
                height = 40;
              } else if (textLength > 25) {
                // Medium text - slightly smaller font
                fontSize = 20;
                height = 35;
              }
              // Short text (≤25 chars) keeps default 22px font and 30px height

              // Update element style and position
              element.style.fontSize = fontSize;
              element.position.height = height;

              // Add line-height for better text spacing when multiple lines
              if (height > 35) {
                element.style.lineHeight = "1.3";
              }

              console.log(
                `Dynamic sizing applied to position: "${positionText}" (${textLength} chars, ${semicolonCount} semicolons) - Font: ${fontSize}px, Height: ${height}px`
              );
            }

            // Dynamic sizing for recipient name field (in case of very long names)
            if (
              element.id === "recipient-name" &&
              validatedData.recipientName
            ) {
              const nameText = validatedData.recipientName;
              const nameLength = nameText.length;

              let fontSize = 36; // Default size
              let height = 45; // Default height

              if (nameLength > 30) {
                // Very long name - smaller font, more height
                fontSize = 28;
                height = 55;
              } else if (nameLength > 20) {
                // Long name - medium font
                fontSize = 32;
                height = 50;
              }
              // Short names keep default 36px

              element.style.fontSize = fontSize;
              element.position.height = height;

              console.log(
                `Dynamic sizing applied to recipient name: "${nameText}" (${nameLength} chars) - Font: ${fontSize}px, Height: ${height}px`
              );
            }

            // Dynamic sizing for recipient name if very long
            if (
              element.id === "recipient-name" &&
              validatedData.recipientName
            ) {
              const nameLength = validatedData.recipientName.length;
              let fontSize = 36; // Default size

              if (nameLength > 25) {
                fontSize = 30;
              } else if (nameLength > 20) {
                fontSize = 32;
              }

              element.style.fontSize = fontSize;
              console.log(
                `Dynamic sizing applied to name: "${validatedData.recipientName}" (${nameLength} chars) - Font: ${fontSize}px`
              );
            }
          }
        });

        // Check if certificate ID is visible anywhere in the template
        const certificateIdVisible = elements.some(
          (element) =>
            element.content &&
            typeof element.content === "string" &&
            element.content.includes(certificateId)
        );

        // If certificate ID is not visible, add it as a prominent element
        if (!certificateIdVisible) {
          elements.push({
            id: "certificate-id-display",
            type: "text",
            content: `Certificate ID: ${certificateId}`,
            position: { x: 50, y: 550, width: 700, height: 30 },
            style: {
              fontSize: "14px",
              fontWeight: "bold",
              color: "#2563eb",
              textAlign: "center",
              fontFamily: "serif",
              backgroundColor: "#f0f9ff",
              padding: "5px",
              border: "1px solid #2563eb",
              borderRadius: "4px",
            },
          });

          console.log(`Added certificate ID element: ${certificateId}`);
        }

        // Add security features based on security level if not already present
        const hasQrCode = elements.some(
          (el) =>
            el.id.includes("qr-code") ||
            el.id.includes("qr-verification") ||
            el.id.includes("verification-qr") ||
            el.content === "{{qrCode}}"
        );
        const hasSecurityWatermark = elements.some((el) =>
          el.id.includes("security-watermark")
        );
        const hasDigitalSignature = elements.some(
          (el) =>
            el.id === "digital-signature" || el.id === "digital-verification"
        );

        // Add QR code for BASIC level and above
        if (
          (validatedData.securityLevel === "BASIC" ||
            validatedData.securityLevel === "STANDARD" ||
            validatedData.securityLevel === "HIGH") &&
          !hasQrCode
        ) {
          elements.push({
            id: "qr-code",
            type: "image",
            content: "{{qrCode}}",
            position: { x: 650, y: 460, width: 60, height: 60 },
            style: {
              borderRadius: "4px",
            },
          });

          elements.push({
            id: "qr-label",
            type: "text",
            content: "Scan to verify",
            position: { x: 635, y: 525, width: 90, height: 12 },
            style: {
              fontSize: 8,
              fontFamily: "serif",
              color: "#7c7c7b",
              textAlign: "center",
            },
          });
        }

        // Add digital signature indicator for STANDARD level and above
        if (
          (validatedData.securityLevel === "STANDARD" ||
            validatedData.securityLevel === "HIGH") &&
          !hasDigitalSignature
        ) {
          // Calculate position based on template type
          let signaturePosition = { x: 50, y: 545, width: 300, height: 12 }; // Default position

          // Adjust position for JULS award templates to be under certificate ID
          if (
            validatedData.templateName === "JULS Outstanding Contribution Award"
          ) {
            signaturePosition = { x: 300, y: 575, width: 200, height: 12 }; // Below certificate ID at y:555
          } else if (
            validatedData.templateName === "JULS Certificate of Appreciation"
          ) {
            signaturePosition = { x: 300, y: 550, width: 200, height: 12 }; // Below certificate ID at y:530
          } else if (
            validatedData.templateName === "JULS Most Dedicated Award"
          ) {
            signaturePosition = { x: 300, y: 560, width: 200, height: 12 }; // Under certificate ID at y:545
          } else if (validatedData.templateName === "JULS Hard Working Award") {
            signaturePosition = { x: 300, y: 555, width: 200, height: 12 }; // Under certificate reference at y:540
          } else if (validatedData.templateName === "JULS Most Active Award") {
            signaturePosition = { x: 300, y: 560, width: 200, height: 12 }; // Under certificate ID at y:545
          }

          elements.push({
            id: "digital-signature",
            type: "text",
            content: "Digitally Signed & Verified",
            position: signaturePosition,
            style: {
              fontSize: 8,
              fontFamily: "serif",
              color: "#7c7c7b",
              textAlign: "center",
            },
          });
        }

        // Add security watermark for HIGH level
        if (validatedData.securityLevel === "HIGH" && !hasSecurityWatermark) {
          elements.push({
            id: "security-watermark",
            type: "text",
            content: "AUTHENTIC",
            position: { x: 300, y: 300, width: 200, height: 80 },
            style: {
              fontSize: 48,
              fontFamily: "serif",
              fontWeight: "bold",
              color: "rgba(12, 67, 106, 0.08)",
              textAlign: "center",
            },
          });
        }
      }
    } else {
      return NextResponse.json(
        {
          error: `Template '${templateName}' has invalid or missing template data.`,
        },
        { status: 500 }
      );
    }

    console.log("Using actual template data:", {
      templateName: template.name,
      hasElements: !!fullTemplateDesignData.elements,
      elementsCount: Array.isArray(fullTemplateDesignData.elements)
        ? fullTemplateDesignData.elements.length
        : 0,
    });

    // Generate enhanced QR code data for localhost environments BEFORE issuing certificate
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    // For JICF Certificate of Service, use pastor name; otherwise use authorizing official
    let issuerDisplayName =
      validatedData.authorizingOfficial ||
      session.user.firstName + " " + session.user.lastName;

    if (
      template.name === "Certificate of Service" &&
      validatedData.pastorName
    ) {
      issuerDisplayName = validatedData.pastorName;
    }

    const issueDate = validatedData.issueDate
      ? new Date(validatedData.issueDate).toLocaleDateString()
      : new Date().toLocaleDateString();

    const enhancedQRCode = generateEnhancedQRCodeData(
      {
        certificateId: certificateId,
        recipientName: validatedData.recipientName,
        recipientEmail: validatedData.recipientEmail,
        templateName: template.name,
        issueDate: issueDate,
        issuerName: issuerDisplayName,
        organizationName: "FOM", // You can make this dynamic based on organization
      },
      baseUrl
    );

    // Debug logging
    console.log("🐛 QR Code Debug Info:");
    console.log("Base URL:", baseUrl);
    console.log("Enhanced QR Code length:", enhancedQRCode.length);
    console.log(
      "Enhanced QR Code preview:",
      enhancedQRCode.substring(0, 100) + "..."
    );
    console.log("Is Enhanced QR Code JSON?", enhancedQRCode.startsWith("{"));

    // Issue the certificate with the pre-generated ID
    const certificate = await dbCertificateService.issueCertificate(
      {
        ...validatedData,
        id: certificateId, // Pass the pre-generated certificate ID
        issuedById: session.user.id,
      },
      fullTemplateDesignData,
      enhancedQRCode // Pass enhanced QR code as third parameter
    );

    return NextResponse.json({
      success: true,
      certificate: {
        id: certificate.id,
        templateName: certificate.templateName,
        recipientName: certificate.recipientName,
        issueDate: certificate.issueDate,
        verificationUrl: certificate.verificationUrl,
        qrCode: certificate.qrCode,
        securityLevel: certificate.metadata.securityLevel,
      },
    });
  } catch (error: unknown) {
    console.error("Certificate issuance error:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to issue certificate", message: errorMessage },
      { status: 500 }
    );
  }
}
