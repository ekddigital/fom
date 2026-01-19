import { NextResponse } from "next/server";
import { dbCertificateService } from "@/lib/services/certificate-database";

// Public endpoint for verifying certificates - no authentication required
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Get client IP for tracking verification attempts
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0] : "unknown";

    // Determine verification method (manual/web by default)
    const { searchParams } = new URL(req.url);
    const method = searchParams.get("method") || "web";

    // Verify the certificate
    const result = await dbCertificateService.verifyCertificate(
      id,
      undefined, // No signature for this endpoint
      method,
      clientIp
    );

    if (!result.valid || !result.certificate) {
      return NextResponse.json(
        { error: result.reason || "Certificate not found or invalid" },
        { status: 404 }
      );
    }

    // Transform the certificate data to match frontend expectations
    const certificate = result.certificate;
    const [firstName, ...lastNameParts] = certificate.recipientName.split(" ");
    const lastName = lastNameParts.join(" ");

    const transformedResult = {
      ...result,
      certificate: {
        id: certificate.id,
        verificationId: certificate.id,
        template: {
          id: certificate.id, // Using certificate ID as template ID for now
          name: certificate.templateName,
          category: "general", // Default category
        },
        recipient: {
          id: certificate.id, // Using certificate ID as recipient ID for now
          firstName: firstName || "",
          lastName: lastName || "",
          email: "", // Not available in current structure
        },
        issueDate: new Date(certificate.issueDate),
        expiryDate: certificate.expiryDate
          ? new Date(certificate.expiryDate)
          : undefined,
        status: certificate.status,
        issuer: {
          id: certificate.id, // Using certificate ID as issuer ID for now
          firstName: certificate.issuerName.split(" ")[0] || "",
          lastName: certificate.issuerName.split(" ").slice(1).join(" ") || "",
        },
        certificateData: certificate.customFields,
      },
    };

    return NextResponse.json(transformedResult);
  } catch (error) {
    console.error(`Error in GET /api/certificates/verify/${id}:`, error);
    return NextResponse.json(
      { error: "Failed to verify certificate" },
      { status: 500 }
    );
  }
}
