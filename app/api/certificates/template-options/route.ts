import { NextResponse } from "next/server";
import { dbCertificateService } from "@/lib/services/certificate-database";

export async function GET() {
  try {
    // Initialize defaults to ensure templates are seeded
    await dbCertificateService.initializeDefaults();

    // Get all available template options
    const templateOptions = await dbCertificateService.getTemplateOptions();

    return NextResponse.json({
      success: true,
      templates: templateOptions,
    });
  } catch (error) {
    console.error("Error fetching template options:", error);
    return NextResponse.json(
      { error: "Failed to fetch template options" },
      { status: 500 }
    );
  }
}
