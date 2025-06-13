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
  Calendar,
  MapPin,
  Users,
  Download,
  Image,
} from "lucide-react";

export default function MissionReportsPage() {
  const reports = [
    {
      id: 1,
      title: "Guatemala Children's Ministry - June 2025",
      location: "Guatemala City, Guatemala",
      date: "2025-06-01",
      duration: "10 days",
      teamSize: 12,
      category: "Children's Ministry",
      summary:
        "Our team served at three orphanages, providing medical care, education support, and sharing the gospel with over 200 children.",
      highlights: [
        "150 children received medical checkups",
        "50 children accepted Christ",
        "Built playground equipment",
        "Distributed 500 hygiene kits",
      ],
      photos: 45,
      featured: true,
    },
    {
      id: 2,
      title: "Philippines Disaster Relief - May 2025",
      location: "Mindanao, Philippines",
      date: "2025-05-15",
      duration: "14 days",
      teamSize: 8,
      category: "Disaster Relief",
      summary:
        "Following recent typhoon damage, our team provided emergency relief, helped rebuild homes, and supported local churches.",
      highlights: [
        "100 families received aid packages",
        "15 homes rebuilt",
        "Supported 5 local churches",
        "Distributed 1,000 meals",
      ],
      photos: 62,
      featured: false,
    },
    {
      id: 3,
      title: "Kenya Water Project - April 2025",
      location: "Kibera, Nairobi, Kenya",
      date: "2025-04-20",
      duration: "12 days",
      teamSize: 10,
      category: "Infrastructure",
      summary:
        "Completed installation of clean water systems in rural communities, impacting over 500 families with access to clean water.",
      highlights: [
        "3 water wells installed",
        "500+ people gained clean water access",
        "Trained 20 local technicians",
        "Established 2 new churches",
      ],
      photos: 38,
      featured: false,
    },
  ];

  const categories = [
    "All",
    "Children's Ministry",
    "Disaster Relief",
    "Infrastructure",
    "Medical",
    "Education",
    "Church Planting",
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Children's Ministry": "bg-green-100 text-green-800 border-green-200",
      "Disaster Relief": "bg-red-100 text-red-800 border-red-200",
      Infrastructure: "bg-blue-100 text-blue-800 border-blue-200",
      Medical: "bg-purple-100 text-purple-800 border-purple-200",
      Education: "bg-orange-100 text-orange-800 border-orange-200",
      "Church Planting": "bg-yellow-100 text-yellow-800 border-yellow-200",
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
          <FileText className="w-8 h-8 text-blue-950 mr-3" />
          <h1 className="text-4xl font-bold text-blue-950">Mission Reports</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Read about our mission trips and outreach efforts around the world.
          See how God is working through our ministry to transform lives and
          communities.
        </p>
      </div>

      {/* Featured Report */}
      {reports
        .filter((r) => r.featured)
        .map((report) => (
          <Card
            key={report.id}
            className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50"
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-blue-950 text-white">Latest Mission</Badge>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(report.date).toLocaleDateString()}
                </div>
              </div>
              <CardTitle className="text-2xl text-blue-950 mb-2">
                {report.title}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {report.location}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {report.teamSize} team members
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {report.duration}
                </div>
                <Badge className={getCategoryColor(report.category)}>
                  {report.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-gray-700 mb-6">
                {report.summary}
              </CardDescription>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Mission Highlights
                </h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {report.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <div className="w-2 h-2 bg-blue-950 rounded-full mr-3 flex-shrink-0"></div>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <Image className="w-4 h-4 mr-1" />
                  {report.photos} photos available
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-blue-950 hover:bg-blue-800">
                    Read Full Report
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
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

      {/* Reports Grid */}
      <div className="grid gap-6 lg:grid-cols-2 mb-12">
        {reports
          .filter((r) => !r.featured)
          .map((report) => (
            <Card
              key={report.id}
              className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-blue-200"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getCategoryColor(report.category)}>
                    {report.category}
                  </Badge>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(report.date).toLocaleDateString()}
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-blue-950 transition-colors">
                  {report.title}
                </CardTitle>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {report.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {report.teamSize} team
                  </div>
                  <div>{report.duration}</div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {report.summary}
                </CardDescription>

                <div className="mb-4">
                  <h5 className="font-medium text-gray-900 mb-2 text-sm">
                    Key Results
                  </h5>
                  <div className="space-y-1">
                    {report.highlights.slice(0, 2).map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-center text-xs text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-950 rounded-full mr-2 flex-shrink-0"></div>
                        {highlight}
                      </div>
                    ))}
                    {report.highlights.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{report.highlights.length - 2} more highlights
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-xs text-gray-500">
                    <Image className="w-3 h-3 mr-1" />
                    {report.photos} photos
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-blue-950 hover:bg-blue-800"
                  >
                    Read Report
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-lg p-8 text-center text-white">
        <FileText className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">Join Our Next Mission</h3>
        <p className="mb-6 opacity-90">
          Experience the joy of serving others and sharing God's love around the
          world. Our next mission trip is forming now.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-blue-950 hover:bg-gray-100"
          >
            Upcoming Missions
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-blue-950"
          >
            Mission Application
          </Button>
        </div>
      </div>
    </div>
  );
}
