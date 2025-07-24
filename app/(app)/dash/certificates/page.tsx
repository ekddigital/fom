"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Award,
  Download,
  Share,
  Search,
  Calendar,
  Eye,
  ExternalLink,
  Star,
  Trophy,
  Medal,
  CheckCircle,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

interface Certificate {
  id: string;
  certificateNumber: string;
  courseName: string;
  description?: string;
  issueDate: string;
  expiryDate?: string;
  grade?: string;
  creditsEarned?: number;
  isVerified: boolean;
  isPublic: boolean;
  certificateUrl?: string;
  verificationUrl: string;
  template: {
    id: string;
    name: string;
    category: string;
    difficulty: string;
    estimatedHours?: number;
  };
  issuer: {
    id: string;
    organizationName: string;
    logoUrl?: string;
  };
  recipient: {
    id: string;
    firstName: string;
    lastName: string;
  };
  achievements?: string[];
}

interface CertificateTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: string;
  estimatedHours?: number;
  requirementsDescription: string;
  isActive: boolean;
  courseContent?: string[];
  prerequisites?: string[];
  learningObjectives?: string[];
}

const CERTIFICATE_CATEGORIES = [
  "BIBLICAL_STUDIES",
  "MINISTRY_LEADERSHIP",
  "THEOLOGY",
  "MISSIONS",
  "COUNSELING",
  "WORSHIP",
  "YOUTH_MINISTRY",
  "PASTORAL_CARE",
];

const DIFFICULTY_LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"];

