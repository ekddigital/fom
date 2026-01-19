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
  UserPlus,
  Search,
  MapPin,
  Calendar,
  Users,
  Heart,
  MessageCircle,
  Filter,
} from "lucide-react";

export default function ConnectPage() {
  const connectOpportunities = [
    {
      id: 1,
      type: "Mentor Match",
      title: "Looking for a Spiritual Mentor",
      requester: "Alex R.",
      age: "22",
      interests: ["Bible Study", "Prayer", "Career Guidance"],
      description:
        "New believer seeking guidance from a mature Christian to help grow in faith and navigate life decisions.",
      location: "Seattle Area",
      availability: "Weekends preferred",
      category: "Mentorship",
      featured: true,
    },
    {
      id: 2,
      type: "Friendship",
      title: "Young Mom Looking for Mom Friends",
      requester: "Sarah M.",
      age: "28",
      interests: ["Parenting", "Playdates", "Bible Study"],
      description:
        "Stay-at-home mom with a 2-year-old looking to connect with other Christian moms for friendship and support.",
      location: "Bellevue Area",
      availability: "Weekday mornings",
      category: "Friendship",
      featured: false,
    },
    {
      id: 3,
      type: "Prayer Partner",
      title: "Seeking Prayer Partner for Health Journey",
      requester: "Michael T.",
      age: "45",
      interests: ["Prayer", "Health", "Encouragement"],
      description:
        "Going through cancer treatment and would love a consistent prayer partner for support and accountability.",
      location: "Any Location",
      availability: "Flexible",
      category: "Prayer",
      featured: false,
    },
    {
      id: 4,
      type: "Activity Partner",
      title: "Hiking & Outdoor Adventure Buddy",
      requester: "Jennifer L.",
      age: "31",
      interests: ["Hiking", "Nature", "Photography"],
      description:
        "Love exploring God's creation through hiking and outdoor activities. Looking for someone to share adventures with!",
      location: "North Seattle",
      availability: "Saturday mornings",
      category: "Activities",
      featured: false,
    },
    {
      id: 5,
      type: "Study Partner",
      title: "Bible Study Accountability Partner",
      requester: "David K.",
      age: "35",
      interests: ["Theology", "Bible Study", "Books"],
      description:
        "Looking for someone to study Scripture with and hold each other accountable in daily devotions.",
      location: "Tacoma Area",
      availability: "Evening calls",
      category: "Study",
      featured: false,
    },
    {
      id: 6,
      type: "Ministry Partner",
      title: "Youth Ministry Volunteer Connection",
      requester: "Lisa R.",
      age: "26",
      interests: ["Youth Ministry", "Music", "Teaching"],
      description:
        "Passionate about youth ministry and looking to connect with others who share this calling.",
      location: "Church Building",
      availability: "Wednesday evenings",
      category: "Ministry",
      featured: false,
    },
  ];

  const categories = [
    "All",
    "Mentorship",
    "Friendship",
    "Prayer",
    "Activities",
    "Study",
    "Ministry",
  ];
  const ageGroups = ["All", "18-25", "26-35", "36-50", "51-65", "65+"];

  const getCategoryColor = (category: string) => {
    const colors = {
      Mentorship: "bg-blue-100 text-blue-800 border-blue-200",
      Friendship: "bg-green-100 text-green-800 border-green-200",
      Prayer: "bg-purple-100 text-purple-800 border-purple-200",
      Activities: "bg-orange-100 text-orange-800 border-orange-200",
      Study: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Ministry: "bg-pink-100 text-pink-800 border-pink-200",
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
          <UserPlus className="w-8 h-8 text-blue-950 mr-3" />
          <h1 className="text-4xl font-bold text-blue-950">Connect</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find your people! Connect with others in our community based on shared
          interests, life stages, and spiritual needs.
        </p>
      </div>

      {/* Create Connection Request CTA */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-lg p-6 text-center text-white mb-8">
        <UserPlus className="w-10 h-10 mx-auto mb-3" />
        <h3 className="text-xl font-bold mb-2">Looking to Connect?</h3>
        <p className="mb-4 opacity-90">
          Create your own connection request and let others in the community
          reach out to you.
        </p>
        <Button size="lg" className="bg-white text-blue-950 hover:bg-gray-100">
          Create Connection Request
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
                placeholder="Search connection requests..."
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
              <option>All Ages</option>
              {ageGroups.slice(1).map((age) => (
                <option key={age}>{age}</option>
              ))}
            </select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Connection */}
      {connectOpportunities
        .filter((c) => c.featured)
        .map((connection) => (
          <Card
            key={connection.id}
            className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50"
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-blue-950 text-white">
                  Featured Connection
                </Badge>
                <Badge className={getCategoryColor(connection.category)}>
                  {connection.category}
                </Badge>
              </div>
              <CardTitle className="text-2xl text-blue-950 mb-2">
                {connection.title}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <span>
                  {connection.requester} • Age {connection.age}
                </span>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {connection.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {connection.availability}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-gray-700 mb-6">
                {connection.description}
              </CardDescription>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Interests & Topics:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {connection.interests.map((interest, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Type: {connection.type}
                </div>
                <div className="flex space-x-2">
                  <Button className="bg-blue-950 hover:bg-blue-800">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

      {/* Category Quick Filters */}
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

      {/* Connection Requests Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {connectOpportunities
          .filter((c) => !c.featured)
          .map((connection) => (
            <Card
              key={connection.id}
              className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-blue-200"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getCategoryColor(connection.category)}>
                    {connection.category}
                  </Badge>
                  <div className="text-xs text-gray-500">{connection.type}</div>
                </div>
                <CardTitle className="text-lg group-hover:text-blue-950 transition-colors">
                  {connection.title}
                </CardTitle>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>
                    {connection.requester} • {connection.age}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {connection.description}
                </CardDescription>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-2" />
                    {connection.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-2" />
                    {connection.availability}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {connection.interests.slice(0, 2).map((interest, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                    {connection.interests.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{connection.interests.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>

                <Button
                  size="sm"
                  className="w-full bg-blue-950 hover:bg-blue-800"
                >
                  <MessageCircle className="w-3 h-3 mr-2" />
                  Connect
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Connection Tips */}
      <div className="bg-gray-50 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-blue-950 mb-6 text-center">
          Making Great Connections
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-blue-950" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Be Genuine</h4>
            <p className="text-sm text-gray-600">
              Share authentically about your interests, needs, and what
              you&apos;re looking for in a connection.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-green-700" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Communicate Clearly
            </h4>
            <p className="text-sm text-gray-600">
              Be clear about your availability, preferences, and expectations
              for the relationship.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-purple-700" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Be Patient</h4>
            <p className="text-sm text-gray-600">
              Building meaningful relationships takes time. Be patient and open
              to God&apos;s timing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
