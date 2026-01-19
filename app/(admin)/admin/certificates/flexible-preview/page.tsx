"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CertificatePreviewModal } from "@/components/ui/features/certificate-preview-modal";
import { TemplateData } from "@/lib/utils/certificate";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function FlexiblePreviewPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const certificateId = searchParams.get("certificateId");
  const [certificate, setCertificate] = React.useState<{
    templateData: TemplateData;
    recipientFirstName?: string;
    recipientLastName?: string;
    authorizingOfficial?: string;
    issueDate?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Direct download function for issued certificates
  const handleDownload = async (format: "pdf" | "png") => {
    if (!certificateId) {
      toast.error("Cannot download: Certificate ID not found");
      return;
    }

    console.log(
      "Starting download for certificate:",
      certificateId,
      "format:",
      format
    );

    try {
      const downloadUrl = `/api/certificates/${certificateId}/download?format=${format}`;
      console.log("Download URL:", downloadUrl);

      const response = await fetch(downloadUrl);
      console.log("Download response status:", response.status);
      console.log(
        "Download response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (response.ok) {
        const blob = await response.blob();
        console.log("Blob size:", blob.size, "type:", blob.type);

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
          const errorText = await response.text();
          console.error("Download error response text:", errorText);

          let errorData;
          try {
            errorData = JSON.parse(errorText);
          } catch {
            errorData = { message: errorText };
          }

          console.error("Download error data:", errorData);
          toast.error(
            errorData.message ||
              `Failed to download certificate as ${format.toUpperCase()}. Status: ${
                response.status
              }`,
            {
              duration: 5000,
            }
          );
        } catch (parseError) {
          console.error("Error parsing response:", parseError);
          toast.error(
            `Failed to download certificate as ${format.toUpperCase()}. Status: ${
              response.status
            }`
          );
        }
      }
    } catch (error) {
      console.error("Error downloading certificate:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      toast.error(
        `Failed to download certificate as ${format.toUpperCase()}: ${errorMessage}`
      );
    }
  };

  React.useEffect(() => {
    const fetchCertificate = async () => {
      if (!certificateId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/certificates/${certificateId}`);
        if (response.ok) {
          const data = await response.json();
          setCertificate(data);
        } else {
          console.error("Failed to fetch certificate");
        }
      } catch (error) {
        console.error("Error fetching certificate:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificate();
  }, [certificateId]);

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading certificate...</p>
        </div>
      </div>
    );
  }

  if (!certificate || !certificate.templateData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Certificate Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The requested certificate could not be found.
          </p>
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Extract recipient information from the certificate
  const recipientName = `${certificate.recipientFirstName || "Sample"} ${
    certificate.recipientLastName || "Recipient"
  }`;
  const issuerName = certificate.authorizingOfficial || "System Administrator";
  const issueDate = certificate.issueDate
    ? new Date(certificate.issueDate).toLocaleDateString()
    : new Date().toLocaleDateString();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with navigation and download options */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                Certificate Preview
              </h1>
              <p className="text-sm text-gray-600">ID: {certificateId}</p>
            </div>
          </div>

          {/* Download Options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleDownload("pdf")}>
                Download as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload("png")}>
                Download as PNG
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Certificate Preview */}
      <CertificatePreviewModal
        isOpen={true}
        onClose={handleClose}
        template={certificate.templateData}
        recipientName={recipientName}
        issuerName={issuerName}
        issueDate={issueDate}
      />
    </div>
  );
}
