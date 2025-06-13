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
  FileText,
  Plus,
  Edit,
  Eye,
  Trash2,
  Calendar,
  User,
  Search,
  Filter,
} from "lucide-react";

export default function MinistryContentPage() {
  const contentItems = [
    {
      id: 1,
      title: "Walking in Faith: Trust in God's Plan",
      type: "Sermon",
      author: "Pastor John Smith",
      date: "2025-06-08",
      status: "Published",
      views: 245,
      category: "Faith",
      featured: true,
    },
    {
      id: 2,
      title: "Community Service Guidelines",
      type: "Resource",
      author: "Ministry Team",
      date: "2025-06-05",
      status: "Draft",
      views: 0,
      category: "Ministry",
      featured: false,
    },
    {
      id: 3,
      title: "Summer Youth Camp 2025",
      type: "Event",
      author: "Jennifer Lee",
      date: "2025-06-01",
      status: "Published",
      views: 89,
      category: "Youth",
      featured: false,
    },
    {
      id: 4,
      title: "Prayer Network Training",
      type: "Training",
      author: "Pastor Sarah Johnson",
      date: "2025-05-28",
      status: "Published",
      views: 156,
      category: "Prayer",
      featured: false,
    },
    {
      id: 5,
      title: "Mission Trip Application Form",
      type: "Form",
      author: "Michael Brown",
      date: "2025-05-25",
      status: "Published",
      views: 67,
      category: "Missions",
      featured: false,
    },
  ];

  const contentTypes = [
    "All",
    "Sermon",
    "Resource",
    "Event",
    "Training",
    "Form",
    "Article",
  ];
  const statusTypes = ["All", "Published", "Draft", "Scheduled", "Archived"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800 border-green-200";
      case "Draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Archived":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      Sermon: "bg-purple-100 text-purple-800 border-purple-200",
      Resource: "bg-blue-100 text-blue-800 border-blue-200",
      Event: "bg-green-100 text-green-800 border-green-200",
      Training: "bg-orange-100 text-orange-800 border-orange-200",
      Form: "bg-pink-100 text-pink-800 border-pink-200",
      Article: "bg-teal-100 text-teal-800 border-teal-200",
    };
    return (
      colors[type as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-950">
            Content Management
          </h1>
          <p className="text-gray-600">
            Create, edit, and manage ministry content
          </p>
        </div>
        <Button className="bg-blue-950 hover:bg-blue-800">
          <Plus className="w-4 h-4 mr-2" />
          Create Content
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-blue-950">23</div>
            <div className="text-sm text-gray-600">Published</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">5</div>
            <div className="text-sm text-gray-600">Drafts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-600">1,247</div>
            <div className="text-sm text-gray-600">Total Views</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-sm text-gray-600">This Month</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search content..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>All Types</option>
              {contentTypes.slice(1).map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>All Status</option>
              {statusTypes.slice(1).map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Content */}
      {contentItems
        .filter((item) => item.featured)
        .map((item) => (
          <Card
            key={item.id}
            className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50"
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-blue-950 text-white">
                  Featured Content
                </Badge>
                <div className="flex items-center gap-2">
                  <Badge className={getTypeColor(item.type)}>{item.type}</Badge>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </div>
              </div>
              <CardTitle className="text-2xl text-blue-950 mb-2">
                {item.title}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {item.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(item.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {item.views} views
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Category: {item.category}
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-blue-950 hover:bg-blue-800">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Analytics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

      {/* Content List */}
      <Card>
        <CardHeader>
          <CardTitle>All Content</CardTitle>
          <CardDescription>
            Manage your ministry content library
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contentItems
              .filter((item) => !item.featured)
              .map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-950" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                        <span>By {item.author}</span>
                        <span>•</span>
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{item.views} views</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge className={getTypeColor(item.type)}>
                      {item.type}
                    </Badge>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>

                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Showing 5 of 28 content items
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="pt-6 text-center">
            <Plus className="w-12 h-12 text-blue-950 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">
              Create New Content
            </h3>
            <p className="text-sm text-gray-600">
              Start creating sermons, resources, or events
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="pt-6 text-center">
            <FileText className="w-12 h-12 text-green-700 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">
              Content Templates
            </h3>
            <p className="text-sm text-gray-600">
              Use pre-made templates for faster creation
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="pt-6 text-center">
            <Eye className="w-12 h-12 text-purple-700 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
            <p className="text-sm text-gray-600">
              View detailed content performance metrics
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
