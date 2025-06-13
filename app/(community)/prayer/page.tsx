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
  HandHeart,
  Calendar,
  Users,
  Plus,
  MessageCircle,
  Search,
} from "lucide-react";

export default function PrayerRequestsPage() {
  const prayerRequests = [
    {
      id: 1,
      title: "Healing for My Mother",
      category: "Health",
      requester: "Sarah M.",
      date: "2025-06-12",
      urgency: "High",
      description:
        "Please pray for my mother who was diagnosed with cancer. We're believing for complete healing and peace during treatment.",
      prayerCount: 47,
      featured: true,
    },
    {
      id: 2,
      title: "Job Search Guidance",
      category: "Career",
      requester: "Michael T.",
      date: "2025-06-11",
      urgency: "Medium",
      description:
        "I've been unemployed for 3 months. Praying for God's direction and provision for the right job opportunity.",
      prayerCount: 23,
      featured: false,
    },
    {
      id: 3,
      title: "Marriage Restoration",
      category: "Relationships",
      requester: "Anonymous",
      date: "2025-06-10",
      urgency: "High",
      description:
        "My spouse and I are going through a difficult time. Please pray for reconciliation and healing in our marriage.",
      prayerCount: 62,
      featured: false,
    },
    {
      id: 4,
      title: "Wisdom for Parenting",
      category: "Family",
      requester: "Jennifer L.",
      date: "2025-06-09",
      urgency: "Low",
      description:
        "Struggling with parenting decisions for my teenage son. Need God's wisdom and patience.",
      prayerCount: 18,
      featured: false,
    },
    {
      id: 5,
      title: "Financial Breakthrough",
      category: "Finances",
      requester: "David K.",
      date: "2025-06-08",
      urgency: "Medium",
      description:
        "Facing financial difficulties after medical expenses. Trusting God for provision and breakthrough.",
      prayerCount: 35,
      featured: false,
    },
  ];

  const categories = [
    "All",
    "Health",
    "Career",
    "Relationships",
    "Family",
    "Finances",
    "Spiritual",
    "Ministry",
  ];
  const urgencyLevels = ["All", "High", "Medium", "Low"];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Health: "bg-blue-100 text-blue-800 border-blue-200",
      Career: "bg-purple-100 text-purple-800 border-purple-200",
      Relationships: "bg-pink-100 text-pink-800 border-pink-200",
      Family: "bg-green-100 text-green-800 border-green-200",
      Finances: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Spiritual: "bg-indigo-100 text-indigo-800 border-indigo-200",
      Ministry: "bg-teal-100 text-teal-800 border-teal-200",
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
          <HandHeart className="w-8 h-8 text-blue-950 mr-3" />
          <h1 className="text-4xl font-bold text-blue-950">Prayer Requests</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Submit your prayer requests and join our community in praying for one
          another. &quot;Bear one another&apos;s burdens, and so fulfill the law of
          Christ.&quot;
        </p>
      </div>

      {/* Submit Prayer Request CTA */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-lg p-6 text-center text-white mb-8">
        <HandHeart className="w-10 h-10 mx-auto mb-3" />
        <h3 className="text-xl font-bold mb-2">Need Prayer?</h3>
        <p className="mb-4 opacity-90">
          Our community is here to pray for you. Submit your request
          confidentially.
        </p>
        <Button size="lg" className="bg-white text-blue-950 hover:bg-gray-100">
          <Plus className="w-5 h-5 mr-2" />
          Submit Prayer Request
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search prayer requests..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>All Categories</option>
              {categories.slice(1).map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>All Urgency</option>
              {urgencyLevels.slice(1).map((level) => (
                <option key={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Featured Prayer Request */}
      {prayerRequests
        .filter((r) => r.featured)
        .map((request) => (
          <Card
            key={request.id}
            className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50"
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-blue-950 text-white">
                  Urgent Prayer Needed
                </Badge>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(request.date).toLocaleDateString()}
                </div>
              </div>
              <CardTitle className="text-2xl text-blue-950 mb-2">
                {request.title}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
                <span>Requested by {request.requester}</span>
                <Badge className={getCategoryColor(request.category)}>
                  {request.category}
                </Badge>
                <Badge className={getUrgencyColor(request.urgency)}>
                  {request.urgency} Priority
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-gray-700 mb-6">
                {request.description}
              </CardDescription>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-1" />
                  {request.prayerCount} people praying
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-blue-950 hover:bg-blue-800">
                    <HandHeart className="w-4 h-4 mr-2" />
                    I&apos;m Praying
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Encourage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

      {/* Prayer Requests Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {prayerRequests
          .filter((r) => !r.featured)
          .map((request) => (
            <Card
              key={request.id}
              className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-blue-200"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getCategoryColor(request.category)}>
                    {request.category}
                  </Badge>
                  <Badge className={getUrgencyColor(request.urgency)}>
                    {request.urgency}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-blue-950 transition-colors">
                  {request.title}
                </CardTitle>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>By {request.requester}</span>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(request.date).toLocaleDateString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {request.description}
                </CardDescription>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    {request.prayerCount} praying
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-blue-950 hover:bg-blue-800"
                  >
                    <HandHeart className="w-3 h-3 mr-2" />
                    Pray
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageCircle className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Load More */}
      <div className="text-center mb-8">
        <Button variant="outline" size="lg" className="px-8">
          Load More Prayer Requests
        </Button>
      </div>

      {/* Prayer Guidelines */}
      <div className="bg-gray-50 rounded-lg p-8">
        <h3 className="text-xl font-bold text-blue-950 mb-4 text-center">
          Prayer Request Guidelines
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              What to Include:
            </h4>
            <ul className="space-y-1">
              <li>• Be specific about what you need prayer for</li>
              <li>• Include relevant background information</li>
              <li>• Share how others can specifically pray</li>
              <li>• Update the community on answered prayers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Privacy & Respect:
            </h4>
            <ul className="space-y-1">
              <li>• You can submit requests anonymously</li>
              <li>• Don&apos;t share others&apos; personal information</li>
              <li>• Keep responses encouraging and appropriate</li>
              <li>• Respect confidentiality of shared requests</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
