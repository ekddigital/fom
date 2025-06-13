import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Clock, Heart, Share } from "lucide-react";

export default function DevotionalsPage() {
  const devotionals = [
    {
      id: 1,
      title: "Walking in His Footsteps",
      date: "2025-06-13",
      verse: "1 Peter 2:21",
      verseText:
        "To this you were called, because Christ suffered for you, leaving you an example, that you should follow in his steps.",
      excerpt:
        "Today we explore what it means to follow Christ's example in our daily lives, especially when facing difficulties and challenges...",
      author: "Pastor Sarah Johnson",
      readTime: "3 min read",
      category: "Daily Walk",
      featured: true,
    },
    {
      id: 2,
      title: "The Power of Prayer",
      date: "2025-06-12",
      verse: "Philippians 4:6-7",
      verseText:
        "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
      excerpt:
        "Discover how prayer can transform your heart and circumstances, bringing peace that surpasses understanding...",
      author: "Pastor Michael Brown",
      readTime: "4 min read",
      category: "Prayer",
      featured: false,
    },
    {
      id: 3,
      title: "God's Unfailing Love",
      date: "2025-06-11",
      verse: "Lamentations 3:22-23",
      verseText:
        "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.",
      excerpt:
        "Even in our darkest moments, God's love remains constant. Learn how to rest in His unchanging character...",
      author: "Elder Mark Thompson",
      readTime: "5 min read",
      category: "God's Character",
      featured: false,
    },
    {
      id: 4,
      title: "Living with Purpose",
      date: "2025-06-10",
      verse: "Jeremiah 29:11",
      verseText:
        "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future.",
      excerpt:
        "Understanding God's purpose for your life and how to align your goals with His perfect will...",
      author: "Dr. Elizabeth Carter",
      readTime: "6 min read",
      category: "Purpose",
      featured: false,
    },
  ];

  const categories = [
    "All",
    "Daily Walk",
    "Prayer",
    "God's Character",
    "Purpose",
    "Faith",
    "Hope",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <BookOpen className="w-8 h-8 text-blue-950 mr-3" />
          <h1 className="text-4xl font-bold text-blue-950">
            Daily Devotionals
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Start each day with God&apos;s Word. Find inspiration, encouragement,
          and practical wisdom for your spiritual journey.
        </p>
      </div>

      {/* Today's Featured Devotional */}
      {devotionals
        .filter((d) => d.featured)
        .map((devotional) => (
          <Card
            key={devotional.id}
            className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50"
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-blue-950 text-white">
                  Today&apos;s Devotional
                </Badge>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(devotional.date).toLocaleDateString()}
                </div>
              </div>
              <CardTitle className="text-2xl text-blue-950">
                {devotional.title}
              </CardTitle>
              <div className="text-sm text-gray-600 space-y-1">
                <div className="font-medium">{devotional.verse}</div>
                <div className="italic">&quot;{devotional.verseText}&quot;</div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-gray-700 mb-4">
                {devotional.excerpt}
              </CardDescription>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>By {devotional.author}</span>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {devotional.readTime}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-blue-950 hover:bg-blue-800">
                    Read Full Devotional
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

      {/* Recent Devotionals */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-blue-950 mb-6">
          Recent Devotionals
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {devotionals
            .filter((d) => !d.featured)
            .map((devotional) => (
              <Card
                key={devotional.id}
                className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-blue-200"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {devotional.category}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(devotional.date).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-blue-950 transition-colors">
                    {devotional.title}
                  </CardTitle>
                  <div className="text-xs text-gray-600">
                    <div className="font-medium">{devotional.verse}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {devotional.excerpt}
                  </CardDescription>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs text-gray-500">
                      <div>By {devotional.author}</div>
                      <div className="flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {devotional.readTime}
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-blue-950 hover:bg-blue-800"
                  >
                    Read Devotional
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-lg p-8 text-center text-white">
        <Heart className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">Never Miss a Devotional</h3>
        <p className="mb-6 opacity-90">
          Get daily devotionals delivered to your inbox every morning to start
          your day with God&apos;s Word.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg text-gray-900 flex-1"
          />
          <Button className="bg-white text-blue-950 hover:bg-gray-100">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
}
