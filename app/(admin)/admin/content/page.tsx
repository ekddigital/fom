"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  HandHeart,
  Award,
  Heart,
  FileText,
  Plus,
  Eye,
  Settings,
  Users,
  BarChart3,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";

const contentSections = [
  {
    title: "Prayer & Fasting",
    description:
      "Manage monthly prayer and fasting posts with rich content, YouTube videos, and community engagement.",
    icon: HandHeart,
    href: "/admin/prayer-fasting",
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    stats: "Interactive blog posts",
    actions: [
      { label: "Manage Posts", href: "/admin/prayer-fasting" },
      { label: "View Public", href: "/prayer-fasting" },
    ],
  },
  {
    title: "Certificates",
    description:
      "Design certificate templates and issue certificates for graduations and achievements.",
    icon: Award,
    href: "/admin/certificates",
    color: "bg-yellow-50 border-yellow-200",
    iconColor: "text-yellow-600",
    stats: "Templates & issuance",
    actions: [
      { label: "Manage Templates", href: "/admin/certificates" },
      { label: "Issue Certificates", href: "/admin/certificates/issue" },
    ],
  },
  {
    title: "Cards",
    description:
      "Create beautiful graduation and appreciation cards for ministry members.",
    icon: Heart,
    href: "/admin/cards",
    color: "bg-pink-50 border-pink-200",
    iconColor: "text-pink-600",
    stats: "Graduation & appreciation",
    actions: [
      { label: "Manage Cards", href: "/admin/cards" },
      { label: "Create New", href: "/admin/cards" },
    ],
  },
  {
    title: "Conference Docs",
    description:
      "Build and maintain conference introduction, team slots, program timeline, and action tracker documents.",
    icon: CalendarDays,
    href: "/admin/conference-docs",
    color: "bg-sky-50 border-sky-200",
    iconColor: "text-sky-600",
    stats: "Program and planning documents",
    actions: [
      { label: "Open Document System", href: "/admin/conference-docs" },
      { label: "Preview Program", href: "/admin/conference-docs" },
    ],
  },
];

const quickActions = [
  {
    title: "User Management",
    description: "Manage users and roles",
    icon: Users,
    href: "/admin/users",
    color: "bg-red-50 border-red-200",
    iconColor: "text-red-600",
  },
  {
    title: "Analytics",
    description: "View platform analytics",
    icon: BarChart3,
    href: "/admin/analytics",
    color: "bg-indigo-50 border-indigo-200",
    iconColor: "text-indigo-600",
  },
  {
    title: "Settings",
    description: "Platform configuration",
    icon: Settings,
    href: "/admin/settings",
    color: "bg-gray-50 border-gray-200",
    iconColor: "text-gray-600",
  },
  {
    title: "Conference Docs",
    description: "Manage May 2026 conference plan",
    icon: CalendarDays,
    href: "/admin/conference-docs",
    color: "bg-sky-50 border-sky-200",
    iconColor: "text-sky-600",
  },
];

export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Content Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage all platform content, posts, and community resources
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button asChild>
            <Link href="/admin/prayer-fasting">
              <Plus className="w-4 h-4 mr-2" />
              Create Prayer Post
            </Link>
          </Button>
        </div>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentSections.map((section) => {
          const IconComponent = section.icon;
          return (
            <Card
              key={section.title}
              className={`${section.color} hover:shadow-lg transition-shadow`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-white shadow-sm`}>
                    <IconComponent className={`w-6 h-6 ${section.iconColor}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <p className="text-sm text-gray-600">{section.stats}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-sm">
                  {section.description}
                </CardDescription>
                <div className="flex flex-col space-y-2">
                  {section.actions.map((action, index) => (
                    <Button
                      key={index}
                      variant={index === 0 ? "default" : "outline"}
                      size="sm"
                      asChild
                      className="w-full"
                    >
                      <Link href={action.href}>
                        {index === 0 ? (
                          <Settings className="w-4 h-4 mr-2" />
                        ) : (
                          <Eye className="w-4 h-4 mr-2" />
                        )}
                        {action.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <Card
                key={action.title}
                className={`${action.color} hover:shadow-md transition-shadow`}
              >
                <CardContent className="p-4">
                  <Link
                    href={action.href}
                    className="flex items-center space-x-3"
                  >
                    <div className="p-2 rounded-lg bg-white shadow-sm">
                      <IconComponent
                        className={`w-5 h-5 ${action.iconColor}`}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {action.description}
                      </p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Content Statistics */}
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-gray-600" />
            <span>Content Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <HandHeart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Prayer Posts</h3>
              <p className="text-sm text-gray-600">Interactive content</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Certificates</h3>
              <p className="text-sm text-gray-600">Digital credentials</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Cards</h3>
              <p className="text-sm text-gray-600">Appreciation & graduation</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
