"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CertificatePreviewModal } from "@/components/ui/features/certificate-preview-modal";
import { TemplateData } from "@/lib/utils/certificate";
import { toast } from "sonner";

export default function CertificatePreviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const templateId = searchParams.get("template");
  const recipientName = searchParams.get("recipientName") || "Sample Recipient";
  const issuerName = searchParams.get("issuerName") || "System Administrator";
  const position = searchParams.get("position") || "Sample Position";
  const gender = searchParams.get("gender") || "his/her";
  const pastorName = searchParams.get("pastorName") || "Pst. Joseph G. Summers";

  const [template, setTemplate] = useState<TemplateData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadTemplate = useCallback(async () => {
    if (!templateId) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/certificates/templates/${templateId}`);

      if (response.ok) {
        const templateData = await response.json();

        // Convert database template to TemplateData format
        if (templateData.templateData) {
          setTemplate(templateData.templateData);
        } else {
          toast.error("Invalid template data format");
          router.push("/admin/certificates");
        }
      } else {
        toast.error("Failed to load certificate template");
        router.push("/admin/certificates");
      }
    } catch (error) {
      console.error("Error loading template:", error);
      toast.error("Failed to load certificate template");
      router.push("/admin/certificates");
    } finally {
      setLoading(false);
    }
  }, [templateId, router]);

  useEffect(() => {
    loadTemplate();
  }, [loadTemplate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading certificate preview...</p>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Template Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The certificate template could not be loaded.
          </p>
          <Button onClick={() => router.push("/admin/certificates")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Certificates
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/admin/certificates")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Certificates
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Certificate Preview
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Preview how the certificate will look when issued
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() =>
                router.push(
                  `/admin/certificates/builder?template=${templateId}`
                )
              }
              className="flex items-center gap-2"
            >
              Edit Template
            </Button>
            <Button
              onClick={() =>
                router.push(
                  `/admin/certificates/issue?template=${templateId}&recipientName=${encodeURIComponent(
                    recipientName
                  )}`
                )
              }
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
            >
              Issue Certificate
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-lg">
          <CertificatePreviewModal
            isOpen={true}
            onClose={() => {}} // No close since this is a full page
            template={template}
            recipientName={recipientName}
            issuerName={issuerName}
            issueDate={new Date().toLocaleDateString()}
            position={position}
            gender={gender}
            pastorName={pastorName}
          />
        </div>
      </div>
    </div>
  );
}
