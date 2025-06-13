import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Calendar, Clock, Users, Download } from "lucide-react";

export default function BibleStudiesPage() {
  const studies = [
    {
      id: 1,
      title: "The Gospel of John: Life in His Name",
      description:
        "A comprehensive study through the Gospel of John, exploring the nature of Christ and eternal life.",
      weeks: 12,
      startDate: "2025-07-01",
      level: "Intermediate",
      instructor: "Pastor Sarah Johnson",
      participants: 24,
      materials: ["Study Guide", "Audio Commentary", "Workbook"],
      status: "Open for Registration",
    },
    {
      id: 2,
      title: "Ephesians: Our Identity in Christ",
      description:
        "Discover your identity as a believer and understand the riches of God's grace through Paul's letter.",
      weeks: 8,
      startDate: "2025-06-20",
      level: "Beginner",
      instructor: "Elder Mark Thompson",
      participants: 18,
      materials: ["Study Guide", "Video Lessons"],
      status: "In Progress",
    },
    {
      id: 3,
      title: "Old Testament Survey: God's Covenant Story",
      description:
        "Journey through the Old Testament and see how God's covenant unfolds throughout history.",
      weeks: 16,
      startDate: "2025-08-15",
      level: "Advanced",
      instructor: "Dr. Elizabeth Carter",
      participants: 0,
      materials: ["Textbook", "Study Guide", "Video Series"],
      status: "Coming Soon",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open for Registration":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Coming Soon":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-50 text-green-700 border-green-200";
      case "Intermediate":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Advanced":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Book className="w-8 h-8 text-blue-950 mr-3" />
          <h1 className="text-4xl font-bold text-blue-950">Bible Studies</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Deepen your understanding of God&apos;s Word through structured Bible
          studies and small group discussions.
        </p>
      </div>

      {/* Studies Grid */}
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3 mb-12">
        {studies.map((study) => (
          <Card
            key={study.id}
            className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-blue-200"
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-3">
                <Badge
                  className={`${getStatusColor(study.status)} font-medium`}
                >
                  {study.status}
                </Badge>
                <Badge variant="outline" className={getLevelColor(study.level)}>
                  {study.level}
                </Badge>
              </div>
              <CardTitle className="text-lg group-hover:text-blue-950 transition-colors">
                {study.title}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {study.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Study Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{study.weeks} weeks</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>
                      Starts {new Date(study.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{study.participants} enrolled</span>
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium">Led by:</span>{" "}
                    {study.instructor}
                  </div>
                </div>

                {/* Materials */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Study Materials
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {study.materials.map((material, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {material}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  {study.status === "Open for Registration" && (
                    <Button className="w-full bg-blue-950 hover:bg-blue-800">
                      Register Now
                    </Button>
                  )}
                  {study.status === "In Progress" && (
                    <Button variant="outline" className="w-full" disabled>
                      Registration Closed
                    </Button>
                  )}
                  {study.status === "Coming Soon" && (
                    <Button variant="outline" className="w-full">
                      Get Notified
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-blue-950 mb-4">
          Ready to Dive Deeper?
        </h3>
        <p className="text-gray-600 mb-6">
          Join one of our Bible studies and grow in your understanding of
          God&apos;s Word alongside fellow believers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-blue-950 hover:bg-blue-800">
            Browse All Studies
          </Button>
          <Button size="lg" variant="outline">
            Request a New Study
          </Button>
        </div>
      </div>
    </div>
  );
}
