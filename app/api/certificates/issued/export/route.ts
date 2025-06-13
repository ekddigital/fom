import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all issued certificates with template information
    const certificates = await prisma.certificate.findMany({
      include: {
        template: {
          select: {
            id: true,
            name: true,
            category: true,
            typeCode: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Create CSV content
    const csvHeaders = [
      "Certificate ID",
      "Template Name",
      "Template Category",
      "Recipient Name",
      "Recipient Email",
      "Verification ID",
      "Issue Date",
      "Expiry Date",
      "Status",
      "Created At",
    ];

    const csvRows = certificates.map((cert) => [
      cert.id,
      cert.template?.name || "Unknown Template",
      cert.template?.category || "general",
      `${cert.recipientFirstName} ${cert.recipientLastName}`.trim(),
      cert.recipientEmail,
      cert.verificationId,
      cert.issueDate.toISOString().split("T")[0],
      cert.expiryDate ? cert.expiryDate.toISOString().split("T")[0] : "",
      cert.status,
      cert.createdAt.toISOString(),
    ]);

    // Convert to CSV format
    const csvContent = [
      csvHeaders.join(","),
      ...csvRows.map((row) =>
        row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    // Set appropriate headers for CSV download
    const headers = new Headers();
    headers.set("Content-Type", "text/csv");
    headers.set(
      "Content-Disposition",
      `attachment; filename="issued-certificates-${
        new Date().toISOString().split("T")[0]
      }.csv"`
    );

    return new NextResponse(csvContent, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error exporting certificates:", error);
    return NextResponse.json(
      { error: "Failed to export certificates" },
      { status: 500 }
    );
  }
}
