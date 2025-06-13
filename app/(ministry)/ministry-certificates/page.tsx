import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Award,
  Download,
  Upload,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  FileText,
} from "lucide-react";

export default function MinistryCertificatesPage() {
  const certificates = [
    {
      id: 1,
      title: "Bible Study Leadership Certificate",
      description:
        "Complete foundational training for leading Bible study groups",
      category: "Leadership",
      duration: "6 weeks",
      requirements: [
        "Complete 12 study sessions",
        "Lead 2 practice sessions",
        "Pass final assessment",
      ],
      enrolled: 45,
      completed: 32,
      status: "active",
      difficulty: "Intermediate",
      prerequisites: ["Basic Bible Knowledge"],
      image: "/api/placeholder/300/200",
    },
    {
      id: 2,
      title: "Youth Ministry Certification",
      description:
        "Comprehensive training for effective youth ministry leadership",
      category: "Youth Ministry",
      duration: "8 weeks",
      requirements: [
        "Complete 16 training modules",
        "Mentor youth for 4 weeks",
        "Submit ministry plan",
      ],
      enrolled: 28,
      completed: 18,
      status: "active",
      difficulty: "Advanced",
      prerequisites: ["Leadership Foundation", "Background Check"],
      image: "/api/placeholder/300/200",
    },
    {
      id: 3,
      title: "Mission Preparation Certificate",
      description:
        "Essential training for short-term and long-term mission work",
      category: "Missions",
      duration: "4 weeks",
      requirements: [
        "Cultural sensitivity training",
        "Evangelism workshop",
        "Health & safety briefing",
      ],
      enrolled: 22,
      completed: 19,
      status: "active",
      difficulty: "Beginner",
      prerequisites: ["Member in good standing"],
      image: "/api/placeholder/300/200",
    },
    {
      id: 4,
      title: "Pastoral Care Certificate",
      description:
        "Training in biblical counseling and pastoral care principles",
      category: "Pastoral Care",
      duration: "10 weeks",
      requirements: [
        "Complete coursework",
        "Practice sessions",
        "Case study presentation",
      ],
      enrolled: 15,
      completed: 12,
      status: "draft",
      difficulty: "Advanced",
      prerequisites: ["Ministry Leadership", "Spiritual Maturity Assessment"],
      image: "/api/placeholder/300/200",
    },
  ];

  const certificateStats = [
    {
      label: "Total Certificates",
      value: "12",
      icon: Award,
      color: "text-blue-600",
    },
    {
      label: "Active Enrollments",
      value: "110",
      icon: FileText,
      color: "text-green-600",
    },
    {
      label: "Completed This Month",
      value: "23",
      icon: Download,
      color: "text-purple-600",
    },
    {
      label: "Success Rate",
      value: "89%",
      icon: Eye,
      color: "text-orange-600",
    },
  ];

  const categories = [
    "All Categories",
    "Leadership",
    "Youth Ministry",
    "Missions",
    "Pastoral Care",
    "Worship",
    "Teaching",
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Ministry Certificates
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Manage and track ministry training certificates and certifications
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {certificateStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search certificates..."
              className="pl-10 max-w-sm"
            />
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-md">
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import Certificates
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Certificate
          </Button>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <Card key={cert.id} className="hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                className="object-cover rounded-t-lg"
              />
              <Badge
                variant={cert.status === "active" ? "default" : "secondary"}
                className="absolute top-2 right-2"
              >
                {cert.status}
              </Badge>
            </div>

            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg leading-tight">
                  {cert.title}
                </CardTitle>
                <Badge variant="outline" className="text-xs">
                  {cert.difficulty}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{cert.description}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{cert.duration}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Category:</span>
                <Badge variant="secondary" className="text-xs">
                  {cert.category}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progress</span>
                  <span>
                    {cert.completed}/{cert.enrolled} completed
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{
                      width: `${(cert.completed / cert.enrolled) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Requirements:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {cert.requirements.slice(0, 2).map((req, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <span className="text-green-600 mt-1">•</span>
                      {req}
                    </li>
                  ))}
                  {cert.requirements.length > 2 && (
                    <li className="text-blue-600 cursor-pointer">
                      +{cert.requirements.length - 2} more requirements
                    </li>
                  )}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Prerequisites:</h4>
                <div className="flex flex-wrap gap-1">
                  {cert.prerequisites.map((prereq, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {prereq}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Certificate Creation Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Create New Certificate Program
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Certificate Title
              </label>
              <Input placeholder="Enter certificate title" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="">Select category</option>
                {categories.slice(1).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Duration</label>
              <Input placeholder="e.g., 6 weeks, 3 months" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Difficulty Level
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="">Select difficulty</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea placeholder="Describe the certificate program and its objectives..." />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Requirements
            </label>
            <Textarea placeholder="List the requirements to complete this certificate..." />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Prerequisites
            </label>
            <Input placeholder="List any prerequisites (comma separated)" />
          </div>

          <div className="flex gap-2">
            <Button>Create Certificate</Button>
            <Button variant="outline">Save as Draft</Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-1" />
              Import from Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Certificate Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Award className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  Sarah Johnson completed Bible Study Leadership
                </p>
                <p className="text-xs text-gray-600">2 hours ago</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  5 new enrollments in Youth Ministry Certification
                </p>
                <p className="text-xs text-gray-600">1 day ago</p>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <Edit className="h-5 w-5 text-purple-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  Mission Preparation Certificate updated
                </p>
                <p className="text-xs text-gray-600">3 days ago</p>
              </div>
              <Button variant="outline" size="sm">
                View Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