export default function CertificatesPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"my-certificates" | "available">(
    "my-certificates"
  );
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [templates, setTemplates] = useState<CertificateTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");

  const fetchCertificates = useCallback(async () => {
    try {
      const response = await fetch("/api/certificates/my-certificates");
      if (response.ok) {
        const data = await response.json();
        setCertificates(data.certificates || []);
      }
    } catch (error) {
      console.error("Failed to fetch certificates:", error);
      toast.error("Failed to load certificates");
    }
  }, []);

  const fetchTemplates = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        search: searchTerm,
        category: filterCategory,
        difficulty: filterDifficulty,
      });

      const response = await fetch(`/api/certificates/templates?${params}`);
      if (response.ok) {
        const data = await response.json();
        setTemplates(data.templates || []);
      }
    } catch (error) {
      console.error("Failed to fetch templates:", error);
      toast.error("Failed to load available certificates");
    }
  }, [searchTerm, filterCategory, filterDifficulty]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (activeTab === "my-certificates") {
        await fetchCertificates();
      } else {
        await fetchTemplates();
      }
      setLoading(false);
    };

    fetchData();
  }, [activeTab, fetchCertificates, fetchTemplates]);

  const handleDownloadCertificate = async (certificateId: string) => {
    try {
      const response = await fetch(
        `/api/certificates/${certificateId}/download`
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `certificate-${certificateId}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success("Certificate downloaded successfully");
      } else {
        toast.error("Failed to download certificate");
      }
    } catch (error) {
      console.error("Failed to download certificate:", error);
      toast.error("Failed to download certificate");
    }
  };

  const handleShareCertificate = async (certificate: Certificate) => {
    try {
      await navigator.share({
        title: `${certificate.courseName} Certificate`,
        text: `I earned a certificate in ${certificate.courseName}!`,
        url: certificate.verificationUrl,
      });
    } catch {
      navigator.clipboard.writeText(certificate.verificationUrl);
      toast.success("Certificate verification link copied to clipboard");
    }
  };

  const handleEnrollInCourse = async (templateId: string) => {
    try {
      const response = await fetch(
        `/api/certificates/templates/${templateId}/enroll`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        toast.success("Successfully enrolled in course");
        // Could redirect to course page or update UI
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to enroll in course");
      }
    } catch (error) {
      console.error("Failed to enroll in course:", error);
      toast.error("Failed to enroll in course");
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "BEGINNER":
        return "bg-green-100 text-green-800";
      case "INTERMEDIATE":
        return "bg-blue-100 text-blue-800";
      case "ADVANCED":
        return "bg-orange-100 text-orange-800";
      case "EXPERT":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "BIBLICAL_STUDIES":
        return "bg-blue-100 text-blue-800";
      case "MINISTRY_LEADERSHIP":
        return "bg-purple-100 text-purple-800";
      case "THEOLOGY":
        return "bg-indigo-100 text-indigo-800";
      case "MISSIONS":
        return "bg-orange-100 text-orange-800";
      case "COUNSELING":
        return "bg-green-100 text-green-800";
      case "WORSHIP":
        return "bg-pink-100 text-pink-800";
      case "YOUTH_MINISTRY":
        return "bg-yellow-100 text-yellow-800";
      case "PASTORAL_CARE":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "BEGINNER":
        return Star;
      case "INTERMEDIATE":
        return Medal;
      case "ADVANCED":
        return Trophy;
      case "EXPERT":
        return Award;
      default:
        return Star;
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Loading...</h2>
          <p className="text-gray-600">
            Please wait while we load your certificates.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Ministry Certificates
          </h1>
          <p className="text-gray-600">
            Track your ministry education and achievements
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-3 py-1">
            {certificates.length} Certificate
            {certificates.length !== 1 ? "s" : ""} Earned
          </Badge>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === "my-certificates" ? "default" : "ghost"}
          onClick={() => setActiveTab("my-certificates")}
          className="px-6"
        >
          My Certificates
        </Button>
        <Button
          variant={activeTab === "available" ? "default" : "ghost"}
          onClick={() => setActiveTab("available")}
          className="px-6"
        >
          Available Courses
        </Button>
      </div>

      {/* My Certificates Tab */}
      {activeTab === "my-certificates" && (
        <div className="space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-12 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : certificates.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Certificates Yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Start your ministry education journey by enrolling in
                  available courses.
                </p>
                <Button onClick={() => setActiveTab("available")}>
                  Browse Available Courses
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {certificates.map((certificate) => {
                const DifficultyIcon = getDifficultyIcon(
                  certificate.template.difficulty
                );
                const isExpired =
                  certificate.expiryDate &&
                  new Date(certificate.expiryDate) < new Date();

                return (
                  <Card
                    key={certificate.id}
                    className={`hover:shadow-lg transition-shadow ${
                      isExpired ? "opacity-75" : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        {/* Certificate Icon */}
                        <div
                          className={`w-16 h-16 bg-gradient-to-br from-fom-primary to-fom-primary/80 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isExpired ? "grayscale" : ""
                          }`}
                        >
                          <DifficultyIcon className="w-8 h-8 text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                                {certificate.courseName}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2">
                                Certificate #{certificate.certificateNumber}
                              </p>
                            </div>

                            <div className="flex items-center gap-1">
                              {certificate.isVerified && (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              )}
                              {isExpired && (
                                <Clock className="w-5 h-5 text-red-600" />
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge
                              className={getCategoryColor(
                                certificate.template.category
                              )}
                              variant="secondary"
                            >
                              {certificate.template.category.replace("_", " ")}
                            </Badge>
                            <Badge
                              className={getDifficultyColor(
                                certificate.template.difficulty
                              )}
                              variant="secondary"
                            >
                              {certificate.template.difficulty}
                            </Badge>
                            {certificate.grade && (
                              <Badge variant="outline">
                                Grade: {certificate.grade}
                              </Badge>
                            )}
                          </div>

                          <div className="space-y-1 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>
                                Issued:{" "}
                                {new Date(
                                  certificate.issueDate
                                ).toLocaleDateString()}
                              </span>
                            </div>

                            {certificate.expiryDate && (
                              <div
                                className={`flex items-center gap-2 ${
                                  isExpired ? "text-red-600" : ""
                                }`}
                              >
                                <Clock className="w-4 h-4" />
                                <span>
                                  {isExpired ? "Expired" : "Expires"}:{" "}
                                  {new Date(
                                    certificate.expiryDate
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            )}

                            {certificate.creditsEarned && (
                              <div className="flex items-center gap-2">
                                <Star className="w-4 h-4" />
                                <span>
                                  {certificate.creditsEarned} Credits Earned
                                </span>
                              </div>
                            )}
                          </div>

                          {certificate.description && (
                            <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                              {certificate.description}
                            </p>
                          )}

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() =>
                                handleDownloadCertificate(certificate.id)
                              }
                              disabled={!!isExpired}
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleShareCertificate(certificate)
                              }
                            >
                              <Share className="w-4 h-4 mr-1" />
                              Share
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                window.open(
                                  certificate.verificationUrl,
                                  "_blank"
                                )
                              }
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Verify
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Available Courses Tab */}
      {activeTab === "available" && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {CERTIFICATE_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filterDifficulty}
                onValueChange={setFilterDifficulty}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {DIFFICULTY_LEVELS.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Course Templates */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-16 bg-gray-200 rounded"></div>
                      <div className="h-8 bg-gray-200 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : templates.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Courses Found
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm ||
                  filterCategory !== "all" ||
                  filterDifficulty !== "all"
                    ? "Try adjusting your search or filters."
                    : "Check back soon for new certification courses."}
                </p>
                {(searchTerm ||
                  filterCategory !== "all" ||
                  filterDifficulty !== "all") && (
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setFilterCategory("all");
                      setFilterDifficulty("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => {
                const DifficultyIcon = getDifficultyIcon(template.difficulty);

                return (
                  <Card
                    key={template.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg line-clamp-2">
                            {template.name}
                          </CardTitle>
                          <CardDescription className="line-clamp-2 mt-1">
                            {template.description}
                          </CardDescription>
                        </div>

                        <div className="w-12 h-12 bg-gradient-to-br from-fom-primary to-fom-primary/80 rounded-lg flex items-center justify-center flex-shrink-0 ml-3">
                          <DifficultyIcon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            className={getCategoryColor(template.category)}
                            variant="secondary"
                          >
                            {template.category.replace("_", " ")}
                          </Badge>
                          <Badge
                            className={getDifficultyColor(template.difficulty)}
                            variant="secondary"
                          >
                            {template.difficulty}
                          </Badge>
                          {template.estimatedHours && (
                            <Badge variant="outline">
                              {template.estimatedHours}h
                            </Badge>
                          )}
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                          <p>
                            <strong>Requirements:</strong>
                          </p>
                          <p className="text-xs line-clamp-3">
                            {template.requirementsDescription}
                          </p>
                        </div>

                        {template.learningObjectives &&
                          template.learningObjectives.length > 0 && (
                            <div className="space-y-2 text-sm text-gray-600">
                              <p>
                                <strong>You&apos;ll learn:</strong>
                              </p>
                              <ul className="text-xs space-y-1">
                                {template.learningObjectives
                                  .slice(0, 3)
                                  .map((objective, index) => (
                                    <li
                                      key={index}
                                      className="flex items-start gap-1"
                                    >
                                      <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                                      <span className="line-clamp-1">
                                        {objective}
                                      </span>
                                    </li>
                                  ))}
                                {template.learningObjectives.length > 3 && (
                                  <li className="text-gray-500">
                                    +{template.learningObjectives.length - 3}{" "}
                                    more objectives
                                  </li>
                                )}
                              </ul>
                            </div>
                          )}

                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => handleEnrollInCourse(template.id)}
                          >
                            Enroll Now
                          </Button>

                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
