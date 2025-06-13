import { NextRequest, NextResponse } from "next/server";
import { dbCertificateService } from "@/lib/services/certificate-database";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const certificateId = searchParams.get("id");
    const signature = searchParams.get("sig");

    if (!certificateId) {
      return NextResponse.json(
        { error: "Certificate ID is required" },
        { status: 400 }
      );
    }

    // Verify the certificate using our database service
    const verification = await dbCertificateService.verifyCertificate(
      certificateId,
      signature || undefined
    );

    if (!verification.valid) {
      return NextResponse.json(
        {
          valid: false,
          error: verification.reason || "Certificate verification failed",
        },
        { status: 400 }
      );
    }

    const certificate = verification.certificate!;

    return NextResponse.json({
      valid: true,
      certificate: {
        id: certificate.id,
        templateName: certificate.templateName,
        recipientName: certificate.recipientName,
        organizationId: certificate.organizationId,
        issueDate: certificate.issueDate,
        expiryDate: certificate.expiryDate,
        status: certificate.status,
        issuerName: certificate.issuerName,
        securityLevel: certificate.metadata.securityLevel,
        verificationUrl: certificate.verificationUrl,
      },
    });
  } catch (error) {
    console.error("Error verifying certificate:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
