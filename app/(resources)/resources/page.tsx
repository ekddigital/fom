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
  BookOpen,
  Download,
  Search,
  Filter,
  Book,
  Video,
  FileText,
  Headphones,
} from "lucide-react";

export default function ResourcesLibraryPage() {
  const resources = [
    {
      id: 1,
      title: "Systematic Theology Study Guide",
      type: "Study Guide",
      category: "Theology",
      format: "PDF",
      size: "2.4 MB",
      downloads: 1240,
      description:
        "A comprehensive guide to understanding systematic theology with practical applications for daily Christian living.",
      author: "Dr. Elizabeth Carter",
      featured: true,
    },
    {
      id: 2,
      title: "Prayer & Fasting Handbook",
      type: "Handbook",
      category: "Spiritual Disciplines",
      format: "PDF",
      size: "1.8 MB",
      downloads: 892,
      description:
        "Learn the biblical foundations and practical methods of prayer and fasting for spiritual growth.",
      author: "Pastor Michael Brown",
      featured: false,
    },
    {
      id: 3,
      title: "Evangelism Training Videos",
      type: "Video Series",
      category: "Evangelism",
      format: "Video",
      size: "1.2 GB",
      downloads: 567,
      description:
        "A complete video series on sharing the gospel effectively in today's world.",
      author: "Pastor John Smith",
      featured: false,
    },
    {
      id: 4,
      title: "Marriage & Family Workbook",
      type: "Workbook",
      category: "Family",
      format: "PDF",
      size: "3.1 MB",
      downloads: 743,
      description:
        "Biblical principles for building strong marriages and families with practical exercises.",
      author: "Pastor Sarah Johnson",
      featured: false,
    },
    {
      id: 5,
      title: "Youth Ministry Curriculum",
      type: "Curriculum",
      category: "Youth",
      format: "ZIP",
      size: "15.7 MB",
      downloads: 324,
      description:
        "Complete curriculum for youth ministry including lessons, activities, and discussion guides.",
      author: "Elder Mark Thompson",
      featured: false,
    },
    {
      id: 6,
      title: "Worship Leading Basics",
      type: "Audio Course",
      category: "Worship",
      format: "Audio",
      size: "456 MB",
      downloads: 289,
      description:
        "Audio course covering the fundamentals of leading worship with biblical foundation.",
      author: "Worship Team",
      featured: false,
    },
  ];

  const categories = [
    "All",
    "Theology",
    "Spiritual Disciplines",
    "Evangelism",
    "Family",
    "Youth",
    "Worship",
    "Leadership",
  ];
  const types = [
    "All",
    "Study Guide",
    "Handbook",
    "Video Series",
    "Workbook",
    "Curriculum",
    "Audio Course",
  ];
  const formats = ["All", "PDF", "Video", "Audio", "ZIP"];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Study Guide":
        return Book;
      case "Video Series":
        return Video;
      case "Audio Course":
        return Headphones;
      default:
        return FileText;
    }
  };

  const getFormatColor = (format: string) => {
    const colors = {
      PDF: "bg-red-100 text-red-800 border-red-200",
      Video: "bg-blue-100 text-blue-800 border-blue-200",
      Audio: "bg-green-100 text-green-800 border-green-200",
      ZIP: "bg-purple-100 text-purple-800 border-purple-200",
    };
    return (
      colors[format as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <BookOpen className="w-8 h-8 text-blue-950 mr-3" />
          <h1 className="text-4xl font-bold text-blue-950">
            Resources Library
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Access our comprehensive collection of study guides, handbooks,
          videos, and other resources to support your spiritual growth and
          ministry.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
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
              <option>All Types</option>
              {types.slice(1).map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>All Formats</option>
              {formats.slice(1).map((format) => (
                <option key={format}>{format}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Featured Resource */}
      {resources
        .filter((r) => r.featured)
        .map((resource) => (
          <Card
            key={resource.id}
            className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50"
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-blue-950 text-white">
                  Featured Resource
                </Badge>
                <Badge className={getFormatColor(resource.format)}>
                  {resource.format}
                </Badge>
              </div>
              <CardTitle className="text-2xl text-blue-950 mb-2">
                {resource.title}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <Badge variant="outline">{resource.type}</Badge>
                <Badge variant="outline">{resource.category}</Badge>
                <span>By {resource.author}</span>
                <span>{resource.downloads.toLocaleString()} downloads</span>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-gray-700 mb-6">
                {resource.description}
              </CardDescription>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Size: {resource.size}
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-blue-950 hover:bg-blue-800">
                    <Download className="w-4 h-4 mr-2" />
                    Download Now
                  </Button>
                  <Button size="sm" variant="outline">
                    Preview
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

      {/* Resources Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {resources
          .filter((r) => !r.featured)
          .map((resource) => {
            const IconComponent = getTypeIcon(resource.type);
            return (
              <Card
                key={resource.id}
                className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-blue-200"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <IconComponent className="w-5 h-5 text-blue-950" />
                      </div>
                      <div>
                        <Badge variant="outline" className="text-xs">
                          {resource.type}
                        </Badge>
                      </div>
                    </div>
                    <Badge className={getFormatColor(resource.format)}>
                      {resource.format}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-blue-950 transition-colors">
                    {resource.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Badge variant="outline" className="text-xs">
                      {resource.category}
                    </Badge>
                    <span>•</span>
                    <span>By {resource.author}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {resource.description}
                  </CardDescription>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{resource.downloads.toLocaleString()} downloads</span>
                    <span>{resource.size}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-blue-950 hover:bg-blue-800"
                    >
                      <Download className="w-3 h-3 mr-2" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>

      {/* Load More */}
      <div className="text-center mb-12">
        <Button variant="outline" size="lg" className="px-8">
          Load More Resources
        </Button>
      </div>

      {/* Submit Resource CTA */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-lg p-8 text-center text-white">
        <BookOpen className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">Share Your Resources</h3>
        <p className="mb-6 opacity-90">
          Do you have study materials, guides, or other resources that could
          bless our community? We'd love to include them in our library.
        </p>
        <Button size="lg" className="bg-white text-blue-950 hover:bg-gray-100">
          Submit a Resource
        </Button>
      </div>
    </div>
  );
}
