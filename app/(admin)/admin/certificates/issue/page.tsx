"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Eye, User, Calendar } from "lucide-react";
import { toast } from "sonner";

interface CertificateTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  templateData: Record<string, unknown>;
  isActive: boolean;
}

export default function IssueCertificatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const templateId = searchParams.get("template");

  const [template, setTemplate] = useState<CertificateTemplate | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientEmail: "",
    authorizingOfficial: "", // New field for authorizing official (like "Hetawk", "Executive Director", etc.)
    issueDate: new Date().toISOString().split("T")[0], // Default to today's date in YYYY-MM-DD format
    customFields: {} as Record<string, unknown>,
    securityLevel: "STANDARD",
    validityPeriod: null as number | null, // null = never expires, number = days until expiry
    notes: "",
  });

  const loadTemplate = useCallback(
    async (id: string) => {
      try {
        const response = await fetch(`/api/certificates/templates/${id}`);
        if (response.ok) {
          const templateData = await response.json();
          setTemplate(templateData);
        } else if (response.status === 404) {
          // Template not found, try to initialize database first
          toast.info("Initializing database with default templates...");

          try {
            const initResponse = await fetch("/api/admin/initialize-database", {
              method: "POST",
            });

            if (initResponse.ok) {
              toast.success("Database initialized successfully");
              // Try loading the template again
              const retryResponse = await fetch(
                `/api/certificates/templates/${id}`
              );
              if (retryResponse.ok) {
                const templateData = await retryResponse.json();
                setTemplate(templateData);
                return;
              }
            }
          } catch (initError) {
            console.error("Error initializing database:", initError);
          }

          toast.error("Failed to load certificate template");
          router.push("/admin/certificates");
        } else {
          toast.error("Failed to load certificate template");
          router.push("/admin/certificates");
        }
      } catch (error) {
        console.error("Error loading template:", error);
        toast.error("Failed to load certificate template");
        router.push("/admin/certificates");
      }
    },
    [router]
  );

  // Load template data
  useEffect(() => {
    if (templateId) {
      loadTemplate(templateId);
    }
  }, [templateId, loadTemplate]);

  const handleInputChange = (field: string, value: string | number | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCustomFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      customFields: {
        ...prev.customFields,
        [field]: value,
      },
    }));
  };

  const handleIssueCertificate = async () => {
    if (!formData.recipientName || !formData.recipientEmail) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/certificates/issue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateName: template?.name,
          recipientName: formData.recipientName,
          recipientEmail: formData.recipientEmail,
          authorizingOfficial: formData.authorizingOfficial, // Include authorizing official in submission
          issueDate: formData.issueDate, // Include custom issue date
          customFields: formData.customFields,
          securityLevel: formData.securityLevel,
          validityPeriod: formData.validityPeriod,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Certificate issued successfully!");

        // Redirect to certificate view or back to certificates list
        router.push(`/admin/certificates?issued=${result.certificate.id}`);
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to issue certificate");
      }
    } catch (error) {
      console.error("Error issuing certificate:", error);
      toast.error("Failed to issue certificate");
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    // Navigate to the dedicated preview page
    const params = new URLSearchParams({
      template: templateId || "",
      recipientName: formData.recipientName || "Sample Recipient",
      authorizingOfficial:
        formData.authorizingOfficial ||
        session?.user?.name ||
        "System Administrator",
      issueDate: formData.issueDate, // Include custom issue date in preview
    });

    // Add custom fields if they exist
    Object.entries(formData.customFields).forEach(([key, value]) => {
      if (value) {
        params.append(`customField_${key}`, value.toString());
      }
    });

    window.open(`/admin/certificates/preview?${params.toString()}`, "_blank");
  };

  if (!template) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading template...</p>
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
                Issue Certificate
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Issue a new certificate using the selected template
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
            {template.category}
          </Badge>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Template Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-600" />
                  Certificate Template
                </CardTitle>
                <CardDescription>
                  Selected template for certificate issuance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {template.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreview}
                    className="w-full mt-3"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Template
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recipient Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Recipient Information
                </CardTitle>
                <CardDescription>
                  Enter the details of the certificate recipient
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="recipientName">Recipient Name *</Label>
                  <Input
                    id="recipientName"
                    value={formData.recipientName}
                    onChange={(e) =>
                      handleInputChange("recipientName", e.target.value)
                    }
                    placeholder="Enter full name"
                    className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="recipientEmail">Email Address *</Label>
                  <Input
                    id="recipientEmail"
                    type="email"
                    value={formData.recipientEmail}
                    onChange={(e) =>
                      handleInputChange("recipientEmail", e.target.value)
                    }
                    placeholder="Enter email address"
                    className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="authorizingOfficial">
                    Authorizing Official
                  </Label>
                  <Input
                    id="authorizingOfficial"
                    value={formData.authorizingOfficial}
                    onChange={(e) =>
                      handleInputChange("authorizingOfficial", e.target.value)
                    }
                    placeholder={`Enter authorizing official (default: ${
                      session?.user?.name || "System Administrator"
                    })`}
                    className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    The person or title that authorizes this certificate (e.g.,
                    &quot;Hetawk&quot;, &quot;Executive Director&quot;,
                    &quot;Pastor John Smith&quot;)
                  </p>
                </div>
                <div>
                  <Label htmlFor="issueDate">Issue Date</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) =>
                      handleInputChange("issueDate", e.target.value)
                    }
                    className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Select the date you want to appear on the certificate
                    (defaults to today)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Certificate Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Certificate Settings
                </CardTitle>
                <CardDescription>
                  Configure security and validity settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="securityLevel">Security Level</Label>
                  <Select
                    value={formData.securityLevel}
                    onValueChange={(value) =>
                      handleInputChange("securityLevel", value)
                    }
                  >
                    <SelectTrigger className="mt-1 bg-white border-gray-300">
                      <SelectValue placeholder="Select security level" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                      <SelectItem
                        value="BASIC"
                        className="hover:bg-green-50 focus:bg-green-50 cursor-pointer"
                      >
                        <span className="text-gray-900">Basic (QR Code)</span>
                      </SelectItem>
                      <SelectItem
                        value="STANDARD"
                        className="hover:bg-yellow-50 focus:bg-yellow-50 cursor-pointer"
                      >
                        <span className="text-gray-900">
                          Standard (QR + Signature)
                        </span>
                      </SelectItem>
                      <SelectItem
                        value="HIGH"
                        className="hover:bg-red-50 focus:bg-red-50 cursor-pointer"
                      >
                        <span className="text-gray-900">
                          High (Full Security Suite)
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="validityPeriod">Certificate Validity</Label>
                  <Select
                    value={
                      formData.validityPeriod === null
                        ? "never"
                        : formData.validityPeriod.toString()
                    }
                    onValueChange={(value) =>
                      handleInputChange(
                        "validityPeriod",
                        value === "never" ? null : parseInt(value)
                      )
                    }
                  >
                    <SelectTrigger className="mt-1 bg-white border-gray-300">
                      <SelectValue placeholder="Select validity period" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg max-h-60">
                      <SelectItem
                        value="never"
                        className="hover:bg-green-50 focus:bg-green-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-900">
                            Never Expires (Recommended)
                          </span>
                        </div>
                      </SelectItem>
                      <SelectItem
                        value="30"
                        className="hover:bg-blue-50 focus:bg-blue-50 cursor-pointer"
                      >
                        <span className="text-gray-900">30 Days</span>
                      </SelectItem>
                      <SelectItem
                        value="90"
                        className="hover:bg-blue-50 focus:bg-blue-50 cursor-pointer"
                      >
                        <span className="text-gray-900">
                          90 Days (3 Months)
                        </span>
                      </SelectItem>
                      <SelectItem
                        value="180"
                        className="hover:bg-blue-50 focus:bg-blue-50 cursor-pointer"
                      >
                        <span className="text-gray-900">
                          180 Days (6 Months)
                        </span>
                      </SelectItem>
                      <SelectItem
                        value="365"
                        className="hover:bg-blue-50 focus:bg-blue-50 cursor-pointer"
                      >
                        <span className="text-gray-900">365 Days (1 Year)</span>
                      </SelectItem>
                      <SelectItem
                        value="730"
                        className="hover:bg-blue-50 focus:bg-blue-50 cursor-pointer"
                      >
                        <span className="text-gray-900">
                          730 Days (2 Years)
                        </span>
                      </SelectItem>
                      <SelectItem
                        value="1095"
                        className="hover:bg-blue-50 focus:bg-blue-50 cursor-pointer"
                      >
                        <span className="text-gray-900">
                          1095 Days (3 Years)
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.validityPeriod === null
                      ? "This certificate will remain valid forever"
                      : `Certificate will expire in ${formData.validityPeriod} days`}
                  </p>
                </div>
                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Optional notes about this certificate"
                    rows={3}
                    className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Custom Fields & Actions */}
          <div className="space-y-6">
            {/* Custom Fields */}
            <Card>
              <CardHeader>
                <CardTitle>Custom Fields</CardTitle>
                <CardDescription>
                  Template-specific fields for personalization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Achievement/Course field */}
                <div>
                  <Label htmlFor="achievement">Achievement/Course</Label>
                  <Input
                    id="achievement"
                    value={(formData.customFields.achievement as string) || ""}
                    onChange={(e) =>
                      handleCustomFieldChange("achievement", e.target.value)
                    }
                    placeholder="e.g., Leadership Training Program"
                    className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                {/* Service Years */}
                <div>
                  <Label htmlFor="serviceYears">Years of Service</Label>
                  <Input
                    id="serviceYears"
                    type="number"
                    value={(formData.customFields.serviceYears as string) || ""}
                    onChange={(e) =>
                      handleCustomFieldChange("serviceYears", e.target.value)
                    }
                    placeholder="e.g., 5"
                    className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                {/* Department */}
                <div>
                  <Label htmlFor="department">Department/Ministry</Label>
                  <Input
                    id="department"
                    value={(formData.customFields.department as string) || ""}
                    onChange={(e) =>
                      handleCustomFieldChange("department", e.target.value)
                    }
                    placeholder="e.g., Youth Ministry"
                    className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                {/* Special Recognition */}
                <div>
                  <Label htmlFor="specialRecognition">
                    Special Recognition
                  </Label>
                  <Textarea
                    id="specialRecognition"
                    value={
                      (formData.customFields.specialRecognition as string) || ""
                    }
                    onChange={(e) =>
                      handleCustomFieldChange(
                        "specialRecognition",
                        e.target.value
                      )
                    }
                    placeholder="e.g., Outstanding leadership in community outreach"
                    rows={3}
                    className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Issue Certificate</CardTitle>
                <CardDescription>
                  Review and issue the certificate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">
                    Certificate Summary
                  </h4>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p>
                      <strong>Template:</strong> {template.name}
                    </p>
                    <p>
                      <strong>Recipient:</strong>{" "}
                      {formData.recipientName || "Not specified"}
                    </p>
                    <p>
                      <strong>Security:</strong> {formData.securityLevel}
                    </p>
                    <p>
                      <strong>Valid for:</strong>{" "}
                      {formData.validityPeriod === null
                        ? "Forever (Never expires)"
                        : `${formData.validityPeriod} days`}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={handlePreview}
                    className="w-full"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    onClick={handleIssueCertificate}
                    disabled={
                      loading ||
                      !formData.recipientName ||
                      !formData.recipientEmail
                    }
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    {loading ? "Issuing..." : "Issue Certificate"}
                  </Button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  The certificate will be generated with unique ID and security
                  features
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
