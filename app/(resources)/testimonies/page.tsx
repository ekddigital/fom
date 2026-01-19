import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Calendar, Heart, Share, Quote } from "lucide-react";

export default function TestimoniesPage() {
  const testimonies = [
    {
      id: 1,
      title: "From Darkness to Light",
      author: "Sarah M.",
      location: "Portland, OR",
      date: "2025-06-01",
      category: "Salvation",
      excerpt:
        "I was lost in addiction and despair until I encountered Christ through this ministry. My life has completely transformed...",
      featured: true,
      tags: ["Salvation", "Recovery", "Transformation"],
    },
    {
      id: 2,
      title: "Healing in the Midst of Loss",
      author: "Michael T.",
      location: "Seattle, WA",
      date: "2025-05-28",
      category: "Healing",
      excerpt:
        "When I lost my wife to cancer, I thought my faith was gone. But God showed me His love through this community...",
      featured: false,
      tags: ["Healing", "Grief", "Community"],
    },
    {
      id: 3,
      title: "Called to Serve",
      author: "Jennifer L.",
      location: "Tacoma, WA",
      date: "2025-05-25",
      category: "Ministry",
      excerpt:
        "God used a mission trip organized by FOM to show me my calling to serve orphans in Guatemala...",
      featured: false,
      tags: ["Mission", "Calling", "Service"],
    },
    {
      id: 4,
      title: "Restored Marriage",
      author: "David & Lisa K.",
      location: "Spokane, WA",
      date: "2025-05-20",
      category: "Relationships",
      excerpt:
        "Our marriage was on the brink of divorce until we joined a small group and learned what biblical love really means...",
      featured: false,
      tags: ["Marriage", "Restoration", "Small Groups"],
    },
    {
      id: 5,
      title: "Finding My Identity in Christ",
      author: "Alex R.",
      location: "Bellevue, WA",
      date: "2025-05-15",
      category: "Identity",
      excerpt:
        "As a young adult struggling with identity and purpose, FOM helped me discover who I am in Christ...",
      featured: false,
      tags: ["Identity", "Young Adult", "Purpose"],
    },
  ];

  const categories = [
    "All",
    "Salvation",
    "Healing",
    "Ministry",
    "Relationships",
    "Identity",
    "Mission",
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      Salvation: "bg-green-100 text-green-800 border-green-200",
      Healing: "bg-blue-100 text-blue-800 border-blue-200",
      Ministry: "bg-purple-100 text-purple-800 border-purple-200",
      Relationships: "bg-pink-100 text-pink-800 border-pink-200",
      Identity: "bg-orange-100 text-orange-800 border-orange-200",
      Mission: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <MessageCircle className="w-8 h-8 text-blue-950 mr-3" />
          <h1 className="text-4xl font-bold text-blue-950">Testimonies</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Read inspiring stories of how God has transformed lives through our
          ministry. These testimonies are a testament to His power and love.
        </p>
      </div>

      {/* Featured Testimony */}
      {testimonies
        .filter((t) => t.featured)
        .map((testimony) => (
          <Card
            key={testimony.id}
            className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50"
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-blue-950 text-white">
                  Featured Testimony
                </Badge>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(testimony.date).toLocaleDateString()}
                </div>
              </div>
              <CardTitle className="text-2xl text-blue-950 mb-2">
                {testimony.title}
              </CardTitle>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span className="font-medium">{testimony.author}</span>
                <span>{testimony.location}</span>
                <Badge className={getCategoryColor(testimony.category)}>
                  {testimony.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start mb-4">
                <Quote className="w-6 h-6 text-blue-300 mr-3 mt-1 flex-shrink-0" />
                <CardDescription className="text-base text-gray-700 italic">
                  {testimony.excerpt}
                </CardDescription>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {testimony.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-blue-950 hover:bg-blue-800">
                    Read Full Story
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={category === "All" ? "default" : "outline"}
            size="sm"
            className={
              category === "All" ? "bg-blue-950 hover:bg-blue-800" : ""
            }
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Testimonies Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {testimonies
          .filter((t) => !t.featured)
          .map((testimony) => (
            <Card
              key={testimony.id}
              className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-blue-200"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getCategoryColor(testimony.category)}>
                    {testimony.category}
                  </Badge>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(testimony.date).toLocaleDateString()}
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-blue-950 transition-colors">
                  {testimony.title}
                </CardTitle>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{testimony.author}</span> •{" "}
                  {testimony.location}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-start mb-4">
                  <Quote className="w-4 h-4 text-blue-300 mr-2 mt-1 flex-shrink-0" />
                  <CardDescription className="text-sm text-gray-600 line-clamp-3 italic">
                    {testimony.excerpt}
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {testimony.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {testimony.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{testimony.tags.length - 2}
                    </Badge>
                  )}
                </div>
                <Button
                  size="sm"
                  className="w-full bg-blue-950 hover:bg-blue-800"
                >
                  Read Full Story
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-lg p-8 text-center text-white">
        <Heart className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">Share Your Story</h3>
        <p className="mb-6 opacity-90">
          Has God transformed your life? We&apos;d love to hear your testimony
          and share it to encourage others.
        </p>
        <Button size="lg" className="bg-white text-blue-950 hover:bg-gray-100">
          Submit Your Testimony
        </Button>
      </div>
    </div>
  );
}
