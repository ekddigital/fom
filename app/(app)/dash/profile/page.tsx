import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Settings,
  BookOpen,
  Award,
  Edit,
  Camera,
  MapPin,
  Calendar,
} from "lucide-react";

export default function DashProfilePage() {
  const userProfile = {
    firstName: "John",
    lastName: "Smith",
    username: "john.smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    location: "Seattle, WA",
    joinedDate: "January 2024",
    role: "Member",
    displayNamePreference: "Full Name",
    profileVisibility: "Members Only",
    bio: "Passionate about serving God and growing in faith. Love hiking, reading theology, and volunteering with youth ministry.",
    ministryInterests: ["Youth Ministry", "Worship Team", "Community Outreach"],
    spiritualGifts: ["Teaching", "Encouragement", "Leadership"],
    completedCourses: 5,
    upcomingEvents: 3,
    prayerRequests: 2,
  };

  const recentActivity = [
    {
      id: 1,
      type: "course",
      title: "Completed 'Introduction to Theology'",
      date: "2 days ago",
      icon: BookOpen,
    },
    {
      id: 2,
      type: "event",
      title: "Registered for Community Picnic",
      date: "5 days ago",
      icon: Calendar,
    },
    {
      id: 3,
      type: "ministry",
      title: "Joined Youth Ministry Team",
      date: "1 week ago",
      icon: User,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-950">My Profile</h1>
          <p className="text-gray-600">
            Manage your personal information and preferences
          </p>
        </div>
        <Button className="bg-blue-950 hover:bg-blue-800">
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="relative mx-auto mb-4">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <User className="w-12 h-12 text-blue-950" />
                </div>
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <CardTitle className="text-xl">
                {userProfile.firstName} {userProfile.lastName}
              </CardTitle>
              <CardDescription>@{userProfile.username}</CardDescription>
              <Badge className="mt-2 bg-blue-100 text-blue-800">
                {userProfile.role}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm">
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  {userProfile.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Member since {userProfile.joinedDate}
                </div>
              </div>

              {userProfile.bio && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">About</h4>
                  <p className="text-sm text-gray-600">{userProfile.bio}</p>
                </div>
              )}

              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Ministry Interests
                </h4>
                <div className="flex flex-wrap gap-2">
                  {userProfile.ministryInterests.map((interest, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Spiritual Gifts
                </h4>
                <div className="flex flex-wrap gap-2">
                  {userProfile.spiritualGifts.map((gift, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs bg-green-50 text-green-700"
                    >
                      {gift}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">My Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-950">
                    {userProfile.completedCourses}
                  </div>
                  <div className="text-xs text-gray-600">Courses</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-950">
                    {userProfile.upcomingEvents}
                  </div>
                  <div className="text-xs text-gray-600">Events</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details & Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <p className="text-gray-900">{userProfile.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <p className="text-gray-900">{userProfile.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <p className="text-gray-900">{userProfile.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <p className="text-gray-900">@{userProfile.username}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Privacy & Display Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Display Name Preference
                  </label>
                  <p className="text-gray-900 mb-2">
                    {userProfile.displayNamePreference}
                  </p>
                  <p className="text-xs text-gray-500">
                    How your name appears to other members
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Profile Visibility
                  </label>
                  <p className="text-gray-900 mb-2">
                    {userProfile.profileVisibility}
                  </p>
                  <p className="text-xs text-gray-500">
                    Who can see your profile information
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const IconComponent = activity.icon;
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-4 h-4 text-blue-950" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Activity
              </Button>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Account Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Learning History
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="w-4 h-4 mr-2" />
                  Certificates & Achievements
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
