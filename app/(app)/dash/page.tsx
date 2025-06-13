"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  BookOpen,
  Calendar,
  MessageCircle,
  Heart,
  Award,
  Users,
  TrendingUp,
  Shield,
} from "lucide-react";

export default function DashboardPage() {
  const { user, displayName, initials, role } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Loading...</h2>
          <p className="text-gray-600">
            Please wait while we load your dashboard.
          </p>
        </div>
      </div>
    );
  }

  const baseQuickActions = [
    {
      title: "Join Prayer Network",
      description: "Connect with others in prayer",
      icon: MessageCircle,
      href: "/prayer",
      color: "bg-blue-500",
    },
    {
      title: "Browse Sermons",
      description: "Access our sermon library",
      icon: BookOpen,
      href: "/sermons",
      color: "bg-green-500",
    },
    {
      title: "View Events",
      description: "See upcoming ministry events",
      icon: Calendar,
      href: "/events",
      color: "bg-purple-500",
    },
    {
      title: "Community Hub",
      description: "Connect with other members",
      icon: Users,
      href: "/social",
      color: "bg-orange-500",
    },
  ];

  // Add admin dashboard for admin users
  const quickActions =
    user?.role === "ADMIN" || user?.role === "SUPER_ADMIN"
      ? [
          {
            title: "Admin Dashboard",
            description: "Platform administration",
            icon: Shield,
            href: "/admin",
            color: "bg-red-500",
          },
          ...baseQuickActions,
        ]
      : baseQuickActions;

  const stats = [
    {
      title: "Prayer Requests",
      value: "12",
      subtitle: "Active requests",
      icon: Heart,
      trend: "+2 this week",
    },
    {
      title: "Certificates",
      value: user.certificateSharingEnabled ? "3" : "Private",
      subtitle: "Earned achievements",
      icon: Award,
      trend: "1 recent",
    },
    {
      title: "Community",
      value: "247",
      subtitle: "Connected members",
      icon: Users,
      trend: "+15 this month",
    },
    {
      title: "Growth",
      value: "8.2%",
      subtitle: "Ministry engagement",
      icon: TrendingUp,
      trend: "↗ Increasing",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={user.avatarUrl || undefined} alt={displayName} />
            <AvatarFallback className="bg-fom-primary text-white text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {displayName}!
            </h1>
            <p className="text-gray-600">
              Ready to continue your ministry journey today?
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="secondary" className="capitalize">
                {role?.replace("_", " ")}
              </Badge>
              {user.ministryInterests && user.ministryInterests.length > 0 && (
                <Badge variant="outline">
                  {user.ministryInterests.length} Ministry Interest
                  {user.ministryInterests.length !== 1 ? "s" : ""}
                </Badge>
              )}
            </div>
          </div>
          <Button asChild>
            <a href="/dash/profile">
              <User className="w-4 h-4 mr-2" />
              Edit Profile
            </a>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-full">
                  <stat.icon className="w-6 h-6 text-fom-primary" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-xs text-green-600 font-medium">
                  {stat.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <Card
            key={index}
            className="hover:shadow-md transition-shadow cursor-pointer group"
          >
            <CardHeader className="pb-3">
              <div
                className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}
              >
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">{action.title}</CardTitle>
              <CardDescription>{action.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full group-hover:bg-fom-primary group-hover:text-white transition-colors"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Prayer Requests</CardTitle>
            <CardDescription>
              Stay connected with community needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Healing for Sarah's mother",
                  time: "2 hours ago",
                  prayers: 12,
                },
                {
                  title: "Safe travels for mission trip",
                  time: "5 hours ago",
                  prayers: 8,
                },
                {
                  title: "Wisdom for church leadership",
                  time: "1 day ago",
                  prayers: 15,
                },
              ].map((request, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b last:border-b-0"
                >
                  <div>
                    <p className="font-medium text-sm">{request.title}</p>
                    <p className="text-xs text-gray-500">{request.time}</p>
                  </div>
                  <Badge variant="secondary">{request.prayers} prayers</Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Prayer Requests
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              Don&apos;t miss these ministry opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Sunday Service",
                  date: "This Sunday, 10:00 AM",
                  location: "Main Sanctuary",
                },
                {
                  title: "Bible Study",
                  date: "Wednesday, 7:00 PM",
                  location: "Fellowship Hall",
                },
                {
                  title: "Youth Meeting",
                  date: "Friday, 6:30 PM",
                  location: "Youth Center",
                },
              ].map((event, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 py-2 border-b last:border-b-0"
                >
                  <div className="w-2 h-2 bg-fom-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                    <p className="text-xs text-gray-400">{event.location}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Events
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
