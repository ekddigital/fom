import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coffee, Calendar, Clock, MapPin, Users, Image } from "lucide-react";

export default function FellowshipPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Community Picnic & BBQ",
      date: "2025-06-21",
      time: "12:00 PM - 4:00 PM",
      location: "Riverside Park",
      description:
        "Join us for a fun-filled afternoon of food, games, and fellowship. Perfect for families and friends to connect outside of Sunday service.",
      attendees: 45,
      maxAttendees: 100,
      category: "Outdoor",
      featured: true,
      image: "/api/placeholder/400/200",
    },
    {
      id: 2,
      title: "Coffee & Conversation",
      date: "2025-06-18",
      time: "7:00 PM - 9:00 PM",
      location: "Central Coffee House",
      description:
        "Casual evening to connect with other members over coffee and meaningful conversation.",
      attendees: 12,
      maxAttendees: 20,
      category: "Social",
      featured: false,
      image: "/api/placeholder/300/150",
    },
    {
      id: 3,
      title: "Game Night",
      date: "2025-06-25",
      time: "6:30 PM - 9:30 PM",
      location: "Church Fellowship Hall",
      description:
        "Board games, card games, and fun for all ages. Snacks and refreshments provided.",
      attendees: 18,
      maxAttendees: 30,
      category: "Indoor",
      featured: false,
      image: "/api/placeholder/300/150",
    },
    {
      id: 4,
      title: "Singles Fellowship Dinner",
      date: "2025-06-28",
      time: "6:00 PM - 8:30 PM",
      location: "Italian Garden Restaurant",
      description:
        "A special dinner for our single members to connect and build friendships in a relaxed setting.",
      attendees: 8,
      maxAttendees: 15,
      category: "Special Group",
      featured: false,
      image: "/api/placeholder/300/150",
    },
    {
      id: 5,
      title: "Family Movie Night",
      date: "2025-07-02",
      time: "7:00 PM - 9:30 PM",
      location: "Church Sanctuary",
      description:
        "Family-friendly movie with popcorn and snacks. Bring blankets and pillows for comfort!",
      attendees: 32,
      maxAttendees: 50,
      category: "Family",
      featured: false,
      image: "/api/placeholder/300/150",
    },
  ];

  const categories = [
    "All",
    "Outdoor",
    "Social",
    "Indoor",
    "Special Group",
    "Family",
    "Seniors",
    "Youth",
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      Outdoor: "bg-green-100 text-green-800 border-green-200",
      Social: "bg-blue-100 text-blue-800 border-blue-200",
      Indoor: "bg-purple-100 text-purple-800 border-purple-200",
      "Special Group": "bg-orange-100 text-orange-800 border-orange-200",
      Family: "bg-pink-100 text-pink-800 border-pink-200",
      Seniors: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Youth: "bg-teal-100 text-teal-800 border-teal-200",
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
          <Coffee className="w-8 h-8 text-blue-950 mr-3" />
          <h1 className="text-4xl font-bold text-blue-950">
            Fellowship Events
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Come together in fellowship and build lasting relationships with your
          church family through fun events and gatherings.
        </p>
      </div>

      {/* Host an Event CTA */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-lg p-6 text-center text-white mb-8">
        <Coffee className="w-10 h-10 mx-auto mb-3" />
        <h3 className="text-xl font-bold mb-2">Want to Host an Event?</h3>
        <p className="mb-4 opacity-90">
          Have an idea for a fellowship event? We&apos;d love to help you
          organize it and bring our community together.
        </p>
        <Button size="lg" className="bg-white text-blue-950 hover:bg-gray-100">
          Propose an Event
        </Button>
      </div>

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

      {/* Featured Event */}
      {upcomingEvents
        .filter((e) => e.featured)
        .map((event) => (
          <Card
            key={event.id}
            className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50"
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-blue-950 text-white">Featured Event</Badge>
                <Badge className={getCategoryColor(event.category)}>
                  {event.category}
                </Badge>
              </div>
              <CardTitle className="text-2xl text-blue-950 mb-2">
                {event.title}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {event.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {event.location}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {event.attendees}/{event.maxAttendees} attending
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/3">
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image className="w-12 h-12 text-gray-400" />
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <CardDescription className="text-base text-gray-700 mb-6">
                    {event.description}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {event.maxAttendees - event.attendees} spots remaining
                    </div>
                    <div className="flex space-x-2">
                      <Button className="bg-blue-950 hover:bg-blue-800">
                        <Users className="w-4 h-4 mr-2" />
                        Register to Attend
                      </Button>
                      <Button variant="outline">Share Event</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

      {/* Upcoming Events Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-blue-950 mb-6">
          Upcoming Fellowship Events
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents
            .filter((e) => !e.featured)
            .map((event) => (
              <Card
                key={event.id}
                className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-blue-200"
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg bg-gray-200 h-40">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <Badge className={getCategoryColor(event.category)}>
                        {event.category}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* eslint-disable-next-line jsx-a11y/alt-text */}
                      <Image className="w-12 h-12 text-gray-400" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2 group-hover:text-blue-950 transition-colors">
                    {event.title}
                  </CardTitle>

                  <div className="space-y-1 mb-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-2" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-2" />
                      {event.location}
                    </div>
                  </div>

                  <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                  </CardDescription>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      {event.attendees}/{event.maxAttendees}
                    </div>
                    <div className="text-sm text-green-600">
                      {event.maxAttendees - event.attendees} spots left
                    </div>
                  </div>

                  <Button className="w-full bg-blue-950 hover:bg-blue-800">
                    <Users className="w-4 h-4 mr-2" />
                    Register
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Past Events Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-blue-950 mb-4">
          Recent Fellowship Highlights
        </h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-950 mb-2">127</div>
              <div className="text-sm text-gray-600">
                People at last month&apos;s picnic
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-950 mb-2">23</div>
              <div className="text-sm text-gray-600">
                Fellowship events this year
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-950 mb-2">89%</div>
              <div className="text-sm text-gray-600">
                Members participate in fellowship
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fellowship Guidelines */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-4 text-center">
          Fellowship Guidelines
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Our Heart for Fellowship:</h4>
            <ul className="space-y-1 opacity-90">
              <li>• Build authentic Christian relationships</li>
              <li>• Welcome newcomers and visitors warmly</li>
              <li>• Create inclusive environments for all ages</li>
              <li>• Encourage participation from everyone</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Event Expectations:</h4>
            <ul className="space-y-1 opacity-90">
              <li>• Register in advance when required</li>
              <li>• Arrive on time and ready to participate</li>
              <li>• Help with setup and cleanup when able</li>
              <li>• Bring friends and family to events</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-6">
          <Button
            size="lg"
            className="bg-white text-blue-950 hover:bg-gray-100"
          >
            <Calendar className="w-5 h-5 mr-2" />
            View Full Calendar
          </Button>
        </div>
      </div>
    </div>
  );
}
