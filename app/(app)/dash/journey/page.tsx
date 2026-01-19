import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  BookOpen,
  Calendar,
  Heart,
  Users,
  TrendingUp,
  Target,
  Star,
} from "lucide-react";

export default function DashJourneyPage() {
  const spiritualJourney = {
    memberSince: "January 2024",
    currentLevel: "Growing Believer",
    nextLevel: "Mature Disciple",
    overallProgress: 65,
    stats: {
      coursesCompleted: 5,
      eventsAttended: 12,
      prayersOffered: 47,
      ministriesJoined: 2,
    },
  };

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Completed your first Bible study course",
      icon: BookOpen,
      earned: true,
      earnedDate: "February 2024",
      color: "bg-green-100 text-green-800",
    },
    {
      id: 2,
      title: "Prayer Warrior",
      description: "Submitted 25+ prayer requests or prayers",
      icon: Heart,
      earned: true,
      earnedDate: "April 2024",
      color: "bg-red-100 text-red-800",
    },
    {
      id: 3,
      title: "Community Builder",
      description: "Joined a small group and attended 5+ meetings",
      icon: Users,
      earned: true,
      earnedDate: "March 2024",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: 4,
      title: "Faithful Attendee",
      description: "Attended 10+ church events",
      icon: Calendar,
      earned: false,
      progress: 80,
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: 5,
      title: "Ministry Leader",
      description: "Lead or co-lead a ministry for 3+ months",
      icon: Target,
      earned: false,
      progress: 25,
      color: "bg-orange-100 text-orange-800",
    },
    {
      id: 6,
      title: "Disciple Maker",
      description: "Mentor a new believer for 6+ months",
      icon: TrendingUp,
      earned: false,
      progress: 0,
      color: "bg-yellow-100 text-yellow-800",
    },
  ];

  const completedCourses = [
    {
      title: "Introduction to Christianity",
      completedDate: "February 2024",
      certificate: true,
    },
    {
      title: "Basic Bible Study Methods",
      completedDate: "March 2024",
      certificate: true,
    },
    {
      title: "Prayer and Devotional Life",
      completedDate: "April 2024",
      certificate: true,
    },
    {
      title: "Understanding the Gospel",
      completedDate: "May 2024",
      certificate: false,
    },
    {
      title: "Christian Living Basics",
      completedDate: "June 2024",
      certificate: false,
    },
  ];

  const upcomingMilestones = [
    {
      title: "Complete 10 Courses",
      progress: 50,
      description: "5 of 10 courses completed",
    },
    {
      title: "Attend 20 Events",
      progress: 60,
      description: "12 of 20 events attended",
    },
    {
      title: "Join Ministry Team",
      progress: 75,
      description: "Almost ready to lead!",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-950">
          My Spiritual Journey
        </h1>
        <p className="text-gray-600">
          Track your growth and celebrate milestones in your faith journey
        </p>
      </div>

      {/* Journey Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Journey Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Current Level
                  </span>
                  <Badge className="bg-blue-100 text-blue-800">
                    {spiritualJourney.currentLevel}
                  </Badge>
                </div>
                <Progress
                  value={spiritualJourney.overallProgress}
                  className="h-3"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{spiritualJourney.currentLevel}</span>
                  <span>{spiritualJourney.nextLevel}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Member since {spiritualJourney.memberSince} •{" "}
                {spiritualJourney.overallProgress}% to next level
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-950">
                  {spiritualJourney.stats.coursesCompleted}
                </div>
                <div className="text-xs text-gray-600">Courses</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-700">
                  {spiritualJourney.stats.eventsAttended}
                </div>
                <div className="text-xs text-gray-600">Events</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-700">
                  {spiritualJourney.stats.prayersOffered}
                </div>
                <div className="text-xs text-gray-600">Prayers</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-700">
                  {spiritualJourney.stats.ministriesJoined}
                </div>
                <div className="text-xs text-gray-600">Ministries</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Achievements */}
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Achievements & Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border ${
                        achievement.earned
                          ? "bg-gray-50"
                          : "bg-white border-dashed"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            achievement.earned
                              ? achievement.color
                              : "bg-gray-100"
                          }`}
                        >
                          <IconComponent
                            className={`w-5 h-5 ${
                              achievement.earned ? "" : "text-gray-400"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4
                              className={`font-medium ${
                                achievement.earned
                                  ? "text-gray-900"
                                  : "text-gray-500"
                              }`}
                            >
                              {achievement.title}
                            </h4>
                            {achievement.earned && (
                              <Badge className="bg-green-100 text-green-800">
                                <Star className="w-3 h-3 mr-1" />
                                Earned
                              </Badge>
                            )}
                          </div>
                          <p
                            className={`text-sm ${
                              achievement.earned
                                ? "text-gray-600"
                                : "text-gray-400"
                            }`}
                          >
                            {achievement.description}
                          </p>
                          {achievement.earned && achievement.earnedDate && (
                            <p className="text-xs text-gray-500 mt-1">
                              Earned in {achievement.earnedDate}
                            </p>
                          )}
                          {!achievement.earned &&
                            achievement.progress !== undefined && (
                              <div className="mt-2">
                                <Progress
                                  value={achievement.progress}
                                  className="h-2"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                  {achievement.progress}% complete
                                </p>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Milestones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Upcoming Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingMilestones.map((milestone, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">
                        {milestone.title}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {milestone.progress}%
                      </span>
                    </div>
                    <Progress value={milestone.progress} className="h-2 mb-1" />
                    <p className="text-xs text-gray-600">
                      {milestone.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Journey */}
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Learning Journey
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {completedCourses.map((course, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {course.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Completed {course.completedDate}
                      </p>
                    </div>
                    {course.certificate && (
                      <Badge className="bg-green-100 text-green-800">
                        <Award className="w-3 h-3 mr-1" />
                        Certificate
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Courses
              </Button>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Next Steps</CardTitle>
              <CardDescription>
                Continue growing in your faith journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <h4 className="font-medium text-gray-900">
                    Join a Ministry Team
                  </h4>
                  <p className="text-sm text-gray-600">
                    Use your gifts to serve others
                  </p>
                </div>
                <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <h4 className="font-medium text-gray-900">
                    Advanced Bible Study
                  </h4>
                  <p className="text-sm text-gray-600">
                    Deepen your biblical knowledge
                  </p>
                </div>
                <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <h4 className="font-medium text-gray-900">
                    Mentor a New Believer
                  </h4>
                  <p className="text-sm text-gray-600">
                    Share your faith journey with others
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
