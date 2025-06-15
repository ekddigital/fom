"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  Users,
  Activity,
  TrendingUp,
  Calendar,
  MessageSquare,
  Settings,
  BarChart3,
  PieChart,
  AlertTriangle,
  Shield,
  Database,
  Bell,
  Plus,
  Heart,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { user } = useAuth();

  const dashboardStats = [
    {
      title: "Total Users",
      value: "1,247",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      description: "Active members",
    },
    {
      title: "Monthly Growth",
      value: "89",
      change: "+23%",
      changeType: "positive",
      icon: TrendingUp,
      description: "New members this month",
    },
    {
      title: "Events This Month",
      value: "24",
      change: "+8%",
      changeType: "positive",
      icon: Calendar,
      description: "Scheduled events",
    },
    {
      title: "Prayer Requests",
      value: "156",
      change: "-5%",
      changeType: "negative",
      icon: MessageSquare,
      description: "Active requests",
    },
    {
      title: "System Health",
      value: "99.9%",
      change: "Stable",
      changeType: "neutral",
      icon: Activity,
      description: "Uptime this month",
    },
    {
      title: "Storage Used",
      value: "67%",
      change: "+2GB",
      changeType: "neutral",
      icon: Database,
      description: "Of available space",
    },
  ];

  const recentActivity = [
    {
      type: "user_registration",
      message: "5 new users registered",
      time: "2 hours ago",
      severity: "info",
    },
    {
      type: "event_created",
      message: "Youth retreat event created",
      time: "4 hours ago",
      severity: "info",
    },
    {
      type: "system_alert",
      message: "Database backup completed",
      time: "6 hours ago",
      severity: "success",
    },
    {
      type: "security",
      message: "Failed login attempts detected",
      time: "8 hours ago",
      severity: "warning",
    },
    {
      type: "content",
      message: "New sermon uploaded",
      time: "1 day ago",
      severity: "info",
    },
  ];

  const quickActions = [
    {
      title: "Manage Users",
      description: "View and manage user accounts",
      icon: Users,
      href: "/admin/users",
      color: "bg-blue-500",
    },
    {
      title: "Create Cards",
      description: "Design beautiful graduation cards",
      icon: Heart,
      href: "/admin/cards",
      color: "bg-pink-500",
    },
    {
      title: "View Analytics",
      description: "Check platform analytics",
      icon: BarChart3,
      href: "/admin/analytics",
      color: "bg-green-500",
    },
    {
      title: "System Settings",
      description: "Configure platform settings",
      icon: Settings,
      href: "/admin/settings",
      color: "bg-purple-500",
    },
    {
      title: "Security Center",
      description: "Monitor security events",
      icon: Shield,
      href: "/admin/security",
      color: "bg-red-500",
    },
  ];

  const systemAlerts = [
    {
      id: 1,
      title: "Scheduled Maintenance",
      message: "System maintenance scheduled for Sunday 2 AM",
      type: "info",
      time: "1 hour ago",
    },
    {
      id: 2,
      title: "Storage Warning",
      message: "Storage is approaching 80% capacity",
      type: "warning",
      time: "3 hours ago",
    },
    {
      id: 3,
      title: "Security Update",
      message: "Security patches applied successfully",
      type: "success",
      time: "1 day ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here&apos;s what&apos;s happening with your platform.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Quick Action
          </Button>
          <Button size="sm" className="bg-red-600 hover:bg-red-700">
            <Bell className="h-4 w-4 mr-2" />
            View Alerts
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    <span
                      className={`text-sm ${
                        stat.changeType === "positive"
                          ? "text-green-600"
                          : stat.changeType === "negative"
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500">
                      {stat.description}
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-gray-100">
                  <stat.icon className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Quick Actions & Analytics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-20 justify-start p-4"
                    asChild
                  >
                    <Link
                      href={action.href}
                      className="flex items-center gap-3"
                    >
                      <div className={`p-2 rounded-lg ${action.color}`}>
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{action.title}</p>
                        <p className="text-sm text-gray-600">
                          {action.description}
                        </p>
                      </div>
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Analytics Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="users" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="users">Users</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="engagement">Engagement</TabsTrigger>
                </TabsList>

                <TabsContent value="users" className="space-y-4">
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">User Growth Chart</p>
                      <p className="text-sm text-gray-500">
                        Interactive chart will be displayed here
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="content" className="space-y-4">
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Content Distribution</p>
                      <p className="text-sm text-gray-500">
                        Content analytics will be displayed here
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="engagement" className="space-y-4">
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Engagement Metrics</p>
                      <p className="text-sm text-gray-500">
                        Engagement data will be displayed here
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Activity & Alerts */}
        <div className="space-y-6">
          {/* System Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className="p-3 rounded-lg border">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant={
                            alert.type === "warning"
                              ? "destructive"
                              : alert.type === "success"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {alert.type}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {alert.time}
                        </span>
                      </div>
                      <p className="font-medium text-sm">{alert.title}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" size="sm">
                View All Alerts
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-2">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.severity === "warning"
                        ? "bg-yellow-500"
                        : activity.severity === "success"
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-600">{activity.time}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" size="sm">
                View All Activity
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Online Users</span>
                <Badge variant="default">47</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Sessions</span>
                <Badge variant="secondary">234</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pending Approvals</span>
                <Badge variant="destructive">8</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Server Load</span>
                <Badge variant="outline">23%</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
