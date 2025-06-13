import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  MessageSquare,
  Download,
  RefreshCw,
  Eye,
  Clock,
  Activity,
  PieChart,
  Target,
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const analyticsOverview = [
    {
      title: "Total Page Views",
      value: "124,567",
      change: "+15%",
      changeType: "positive",
      period: "vs last month",
      icon: Eye,
    },
    {
      title: "Unique Visitors",
      value: "8,924",
      change: "+12%",
      changeType: "positive",
      period: "vs last month",
      icon: Users,
    },
    {
      title: "Session Duration",
      value: "4m 32s",
      change: "+8%",
      changeType: "positive",
      period: "average",
      icon: Clock,
    },
    {
      title: "Bounce Rate",
      value: "32%",
      change: "-5%",
      changeType: "positive",
      period: "vs last month",
      icon: TrendingUp,
    },
    {
      title: "Event Registrations",
      value: "456",
      change: "+23%",
      changeType: "positive",
      period: "this month",
      icon: Calendar,
    },
    {
      title: "Prayer Requests",
      value: "189",
      change: "+7%",
      changeType: "positive",
      period: "this month",
      icon: MessageSquare,
    },
  ];

  const topPages = [
    { page: "/", views: 12456, sessions: 8234, conversion: "12.3%" },
    { page: "/sermons", views: 8901, sessions: 6543, conversion: "18.7%" },
    { page: "/events", views: 6789, sessions: 4321, conversion: "25.6%" },
    {
      page: "/bible-studies",
      views: 5432,
      sessions: 3876,
      conversion: "15.2%",
    },
    { page: "/community", views: 4567, sessions: 3123, conversion: "8.9%" },
  ];

  const userEngagement = [
    { metric: "New Users", value: "1,234", percentage: 45 },
    { metric: "Returning Users", value: "1,789", percentage: 55 },
    { metric: "Mobile Users", value: "1,890", percentage: 58 },
    { metric: "Desktop Users", value: "1,133", percentage: 42 },
  ];

  const contentPerformance = [
    { type: "Sermons", views: 15678, engagement: "87%", avgTime: "18m 45s" },
    {
      type: "Bible Studies",
      views: 12345,
      engagement: "92%",
      avgTime: "25m 12s",
    },
    { type: "Devotionals", views: 9876, engagement: "78%", avgTime: "8m 30s" },
    { type: "Testimonies", views: 6543, engagement: "89%", avgTime: "12m 15s" },
    {
      type: "Mission Reports",
      views: 4321,
      engagement: "84%",
      avgTime: "15m 20s",
    },
  ];

  const timeRanges = [
    "Last 7 days",
    "Last 30 days",
    "Last 3 months",
    "Last year",
    "All time",
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Track platform performance and user engagement
          </p>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-md">
            {timeRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {analyticsOverview.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <div className="flex items-center gap-1">
                    <span
                      className={`text-sm ${
                        metric.changeType === "positive"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {metric.change}
                    </span>
                    <span className="text-sm text-gray-500">
                      {metric.period}
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <metric.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Charts and Trends */}
        <div className="lg:col-span-2 space-y-6">
          {/* Traffic Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Traffic Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="visitors" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="visitors">Visitors</TabsTrigger>
                  <TabsTrigger value="pageviews">Page Views</TabsTrigger>
                  <TabsTrigger value="sessions">Sessions</TabsTrigger>
                </TabsList>

                <TabsContent value="visitors" className="space-y-4">
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Visitor Traffic Chart</p>
                      <p className="text-sm text-gray-500">
                        Interactive chart showing visitor trends
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="pageviews" className="space-y-4">
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Page Views Chart</p>
                      <p className="text-sm text-gray-500">
                        Page view analytics over time
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="sessions" className="space-y-4">
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Clock className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Session Analytics</p>
                      <p className="text-sm text-gray-500">
                        User session data and duration
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Top Pages Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{page.page}</p>
                      <div className="flex gap-4 text-sm text-gray-600 mt-1">
                        <span>{page.views.toLocaleString()} views</span>
                        <span>{page.sessions.toLocaleString()} sessions</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">
                        {page.conversion} conversion
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Content Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contentPerformance.map((content, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{content.type}</span>
                      <div className="flex gap-3 text-sm text-gray-600">
                        <span>{content.views.toLocaleString()} views</span>
                        <span>{content.engagement} engaged</span>
                        <span>{content.avgTime} avg. time</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: content.engagement }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - User Demographics & Quick Stats */}
        <div className="space-y-6">
          {/* User Demographics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                User Demographics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userEngagement.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{metric.metric}</span>
                    <span className="text-sm text-gray-600">
                      {metric.value}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${metric.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 text-right">
                    {metric.percentage}%
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Real-time Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Real-time Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Users online now</span>
                <Badge variant="default" className="bg-green-600">
                  47
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active sessions</span>
                <Badge variant="secondary">234</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Page views (last hour)
                </span>
                <Badge variant="outline">1,247</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  New registrations today
                </span>
                <Badge variant="default">12</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Top Referrers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Referrers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { source: "Direct", percentage: 45, visits: "2,345" },
                { source: "Google", percentage: 32, visits: "1,678" },
                { source: "Facebook", percentage: 15, visits: "789" },
                { source: "Instagram", percentage: 8, visits: "423" },
              ].map((referrer, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{referrer.source}</span>
                    <span className="text-gray-600">
                      {referrer.visits} visits
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full"
                      style={{ width: `${referrer.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Goals & Conversions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Goals & Conversions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { goal: "Event Registration", rate: "18.5%", completions: 234 },
                { goal: "Newsletter Signup", rate: "12.3%", completions: 156 },
                { goal: "Prayer Request", rate: "8.7%", completions: 89 },
                { goal: "Small Group Join", rate: "6.2%", completions: 67 },
              ].map((goal, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 border rounded"
                >
                  <div>
                    <p className="text-sm font-medium">{goal.goal}</p>
                    <p className="text-xs text-gray-600">
                      {goal.completions} completions
                    </p>
                  </div>
                  <Badge variant="outline">{goal.rate}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Export and Reporting */}
      <Card>
        <CardHeader>
          <CardTitle>Export & Reporting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export PDF Report
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Excel Data
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Schedule Report
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Generate comprehensive reports for stakeholders and ministry leaders
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
