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

    return NextResponse.json(result);
  } catch (error) {
    console.error(`Error in GET /api/certificates/verify/${id}:`, error);
    return NextResponse.json(
      { error: "Failed to verify certificate" },
      { status: 500 }
    );
  }
}
