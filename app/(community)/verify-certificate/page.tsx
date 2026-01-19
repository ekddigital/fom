"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Search,
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Eye,
  Calendar,
  User,
} from "lucide-react";
import { useCertificates } from "@/lib/hooks/use-certificates";

interface CertificateDetails {
  id: string;
  verificationId: string;
  template: {
    id: string;
    name: string;
    category: string;
  };
  recipient: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  issueDate: Date;
  expiryDate?: Date;
  status: "active" | "revoked" | "expired";
  issuer: {
    id: string;
    firstName: string;
    lastName: string;
  };
  certificateData: Record<string, unknown>;
}

export default function CertificateVerificationPage() {
  const { verifyCertificate, loading: isLoading } = useCertificates();
  const [verificationId, setVerificationId] = useState("");
  const [certificate, setCertificate] = useState<CertificateDetails | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const handleVerification = async () => {
    if (!verificationId.trim()) {
      setError("Please enter a verification ID");
      return;
    }

    setError(null);
    setCertificate(null);

    try {
      const result = await verifyCertificate(verificationId.trim());

      if (result.valid) {
        setCertificate(result.certificate);
      } else {
        setError(result.message || "Certificate could not be verified");
        if (result.certificate) {
          setCertificate(result.certificate);
        }
      }
    } catch {
      setError(
        "An error occurred while verifying the certificate. Please try again."
      );
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "revoked":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "expired":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "revoked":
        return "bg-red-100 text-red-800";
      case "expired":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Certificate Verification
            </h1>
            <p className="text-gray-600">
              Enter a verification ID to verify the authenticity of a
              certificate issued by Fishers of Men.
            </p>
          </div>

          {/* Verification Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Verify Certificate</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="verification-id">Verification ID</Label>
                <Input
                  id="verification-id"
                  value={verificationId}
                  onChange={(e) => setVerificationId(e.target.value)}
                  placeholder="Enter verification ID (e.g., BSC001)"
                  className="font-mono"
                />
                <p className="text-sm text-gray-500">
                  The verification ID can be found on the certificate document.
                </p>
              </div>

              <Button
                onClick={handleVerification}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Verifying..." : "Verify Certificate"}
              </Button>
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <XCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Certificate Details */}
          {certificate && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <span className="text-green-800">Certificate Verified</span>
                  </div>
                  <Badge className={getStatusColor(certificate.status)}>
                    {certificate.status.toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Certificate Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Certificate Type
                      </Label>
                      <p className="text-lg font-semibold text-gray-900">
                        {certificate.template.name}
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Recipient
                      </Label>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {certificate.recipient.firstName}{" "}
                            {certificate.recipient.lastName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {certificate.recipient.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Verification ID
                      </Label>
                      <p className="font-mono text-lg font-bold text-blue-600">
                        {certificate.verificationId}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Issue Date
                      </Label>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <p className="text-gray-900">
                          {new Date(certificate.issueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {certificate.expiryDate && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Expiry Date
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <p className="text-gray-900">
                            {new Date(
                              certificate.expiryDate
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )}

                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Issued By
                      </Label>
                      <p className="text-gray-900">
                        {certificate.issuer.firstName}{" "}
                        {certificate.issuer.lastName}
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Status
                      </Label>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(certificate.status)}
                        <span className="capitalize font-medium">
                          {certificate.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Certificate Data */}
                {certificate.certificateData && (
                  <div className="border-t border-gray-200 pt-4">
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                      Certificate Details
                    </Label>
                    <div className="bg-white rounded-lg p-4 space-y-2">
                      {Object.entries(certificate.certificateData).map(
                        ([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-sm text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}:
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {value as string}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    View Certificate
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>

                {/* Verification Note */}
                <Alert className="border-blue-200 bg-blue-50">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    This certificate has been verified as authentic and was
                    issued by Fishers of Men. The verification was performed on{" "}
                    {new Date().toLocaleDateString()}.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}

          {/* Help Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-900">
                  Where to find the Verification ID?
                </h4>
                <p className="text-sm text-gray-600">
                  The verification ID is located at the bottom of your
                  certificate, usually in a QR code or as text.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">
                  Certificate not found?
                </h4>
                <p className="text-sm text-gray-600">
                  Double-check the verification ID for typos. If the issue
                  persists, contact us at{" "}
                  <a
                    href="mailto:certificates@fishersofmen.org"
                    className="text-blue-600 hover:underline"
                  >
                    certificates@fishersofmen.org
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
