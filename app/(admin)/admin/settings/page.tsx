import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Globe,
  Mail,
  Shield,
  Database,
  Palette,
  Bell,
  Key,
  Users,
  Upload,
  Download,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export default function AdminSettingsPage() {
  const systemStatus = [
    { service: "Web Server", status: "healthy", uptime: "99.98%" },
    { service: "Database", status: "healthy", uptime: "99.95%" },
    { service: "Email Service", status: "warning", uptime: "98.45%" },
    { service: "File Storage", status: "healthy", uptime: "99.99%" },
    { service: "Backup System", status: "healthy", uptime: "100%" },
  ];

  const securitySettings = [
    {
      title: "Two-Factor Authentication",
      description: "Require 2FA for admin accounts",
      enabled: true,
    },
    {
      title: "Password Complexity",
      description: "Enforce strong password requirements",
      enabled: true,
    },
    {
      title: "Session Timeout",
      description: "Auto-logout after inactivity",
      enabled: true,
    },
    {
      title: "IP Whitelist",
      description: "Restrict admin access by IP",
      enabled: false,
    },
    {
      title: "Audit Logging",
      description: "Log all admin actions",
      enabled: true,
    },
  ];

  const emailTemplates = [
    { name: "Welcome Email", status: "active", lastModified: "2024-01-15" },
    { name: "Password Reset", status: "active", lastModified: "2024-01-10" },
    {
      name: "Event Registration",
      status: "active",
      lastModified: "2024-01-12",
    },
    {
      name: "Prayer Request Confirmation",
      status: "draft",
      lastModified: "2024-01-14",
    },
    {
      name: "Ministry Application",
      status: "active",
      lastModified: "2024-01-08",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-1">
            Configure platform settings and system preferences
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Status
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>

      {/* System Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {systemStatus.map((service, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{service.service}</span>
                  <Badge
                    variant={
                      service.status === "healthy" ? "default" : "destructive"
                    }
                    className={
                      service.status === "healthy" ? "bg-green-600" : ""
                    }
                  >
                    {service.status}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600">
                  Uptime: {service.uptime}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Site Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Site Name
                  </label>
                  <Input defaultValue="Fishers of Men" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Site URL
                  </label>
                  <Input defaultValue="https://fishersofmen.org" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Site Description
                  </label>
                  <Textarea
                    defaultValue="Bringing Jesus to the World - Making disciples of all nations"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Contact Email
                  </label>
                  <Input defaultValue="info@fishersofmen.org" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Admin Email
                  </label>
                  <Input defaultValue="admin@fishersofmen.org" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">User Registration</p>
                    <p className="text-sm text-gray-600">
                      Allow new user registration
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Verification</p>
                    <p className="text-sm text-gray-600">
                      Require email verification for new users
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-approve Members</p>
                    <p className="text-sm text-gray-600">
                      Automatically approve new member applications
                    </p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Default User Role
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="VISITOR">Visitor</option>
                    <option value="MEMBER" selected>
                      Member
                    </option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Policies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {securitySettings.map((setting, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{setting.title}</p>
                        <p className="text-sm text-gray-600">
                          {setting.description}
                        </p>
                      </div>
                      <Switch defaultChecked={setting.enabled} />
                    </div>
                    {index < securitySettings.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Authentication Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Session Timeout (minutes)
                  </label>
                  <Input type="number" defaultValue="30" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Password Min Length
                  </label>
                  <Input type="number" defaultValue="8" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Max Login Attempts
                  </label>
                  <Input type="number" defaultValue="5" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Account Lockout Duration (minutes)
                  </label>
                  <Input type="number" defaultValue="15" />
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="font-medium">Password Requirements</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded"
                      />
                      Uppercase letters
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded"
                      />
                      Lowercase letters
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded"
                      />
                      Numbers
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded"
                      />
                      Special characters
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  SMTP Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    SMTP Host
                  </label>
                  <Input defaultValue="smtp.fishersofmen.org" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Port
                    </label>
                    <Input defaultValue="587" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Encryption
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="tls">TLS</option>
                      <option value="ssl">SSL</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Username
                  </label>
                  <Input defaultValue="noreply@fishersofmen.org" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <Input type="password" placeholder="••••••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    From Name
                  </label>
                  <Input defaultValue="Fishers of Men" />
                </div>
                <Button variant="outline" className="w-full">
                  Test Connection
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Email Templates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {emailTemplates.map((template, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{template.name}</p>
                      <p className="text-sm text-gray-600">
                        Modified:{" "}
                        {new Date(template.lastModified).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          template.status === "active" ? "default" : "secondary"
                        }
                      >
                        {template.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Add New Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Theme Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Primary Color
                  </label>
                  <div className="flex gap-2">
                    <Input defaultValue="#2563eb" className="flex-1" />
                    <div className="w-10 h-10 bg-blue-600 rounded border"></div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Secondary Color
                  </label>
                  <div className="flex gap-2">
                    <Input defaultValue="#7c3aed" className="flex-1" />
                    <div className="w-10 h-10 bg-purple-600 rounded border"></div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Accent Color
                  </label>
                  <div className="flex gap-2">
                    <Input defaultValue="#059669" className="flex-1" />
                    <div className="w-10 h-10 bg-emerald-600 rounded border"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-gray-600">
                      Enable dark theme support
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Logo & Branding</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Site Logo
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload logo
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Favicon
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Upload favicon</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Footer Text
                  </label>
                  <Textarea
                    defaultValue="© 2024 Fishers of Men. All rights reserved."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Backup Settings */}
        <TabsContent value="backup">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Backup Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Automatic Backups</p>
                    <p className="text-sm text-gray-600">
                      Enable scheduled backups
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Backup Frequency
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="daily" selected>
                      Daily
                    </option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Backup Time
                  </label>
                  <Input type="time" defaultValue="02:00" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Retention Period (days)
                  </label>
                  <Input type="number" defaultValue="30" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-600">
                      Notify admins of backup status
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Backups</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    date: "2024-01-15 02:00",
                    size: "245 MB",
                    status: "success",
                  },
                  {
                    date: "2024-01-14 02:00",
                    size: "242 MB",
                    status: "success",
                  },
                  {
                    date: "2024-01-13 02:00",
                    size: "238 MB",
                    status: "success",
                  },
                  {
                    date: "2024-01-12 02:00",
                    size: "235 MB",
                    status: "failed",
                  },
                  {
                    date: "2024-01-11 02:00",
                    size: "232 MB",
                    status: "success",
                  },
                ].map((backup, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-sm">{backup.date}</p>
                      <p className="text-xs text-gray-600">{backup.size}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          backup.status === "success"
                            ? "default"
                            : "destructive"
                        }
                        className={
                          backup.status === "success" ? "bg-green-600" : ""
                        }
                      >
                        {backup.status}
                      </Badge>
                      {backup.status === "success" && (
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  Create Manual Backup
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Third-party Integrations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    name: "Google Analytics",
                    description: "Track website analytics",
                    status: "connected",
                  },
                  {
                    name: "Mailchimp",
                    description: "Email marketing platform",
                    status: "connected",
                  },
                  {
                    name: "Zoom",
                    description: "Video conferencing",
                    status: "disconnected",
                  },
                  {
                    name: "PayPal",
                    description: "Online donations",
                    status: "connected",
                  },
                  {
                    name: "Twilio",
                    description: "SMS notifications",
                    status: "disconnected",
                  },
                ].map((integration, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{integration.name}</p>
                      <p className="text-sm text-gray-600">
                        {integration.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          integration.status === "connected"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          integration.status === "connected"
                            ? "bg-green-600"
                            : ""
                        }
                      >
                        {integration.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        {integration.status === "connected"
                          ? "Configure"
                          : "Connect"}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    API Rate Limit (requests/hour)
                  </label>
                  <Input type="number" defaultValue="1000" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">API Access</p>
                    <p className="text-sm text-gray-600">
                      Enable external API access
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div>
                  <p className="font-medium mb-2">API Keys</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input value="sk_live_..." className="flex-1" readOnly />
                      <Button variant="outline" size="sm">
                        Copy
                      </Button>
                      <Button variant="outline" size="sm">
                        Regenerate
                      </Button>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View API Documentation
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Warning Notice */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <p className="font-medium text-orange-800">Important Notice</p>
              <p className="text-sm text-orange-700 mt-1">
                Changes to system settings may affect platform functionality.
                Always test changes in a staging environment before applying to
                production. Create a backup before making significant changes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
