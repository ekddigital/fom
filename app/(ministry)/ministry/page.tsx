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
  Heart,
  Users,
  Globe,
  ArrowRight,
  Target,
  Star,
  MessageCircle,
  Calendar,
  FileText,
  Award,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MinistryOverviewPage() {
  const ministryAreas = [
    {
      id: 1,
      title: "Content Management",
      description:
        "Create and manage sermons, devotionals, and other ministry content for our community.",
      icon: FileText,
      color: "bg-blue-500",
      stats: "500+ pieces of content",
      image: "/api/placeholder/300/200",
      link: "/content",
      features: [
        "Sermon Library",
        "Devotional Creation",
        "Resource Management",
      ],
    },
    {
      id: 2,
      title: "Event Management",
      description:
        "Organize and coordinate ministry events, conferences, and community gatherings.",
      icon: Calendar,
      color: "bg-green-500",
      stats: "50+ events annually",
      image: "/api/placeholder/300/200",
      link: "/manage-events",
      features: ["Event Planning", "Registration", "Volunteer Coordination"],
    },
    {
      id: 3,
      title: "Ministry Certificates",
      description:
        "Award and manage certificates for completed ministry training and programs.",
      icon: Award,
      color: "bg-purple-500",
      stats: "200+ certificates issued",
      image: "/api/placeholder/300/200",
      link: "/ministry-certificates",
      features: [
        "Certificate Creation",
        "Training Programs",
        "Achievement Tracking",
      ],
    },
    {
      id: 4,
      title: "Global Missions",
      description:
        "Coordinate international mission trips and support global evangelism efforts.",
      icon: Globe,
      color: "bg-orange-500",
      stats: "12 countries reached",
      image: "/api/placeholder/300/200",
      link: "/missions",
      features: ["Mission Trips", "Partner Churches", "Global Outreach"],
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Ministry Leadership Training",
      date: "June 25, 2025",
      location: "Main Campus - Conference Room A",
      attendees: 25,
      description:
        "Equip current and future ministry leaders with essential skills and biblical foundations.",
      type: "Training",
    },
    {
      id: 2,
      title: "Community Outreach Planning",
      date: "July 2, 2025",
      location: "Fellowship Hall",
      attendees: 40,
      description:
        "Plan upcoming community service projects and outreach initiatives.",
      type: "Planning",
    },
    {
      id: 3,
      title: "Mission Trip Preparation",
      date: "July 8, 2025",
      location: "Youth Center",
      attendees: 15,
      description:
        "Prepare team members for upcoming mission trip to Guatemala.",
      type: "Preparation",
    },
  ];

  const ministryStats = [
    { label: "Active Ministries", value: "15+", icon: Heart },
    { label: "Volunteers Engaged", value: "200+", icon: Users },
    { label: "Lives Impacted", value: "5,000+", icon: Target },
    { label: "Years of Service", value: "6+", icon: Star },
  ];

  const quickActions = [
    {
      title: "Create Content",
      description: "Add new sermons, devotionals, or resources",
      icon: FileText,
      link: "/content",
      color: "bg-blue-500",
    },
    {
      title: "Schedule Event",
      description: "Plan and organize ministry events",
      icon: Calendar,
      link: "/manage-events",
      color: "bg-green-500",
    },
    {
      title: "Issue Certificate",
      description: "Award certificates for completed programs",
      icon: Award,
      link: "/ministry-certificates",
      color: "bg-purple-500",
    },
    {
      title: "Plan Mission",
      description: "Organize mission trips and outreach",
      icon: Globe,
      link: "/missions",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Matthew 28:19 - Go and make disciples of all nations
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Ministry &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Outreach Hub
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Welcome to the central hub for all ministry activities. Manage
            content, coordinate events, track certifications, and plan mission
            outreach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              View Resources
            </Button>
          </div>
        </div>
      </section>

      {/* Ministry Statistics */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {ministryStats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <p className="text-lg text-gray-600">
              Access the most common ministry tasks and functions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Link key={action.title} href={action.link}>
                  <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm cursor-pointer">
                    <CardContent className="pt-6 text-center">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 ${action.color} rounded-lg mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {action.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ministry Areas */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ministry Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the different areas of ministry management and outreach
              coordination.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {ministryAreas.map((area) => {
              const IconComponent = area.icon;
              return (
                <Card
                  key={area.id}
                  className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm"
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={area.image}
                      alt={area.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div
                      className={`absolute top-4 left-4 w-12 h-12 ${area.color} rounded-lg flex items-center justify-center`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{area.title}</CardTitle>
                    <CardDescription>{area.description}</CardDescription>
                    <Badge variant="secondary" className="w-fit">
                      {area.stats}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Key Features:
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {area.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <ArrowRight className="w-3 h-3 mr-2 text-blue-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link href={area.link}>
                      <Button className="w-full">
                        Access {area.title}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Ministry Events */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Ministry Events
            </h2>
            <p className="text-lg text-gray-600">
              Stay updated with upcoming ministry training and coordination
              events.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{event.type}</Badge>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      {event.attendees} attending
                    </div>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <Target className="w-4 h-4 mr-1" />
                    {event.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600 mb-4">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {event.date}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {event.description}
                  </p>
                  <Button className="w-full" variant="outline">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/manage-events">
              <Button size="lg" variant="outline">
                View All Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Advance the Kingdom?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Use our ministry tools to create content, organize events, and
            coordinate outreach efforts that make a lasting impact for the
            gospel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact Ministry Team
            </Button>
            <Link href="/content">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600"
              >
                Start Creating Content
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
