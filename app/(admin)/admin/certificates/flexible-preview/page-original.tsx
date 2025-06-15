"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { toast } from "sonner";
import { generateCertificateQRCode } from "@/lib/utils/qr-code-generator";
import { FormatSelectionDialog } from "@/components/ui/format-selection-dialog";
import {
  createCertificateFromDesignAndType,
  getCertificateTypeById,
  getDesignTemplateById,
} from "@/lib/utils/certificate-design-system";
import { TemplateData } from "@/lib/utils/certificate";

export default function FlexibleCertificatePreviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const certificateTypeId = searchParams.get("certificateType");
  const designTemplateId = searchParams.get("designTemplate");
  const certificateId = searchParams.get("certificateId"); // For viewing issued certificates
  const recipientName = searchParams.get("recipientName") || "Sample Recipient";
  const issuerName = searchParams.get("issuerName") || "System Administrator";

  const [template, setTemplate] = useState<TemplateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFormatDialog, setShowFormatDialog] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");

  // Generate QR Code for certificate verification
  useEffect(() => {
    const generateQRCode = async () => {
      if (!certificateId) return;

      try {
        const verificationUrl = `https://fom.church/verify/${certificateId}`;
        console.log("Generating QR code for URL:", verificationUrl);
        // Use centralized ultra-scannable QR code generator (DRY principle)
        const qrDataUrl = await generateCertificateQRCode(verificationUrl);
        console.log("QR code generated successfully");
        setQrCodeDataUrl(qrDataUrl);
      } catch (error) {
        console.error("Error generating QR code:", error);
        // Fallback to a simple placeholder
        const fallbackQr =
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NjYiPlFSIENvZGU8L3RleHQ+PC9zdmc+";
        setQrCodeDataUrl(fallbackQr);
      }
    };

    generateQRCode();
  }, [certificateId]);

  const handleDownload = async (format: "pdf" | "png") => {
    if (!certificateId) {
      toast.error("Cannot download: Certificate ID not found");
      return;
    }

    try {
      const response = await fetch(
        `/api/certificates/${certificateId}/download?format=${format}`
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `certificate-${certificateId}.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success(
          `Certificate downloaded as ${format.toUpperCase()} successfully`
        );
      } else {
        // Try to get error details from response
        try {
          const errorData = await response.json();
          console.error("Download error:", errorData);
          toast.error(
            errorData.message ||
              `Failed to download certificate as ${format.toUpperCase()}. File may not be available yet.`,
            {
              duration: 5000,
            }
          );
        } catch {
          toast.error(
            `Failed to download certificate as ${format.toUpperCase()}`
          );
        }
      }
    } catch (error) {
      console.error("Error downloading certificate:", error);
      toast.error(`Failed to download certificate as ${format.toUpperCase()}`);
    }
  };

  const loadTemplate = useCallback(async () => {
    try {
      setLoading(true);

      // Scenario 1: Viewing an issued certificate (has certificateId)
      if (certificateId) {
        try {
          // Fetch the issued certificate data
          const response = await fetch(`/api/certificates/${certificateId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch certificate");
          }

          const certificateData = await response.json();

          console.log("Certificate data received:", certificateData);
          console.log("Template data:", certificateData.templateData);

          // The certificate should have the full template data stored
          if (certificateData.templateData) {
            console.log("Setting template data:", certificateData.templateData);
            console.log(
              "Template elements:",
              certificateData.templateData.elements
            );
            setTemplate(certificateData.templateData);
          } else {
            console.error("No templateData found in certificate");
            toast.error("Certificate template data not found");
            router.push("/admin/certificates");
          }
          return;
        } catch (error) {
          console.error("Error fetching issued certificate:", error);
          toast.error("Failed to load certificate");
          router.push("/admin/certificates");
          return;
        }
      }

      // Scenario 2: Creating/previewing a new certificate (has certificateType and designTemplate)
      if (!certificateTypeId || !designTemplateId) {
        toast.error("Missing certificate type or design template");
        router.push("/admin/certificates");
        return;
      }

      // Get custom fields from URL params
      const customFields: Record<string, unknown> = {};
      for (const [key, value] of searchParams.entries()) {
        if (key.startsWith("customField_")) {
          const fieldName = key.replace("customField_", "");
          customFields[fieldName] = value;
        }
      }

      // Generate template from design system
      const generatedTemplate = createCertificateFromDesignAndType(
        designTemplateId,
        certificateTypeId,
        {
          recipientName,
          issuerName,
          customFields,
        }
      );

      if (generatedTemplate) {
        setTemplate(generatedTemplate);
      } else {
        toast.error("Failed to generate certificate template");
        router.push("/admin/certificates");
      }
    } catch (error) {
      console.error("Error generating template:", error);
      toast.error("Failed to generate certificate template");
      router.push("/admin/certificates");
    } finally {
      setLoading(false);
    }
  }, [
    certificateId,
    certificateTypeId,
    designTemplateId,
    recipientName,
    issuerName,
    searchParams,
    router,
  ]);

  useEffect(() => {
    loadTemplate();
  }, [loadTemplate]);

  // Function to replace template variables
  const replaceVariables = (content: string): string => {
    return content
      .replace(/\{\{recipientName\}\}/g, recipientName)
      .replace(/\{\{issuerName\}\}/g, issuerName)
      .replace(/\{\{issueDate\}\}/g, new Date().toLocaleDateString())
      .replace(/\{\{certificateId\}\}/g, certificateId || "SAMPLE-ID")
      .replace(
        /\{\{verificationUrl\}\}/g,
        `https://fom.church/verify/${certificateId || "sample"}`
      );
  };

  // Function to replace image variables
  const replaceImageVariables = (content: string): string => {
    console.log("Replacing image variables in content:", content);
    console.log("Current QR code data URL available:", !!qrCodeDataUrl);

    const result = content
      .replace(
        /\{\{qrCode\}\}/g,
        qrCodeDataUrl ||
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NjYiPlFSIENvZGU8L3RleHQ+PC9zdmc+"
      )
      .replace(
        /\{qrCode\}/g,
        qrCodeDataUrl ||
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NjYiPlFSIENvZGU8L3RleHQ+PC9zdmc+"
      );

    console.log("Result after replacement:", result);
    return result;
  };

  const renderElement = (element: {
    id: string;
    type: string;
    content: string;
    position: { x: number; y: number; width: number; height: number };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    style: any;
  }) => {
    const { position, style, content, type } = element;

    const baseStyle = {
      position: "absolute" as const,
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: `${position.width}px`,
      height: `${position.height}px`,
      ...style,
    };

    switch (type) {
      case "text":
        return (
          <div
            key={element.id}
            style={{
              ...baseStyle,
              fontSize: `${style.fontSize}px`,
              fontFamily: style.fontFamily,
              fontWeight: style.fontWeight,
              color: style.color,
              textAlign: style.textAlign,
              lineHeight: style.lineHeight,
              letterSpacing: style.letterSpacing,
              textShadow: style.textShadow,
              fontStyle: style.fontStyle,
              display: "flex",
              alignItems: "center",
              justifyContent:
                style.textAlign === "center"
                  ? "center"
                  : style.textAlign === "right"
                  ? "flex-end"
                  : "flex-start",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
            dangerouslySetInnerHTML={{ __html: replaceVariables(content) }}
          />
        );

      case "image":
        const imageSrc = replaceImageVariables(content);
        return (
          <div key={element.id} style={baseStyle}>
            <Image
              src={imageSrc}
              alt="Certificate element"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        );

      case "shape":
        return (
          <div
            key={element.id}
            style={{
              ...baseStyle,
              backgroundColor: style.color,
              borderRadius: style.borderRadius,
              border:
                style.borderWidth && style.borderStyle
                  ? `${style.borderWidth} ${style.borderStyle} ${style.color}`
                  : undefined,
              opacity: style.opacity,
            }}
          />
        );

      case "qr":
        return (
          <div
            key={element.id}
            style={{
              ...baseStyle,
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              color: "#666",
            }}
          >
            QR Code
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Generating certificate preview...
          </p>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Failed to load certificate template</p>
          <Button
            onClick={() => router.push("/admin/certificates")}
            className="mt-4"
          >
            Back to Certificates
          </Button>
        </div>
      </div>
    );
  }

  const certificateType = getCertificateTypeById(certificateTypeId || "");
  const designTemplate = getDesignTemplateById(designTemplateId || "");

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.back()}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Certificate Preview
                  </h1>
                  {certificateType && designTemplate && (
                    <p className="text-sm text-gray-600">
                      {certificateType.name} using {designTemplate.name} design
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Only show download button for issued certificates */}
                {certificateId && (
                  <Button
                    onClick={() => setShowFormatDialog(true)}
                    variant="default"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                )}
                <Button
                  onClick={() => window.print()}
                  variant="outline"
                  size="sm"
                >
                  Print
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Preview */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
            {/* Certificate Canvas */}
            <div
              className="relative bg-white"
              style={{
                width: "800px",
                height: "600px",
                transform: "scale(0.9)",
                transformOrigin: "center",
              }}
            >
              {template?.elements?.map((element) => renderElement(element)) || (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No template elements found
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div>
                Preview generated using the flexible certificate design system
              </div>
              <div className="flex items-center gap-4">
                {certificateType && <span>Type: {certificateType.name}</span>}
                {designTemplate && <span>Design: {designTemplate.name}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Format Selection Dialog */}
      <FormatSelectionDialog
        open={showFormatDialog}
        onOpenChange={setShowFormatDialog}
        onDownload={handleDownload}
        title="Download Certificate"
        description="Choose the format for downloading your certificate. Both formats preserve the exact design and styling."
        certificateName={template?.name || "Certificate"}
      />
    </>
  );
}
