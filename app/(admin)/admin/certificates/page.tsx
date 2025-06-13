"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Award,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  Search,
  Filter,
  FileText,
  Users,
  BarChart3,
  RefreshCw,
  X,
  CheckSquare,
  Square,
} from "lucide-react";
import { TemplateData } from "@/lib/utils/certificate";
import { useRouter } from "next/navigation";
import { CertificatePreviewModal } from "@/components/ui/features/certificate-preview-modal";
import { FormatSelectionDialog } from "@/components/ui/format-selection-dialog";
import { toast } from "sonner";

type CertificateTemplate = {
  id: string;
  name: string;
  description: string;
  category: string;
  typeCode: string;
  isActive?: boolean;
  certificatesIssued?: number;
  createdAt?: string;
  template?: TemplateData; // The actual template data from database
};

type IssuedCertificate = {
  id: string;
  templateId: string;
  templateName: string;
  templateCategory: string;
  recipientName: string;
  recipientEmail: string;
  verificationId: string;
  issueDate: string;
  issuedAt: string;
  validFrom?: string;
  validUntil?: string;
  status: string;
  additionalData?: Record<string, unknown>;
};

export default function AdminCertificatesPage() {
  const [activeTab, setActiveTab] = useState("templates");
  const [isIssueCertificateOpen, setIsIssueCertificateOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<CertificateTemplate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [certificateTemplates, setCertificateTemplates] = useState<
    CertificateTemplate[]
  >([]);
  const [issuedCertificates, setIssuedCertificates] = useState<
    IssuedCertificate[]
  >([]);
  const [filteredCertificates, setFilteredCertificates] = useState<
    IssuedCertificate[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingIssued, setLoadingIssued] = useState(false);
  const [highlightedCertificateId, setHighlightedCertificateId] = useState<
    string | null
  >(null);

  // Bulk selection state
  const [selectedCertificates, setSelectedCertificates] = useState<Set<string>>(
    new Set()
  );
  const [isAllSelected, setIsAllSelected] = useState(false);

  // Download format selection
  const [showFormatDialog, setShowFormatDialog] = useState(false);
  const [pendingDownloadCertificate, setPendingDownloadCertificate] =
    useState<IssuedCertificate | null>(null);
  const [isBulkDownload, setIsBulkDownload] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Check for issued certificate ID in URL parameters
  useEffect(() => {
    const issuedId = searchParams.get("issued");
    if (issuedId) {
      setHighlightedCertificateId(issuedId);
      setActiveTab("issued");
      // Clear the URL parameter after 5 seconds
      setTimeout(() => {
        setHighlightedCertificateId(null);
      }, 5000);
    }
  }, [searchParams]);

  // Clear selection when filtered certificates change
  useEffect(() => {
    setSelectedCertificates(new Set());
    setIsAllSelected(false);
  }, [filteredCertificates]);

  // Load templates from database
  useEffect(() => {
    loadTemplates();
  }, []);

  // Load issued certificates when switching to issued tab
  useEffect(() => {
    if (activeTab === "issued") {
      loadIssuedCertificates();
    }
  }, [activeTab]);

  // Filter certificates based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCertificates(issuedCertificates);
    } else {
      const filtered = issuedCertificates.filter(
        (cert) =>
          cert.recipientName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          cert.recipientEmail
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          cert.verificationId
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          cert.templateName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCertificates(filtered);
    }
  }, [searchQuery, issuedCertificates]);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/certificates/template-options");
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Add mock data for display purposes
          const templatesWithMockData = data.templates.map(
            (template: CertificateTemplate) => ({
              ...template,
              isActive: true,
              certificatesIssued: Math.floor(Math.random() * 50), // Mock issued count for demo
              createdAt: "2024-12-01", // Mock creation date
            })
          );
          setCertificateTemplates(templatesWithMockData);
        } else {
          toast.error("Failed to load templates");
        }
      } else {
        toast.error("Failed to load templates");
      }
    } catch (error) {
      console.error("Error loading templates:", error);
      toast.error("Failed to load templates");
    } finally {
      setLoading(false);
    }
  };

  const loadIssuedCertificates = async () => {
    try {
      setLoadingIssued(true);
      const response = await fetch("/api/certificates/issued");
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setIssuedCertificates(data.certificates);
          setFilteredCertificates(data.certificates);
        } else {
          toast.error("Failed to load issued certificates");
        }
      } else {
        toast.error("Failed to load issued certificates");
      }
    } catch (error) {
      console.error("Error loading issued certificates:", error);
      toast.error("Failed to load issued certificates");
    } finally {
      setLoadingIssued(false);
    }
  };

  // Handler functions
  const handleUseTemplate = (template: CertificateTemplate) => {
    // Navigate to certificate issue page with the template
    router.push(`/admin/certificates/issue?template=${template.id}`);
  };

  const handlePreviewTemplate = (template: CertificateTemplate) => {
    // Navigate to the new preview page instead of using modal
    router.push(
      `/admin/certificates/preview?template=${template.id}&recipientName=Sample+Recipient`
    );
  };

  const handleEditTemplate = (template: CertificateTemplate) => {
    // Navigate to template builder with the template loaded
    router.push(`/admin/certificates/builder?template=${template.id}`);
  };

  const handleDeleteTemplate = (template: CertificateTemplate) => {
    if (confirm(`Are you sure you want to delete "${template.name}"?`)) {
      // TODO: Implement delete functionality
      alert("Delete functionality to be implemented");
    }
  };

  const handleCreateNewTemplate = () => {
    // Navigate to template builder for creating new template
    router.push("/admin/certificates/builder");
  };

  const handleSelectTemplateForIssue = (templateId: string) => {
    // Navigate to certificate issue page with the selected template
    router.push(`/admin/certificates/issue?template=${templateId}`);
  };

  // Handler functions for issued certificates
  const handlePreviewCertificate = (certificate: IssuedCertificate) => {
    // Navigate to the preview page with the issued certificate data
    router.push(
      `/admin/certificates/flexible-preview?certificateId=${certificate.id}`
    );
  };

  const handleDownloadCertificate = async (
    certificate: IssuedCertificate,
    format: "pdf" | "png" = "pdf"
  ) => {
    try {
      const response = await fetch(
        `/api/certificates/${certificate.id}/download?format=${format}`
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${
          certificate.templateName
        }-${certificate.recipientName.replace(/\s+/g, "-")}.${format}`;
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
          if (errorData.viewUrl) {
            toast.error(
              `${format.toUpperCase()} not available. Use the view button to see the certificate.`,
              {
                duration: 5000,
              }
            );
          } else {
            toast.error(
              errorData.message ||
                `Failed to download certificate as ${format.toUpperCase()}`
            );
          }
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

  // Handler to open format selection dialog for single certificate
  const handleDownloadRequest = (certificate: IssuedCertificate) => {
    setPendingDownloadCertificate(certificate);
    setIsBulkDownload(false);
    setShowFormatDialog(true);
  };

  // Handler to open format selection dialog for bulk download
  const handleBulkDownloadRequest = () => {
    if (selectedCertificates.size === 0) {
      toast.error("No certificates selected for download");
      return;
    }
    setIsBulkDownload(true);
    setShowFormatDialog(true);
  };

  // Handle format selection for downloads
  const handleFormatSelection = async (format: "pdf" | "png") => {
    setShowFormatDialog(false);

    if (isBulkDownload) {
      await handleBulkDownload(format);
    } else if (pendingDownloadCertificate) {
      await handleDownloadCertificate(pendingDownloadCertificate, format);
    }

    setPendingDownloadCertificate(null);
    setIsBulkDownload(false);
  };

  const handleDeleteCertificate = async (certificate: IssuedCertificate) => {
    if (
      confirm(
        `Are you sure you want to revoke the certificate issued to ${certificate.recipientName}?`
      )
    ) {
      try {
        const response = await fetch(`/api/certificates/${certificate.id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          toast.success("Certificate revoked successfully");
          loadIssuedCertificates(); // Reload the list
        } else {
          toast.error("Failed to revoke certificate");
        }
      } catch (error) {
        console.error("Error revoking certificate:", error);
        toast.error("Failed to revoke certificate");
      }
    }
  };

  const handlePermanentDeleteCertificate = async (
    certificate: IssuedCertificate
  ) => {
    if (
      confirm(
        `⚠️ PERMANENT DELETE WARNING ⚠️\n\nThis will PERMANENTLY DELETE the certificate issued to ${certificate.recipientName}.\n\nThis action CANNOT be undone and will:\n- Remove the certificate from the database\n- Delete associated files\n- Make the certificate unverifiable\n\nAre you absolutely sure you want to proceed?`
      )
    ) {
      try {
        const response = await fetch(
          `/api/certificates/${certificate.id}/delete-permanent`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          toast.success("Certificate permanently deleted");
          loadIssuedCertificates(); // Reload the list
        } else {
          toast.error("Failed to permanently delete certificate");
        }
      } catch (error) {
        console.error("Error permanently deleting certificate:", error);
        toast.error("Failed to permanently delete certificate");
      }
    }
  };

  // Bulk selection handlers
  const handleSelectCertificate = (certificateId: string) => {
    const newSelected = new Set(selectedCertificates);
    if (newSelected.has(certificateId)) {
      newSelected.delete(certificateId);
    } else {
      newSelected.add(certificateId);
    }
    setSelectedCertificates(newSelected);
    setIsAllSelected(
      newSelected.size === filteredCertificates.length &&
        filteredCertificates.length > 0
    );
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedCertificates(new Set());
      setIsAllSelected(false);
    } else {
      const allIds = new Set(filteredCertificates.map((cert) => cert.id));
      setSelectedCertificates(allIds);
      setIsAllSelected(true);
    }
  };

  const clearSelection = () => {
    setSelectedCertificates(new Set());
    setIsAllSelected(false);
  };

  // Bulk actions
  const handleBulkRevoke = async () => {
    if (selectedCertificates.size === 0) {
      toast.error("No certificates selected");
      return;
    }

    if (
      confirm(
        `Are you sure you want to revoke ${selectedCertificates.size} certificate(s)?`
      )
    ) {
      try {
        const promises = Array.from(selectedCertificates).map((id) =>
          fetch(`/api/certificates/${id}`, { method: "DELETE" })
        );

        const results = await Promise.allSettled(promises);
        const successful = results.filter(
          (r) => r.status === "fulfilled"
        ).length;
        const failed = results.length - successful;

        if (successful > 0) {
          toast.success(`${successful} certificate(s) revoked successfully`);
        }
        if (failed > 0) {
          toast.error(`Failed to revoke ${failed} certificate(s)`);
        }

        clearSelection();
        loadIssuedCertificates();
      } catch (error) {
        console.error("Error revoking certificates:", error);
        toast.error("Failed to revoke certificates");
      }
    }
  };

  const handleBulkPermanentDelete = async () => {
    if (selectedCertificates.size === 0) {
      toast.error("No certificates selected");
      return;
    }

    if (
      confirm(
        `⚠️ PERMANENT DELETE WARNING ⚠️\n\nThis will PERMANENTLY DELETE ${selectedCertificates.size} certificate(s).\n\nThis action CANNOT be undone and will:\n- Remove the certificates from the database\n- Delete associated files\n- Make the certificates unverifiable\n\nAre you absolutely sure you want to proceed?`
      )
    ) {
      try {
        const promises = Array.from(selectedCertificates).map((id) =>
          fetch(`/api/certificates/${id}/delete-permanent`, {
            method: "DELETE",
          })
        );

        const results = await Promise.allSettled(promises);
        const successful = results.filter(
          (r) => r.status === "fulfilled"
        ).length;
        const failed = results.length - successful;

        if (successful > 0) {
          toast.success(`${successful} certificate(s) permanently deleted`);
        }
        if (failed > 0) {
          toast.error(`Failed to delete ${failed} certificate(s)`);
        }

        clearSelection();
        loadIssuedCertificates();
      } catch (error) {
        console.error("Error deleting certificates:", error);
        toast.error("Failed to delete certificates");
      }
    }
  };

  const handleBulkDownload = async (format: "pdf" | "png" = "pdf") => {
    if (selectedCertificates.size === 0) {
      toast.error("No certificates selected");
      return;
    }

    try {
      const certificateIds = Array.from(selectedCertificates);

      toast.info(
        `Preparing ZIP download of ${
          certificateIds.length
        } certificate(s) as ${format.toUpperCase()}...`
      );

      const response = await fetch("/api/certificates/bulk-download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          certificateIds,
          format,
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;

        // Get filename from response headers or create default
        const contentDisposition = response.headers.get("Content-Disposition");
        let filename = `certificates_${format}_bulk_download.zip`;
        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="([^"]+)"/);
          if (filenameMatch) {
            filename = filenameMatch[1];
          }
        }

        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        // Check for failed certificates
        const failedCount = response.headers.get("X-Failed-Count");
        const totalCount = response.headers.get("X-Total-Certificates");
        const successfulCount = response.headers.get(
          "X-Successful-Certificates"
        );

        if (failedCount && parseInt(failedCount) > 0) {
          toast.warning(
            `ZIP downloaded successfully! ${successfulCount}/${totalCount} certificates included. ${failedCount} certificates failed to generate.`,
            { duration: 8000 }
          );
        } else {
          toast.success(
            `ZIP file downloaded successfully with ${successfulCount} certificate(s) as ${format.toUpperCase()}!`
          );
        }
      } else {
        // Try to get error details from response
        try {
          const errorData = await response.json();
          console.error("Bulk download error:", errorData);
          toast.error(
            errorData.message ||
              `Failed to generate ZIP file with ${format.toUpperCase()} certificates`,
            { duration: 5000 }
          );
        } catch {
          toast.error(`Failed to download certificates as ZIP file`);
        }
      }

      clearSelection();
    } catch (error) {
      console.error("Error downloading certificates as ZIP:", error);
      toast.error("Failed to download certificates as ZIP file");
    }
  };

  const handleExportCertificates = async () => {
    try {
      const response = await fetch("/api/certificates/issued/export");
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `certificates-export-${
          new Date().toISOString().split("T")[0]
        }.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success("Certificates exported successfully");
      } else {
        toast.error("Failed to export certificates");
      }
    } catch (error) {
      console.error("Error exporting certificates:", error);
      toast.error("Failed to export certificates");
    }
  };

  // Calculate real analytics data
  const getAnalyticsData = () => {
    // Get certificates by category
    const categoryStats = issuedCertificates.reduce((acc, cert) => {
      const category = cert.templateCategory || "other";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get recent activity (last 10 certificates)
    const recentActivity = issuedCertificates
      .sort(
        (a, b) =>
          new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime()
      )
      .slice(0, 10)
      .map((cert) => ({
        type: "certificate_issued",
        description: `Certificate issued to ${cert.recipientName}`,
        detail: `${cert.templateName}`,
        time: cert.issuedAt,
      }));

    return { categoryStats, recentActivity };
  };

  const { categoryStats, recentActivity } = getAnalyticsData();

  const stats = [
    {
      title: "Total Templates",
      value: certificateTemplates.length,
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "Certificates Issued",
      value: issuedCertificates.length,
      icon: Award,
      color: "bg-green-500",
    },
    {
      title: "Active Recipients",
      value: new Set(issuedCertificates.map((cert) => cert.recipientEmail))
        .size,
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Verification Requests",
      value: issuedCertificates.filter((cert) => cert.status === "active")
        .length,
      icon: BarChart3,
      color: "bg-orange-500",
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      baptism: "bg-blue-100 text-blue-800",
      confirmation: "bg-green-100 text-green-800",
      course: "bg-purple-100 text-purple-800",
      training: "bg-yellow-100 text-yellow-800",
      volunteer: "bg-pink-100 text-pink-800",
      mission: "bg-indigo-100 text-indigo-800",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      revoked: "bg-red-100 text-red-800",
      expired: "bg-gray-100 text-gray-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Certificate Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage certificate templates and issue certificates to members.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => router.push("/admin/certificates/flexible-issue")}
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Flexible Issue
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              try {
                const response = await fetch("/api/admin/initialize-database", {
                  method: "POST",
                });

                if (response.ok) {
                  toast.success(
                    "Database initialized successfully with default templates"
                  );
                } else {
                  toast.error("Failed to initialize database");
                }
              } catch (error) {
                console.error("Error initializing database:", error);
                toast.error("Failed to initialize database");
              }
            }}
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Initialize Database
          </Button>
          <Button variant="outline" size="sm" onClick={handleCreateNewTemplate}>
            <Plus className="h-4 w-4 mr-2" />
            New Template
          </Button>

          <Dialog
            open={isIssueCertificateOpen}
            onOpenChange={setIsIssueCertificateOpen}
          >
            <DialogTrigger asChild>
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                <Award className="h-4 w-4 mr-2" />
                Issue Certificate
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg bg-white border border-gray-200 shadow-lg">
              <DialogHeader>
                <DialogTitle>Issue Certificate</DialogTitle>
                <DialogDescription>
                  Issue a certificate to a member using an existing template.
                </DialogDescription>
              </DialogHeader>
              <IssueCertificateForm
                onClose={() => setIsIssueCertificateOpen(false)}
                templates={certificateTemplates}
                onSelectTemplate={handleSelectTemplateForIssue}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="issued">Issued Certificates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Certificate Templates</h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search templates..."
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button
                onClick={loadTemplates}
                variant="outline"
                size="sm"
                disabled={loading}
                title="Refresh Templates"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
              <Button
                onClick={handleCreateNewTemplate}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="pb-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certificateTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <CardTitle className="text-lg">
                          {template.name}
                        </CardTitle>
                        <Badge className={getCategoryColor(template.category)}>
                          {template.category}
                        </Badge>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePreviewTemplate(template)}
                          title="Preview Template"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditTemplate(template)}
                          title="Edit Template"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteTemplate(template)}
                          title="Delete Template"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      {template.description}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{template.certificatesIssued} issued</span>
                      <span>Created {template.createdAt}</span>
                    </div>
                    <div className="mt-4">
                      <Button
                        className="w-full"
                        size="sm"
                        onClick={() => handleUseTemplate(template)}
                      >
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="issued" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Issued Certificates</h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search certificates..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportCertificates}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Action Legend */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
            <div className="font-medium text-blue-900 mb-2">
              Certificate Actions:
            </div>
            <div className="grid grid-cols-2 gap-2 text-blue-800">
              <div className="flex items-center gap-2">
                <Trash2 className="h-3 w-3 text-yellow-600" />
                <span>
                  <strong>Revoke:</strong> Marks certificate as invalid but
                  keeps it in database
                </span>
              </div>
              <div className="flex items-center gap-2">
                <X className="h-3 w-3 text-red-600" />
                <span>
                  <strong>Permanent Delete:</strong> Completely removes
                  certificate and files (irreversible)
                </span>
              </div>
            </div>
          </div>

          {/* Bulk Actions Toolbar */}
          {selectedCertificates.size > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">
                    {selectedCertificates.size} certificate(s) selected
                  </span>
                  <Button variant="outline" size="sm" onClick={clearSelection}>
                    Clear Selection
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBulkDownloadRequest}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBulkRevoke}
                    className="text-yellow-600 hover:text-yellow-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Revoke All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBulkPermanentDelete}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Delete All
                  </Button>
                </div>
              </div>
            </div>
          )}

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          <button
                            onClick={handleSelectAll}
                            className="text-gray-400 hover:text-gray-600"
                            title={
                              isAllSelected ? "Deselect All" : "Select All"
                            }
                          >
                            {isAllSelected ? (
                              <CheckSquare className="h-4 w-4" />
                            ) : (
                              <Square className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Certificate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recipient
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Verification ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Issue Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loadingIssued ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center">
                          <div className="flex items-center justify-center">
                            <RefreshCw className="h-6 w-6 animate-spin mr-2" />
                            Loading issued certificates...
                          </div>
                        </td>
                      </tr>
                    ) : filteredCertificates.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center">
                          <div className="text-gray-500">
                            <Award className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                            <p className="text-lg font-medium">
                              {searchQuery.trim()
                                ? "No certificates match your search"
                                : "No certificates issued yet"}
                            </p>
                            <p className="text-sm">
                              {searchQuery.trim()
                                ? "Try adjusting your search terms."
                                : "Issue your first certificate to see it here."}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredCertificates.map((certificate) => (
                        <tr
                          key={certificate.id}
                          className={`hover:bg-gray-50 ${
                            highlightedCertificateId ===
                            certificate.verificationId
                              ? "bg-blue-50 border-l-4 border-l-blue-500"
                              : ""
                          } ${
                            selectedCertificates.has(certificate.id)
                              ? "bg-blue-25 border-l-2 border-l-blue-300"
                              : ""
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() =>
                                handleSelectCertificate(certificate.id)
                              }
                              className="text-gray-400 hover:text-gray-600"
                              title={
                                selectedCertificates.has(certificate.id)
                                  ? "Deselect"
                                  : "Select"
                              }
                            >
                              {selectedCertificates.has(certificate.id) ? (
                                <CheckSquare className="h-4 w-4 text-blue-600" />
                              ) : (
                                <Square className="h-4 w-4" />
                              )}
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">
                              {certificate.templateName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="font-medium text-gray-900">
                                {certificate.recipientName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {certificate.recipientEmail}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                              {certificate.verificationId}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {certificate.issueDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              className={getStatusColor(certificate.status)}
                            >
                              {certificate.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end gap-1">
                              {/* Regular Actions */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handlePreviewCertificate(certificate)
                                }
                                title="Preview Certificate"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleDownloadRequest(certificate)
                                }
                                title="Download Certificate"
                              >
                                <Download className="h-4 w-4" />
                              </Button>

                              {/* Separator */}
                              <div className="w-px h-6 bg-gray-300 mx-1"></div>

                              {/* Destructive Actions */}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                                onClick={() =>
                                  handleDeleteCertificate(certificate)
                                }
                                title="Revoke Certificate (Soft Delete)"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-700 hover:text-red-900 hover:bg-red-50"
                                onClick={() =>
                                  handlePermanentDeleteCertificate(certificate)
                                }
                                title="⚠️ Permanently Delete Certificate"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <h3 className="text-lg font-semibold">Certificate Analytics</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Certificates by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(categoryStats).length > 0 ? (
                    Object.entries(categoryStats).map(([category, count]) => (
                      <div
                        key={category}
                        className="flex justify-between items-center"
                      >
                        <span className="capitalize">{category}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width: `${Math.max(
                                  10,
                                  (count /
                                    Math.max(...Object.values(categoryStats))) *
                                    100
                                )}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-500">{count}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No certificates issued yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm">
                    <p className="font-medium">
                      Certificate issued to John Doe
                    </p>
                    <p className="text-gray-500">
                      Bible Study Completion • 2 hours ago
                    </p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">New template created</p>
                    <p className="text-gray-500">
                      Youth Leadership • 1 day ago
                    </p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Certificate verified</p>
                    <p className="text-gray-500">
                      Verification ID: BSC001 • 2 days ago
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Certificate Preview Modal */}
      {selectedTemplate && selectedTemplate.template && (
        <CertificatePreviewModal
          isOpen={isPreviewOpen}
          onClose={() => {
            setIsPreviewOpen(false);
            setSelectedTemplate(null);
          }}
          template={selectedTemplate.template}
        />
      )}

      {/* Format Selection Dialog */}
      <FormatSelectionDialog
        open={showFormatDialog}
        onOpenChange={setShowFormatDialog}
        onDownload={handleFormatSelection}
        title={
          isBulkDownload ? "Bulk Download Certificates" : "Download Certificate"
        }
        description={
          isBulkDownload
            ? `Choose the format for downloading ${selectedCertificates.size} selected certificate(s) as a ZIP file.`
            : "Choose the format for downloading the certificate."
        }
        certificateName={
          isBulkDownload
            ? `${selectedCertificates.size} certificates`
            : pendingDownloadCertificate?.templateName || "Certificate"
        }
        isBulkDownload={isBulkDownload}
      />
    </div>
  );
}

// Issue Certificate Form Component
function IssueCertificateForm({
  onClose,
  templates,
  onSelectTemplate,
}: {
  onClose: () => void;
  templates: CertificateTemplate[];
  onSelectTemplate: (templateId: string) => void;
}) {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");

  const handleContinue = () => {
    if (selectedTemplateId) {
      onSelectTemplate(selectedTemplateId);
      onClose();
    }
  };

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg">
      <div className="space-y-2">
        <Label htmlFor="certificate-template">
          Select Certificate Template
        </Label>
        <Select
          value={selectedTemplateId}
          onValueChange={setSelectedTemplateId}
        >
          <SelectTrigger className="bg-white border-gray-300">
            <SelectValue placeholder="Choose a template to issue" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg">
            {templates.map((template) => (
              <SelectItem
                key={template.id}
                value={template.id}
                className="hover:bg-blue-50 focus:bg-blue-50 cursor-pointer"
              >
                <span className="text-gray-900">{template.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedTemplateId && (
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-sm text-blue-800">
            <strong>Selected:</strong>{" "}
            {templates.find((t) => t.id === selectedTemplateId)?.name}
          </div>
          <div className="text-xs text-blue-600 mt-1">
            You&apos;ll be taken to the certificate issue page to fill in
            recipient details.
          </div>
        </div>
      )}

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!selectedTemplateId}
          className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400"
        >
          Continue to Issue Page
        </Button>
      </DialogFooter>
    </div>
  );
}
