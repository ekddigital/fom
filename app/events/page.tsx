import { PublicHeader } from "@/components/ui/layout/public-header";
import { PublicFooter } from "@/components/ui/layout/public-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Heart, BookOpen } from "lucide-react";

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Sunday Worship Service",
      description:
        "Join us for our weekly worship service featuring inspiring messages, worship music, and fellowship.",
      date: "Every Sunday",
      time: "10:00 AM - 12:00 PM",
      location: "Main Sanctuary",
      type: "Worship",
      recurring: true,
      icon: Heart,
    },
    {
      id: 2,
      title: "Bible Study Fellowship",
      description:
        "Deep dive into God's Word with fellow believers. This week we're studying the Book of Romans.",
      date: "Wednesdays",
      time: "7:00 PM - 8:30 PM",
      location: "Fellowship Hall",
      type: "Bible Study",
      recurring: true,
      icon: BookOpen,
    },
    {
      id: 3,
      title: "Youth Ministry Gathering",
      description:
        "Fun activities, games, and spiritual growth for our young people aged 13-18.",
      date: "Fridays",
      time: "6:00 PM - 8:00 PM",
      location: "Youth Center",
      type: "Youth",
      recurring: true,
      icon: Users,
    },
    {
      id: 4,
      title: "Monthly Community Outreach",
      description:
        "Join us as we serve our local community through food distribution and ministry.",
      date: "First Saturday of Each Month",
      time: "9:00 AM - 2:00 PM",
      location: "Community Center Downtown",
      type: "Outreach",
      recurring: true,
      icon: Heart,
    },
  ];

  const specialEvents = [
    {
      id: 5,
      title: "Annual Missions Conference",
      description:
        "Three days of inspiring messages from missionaries around the world, workshops, and commissioning services.",
      date: "March 15-17, 2025",
      time: "Various Times",
      location: "Main Campus",
      type: "Conference",
      featured: true,
    },
    {
      id: 6,
      title: "Easter Celebration Service",
      description:
        "Celebrate the resurrection of our Lord Jesus Christ with special music, testimonies, and communion.",
      date: "April 20, 2025",
      time: "10:00 AM",
      location: "Main Sanctuary",
      type: "Special Service",
      featured: true,
    },
    {
      id: 7,
      title: "Summer VBS - Kingdom Adventures",
      description:
        "Vacation Bible School for children ages 4-12. Adventure, learning, and fun in God's Kingdom!",
      date: "June 23-27, 2025",
      time: "9:00 AM - 12:00 PM",
      location: "Children's Ministry Wing",
      type: "Children",
      featured: true,
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Worship":
        return "bg-blue-100 text-blue-800";
      case "Bible Study":
        return "bg-green-100 text-green-800";
      case "Youth":
        return "bg-purple-100 text-purple-800";
      case "Outreach":
        return "bg-orange-100 text-orange-800";
      case "Conference":
        return "bg-red-100 text-red-800";
      case "Special Service":
        return "bg-yellow-100 text-yellow-800";
      case "Children":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-950 to-blue-800 bg-clip-text text-transparent">
              Upcoming Events
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed">
              Join us for worship, fellowship, learning, and community outreach
              events designed to grow your faith and strengthen our ministry
              community.
            </p>
            <Button className="bg-gradient-to-r from-blue-950 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white px-8 py-3 text-lg">
              View Calendar
            </Button>
          </div>
        </div>
      </section>

      {/* Special Events Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">
              Featured Events
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Don&apos;t miss these special upcoming events and celebrations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialEvents.map((event) => (
              <Card
                key={event.id}
                className="border-blue-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-950 to-blue-800 transform rotate-45 translate-x-8 -translate-y-8"></div>
                <Badge className="absolute top-4 right-4 bg-white text-blue-950 border-blue-200">
                  Featured
                </Badge>
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <Badge className={getTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-blue-950">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{event.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-blue-500" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                      {event.location}
                    </div>
                  </div>

                  <Button className="w-full bg-blue-950 hover:bg-blue-800 text-white">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Regular Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">
              Regular Events
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Join us for our ongoing weekly and monthly gatherings
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => {
              const IconComponent = event.icon;
              return (
                <Card
                  key={event.id}
                  className="border-blue-200 hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-blue-950" />
                        </div>
                        <Badge className={getTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                      {event.recurring && (
                        <Badge
                          variant="outline"
                          className="text-green-700 border-green-300"
                        >
                          Recurring
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl text-blue-950">
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{event.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2 text-blue-500" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                        {event.location}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        className="flex-1 border-blue-200 text-blue-950 hover:bg-blue-50"
                      >
                        Add to Calendar
                      </Button>
                      <Button className="flex-1 bg-blue-950 hover:bg-blue-800 text-white">
                        Get Directions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-950 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated on Events
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Never miss an event! Subscribe to our newsletter or follow us on
            social media for the latest updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-950 hover:bg-blue-50 px-8 py-3">
              Subscribe to Newsletter
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-950 px-8 py-3"
            >
              View Full Calendar
            </Button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
