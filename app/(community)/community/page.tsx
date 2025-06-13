import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Home,
  Users,
  MessageCircle,
  Calendar,
  Heart,
  UserPlus,
  ArrowRight,
} from "lucide-react";

export default function CommunityHubPage() {
  const communityStats = [
    { label: "Active Members", value: "1,247", icon: Users },
    { label: "Small Groups", value: "23", icon: Users },
    { label: "Prayer Requests", value: "89", icon: Heart },
    { label: "Events This Month", value: "12", icon: Calendar },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "prayer",
      user: "Sarah M.",
      action: "requested prayer for healing",
      time: "2 hours ago",
      icon: Heart,
    },
    {
      id: 2,
      type: "group",
      user: "Michael T.",
      action: "joined the Young Adults small group",
      time: "4 hours ago",
      icon: Users,
    },
    {
      id: 3,
      type: "event",
      user: "Jennifer L.",
      action: "signed up for the community picnic",
      time: "6 hours ago",
      icon: Calendar,
    },
    {
      id: 4,
      type: "testimony",
      user: "David K.",
      action: "shared a testimony",
      time: "1 day ago",
      icon: MessageCircle,
    },
  ];

  const quickActions = [
    {
      title: "Join a Small Group",
      description: "Connect with others in your area or interests",
      href: "/groups",
      icon: Users,
      color: "bg-blue-950",
    },
    {
      title: "Submit Prayer Request",
      description: "Ask our community to pray for you",
      href: "/prayer",
      icon: Heart,
      color: "bg-green-700",
    },
    {
      title: "Find Fellowship Events",
      description: "Discover upcoming community gatherings",
      href: "/fellowship",
      icon: Calendar,
      color: "bg-purple-700",
    },
    {
      title: "Connect with Others",
      description: "Meet new people and build relationships",
      href: "/connect",
      icon: UserPlus,
      color: "bg-orange-700",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Home className="w-8 h-8 text-blue-950 mr-3" />
          <h1 className="text-4xl font-bold text-blue-950">Community Hub</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Welcome to our community! Connect with fellow believers, join small
          groups, share prayer requests, and grow together in faith.
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {communityStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow"
            >
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <IconComponent className="w-6 h-6 text-blue-950" />
                </div>
                <div className="text-2xl font-bold text-blue-950 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-blue-950 mb-6 text-center">
          Get Connected
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-blue-200"
              >
                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 ${action.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-blue-950 transition-colors">
                    {action.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {action.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button
                    className="w-full bg-blue-950 hover:bg-blue-800"
                    asChild
                  >
                    <a href={action.href}>
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Community Activity */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-blue-950" />
                Recent Community Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const IconComponent = activity.icon;
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-4 h-4 text-blue-950" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.user}</span>{" "}
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Community Guidelines */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-950 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Be respectful and kind to all members</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-950 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Keep discussions edifying and Christ-centered</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-950 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Respect privacy and confidentiality</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-950 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Support and encourage one another</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                Read Full Guidelines
              </Button>
            </CardContent>
          </Card>

          {/* This Week's Highlights */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">
                This Week&apos;s Highlights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-950 text-sm">
                    Community Picnic
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Saturday, 2:00 PM
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-medium text-green-800 text-sm">
                    Prayer Night
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Wednesday, 7:00 PM
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="font-medium text-purple-800 text-sm">
                    New Members Welcome
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Sunday after service
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
