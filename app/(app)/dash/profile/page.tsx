"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, BookOpen, Edit, Camera, Calendar, Save, X } from "lucide-react";
import { MINISTRY_INTERESTS } from "@/lib/types/auth";
import { toast } from "sonner";

interface ProfileData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatarUrl?: string;
  role: string;
  displayNamePreference: string;
  profileVisibility: string;
  ministryInterests: string[];
  certificateSharingEnabled: boolean;
  joinedDate: string;
  stats: {
    completedCourses: number;
    upcomingEvents: number;
    prayerRequests: number;
    posts: number;
  };
  recentActivity: Array<{
    id: string;
    type: string;
    title: string;
    date: string;
    icon: string;
  }>;
}

export default function DashProfilePage() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const fetchProfileData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/profile");
      if (response.ok) {
        const data = await response.json();
        setProfileData(data.profile);
        setSelectedInterests(data.profile.ministryInterests || []);
      }
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfileData();
    }
  }, [user, fetchProfileData]);

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSaveInterests = async () => {
    try {
      const response = await fetch("/api/profile/interests", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ministryInterests: selectedInterests,
        }),
      });

      if (response.ok) {
        toast.success("Ministry interests updated successfully");
        setIsEditingInterests(false);
        fetchProfileData();
      } else {
        toast.error("Failed to update interests");
      }
    } catch (error) {
      console.error("Failed to save interests:", error);
      toast.error("Failed to update interests");
    }
  };

  const getActivityIcon = (iconName: string) => {
    switch (iconName) {
      case "BookOpen":
        return BookOpen;
      case "Calendar":
        return Calendar;
      case "User":
        return User;
      default:
        return BookOpen;
    }
  };

  if (!user || loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Loading...</h2>
          <p className="text-gray-600">
            Please wait while we load your profile.
          </p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">Error</h2>
          <p className="text-gray-600">Failed to load profile data.</p>
          <Button onClick={fetchProfileData} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

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
        <Button className="bg-blue-950 hover:bg-blue-800 text-gray-100">
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
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage
                    src={profileData.avatarUrl}
                    alt={profileData.username}
                  />
                  <AvatarFallback className="bg-blue-100 text-blue-950 text-2xl">
                    {profileData.firstName.charAt(0)}
                    {profileData.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <CardTitle className="text-xl">
                {profileData.firstName} {profileData.lastName}
              </CardTitle>
              <CardDescription>@{profileData.username}</CardDescription>
              <Badge className="mt-2 bg-blue-100 text-blue-800">
                {profileData.role}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Member since {profileData.joinedDate}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-950">
                    {profileData.stats.completedCourses}
                  </div>
                  <div className="text-xs text-gray-600">Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-950">
                    {profileData.stats.prayerRequests}
                  </div>
                  <div className="text-xs text-gray-600">Prayers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-950">
                    {profileData.stats.upcomingEvents}
                  </div>
                  <div className="text-xs text-gray-600">Events</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-950">
                    {profileData.stats.posts}
                  </div>
                  <div className="text-xs text-gray-600">Posts</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Profile Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="text-gray-900">{profileData.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <p className="text-gray-900">@{profileData.username}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ministry Interests */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Ministry Interests</CardTitle>
                <CardDescription>
                  Select areas where you&apos;d like to serve or grow
                </CardDescription>
              </div>
              {!isEditingInterests ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditingInterests(true)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSaveInterests}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsEditingInterests(false);
                      setSelectedInterests(profileData.ministryInterests);
                    }}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {isEditingInterests ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {MINISTRY_INTERESTS.map((interest) => (
                    <label
                      key={interest}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedInterests.includes(interest)}
                        onChange={() => handleInterestToggle(interest)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{interest}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profileData.ministryInterests.length > 0 ? (
                    profileData.ministryInterests.map((interest) => (
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No ministry interests selected yet.
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest actions on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              {profileData.recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {profileData.recentActivity.map((activity) => {
                    const IconComponent = getActivityIcon(activity.icon);
                    return (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-3 p-3 border border-gray-100 rounded-lg"
                      >
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <IconComponent className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.date}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No recent activity yet.</p>
              )}
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">
                    Profile Visibility
                  </label>
                  <p className="text-xs text-gray-500">
                    Control who can see your profile
                  </p>
                </div>
                <Badge variant="outline">{profileData.profileVisibility}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">
                    Certificate Sharing
                  </label>
                  <p className="text-xs text-gray-500">
                    Allow others to see your earned certificates
                  </p>
                </div>
                <Badge
                  variant={
                    profileData.certificateSharingEnabled
                      ? "default"
                      : "secondary"
                  }
                >
                  {profileData.certificateSharingEnabled
                    ? "Enabled"
                    : "Disabled"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
