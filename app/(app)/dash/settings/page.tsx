import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  Shield,
  User,
  Mail,
  Globe,
  Smartphone,
  Save,
} from "lucide-react";

export default function DashSettingsPage() {
  const settingsData = {
    notifications: {
      email: {
        newsletters: true,
        prayerRequests: true,
        eventReminders: true,
        groupUpdates: false,
        ministryAlerts: true,
      },
      push: {
        prayerRequests: true,
        eventReminders: true,
        groupMessages: false,
        dailyDevotionals: true,
      },
    },
    privacy: {
      profileVisibility: "Members Only",
      showEmail: false,
      showPhone: false,
      allowMessages: true,
      showLocation: true,
    },
    account: {
      twoFactorEnabled: false,
      loginAlerts: true,
      sessionTimeout: "30 minutes",
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-950">Settings</h1>
          <p className="text-gray-600">
            Manage your account preferences and privacy settings
          </p>
        </div>
        <Button className="bg-blue-950 hover:bg-blue-800">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Settings Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start bg-blue-50 text-blue-950"
              >
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Privacy & Security
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <User className="w-4 h-4 mr-2" />
                Profile Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Globe className="w-4 h-4 mr-2" />
                Preferences
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Email Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Email Notifications
              </CardTitle>
              <CardDescription>
                Choose which email notifications you&apos;d like to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Newsletters & Updates
                  </label>
                  <p className="text-xs text-gray-500">
                    Weekly church news and ministry updates
                  </p>
                </div>
                <Switch
                  checked={settingsData.notifications.email.newsletters}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Prayer Request Notifications
                  </label>
                  <p className="text-xs text-gray-500">
                    When new prayer requests are submitted
                  </p>
                </div>
                <Switch
                  checked={settingsData.notifications.email.prayerRequests}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Event Reminders
                  </label>
                  <p className="text-xs text-gray-500">
                    Reminders for upcoming events you&apos;ve registered for
                  </p>
                </div>
                <Switch
                  checked={settingsData.notifications.email.eventReminders}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Small Group Updates
                  </label>
                  <p className="text-xs text-gray-500">
                    Messages and updates from your small groups
                  </p>
                </div>
                <Switch
                  checked={settingsData.notifications.email.groupUpdates}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Ministry Alerts
                  </label>
                  <p className="text-xs text-gray-500">
                    Important updates from ministries you&apos;re involved in
                  </p>
                </div>
                <Switch
                  checked={settingsData.notifications.email.ministryAlerts}
                />
              </div>
            </CardContent>
          </Card>

          {/* Push Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="w-5 h-5 mr-2" />
                Push Notifications
              </CardTitle>
              <CardDescription>
                Manage mobile and browser push notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Prayer Requests
                  </label>
                  <p className="text-xs text-gray-500">
                    Urgent prayer request notifications
                  </p>
                </div>
                <Switch
                  checked={settingsData.notifications.push.prayerRequests}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Event Reminders
                  </label>
                  <p className="text-xs text-gray-500">
                    Push reminders for upcoming events
                  </p>
                </div>
                <Switch
                  checked={settingsData.notifications.push.eventReminders}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Group Messages
                  </label>
                  <p className="text-xs text-gray-500">
                    New messages in your small groups
                  </p>
                </div>
                <Switch
                  checked={settingsData.notifications.push.groupMessages}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Daily Devotionals
                  </label>
                  <p className="text-xs text-gray-500">
                    Daily devotional reminders
                  </p>
                </div>
                <Switch
                  checked={settingsData.notifications.push.dailyDevotionals}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Privacy & Visibility
              </CardTitle>
              <CardDescription>
                Control who can see your information and contact you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-900 mb-2 block">
                  Profile Visibility
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="public">Public - Everyone can see</option>
                  <option value="members" selected>
                    Members Only - Church members can see
                  </option>
                  <option value="private">Private - Only me</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Who can view your profile information
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Show Email Address
                  </label>
                  <p className="text-xs text-gray-500">
                    Allow others to see your email
                  </p>
                </div>
                <Switch checked={settingsData.privacy.showEmail} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Show Phone Number
                  </label>
                  <p className="text-xs text-gray-500">
                    Allow others to see your phone number
                  </p>
                </div>
                <Switch checked={settingsData.privacy.showPhone} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Allow Direct Messages
                  </label>
                  <p className="text-xs text-gray-500">
                    Let other members send you messages
                  </p>
                </div>
                <Switch checked={settingsData.privacy.allowMessages} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Show Location
                  </label>
                  <p className="text-xs text-gray-500">
                    Display your city/state on your profile
                  </p>
                </div>
                <Switch checked={settingsData.privacy.showLocation} />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Account Security
              </CardTitle>
              <CardDescription>
                Manage your account security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Two-Factor Authentication
                  </label>
                  <p className="text-xs text-gray-500">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch checked={settingsData.account.twoFactorEnabled} />
                  {!settingsData.account.twoFactorEnabled && (
                    <Badge variant="outline" className="text-xs">
                      Recommended
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Login Alerts
                  </label>
                  <p className="text-xs text-gray-500">
                    Get notified of new logins to your account
                  </p>
                </div>
                <Switch checked={settingsData.account.loginAlerts} />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900 mb-2 block">
                  Session Timeout
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="15">15 minutes</option>
                  <option value="30" selected>
                    30 minutes
                  </option>
                  <option value="60">1 hour</option>
                  <option value="never">Never (not recommended)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  How long before you&apos;re automatically logged out
                </p>
              </div>

              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  View Login History
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700"
                >
                  Download My Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-red-700">Danger Zone</CardTitle>
              <CardDescription>Irreversible account actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
              >
                Deactivate Account
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
              >
                Delete Account Permanently
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
