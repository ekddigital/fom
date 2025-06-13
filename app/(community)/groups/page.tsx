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
  Users,
  Calendar,
  Clock,
  MapPin,
  UserPlus,
  Search,
  Filter,
} from "lucide-react";

export default function SmallGroupsPage() {
  const smallGroups = [
    {
      id: 1,
      name: "Young Adults (20s-30s)",
      category: "Age Group",
      leader: "Pastor Sarah Johnson",
      members: 12,
      maxMembers: 15,
      meetingDay: "Thursday",
      meetingTime: "7:00 PM",
      location: "Church Building - Room A",
      description:
        "A vibrant group for young adults navigating career, relationships, and faith. We study relevant biblical topics and support each other through life's challenges.",
      currentStudy: "The Book of James: Practical Faith",
      openToNew: true,
      featured: true,
    },
    {
      id: 2,
      name: "Marriage & Family",
      category: "Life Stage",
      leader: "Elder Mark & Linda Thompson",
      members: 8,
      maxMembers: 12,
      meetingDay: "Sunday",
      meetingTime: "6:00 PM",
      location: "Thompson Home",
      description:
        "For married couples seeking to strengthen their relationships and families through biblical principles.",
      currentStudy: "Love & Respect in Marriage",
      openToNew: true,
      featured: false,
    },
    {
      id: 3,
      name: "Men's Brotherhood",
      category: "Gender Specific",
      leader: "Michael Brown",
      members: 15,
      maxMembers: 20,
      meetingDay: "Saturday",
      meetingTime: "7:00 AM",
      location: "Coffee Shop Downtown",
      description:
        "Men supporting men in their walk with Christ, accountability, and life challenges.",
      currentStudy: "Wild at Heart",
      openToNew: true,
      featured: false,
    },
    {
      id: 4,
      name: "Women of Faith",
      category: "Gender Specific",
      leader: "Jennifer Lee",
      members: 14,
      maxMembers: 16,
      meetingDay: "Wednesday",
      meetingTime: "10:00 AM",
      location: "Lee Home",
      description:
        "A supportive community of women growing together in faith, friendship, and life's journey.",
      currentStudy: "Proverbs 31 Woman",
      openToNew: false,
      featured: false,
    },
    {
      id: 5,
      name: "Senior Saints",
      category: "Age Group",
      leader: "Elder Robert Davis",
      members: 10,
      maxMembers: 15,
      meetingDay: "Tuesday",
      meetingTime: "2:00 PM",
      location: "Church Building - Fellowship Hall",
      description:
        "Seasoned believers sharing wisdom, prayer, and fellowship while studying God's Word.",
      currentStudy: "Psalms of Comfort",
      openToNew: true,
      featured: false,
    },
    {
      id: 6,
      name: "New Believers",
      category: "Faith Journey",
      leader: "Pastor David Kim",
      members: 6,
      maxMembers: 10,
      meetingDay: "Sunday",
      meetingTime: "4:00 PM",
      location: "Church Building - Room B",
      description:
        "Perfect for new Christians or those wanting to strengthen their foundation in faith.",
      currentStudy: "Christianity 101",
      openToNew: true,
      featured: false,
    },
  ];

  const categories = [
    "All",
    "Age Group",
    "Life Stage",
    "Gender Specific",
    "Faith Journey",
    "Special Interest",
  ];
  const meetingDays = [
    "All",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Age Group": "bg-blue-100 text-blue-800 border-blue-200",
      "Life Stage": "bg-green-100 text-green-800 border-green-200",
      "Gender Specific": "bg-purple-100 text-purple-800 border-purple-200",
      "Faith Journey": "bg-orange-100 text-orange-800 border-orange-200",
      "Special Interest": "bg-pink-100 text-pink-800 border-pink-200",
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
          <Users className="w-8 h-8 text-blue-950 mr-3" />
          <h1 className="text-4xl font-bold text-blue-950">Small Groups</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join a small group and experience authentic community, spiritual
          growth, and lasting friendships in an intimate setting.
        </p>
      </div>

      {/* Start a Group CTA */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-lg p-6 text-center text-white mb-8">
        <Users className="w-10 h-10 mx-auto mb-3" />
        <h3 className="text-xl font-bold mb-2">Want to Lead a Group?</h3>
        <p className="mb-4 opacity-90">
          Feel called to lead others in community and spiritual growth?
          We&apos;d love to help you start a new small group.
        </p>
        <Button size="lg" className="bg-white text-blue-950 hover:bg-gray-100">
          Start a Small Group
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
                placeholder="Search small groups..."
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
              <option>All Days</option>
              {meetingDays.slice(1).map((day) => (
                <option key={day}>{day}</option>
              ))}
            </select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Group */}
      {smallGroups
        .filter((g) => g.featured)
        .map((group) => (
          <Card
            key={group.id}
            className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50"
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-blue-950 text-white">Featured Group</Badge>
                <Badge
                  className={
                    group.openToNew
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {group.openToNew ? "Open to New Members" : "Currently Full"}
                </Badge>
              </div>
              <CardTitle className="text-2xl text-blue-950 mb-2">
                {group.name}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <Badge className={getCategoryColor(group.category)}>
                  {group.category}
                </Badge>
                <span>Led by {group.leader}</span>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {group.members}/{group.maxMembers} members
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-gray-700 mb-6">
                {group.description}
              </CardDescription>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <div>
                    <div className="font-medium">{group.meetingDay}s</div>
                    <div>{group.meetingTime}</div>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <div>{group.location}</div>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="font-medium">Currently studying:</div>
                  <div>{group.currentStudy}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {group.openToNew
                    ? `${group.maxMembers - group.members} spots available`
                    : "Group is currently full"}
                </div>
                <div className="flex space-x-2">
                  {group.openToNew ? (
                    <Button className="bg-blue-950 hover:bg-blue-800">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Join Group
                    </Button>
                  ) : (
                    <Button variant="outline" disabled>
                      Join Waiting List
                    </Button>
                  )}
                  <Button variant="outline">Contact Leader</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

      {/* Groups Grid */}
      <div className="grid gap-6 lg:grid-cols-2 mb-12">
        {smallGroups
          .filter((g) => !g.featured)
          .map((group) => (
            <Card
              key={group.id}
              className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-blue-200"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getCategoryColor(group.category)}>
                    {group.category}
                  </Badge>
                  <Badge
                    className={
                      group.openToNew
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {group.openToNew ? "Open" : "Full"}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-blue-950 transition-colors">
                  {group.name}
                </CardTitle>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Led by {group.leader}</span>
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {group.members}/{group.maxMembers}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {group.description}
                </CardDescription>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-2" />
                    {group.meetingDay}s at {group.meetingTime}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-2" />
                    {group.location}
                  </div>
                  <div>
                    <span className="font-medium">Studying:</span>{" "}
                    {group.currentStudy}
                  </div>
                </div>

                <div className="flex space-x-2">
                  {group.openToNew ? (
                    <Button
                      size="sm"
                      className="flex-1 bg-blue-950 hover:bg-blue-800"
                    >
                      <UserPlus className="w-3 h-3 mr-2" />
                      Join
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      disabled
                    >
                      Full
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Small Group Benefits */}
      <div className="bg-gray-50 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-blue-950 mb-6 text-center">
          Why Join a Small Group?
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-950" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Deep Relationships
            </h4>
            <p className="text-sm text-gray-600">
              Build meaningful friendships and experience authentic Christian
              community in a smaller, more intimate setting.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-green-700" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Spiritual Growth
            </h4>
            <p className="text-sm text-gray-600">
              Study God&apos;s Word together, share insights, and grow in your
              faith through discussion and accountability.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-purple-700" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Life Support</h4>
            <p className="text-sm text-gray-600">
              Receive prayer, encouragement, and practical support during both
              challenges and celebrations in life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
