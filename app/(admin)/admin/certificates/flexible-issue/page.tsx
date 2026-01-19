"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import {
  ArrowLeft,
  Send,
  Eye,
  User,
  Calendar,
  Award,
  Palette,
} from "lucide-react";
import { toast } from "sonner";
import {
  CertificateType,
  DesignTemplate,
} from "@/lib/utils/certificate-design-system";

export default function FlexibleIssueCertificatePage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [certificateTypes, setCertificateTypes] = useState<CertificateType[]>(
    []
  );
  const [designTemplates, setDesignTemplates] = useState<DesignTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    certificateTypeId: "",
    designTemplateId: "",
    recipientName: "",
    recipientEmail: "",
    customFields: {} as Record<string, unknown>,
    securityLevel: "STANDARD",
    validityPeriod: null as number | null, // null = never expires, number = days until expiry
    notes: "",
  });

  // Load design system options
  useEffect(() => {
    loadDesignSystemOptions();
  }, []);

  const loadDesignSystemOptions = async () => {
    try {
      const response = await fetch("/api/certificates/flexible-issue");
      if (response.ok) {
        const data = await response.json();
        setCertificateTypes(data.certificateTypes);
        setDesignTemplates(data.designTemplates);

        // Set default selections
        if (data.certificateTypes.length > 0) {
          setFormData((prev) => ({
            ...prev,
            certificateTypeId: data.certificateTypes[0].id,
          }));
        }
        if (data.designTemplates.length > 0) {
          setFormData((prev) => ({
            ...prev,
            designTemplateId: data.designTemplates[0].id,
          }));
        }
      } else {
        toast.error("Failed to load design system options");
      }
    } catch (error) {
      console.error("Error loading design system options:", error);
      toast.error("Failed to load design system options");
    }
  };

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

  const handlePreview = () => {
    // Navigate to the dedicated preview page with design system parameters
    const params = new URLSearchParams({
      certificateType: formData.certificateTypeId,
      designTemplate: formData.designTemplateId,
      recipientName: formData.recipientName || "Sample Recipient",
      issuerName: session?.user?.name || "System Administrator",
    });

    // Add custom fields if they exist
    Object.entries(formData.customFields).forEach(([key, value]) => {
      if (value) {
        params.append(`customField_${key}`, value.toString());
      }
    });

    window.open(
      `/admin/certificates/flexible-preview?${params.toString()}`,
      "_blank"
    );
  };

  const handleIssue = async () => {
    if (!formData.recipientName || !formData.recipientEmail) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.certificateTypeId || !formData.designTemplateId) {
      toast.error("Please select certificate type and design template");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/certificates/flexible-issue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Certificate issued successfully!");

        // Show verification URL
        if (result.certificate.verificationUrl) {
          navigator.clipboard.writeText(result.certificate.verificationUrl);
          toast.info("Verification URL copied to clipboard");
        }

        router.push("/admin/certificates");
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

  const selectedCertificateType = certificateTypes.find(
    (type) => type.id === formData.certificateTypeId
  );

  const selectedDesignTemplate = designTemplates.find(
    (template) => template.id === formData.designTemplateId
  );

  if (certificateTypes.length === 0 || designTemplates.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading design system...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
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
              Issue Flexible Certificate
            </h1>
            <p className="text-gray-600">
              Mix and match certificate types with any visual design
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Design Selection */}
          <div className="space-y-6">
            {/* Certificate Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  Certificate Type
                </CardTitle>
                <CardDescription>
                  Choose the purpose and content of the certificate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="certificateType">Certificate Type *</Label>
                  <Select
                    value={formData.certificateTypeId}
                    onValueChange={(value) =>
                      handleInputChange("certificateTypeId", value)
                    }
                  >
                    <SelectTrigger className="mt-1 bg-white border-gray-300">
                      <SelectValue placeholder="Select certificate type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg max-h-60">
                      {certificateTypes.map((type) => (
                        <SelectItem
                          key={type.id}
                          value={type.id}
                          className="hover:bg-blue-50 focus:bg-blue-50 cursor-pointer"
                        >
                          <div className="flex flex-col items-start py-1">
                            <span className="font-medium text-gray-900">
                              {type.name}
                            </span>
                            <span className="text-sm text-gray-600">
                              {type.category} • ID: {type.idPrefix}-XXXX
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCertificateType && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-1">
                      {selectedCertificateType.name}
                    </h4>
                    <p className="text-sm text-blue-800">
                      {selectedCertificateType.description}
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      {selectedCertificateType.category}
                    </Badge>
                  </div>
                )}

                {/* Custom Fields for Certificate Type */}
                {selectedCertificateType?.customFields?.map((field) => (
                  <div key={field.id}>
                    <Label htmlFor={field.id}>
                      {field.label} {field.required && "*"}
                    </Label>
                    {field.type === "text" && (
                      <Input
                        id={field.id}
                        value={String(formData.customFields[field.id] || "")}
                        onChange={(e) =>
                          handleCustomFieldChange(field.id, e.target.value)
                        }
                        className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    )}
                    {field.type === "textarea" && (
                      <Textarea
                        id={field.id}
                        value={String(formData.customFields[field.id] || "")}
                        onChange={(e) =>
                          handleCustomFieldChange(field.id, e.target.value)
                        }
                        className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    )}
                    {field.type === "date" && (
                      <Input
                        id={field.id}
                        type="date"
                        value={String(formData.customFields[field.id] || "")}
                        onChange={(e) =>
                          handleCustomFieldChange(field.id, e.target.value)
                        }
                        className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    )}
                    {field.type === "select" && field.options && (
                      <Select
                        value={String(formData.customFields[field.id] || "")}
                        onValueChange={(value) =>
                          handleCustomFieldChange(field.id, value)
                        }
                      >
                        <SelectTrigger className="mt-1 bg-white border-gray-300">
                          <SelectValue
                            placeholder={`Select ${field.label.toLowerCase()}`}
                          />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg max-h-48">
                          {field.options.map((option) => (
                            <SelectItem
                              key={option}
                              value={option}
                              className="hover:bg-gray-50 focus:bg-gray-50 cursor-pointer"
                            >
                              <span className="text-gray-900">{option}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Design Template Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-purple-600" />
                  Visual Design
                </CardTitle>
                <CardDescription>
                  Choose the visual layout and styling
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="designTemplate">Design Template *</Label>
                  <Select
                    value={formData.designTemplateId}
                    onValueChange={(value) =>
                      handleInputChange("designTemplateId", value)
                    }
                  >
                    <SelectTrigger className="mt-1 bg-white border-gray-300">
                      <SelectValue placeholder="Select design template" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg max-h-60">
                      {designTemplates.map((template) => (
                        <SelectItem
                          key={template.id}
                          value={template.id}
                          className="hover:bg-purple-50 focus:bg-purple-50 cursor-pointer"
                        >
                          <div className="flex flex-col items-start py-1">
                            <span className="font-medium text-gray-900">
                              {template.name}
                            </span>
                            <span className="text-sm text-gray-600">
                              {template.style} • {template.difficulty}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedDesignTemplate && (
                  <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-1">
                      {selectedDesignTemplate.name}
                    </h4>
                    <p className="text-sm text-purple-800">
                      {selectedDesignTemplate.description}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">
                        {selectedDesignTemplate.style}
                      </Badge>
                      <Badge variant="outline">
                        {selectedDesignTemplate.difficulty}
                      </Badge>
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <Button
                    onClick={handlePreview}
                    variant="outline"
                    className="w-full"
                    disabled={
                      !formData.certificateTypeId || !formData.designTemplateId
                    }
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Design
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Recipient & Settings */}
          <div className="space-y-6">
            {/* Recipient Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-green-600" />
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
              </CardContent>
            </Card>

            {/* Certificate Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  Certificate Settings
                </CardTitle>
                <CardDescription>
                  Configure security and validity options
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
                      <SelectValue />
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
                          High (All Security Features)
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="validityPeriod">Validity Period</Label>
                  <Select
                    value={formData.validityPeriod?.toString() || "never"}
                    onValueChange={(value) =>
                      handleInputChange(
                        "validityPeriod",
                        value === "never" ? null : parseInt(value)
                      )
                    }
                  >
                    <SelectTrigger className="mt-1 bg-white border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                      <SelectItem
                        value="never"
                        className="hover:bg-green-50 focus:bg-green-50 cursor-pointer"
                      >
                        <span className="text-gray-900">Never Expires</span>
                      </SelectItem>
                      <SelectItem
                        value="365"
                        className="hover:bg-blue-50 focus:bg-blue-50 cursor-pointer"
                      >
                        <span className="text-gray-900">1 Year</span>
                      </SelectItem>
                      <SelectItem
                        value="730"
                        className="hover:bg-blue-50 focus:bg-blue-50 cursor-pointer"
                      >
                        <span className="text-gray-900">2 Years</span>
                      </SelectItem>
                      <SelectItem
                        value="1095"
                        className="hover:bg-blue-50 focus:bg-blue-50 cursor-pointer"
                      >
                        <span className="text-gray-900">3 Years</span>
                      </SelectItem>
                      <SelectItem
                        value="1825"
                        className="hover:bg-blue-50 focus:bg-blue-50 cursor-pointer"
                      >
                        <span className="text-gray-900">5 Years</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Add any additional notes or comments"
                    className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Issue Button */}
            <Button
              onClick={handleIssue}
              disabled={
                loading || !formData.recipientName || !formData.recipientEmail
              }
              className="w-full h-12 text-lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Issuing Certificate...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Issue Certificate
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
