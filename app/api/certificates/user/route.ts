import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbCertificateService } from "@/lib/services/certificate-database";

// Handler for getting a user's certificates
export async function GET(req: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    // Get user's certificates
    const certificates = await dbCertificateService.getUserCertificates(
      session.user.id,
      {
        status: status || undefined,
      }
    );

    return NextResponse.json(certificates);
  } catch (error) {
    console.error("Error in GET /api/certificates/user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user certificates" },
      { status: 500 }
    );
  }
}
