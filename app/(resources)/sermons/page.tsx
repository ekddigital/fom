import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, Calendar, Clock, User, Play } from "lucide-react";

export default function SermonsPage() {
  const sermons = [
    {
      id: 1,
      title: "Walking in Faith: Trust in God's Plan",
      speaker: "Pastor John Smith",
      date: "2025-06-08",
      duration: "45 min",
      thumbnail: "/api/placeholder/300/200",
      description:
        "A powerful message about trusting in God's perfect timing and plan for our lives.",
      series: "Faith Foundations",
      category: "Sunday Service",
    },
    {
      id: 2,
      title: "The Great Commission: Our Calling",
      speaker: "Pastor Sarah Johnson",
      date: "2025-06-01",
      duration: "38 min",
      thumbnail: "/api/placeholder/300/200",
      description:
        "Understanding our role as disciples in spreading the gospel to all nations.",
      series: "Mission Focus",
      category: "Evening Service",
    },
    {
      id: 3,
      title: "Love Your Neighbor: Practical Christianity",
      speaker: "Pastor Michael Brown",
      date: "2025-05-25",
      duration: "42 min",
      thumbnail: "/api/placeholder/300/200",
      description:
        "How to live out Christ's love in our daily interactions and relationships.",
      series: "Living Like Jesus",
      category: "Sunday Service",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Video className="w-8 h-8 text-blue-950 mr-3" />
          <h1 className="text-4xl font-bold text-blue-950">Sermons</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Watch and listen to inspiring messages that will strengthen your faith
          and deepen your relationship with Christ.
        </p>
      </div>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <Button variant="default" size="sm">
          All Sermons
        </Button>
        <Button variant="outline" size="sm">
          Sunday Service
        </Button>
        <Button variant="outline" size="sm">
          Evening Service
        </Button>
        <Button variant="outline" size="sm">
          Special Events
        </Button>
        <Button variant="outline" size="sm">
          Guest Speakers
        </Button>
      </div>

      {/* Sermons Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {sermons.map((sermon) => (
          <Card
            key={sermon.id}
            className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-blue-200"
          >
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg bg-gray-200 h-48">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-blue-950 text-white">
                    {sermon.category}
                  </Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="lg"
                    className="rounded-full bg-white/90 text-blue-950 hover:bg-white"
                  >
                    <Play className="w-6 h-6" />
                  </Button>
                </div>
                <div className="absolute bottom-3 right-3">
                  <Badge variant="secondary" className="bg-black/50 text-white">
                    <Clock className="w-3 h-3 mr-1" />
                    {sermon.duration}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {sermon.series}
                </Badge>
              </div>
              <CardTitle className="text-lg mb-2 group-hover:text-blue-950 transition-colors">
                {sermon.title}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 mb-4">
                {sermon.description}
              </CardDescription>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {sermon.speaker}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(sermon.date).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-6 pb-6">
              <Button className="w-full bg-blue-950 hover:bg-blue-800">
                <Play className="w-4 h-4 mr-2" />
                Watch Sermon
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Load More Section */}
      <div className="text-center">
        <Button variant="outline" size="lg" className="px-8">
          Load More Sermons
        </Button>
      </div>
    </div>
  );
}
