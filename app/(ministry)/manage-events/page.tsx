import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

export default function MinistryEventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Youth Ministry Retreat",
      date: "2024-02-15",
      time: "9:00 AM - 5:00 PM",
      location: "Camp Galilee",
      category: "Youth",
      attendees: 45,
      maxAttendees: 60,
      status: "published",
      description:
        "A day of worship, fellowship, and team building activities for our youth ministry.",
      registrations: 45,
    },
    {
      id: 2,
      title: "Community Outreach Food Drive",
      date: "2024-02-18",
      time: "10:00 AM - 2:00 PM",
      location: "Downtown Community Center",
      category: "Outreach",
      attendees: 25,
      maxAttendees: 40,
      status: "published",
      description:
        "Join us in serving our community by distributing food to families in need.",
      registrations: 25,
    },
    {
      id: 3,
      title: "Marriage Enrichment Workshop",
      date: "2024-02-22",
      time: "7:00 PM - 9:00 PM",
      location: "Church Fellowship Hall",
      category: "Marriage",
      attendees: 18,
      maxAttendees: 30,
      status: "draft",
      description:
        "Strengthen your marriage with biblical principles and practical tools.",
      registrations: 18,
    },
  ];

  const eventCategories = [
    "All Categories",
    "Youth",
    "Adults",
    "Seniors",
    "Marriage",
    "Outreach",
    "Worship",
    "Bible Study",
    "Fellowship",
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Ministry Events Management
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Create, manage, and track all ministry events and activities
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Events
                </p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Attendees
                </p>
                <p className="text-2xl font-bold">348</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg. Attendance
                </p>
                <p className="text-2xl font-bold">87%</p>
              </div>
              <Eye className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <Input placeholder="Search events..." className="max-w-sm" />
          <select className="px-3 py-2 border border-gray-300 rounded-md">
            {eventCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create New Event
        </Button>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Upcoming Events</h2>

        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{event.title}</h3>
                        <p className="text-gray-600 mt-1">
                          {event.description}
                        </p>
                      </div>
                      <Badge
                        variant={
                          event.status === "published" ? "default" : "secondary"
                        }
                        className="ml-2"
                      >
                        {event.status}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {event.attendees}/{event.maxAttendees} registered
                      </div>
                    </div>

                    <Badge variant="outline" className="w-fit">
                      {event.category}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>

                {/* Progress Bar for Registration */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Registration Progress</span>
                    <span>
                      {Math.round((event.attendees / event.maxAttendees) * 100)}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${
                          (event.attendees / event.maxAttendees) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Event Creation Form */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Event Creation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Event Title
              </label>
              <Input placeholder="Enter event title" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="">Select category</option>
                {eventCategories.slice(1).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <Input type="date" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time</label>
              <Input type="time" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <Input placeholder="Event location" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Max Attendees
              </label>
              <Input type="number" placeholder="50" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea placeholder="Event description..." />
          </div>
          <div className="flex gap-2">
            <Button>Save as Draft</Button>
            <Button variant="outline">Publish Event</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
