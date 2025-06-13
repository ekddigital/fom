"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Download,
  Share2,
  Eye,
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
  Award,
  Shield,
  ExternalLink,
} from "lucide-react";

interface CertificatePreviewProps {
  verificationId: string;
  isOpen: boolean;
  onClose: () => void;
}

interface CertificateData {
  id: string;
  verificationId: string;
  recipientFirstName: string;
  recipientLastName: string;
  recipientEmail: string;
  issueDate: string;
  expiryDate?: string;
  status: "active" | "revoked" | "expired";
  pdfPath: string;
  pngPath: string;
  template: {
    name: string;
    category: string;
  };
  issuer: {
    firstName: string;
    lastName: string;
  };
  certificateData: Record<string, unknown>;
}

export function CertificatePreview({
  verificationId,
  isOpen,
  onClose,
}: CertificatePreviewProps) {
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCertificate = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/certificates/verify?id=${verificationId}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch certificate");
      }

      setCertificate(data.certificate);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch certificate"
      );
    } finally {
      setLoading(false);
    }
  }, [verificationId]);

  useEffect(() => {
    if (isOpen && verificationId) {
      fetchCertificate();
    }
  }, [isOpen, verificationId, fetchCertificate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "revoked":
        return "bg-red-100 text-red-800 border-red-200";
      case "expired":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "revoked":
      case "expired":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDownload = async (format: "pdf" | "png") => {
    if (!certificate) return;

    try {
      const filePath =
        format === "pdf" ? certificate.pdfPath : certificate.pngPath;
      const response = await fetch(filePath);

      if (!response.ok) {
        throw new Error("Failed to download certificate");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `certificate-${certificate.verificationId}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `Certificate: ${certificate?.template.name}`,
      text: `Certificate issued to ${certificate?.recipientFirstName} ${certificate?.recipientLastName}`,
      url: `${window.location.origin}/community/verify-certificate?id=${verificationId}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(shareData.url);
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(shareData.url);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span>Certificate Details</span>
          </DialogTitle>
          <DialogDescription>
            View and manage certificate information and verification status.
          </DialogDescription>
        </DialogHeader>

        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading certificate...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-800 font-medium">Error</span>
            </div>
            <p className="text-red-700 mt-1">{error}</p>
          </div>
        )}

        {certificate && (
          <div className="space-y-6">
            {/* Status Banner */}
            <div
              className={`rounded-lg border p-4 ${getStatusColor(
                certificate.status
              )}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(certificate.status)}
                  <span className="font-medium capitalize">
                    Certificate {certificate.status}
                  </span>
                </div>
                <Badge variant="outline" className="border-current">
                  ID: {certificate.verificationId}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Certificate Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Recipient Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Full Name
                    </Label>
                    <p className="text-lg font-semibold">
                      {certificate.recipientFirstName}{" "}
                      {certificate.recipientLastName}
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Email Address
                    </Label>
                    <p className="text-gray-900">
                      {certificate.recipientEmail}
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Certificate Type
                    </Label>
                    <p className="text-gray-900">{certificate.template.name}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Category
                    </Label>
                    <Badge variant="outline" className="capitalize">
                      {certificate.template.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Issuance Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Issuance Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Issue Date
                    </Label>
                    <p className="text-gray-900">
                      {formatDate(certificate.issueDate)}
                    </p>
                  </div>

                  {certificate.expiryDate && (
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        Expiry Date
                      </Label>
                      <p className="text-gray-900">
                        {formatDate(certificate.expiryDate)}
                      </p>
                    </div>
                  )}

                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Issued By
                    </Label>
                    <p className="text-gray-900">
                      {certificate.issuer.firstName}{" "}
                      {certificate.issuer.lastName}
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Verification ID
                    </Label>
                    <div className="flex items-center space-x-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                        {certificate.verificationId}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          navigator.clipboard.writeText(
                            certificate.verificationId
                          )
                        }
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Certificate Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>Certificate Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="aspect-[4/3] bg-white border border-gray-200 rounded-lg overflow-hidden">
                    {certificate.pngPath ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={certificate.pngPath}
                          alt={`Certificate for ${certificate.recipientFirstName} ${certificate.recipientLastName}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <div className="text-center">
                          <Award className="w-12 h-12 mx-auto mb-2" />
                          <p>Certificate preview not available</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => handleDownload("pdf")}
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => handleDownload("png")}
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Image</span>
              </Button>

              <Button
                variant="outline"
                onClick={handleShare}
                className="flex items-center space-x-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </Button>

              <Button
                variant="outline"
                asChild
                className="flex items-center space-x-2"
              >
                <a
                  href={`/community/verify-certificate?id=${certificate.verificationId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Public Verification</span>
                </a>
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Public certificate verification component
export function CertificateVerificationLookup() {
  const [verificationId, setVerificationId] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleVerify = () => {
    if (verificationId.trim()) {
      setIsPreviewOpen(true);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Verify Certificate</CardTitle>
          <p className="text-center text-gray-600">
            Enter the verification ID to check certificate authenticity
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="verification-id">Verification ID</Label>
            <Input
              id="verification-id"
              placeholder="e.g., ABC-1234"
              value={verificationId}
              onChange={(e) => setVerificationId(e.target.value.toUpperCase())}
              className="text-center font-mono"
            />
          </div>

          <Button
            onClick={handleVerify}
            disabled={!verificationId.trim()}
            className="w-full"
          >
            <Shield className="w-4 h-4 mr-2" />
            Verify Certificate
          </Button>
        </CardContent>
      </Card>

      <CertificatePreview
        verificationId={verificationId}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
}
