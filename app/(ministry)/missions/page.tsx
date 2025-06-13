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
  Globe,
  MapPin,
  Calendar,
  Users,
  Heart,
  Plane,
  DollarSign,
  FileText,
} from "lucide-react";

export default function MissionsPage() {
  const upcomingTrips = [
    {
      id: 1,
      destination: "Guatemala",
      purpose: "Children's Ministry & Medical Outreach",
      dates: "July 15-25, 2025",
      duration: "10 days",
      teamSize: 12,
      spotsLeft: 3,
      cost: "$1,800",
      description:
        "Serve at orphanages, provide medical care, and share the gospel with children and families in Guatemala City.",
      requirements: [
        "Passport required",
        "Basic Spanish helpful",
        "Medical volunteers preferred",
      ],
      featured: true,
    },
    {
      id: 2,
      destination: "Philippines",
      purpose: "Church Planting & Construction",
      dates: "September 10-24, 2025",
      duration: "14 days",
      teamSize: 10,
      spotsLeft: 5,
      cost: "$2,200",
      description:
        "Help build a new church building and support local pastors in establishing new congregations.",
      requirements: [
        "Construction experience helpful",
        "Flexible schedule",
        "Open heart for missions",
      ],
      featured: false,
    },
    {
      id: 3,
      destination: "Kenya",
      purpose: "Water Well Project",
      dates: "November 5-19, 2025",
      duration: "14 days",
      teamSize: 8,
      spotsLeft: 2,
      cost: "$2,500",
      description:
        "Install clean water systems in rural communities and train local technicians for maintenance.",
      requirements: [
        "Technical skills preferred",
        "Physical fitness",
        "Cultural sensitivity",
      ],
      featured: false,
    },
  ];

  const pastMissions = [
    {
      location: "Guatemala",
      year: "2024",
      impact: "200+ children served, 50 salvations",
    },
    {
      location: "Philippines",
      year: "2024",
      impact: "3 churches planted, 100 families aided",
    },
    {
      location: "Kenya",
      year: "2023",
      impact: "5 water wells installed, 500+ people served",
    },
    {
      location: "Honduras",
      year: "2023",
      impact: "Medical clinic established, 300+ treated",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Globe className="w-8 h-8 text-blue-950 mr-3" />
          <h1 className="text-4xl font-bold text-blue-950">Mission Trips</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          "Go therefore and make disciples of all nations..." - Matthew 28:19.
          Join us in spreading God's love around the world.
        </p>
      </div>

      {/* Mission Impact Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Globe className="w-6 h-6 text-green-700" />
            </div>
            <div className="text-2xl font-bold text-blue-950 mb-1">15</div>
            <div className="text-sm text-gray-600">Countries Visited</div>
          </CardContent>
        </Card>
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-blue-700" />
            </div>
            <div className="text-2xl font-bold text-blue-950 mb-1">180</div>
            <div className="text-sm text-gray-600">Missionaries Sent</div>
          </CardContent>
        </Card>
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-red-700" />
            </div>
            <div className="text-2xl font-bold text-blue-950 mb-1">2,400+</div>
            <div className="text-sm text-gray-600">Lives Touched</div>
          </CardContent>
        </Card>
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Plane className="w-6 h-6 text-purple-700" />
            </div>
            <div className="text-2xl font-bold text-blue-950 mb-1">32</div>
            <div className="text-sm text-gray-600">Mission Trips</div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Mission Trip */}
      {upcomingTrips
        .filter((trip) => trip.featured)
        .map((trip) => (
          <Card
            key={trip.id}
            className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50"
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-blue-950 text-white">
                  Next Mission Trip
                </Badge>
                <Badge
                  className={
                    trip.spotsLeft > 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {trip.spotsLeft > 0 ? `${trip.spotsLeft} spots left` : "Full"}
                </Badge>
              </div>
              <CardTitle className="text-2xl text-blue-950 mb-2">
                {trip.destination} Mission Trip
              </CardTitle>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {trip.destination}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {trip.dates}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {trip.teamSize} team members
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {trip.cost}
                </div>
              </div>
              <p className="text-lg font-medium text-gray-800">
                {trip.purpose}
              </p>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-gray-700 mb-6">
                {trip.description}
              </CardDescription>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Requirements & Recommendations:
                </h4>
                <div className="space-y-1">
                  {trip.requirements.map((req, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <div className="w-2 h-2 bg-blue-950 rounded-full mr-3 flex-shrink-0"></div>
                      {req}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {trip.duration} •{" "}
                  {trip.spotsLeft > 0
                    ? `${trip.spotsLeft} spots remaining`
                    : "Trip is full"}
                </div>
                <div className="flex space-x-2">
                  {trip.spotsLeft > 0 ? (
                    <Button className="bg-blue-950 hover:bg-blue-800">
                      <Plane className="w-4 h-4 mr-2" />
                      Apply for Trip
                    </Button>
                  ) : (
                    <Button variant="outline" disabled>
                      Join Waiting List
                    </Button>
                  )}
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Trip Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

      {/* Upcoming Missions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-blue-950 mb-6">
          Upcoming Mission Opportunities
        </h2>
        <div className="grid lg:grid-cols-2 gap-6">
          {upcomingTrips
            .filter((trip) => !trip.featured)
            .map((trip) => (
              <Card
                key={trip.id}
                className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-blue-200"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">Mission Trip</Badge>
                    <Badge
                      className={
                        trip.spotsLeft > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {trip.spotsLeft > 0 ? `${trip.spotsLeft} spots` : "Full"}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-blue-950 transition-colors">
                    {trip.destination} - {trip.purpose}
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {trip.dates}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {trip.teamSize} team
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-3 h-3 mr-1" />
                      {trip.cost}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {trip.description}
                  </CardDescription>

                  <div className="mb-4">
                    <h5 className="font-medium text-gray-900 mb-2 text-sm">
                      Key Requirements:
                    </h5>
                    <div className="space-y-1">
                      {trip.requirements.slice(0, 2).map((req, index) => (
                        <div
                          key={index}
                          className="flex items-center text-xs text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-950 rounded-full mr-2 flex-shrink-0"></div>
                          {req}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {trip.spotsLeft > 0 ? (
                      <Button
                        size="sm"
                        className="flex-1 bg-blue-950 hover:bg-blue-800"
                      >
                        Apply
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
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Past Missions Impact */}
      <div className="bg-gray-50 rounded-lg p-8 mb-12">
        <h3 className="text-2xl font-bold text-blue-950 mb-6 text-center">
          Our Mission Impact
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pastMissions.map((mission, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-blue-950" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">
                {mission.location}
              </h4>
              <p className="text-sm text-gray-600 mb-2">{mission.year}</p>
              <p className="text-sm text-blue-950 font-medium">
                {mission.impact}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-lg p-8 text-center text-white">
        <Globe className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">Ready to Answer the Call?</h3>
        <p className="mb-6 opacity-90 max-w-2xl mx-auto">
          God is calling ordinary people to do extraordinary things. Take the
          step of faith and join us on a life-changing mission trip.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-blue-950 hover:bg-gray-100"
          >
            <Plane className="w-5 h-5 mr-2" />
            Apply for Missions
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-blue-950"
          >
            Mission Information Meeting
          </Button>
        </div>
      </div>
    </div>
  );
}
