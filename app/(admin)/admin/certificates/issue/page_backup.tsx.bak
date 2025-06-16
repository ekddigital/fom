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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Eye, User, Calendar, Upload } from "lucide-react";
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

  // Single certificate form data
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientEmail: "",
    authorizingOfficial: "",
    issueDate: new Date().toISOString().split("T")[0],
    customFields: {} as Record<string, unknown>,
    securityLevel: "STANDARD",
    validityPeriod: null as number | null,
    notes: "",
  });
  // Bulk upload state
  const [activeTab, setActiveTab] = useState<"single" | "bulk">("single");
  const [isBulkCreating, setIsBulkCreating] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileColumns, setFileColumns] = useState<string[]>([]);
  const [fileData, setFileData] = useState<string[][]>([]);
  const [selectedNameColumn, setSelectedNameColumn] = useState("");
  const [selectedEmailColumn, setSelectedEmailColumn] = useState("");
  const [bulkAuthorizingOfficial, setBulkAuthorizingOfficial] = useState("");
  const [bulkIssueDate, setBulkIssueDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [bulkNotes, setBulkNotes] = useState("");
  const [bulkSecurityLevel, setBulkSecurityLevel] = useState<"BASIC" | "STANDARD" | "HIGH">("STANDARD");
  const [bulkValidityPeriod, setBulkValidityPeriod] = useState<number | null>(null);

  const loadTemplate = useCallback(
    async (id: string) => {
      try {
        const response = await fetch(`/api/certificates/templates/${id}`);
        if (response.ok) {
          const templateData = await response.json();
          setTemplate(templateData);
        } else if (response.status === 404) {
          toast.info("Initializing database with default templates...");

          try {
            const initResponse = await fetch("/api/admin/initialize-database", {
              method: "POST",
            });

            if (initResponse.ok) {
              toast.success("Database initialized successfully");
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
          authorizingOfficial: formData.authorizingOfficial,
          issueDate: formData.issueDate,
          customFields: formData.customFields,
          securityLevel: formData.securityLevel,
          validityPeriod: formData.validityPeriod,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Certificate issued successfully!");
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
    const params = new URLSearchParams({
      template: templateId || "",
      recipientName: formData.recipientName || "Sample Recipient",
      authorizingOfficial:
        formData.authorizingOfficial ||
        session?.user?.name ||
        "System Administrator",
      issueDate: formData.issueDate,
    });

    Object.entries(formData.customFields).forEach(([key, value]) => {
      if (value) {
        params.append(`customField_${key}`, value.toString());
      }
    });

    window.open(`/admin/certificates/preview?${params.toString()}`, "_blank");
  };

  // Bulk upload functions
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result as string;
        let parsedData: string[][];

        if (file.name.endsWith(".csv")) {
          const lines = data.split("\n").filter((line) => line.trim());
          parsedData = lines.map((line) => {
            const result: string[] = [];
            let current = "";
            let inQuotes = false;

            for (let i = 0; i < line.length; i++) {
              const char = line[i];
              if (char === '"') {
                inQuotes = !inQuotes;
              } else if (char === "," && !inQuotes) {
                result.push(current.trim());
                current = "";
              } else {
                current += char;
              }
            }
            result.push(current.trim());
            return result.map((cell) => cell.replace(/^"|"$/g, ""));
          });
        } else {
          toast.error(
            "Excel files not fully supported yet. Please use CSV format."
          );
          return;
        }

        if (parsedData.length > 0) {
          const headers = parsedData[0].map(
            (header, index) => header || `Column ${index + 1}`
          );
          setFileColumns(headers);
          setFileData(parsedData.slice(1));

          const nameCol =
            headers.find(
              (h) =>
                h?.toLowerCase().includes("name") ||
                h?.toLowerCase().includes("recipient")
            ) || headers[0];
          const emailCol =
            headers.find(
              (h) =>
                h?.toLowerCase().includes("email") ||
                h?.toLowerCase().includes("mail")
            ) || headers[1];

          setSelectedNameColumn(nameCol || "");
          setSelectedEmailColumn(emailCol || "");

          toast.success(
            `File uploaded successfully! Found ${parsedData.length - 1} rows.`
          );
        }
      } catch (error) {
        console.error("Error parsing file:", error);
        toast.error("Error parsing file. Please check the format.");
      }
    };

    reader.readAsText(file);
  };
  const handleBulkCreateCertificates = async () => {
    if (!template || !fileData.length || !selectedNameColumn || !selectedEmailColumn) {
      toast.error("Please ensure template is loaded, file is uploaded, and columns are selected");
      return;
    }

    setIsBulkCreating(true);

    try {
      const nameColumnIndex = fileColumns.findIndex(
        (col) => col === selectedNameColumn
      );
      const emailColumnIndex = fileColumns.findIndex(
        (col) => col === selectedEmailColumn
      );

      if (nameColumnIndex === -1 || emailColumnIndex === -1) {
        toast.error("Selected columns not found in the data");
        return;
      }

      const batchSize = 5;
      const totalBatches = Math.ceil(fileData.length / batchSize);
      let successCount = 0;
      let errorCount = 0;

      for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
        const startIndex = batchIndex * batchSize;
        const endIndex = Math.min(startIndex + batchSize, fileData.length);
        const batch = fileData.slice(startIndex, endIndex);

        const batchPromises = batch.map(async (row, rowIndex) => {
          const recipientName = row[nameColumnIndex]?.trim();
          const recipientEmail = row[emailColumnIndex]?.trim();

          if (!recipientName || !recipientEmail) {
            console.warn(
              `Skipping row ${startIndex + rowIndex + 1}: Missing name or email`
            );
            errorCount++;
            return null;
          }          try {
            const certificateData = {
              templateName: template.name, // Use template name instead of templateId
              recipientName,
              recipientEmail,
              authorizingOfficial:
                bulkAuthorizingOfficial.trim() ||
                session?.user?.name ||
                "System Administrator",
              issueDate: bulkIssueDate,
              customFields: {},
              securityLevel: bulkSecurityLevel,
              validityPeriod: bulkValidityPeriod,
              notes: bulkNotes.trim() || undefined,
            };

            const response = await fetch("/api/certificates/issue", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(certificateData),
            });

            if (response.ok) {
              successCount++;
              return true;
            } else {
              const error = await response.json();
              console.error(
                `Failed to create certificate for ${recipientName}:`,
                error
              );
              errorCount++;
              return false;
            }
          } catch (error) {
            console.error(
              `Error creating certificate for ${recipientName}:`,
              error
            );
            errorCount++;
            return false;
          }
        });

        await Promise.all(batchPromises);

        toast.info(
          `Progress: ${Math.min(endIndex, fileData.length)}/${
            fileData.length
          } certificates processed`
        );
      }

      if (successCount > 0) {
        toast.success(
          `Successfully created ${successCount} certificate(s)${
            errorCount > 0 ? ` (${errorCount} failed)` : ""
          }`
        );
      } else {
        toast.error("No certificates were created successfully");
      }

      if (errorCount === 0) {
        setFileData([]);
        setFileColumns([]);
        setUploadedFile(null);
        setSelectedNameColumn("");
        setSelectedEmailColumn("");
      }

      setTimeout(() => {
        router.push("/admin/certificates?tab=issued");
      }, 2000);
    } catch (error) {
      console.error("Error in bulk certificate creation:", error);
      toast.error("Failed to create certificates");
    } finally {
      setIsBulkCreating(false);
    }
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
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "single" | "bulk")}
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="single" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Single Certificate
            </TabsTrigger>
            <TabsTrigger value="bulk" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Bulk Upload
            </TabsTrigger>
          </TabsList>

          {/* Single Certificate Tab */}
          <TabsContent value="single">
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
                          handleInputChange(
                            "authorizingOfficial",
                            e.target.value
                          )
                        }
                        placeholder={`Enter authorizing official (default: ${
                          session?.user?.name || "System Administrator"
                        })`}
                        className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        The person or title that authorizes this certificate
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
                        <SelectContent>
                          <SelectItem value="BASIC">Basic (QR Code)</SelectItem>
                          <SelectItem value="STANDARD">
                            Standard (QR + Signature)
                          </SelectItem>
                          <SelectItem value="HIGH">
                            High (Full Security Suite)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="validityPeriod">
                        Certificate Validity
                      </Label>
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
                        <SelectContent>
                          <SelectItem value="never">Never Expires</SelectItem>
                          <SelectItem value="30">30 Days</SelectItem>
                          <SelectItem value="90">90 Days (3 Months)</SelectItem>
                          <SelectItem value="180">
                            180 Days (6 Months)
                          </SelectItem>
                          <SelectItem value="365">365 Days (1 Year)</SelectItem>
                          <SelectItem value="730">
                            730 Days (2 Years)
                          </SelectItem>
                          <SelectItem value="1095">
                            1095 Days (3 Years)
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
                        onChange={(e) =>
                          handleInputChange("notes", e.target.value)
                        }
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
                    <div>
                      <Label htmlFor="achievement">Achievement/Course</Label>
                      <Input
                        id="achievement"
                        value={
                          (formData.customFields.achievement as string) || ""
                        }
                        onChange={(e) =>
                          handleCustomFieldChange("achievement", e.target.value)
                        }
                        placeholder="e.g., Leadership Training Program"
                        className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="serviceYears">Years of Service</Label>
                      <Input
                        id="serviceYears"
                        type="number"
                        value={
                          (formData.customFields.serviceYears as string) || ""
                        }
                        onChange={(e) =>
                          handleCustomFieldChange(
                            "serviceYears",
                            e.target.value
                          )
                        }
                        placeholder="e.g., 5"
                        className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="department">Department/Ministry</Label>
                      <Input
                        id="department"
                        value={
                          (formData.customFields.department as string) || ""
                        }
                        onChange={(e) =>
                          handleCustomFieldChange("department", e.target.value)
                        }
                        placeholder="e.g., Youth Ministry"
                        className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="specialRecognition">
                        Special Recognition
                      </Label>
                      <Textarea
                        id="specialRecognition"
                        value={
                          (formData.customFields
                            .specialRecognition as string) || ""
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
                      The certificate will be generated with unique ID and
                      security features
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>          {/* Bulk Upload Tab */}
          <TabsContent value="bulk">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Bulk Upload Form */}
              <div className="space-y-6">
                {/* Template Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-blue-600" />
                      Certificate Template
                    </CardTitle>
                    <CardDescription>
                      Selected template for bulk certificate issuance
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

                {/* File Upload */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5 text-blue-600" />
                      Upload CSV File
                    </CardTitle>
                    <CardDescription>
                      Upload a file containing recipient information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                  <div>
                    <Label htmlFor="fileUpload">Upload CSV File</Label>
                    <Input
                      id="fileUpload"
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Please ensure the file is in CSV format with columns for
                      recipient name and email.
                    </p>
                  </div>

                  {fileColumns.length > 0 && (
                    <>
                      <div>
                        <Label htmlFor="nameColumn">Name Column</Label>
                        <Select
                          value={selectedNameColumn}
                          onValueChange={setSelectedNameColumn}
                        >
                          <SelectTrigger className="mt-1 bg-white border-gray-300">
                            <SelectValue placeholder="Select name column" />
                          </SelectTrigger>
                          <SelectContent>
                            {fileColumns.map((col) => (
                              <SelectItem key={col} value={col}>
                                {col}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="emailColumn">Email Column</Label>
                        <Select
                          value={selectedEmailColumn}
                          onValueChange={setSelectedEmailColumn}
                        >
                          <SelectTrigger className="mt-1 bg-white border-gray-300">
                            <SelectValue placeholder="Select email column" />
                          </SelectTrigger>
                          <SelectContent>
                            {fileColumns.map((col) => (
                              <SelectItem key={col} value={col}>
                                {col}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  <div>
                    <Label htmlFor="authorizingOfficialBulk">
                      Authorizing Official
                    </Label>
                    <Input
                      id="authorizingOfficialBulk"
                      value={bulkAuthorizingOfficial}
                      onChange={(e) =>
                        setBulkAuthorizingOfficial(e.target.value)
                      }
                      placeholder={`Enter authorizing official (default: ${
                        session?.user?.name || "System Administrator"
                      })`}
                      className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="issueDateBulk">Issue Date</Label>
                    <Input
                      id="issueDateBulk"
                      type="date"
                      value={bulkIssueDate}
                      onChange={(e) => setBulkIssueDate(e.target.value)}
                      className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>                  <div>
                    <Label htmlFor="notesBulk">Additional Notes</Label>
                    <Textarea
                      id="notesBulk"
                      value={bulkNotes}
                      onChange={(e) => setBulkNotes(e.target.value)}
                      placeholder="Optional notes for bulk certificates"
                      rows={3}
                      className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  {/* Certificate Settings for Bulk */}
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">
                      Certificate Settings
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="securityLevelBulk">Security Level</Label>
                        <Select
                          value={bulkSecurityLevel}
                          onValueChange={(value: "BASIC" | "STANDARD" | "HIGH") =>
                            setBulkSecurityLevel(value)
                          }
                        >
                          <SelectTrigger className="mt-1 bg-white border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BASIC">Basic</SelectItem>
                            <SelectItem value="STANDARD">Standard</SelectItem>
                            <SelectItem value="HIGH">High</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-gray-500 mt-1">
                          Higher security levels include additional verification
                          features
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="validityPeriodBulk">
                          Validity Period (Days)
                        </Label>
                        <Input
                          id="validityPeriodBulk"
                          type="number"
                          min="1"
                          max="3650"
                          value={bulkValidityPeriod?.toString() || ""}
                          onChange={(e) =>
                            setBulkValidityPeriod(
                              e.target.value ? parseInt(e.target.value) : null
                            )
                          }
                          placeholder="Leave empty for no expiration"
                          className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Leave empty for certificates that never expire
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleBulkCreateCertificates}
                      disabled={
                        isBulkCreating ||
                        !uploadedFile ||
                        !selectedNameColumn ||
                        !selectedEmailColumn
                      }
                      className="flex-1 bg-red-600 hover:bg-red-700"
                    >
                      {isBulkCreating ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : (
                        <Send className="h-4 w-4 mr-2" />
                      )}
                      {isBulkCreating
                        ? "Processing... Please wait"
                        : "Issue Bulk Certificates"}
                    </Button>
                  </div>

                  {/* File Preview */}
                  {uploadedFile && fileData.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-2">
                        File Preview ({fileData.length} rows)
                      </h4>
                      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                        <div
                          className="grid gap-4 bg-gray-50 px-4 py-2 border-b"
                          style={{
                            gridTemplateColumns: `repeat(${fileColumns.length}, 1fr)`,
                          }}
                        >
                          {fileColumns.map((col) => (
                            <div
                              key={col}
                              className="text-sm font-medium text-gray-700"
                            >
                              {col}
                            </div>
                          ))}
                        </div>
                        {fileData.slice(0, 5).map((row, rowIndex) => (
                          <div
                            key={rowIndex}
                            className={`grid gap-4 px-4 py-2 ${
                              rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }`}
                            style={{
                              gridTemplateColumns: `repeat(${fileColumns.length}, 1fr)`,
                            }}
                          >
                            {row.map((cell, cellIndex) => (
                              <div
                                key={cellIndex}
                                className="text-sm text-gray-900 truncate"
                              >
                                {cell}
                              </div>
                            ))}
                          </div>
                        ))}
                        {fileData.length > 5 && (
                          <div className="px-4 py-2 text-sm text-gray-500 text-center border-t">
                            ...and {fileData.length - 5} more rows
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
