import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  HybridCertificateRenderer,
  CertificateData,
  TemplateData,
} from "@/lib/utils/hybrid-certificate-renderer";

/**
 * Simple HTML Certificate Generator as fallback when PDF/PNG generation fails
 */
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

    // Get the base URL for the website renderer
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const host = request.headers.get("host") || "localhost:3000";
    const baseUrl = `${protocol}://${host}`;

    // Create CertificateData object from database certificate
    const certificateData: CertificateData = {
      id: certificate.id,
      templateName: certificate.template?.name || "Certificate",
      recipientFirstName: certificate.recipientFirstName,
      recipientLastName: certificate.recipientLastName,
      recipientEmail: certificate.recipientEmail,
      authorizingOfficial: (
        certificate.certificateData as { authorizingOfficial?: string }
      )?.authorizingOfficial,
      issueDate: certificate.issueDate,
      templateData: (certificate.certificateData ||
        certificate.template?.templateData) as TemplateData,
      qrCodeData: certificate.qrCodeData,
      verificationUrl: `${protocol}://${host}/community/verify-certificate?id=${certificate.verificationId}`,
      verificationId: certificate.verificationId,
    };

    const renderer = new HybridCertificateRenderer(certificateData, baseUrl);

    // Generate standalone HTML that can be saved manually
    const html = await renderer.generateHTMLWithFormat("png");

    // Create a complete HTML page with print styles
    const completeHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${certificate.template?.name || "Certificate"} - ${
      certificate.recipientFirstName
    } ${certificate.recipientLastName}</title>
    <style>
        @media print {
            body { margin: 0; }
            .no-print { display: none; }
            .certificate-container { 
                width: 100vw; 
                height: 100vh; 
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            background: #f3f4f6;
        }
        
        .instructions {
            background: #dbeafe;
            border: 1px solid #3b82f6;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 20px;
            max-width: 800px;
        }
        
        .instructions h3 {
            margin: 0 0 10px 0;
            color: #1e40af;
        }
        
        .instructions ul {
            margin: 0;
            padding-left: 20px;
        }
        
        .certificate-container {
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            padding: 20px;
            max-width: fit-content;
            margin: 0 auto;
        }
        
        .download-buttons {
            margin-top: 20px;
            text-align: center;
        }
        
        .download-buttons button {
            background: #dc2626;
            color: white;
            border: none;
            padding: 10px 20px;
            margin: 0 10px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
        }
        
        .download-buttons button:hover {
            background: #b91c1c;
        }
    </style>
    <script>
        function printCertificate() {
            window.print();
        }
        
        function saveAsHTML() {
            const content = document.documentElement.outerHTML;
            const blob = new Blob([content], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = '${
              certificate.template?.name?.replace(/[^a-zA-Z0-9]/g, "-") ||
              "Certificate"
            }-${certificate.recipientFirstName}-${
      certificate.recipientLastName
    }.html';
            a.click();
            URL.revokeObjectURL(url);
        }
    </script>
</head>
<body>
    <div class="instructions no-print">
        <h3>📄 Certificate Download Instructions</h3>
        <p>Since automatic PDF/PNG generation is temporarily unavailable, you can use these manual options:</p>
        <ul>
            <li><strong>Print to PDF:</strong> Click "Print Certificate" and choose "Save as PDF" in your browser</li>
            <li><strong>Save as Image:</strong> Right-click on the certificate and select "Save image as..."</li>
            <li><strong>Save Full Page:</strong> Click "Save as HTML" to download this page</li>
        </ul>
    </div>
    
    <div class="certificate-container">
        ${html}
    </div>
    
    <div class="download-buttons no-print">
        <button onclick="printCertificate()">🖨️ Print Certificate</button>
        <button onclick="saveAsHTML()">💾 Save as HTML</button>
        <button onclick="window.close()">❌ Close</button>
    </div>
</body>
</html>`;

    return new NextResponse(completeHtml, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `inline; filename="${
          certificate.template?.name?.replace(/[^a-zA-Z0-9]/g, "-") ||
          "Certificate"
        }-${certificate.recipientFirstName}-${
          certificate.recipientLastName
        }.html"`,
      },
    });
  } catch (error) {
    console.error("Error generating HTML certificate:", error);
    return NextResponse.json(
      { error: "Failed to generate certificate" },
      { status: 500 }
    );
  }
}
