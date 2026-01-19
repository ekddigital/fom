import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Users,
  Clock,
  Star,
  Search,
  Filter,
  Play,
  Download,
  Calendar,
  User,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function StudyPage() {
  const studyPrograms = [
    {
      id: 1,
      title: "Foundations of Faith",
      description:
        "A comprehensive 12-week study covering core Christian doctrines and beliefs.",
      level: "Beginner",
      duration: "12 weeks",
      sessions: 12,
      enrolled: 45,
      rating: 4.9,
      instructor: "Pastor John Smith",
      image: "/api/placeholder/300/200",
      status: "Enrolling Now",
      startDate: "July 1, 2025",
    },
    {
      id: 2,
      title: "Biblical Hermeneutics",
      description:
        "Learn proper methods of biblical interpretation and exegesis.",
      level: "Advanced",
      duration: "16 weeks",
      sessions: 16,
      enrolled: 28,
      rating: 4.8,
      instructor: "Dr. Sarah Williams",
      image: "/api/placeholder/300/200",
      status: "In Progress",
      startDate: "June 15, 2025",
    },
    {
      id: 3,
      title: "Old Testament Survey",
      description:
        "Journey through the Old Testament with historical and theological insights.",
      level: "Intermediate",
      duration: "20 weeks",
      sessions: 20,
      enrolled: 62,
      rating: 4.7,
      instructor: "Pastor David Chen",
      image: "/api/placeholder/300/200",
      status: "Completed",
      startDate: "January 10, 2025",
    },
    {
      id: 4,
      title: "New Testament Epistles",
      description:
        "Deep dive into Paul's letters and their practical application today.",
      level: "Intermediate",
      duration: "14 weeks",
      sessions: 14,
      enrolled: 38,
      rating: 4.9,
      instructor: "Pastor Maria Rodriguez",
      image: "/api/placeholder/300/200",
      status: "Starting Soon",
      startDate: "August 5, 2025",
    },
    {
      id: 5,
      title: "Christian Apologetics",
      description:
        "Equip yourself to defend the faith with reason and scripture.",
      level: "Advanced",
      duration: "10 weeks",
      sessions: 10,
      enrolled: 32,
      rating: 4.8,
      instructor: "Dr. Michael Johnson",
      image: "/api/placeholder/300/200",
      status: "Enrolling Now",
      startDate: "July 15, 2025",
    },
    {
      id: 6,
      title: "Biblical Counseling Basics",
      description:
        "Learn to provide biblical guidance and support to those in need.",
      level: "Intermediate",
      duration: "12 weeks",
      sessions: 12,
      enrolled: 25,
      rating: 4.6,
      instructor: "Pastor Jennifer Lee",
      image: "/api/placeholder/300/200",
      status: "Planning",
      startDate: "September 1, 2025",
    },
  ];

  const recentStudies = [
    {
      id: 1,
      title: "The Book of Romans: Righteousness Revealed",
      teacher: "Pastor John Smith",
      date: "June 15, 2025",
      duration: "45 min",
      views: 1200,
      type: "Video Study",
    },
    {
      id: 2,
      title: "Prayer: Our Communication with God",
      teacher: "Pastor Sarah Williams",
      date: "June 12, 2025",
      duration: "38 min",
      views: 890,
      type: "Audio Study",
    },
    {
      id: 3,
      title: "Understanding Biblical Prophecy",
      teacher: "Dr. Michael Johnson",
      date: "June 10, 2025",
      duration: "52 min",
      views: 756,
      type: "Video Study",
    },
  ];

  const studyResources = [
    {
      id: 1,
      title: "Bible Study Methods Guide",
      description:
        "Comprehensive guide to various Bible study approaches and techniques.",
      type: "PDF Guide",
      downloads: 2500,
      icon: BookOpen,
    },
    {
      id: 2,
      title: "Scripture Memory Cards",
      description:
        "Printable cards with key verses for memorization and meditation.",
      type: "Printable",
      downloads: 1800,
      icon: Star,
    },
    {
      id: 3,
      title: "Study Journal Template",
      description:
        "Structured template for recording insights and prayers during study.",
      type: "Template",
      downloads: 1200,
      icon: BookOpen,
    },
  ];

  const instructors = [
    {
      id: 1,
      name: "Pastor John Smith",
      title: "Senior Pastor & Bible Teacher",
      experience: "15+ years",
      specialties: ["Systematic Theology", "Biblical Exposition"],
      image: "/api/placeholder/80/80",
      bio: "Passionate about helping believers grow in their understanding of God's Word.",
    },
    {
      id: 2,
      name: "Dr. Sarah Williams",
      title: "Associate Pastor & Scholar",
      experience: "12+ years",
      specialties: ["Biblical Languages", "Hermeneutics"],
      image: "/api/placeholder/80/80",
      bio: "Committed to teaching proper biblical interpretation and application.",
    },
    {
      id: 3,
      name: "Pastor David Chen",
      title: "Teaching Pastor",
      experience: "10+ years",
      specialties: ["Old Testament", "Biblical History"],
      image: "/api/placeholder/80/80",
      bio: "Brings the Old Testament to life with historical and cultural insights.",
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-blue-100 text-blue-800";
      case "Advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Enrolling Now":
        return "bg-green-100 text-green-800";
      case "Starting Soon":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            2 Timothy 2:15 - Study to show yourself approved
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Bible Study &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Teaching
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Deepen your faith through systematic Bible study, theological
            education, and sound biblical teaching. Grow in knowledge and
            spiritual maturity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Browse Study Programs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Download Resources
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search Bible studies..."
                className="pl-10 bg-white/70 backdrop-blur-sm"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter by Level
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Filter by Date
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Study Programs */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Bible Study Programs
            </h2>
            <p className="text-lg text-gray-600">
              Structured programs designed to help you grow in biblical
              knowledge and spiritual maturity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studyPrograms.map((program) => (
              <Card
                key={program.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={program.image}
                    alt={program.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className={getLevelColor(program.level)}>
                      {program.level}
                    </Badge>
                    <Badge className={getStatusColor(program.status)}>
                      {program.status}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <CardDescription>{program.description}</CardDescription>
                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {program.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {program.enrolled} enrolled
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">
                        {program.rating}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <User className="w-4 h-4 inline mr-1" />
                      {program.instructor}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    Starts: {program.startDate}
                  </div>
                  <Button className="w-full">
                    {program.status === "Enrolling Now"
                      ? "Enroll Now"
                      : program.status === "Starting Soon"
                      ? "Join Waitlist"
                      : program.status === "In Progress"
                      ? "View Progress"
                      : "View Details"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Studies */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recent Bible Studies
            </h2>
            <p className="text-lg text-gray-600">
              Access our latest Bible study sessions and teachings.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recentStudies.map((study) => (
              <Card key={study.id} className="bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{study.type}</Badge>
                    <div className="flex items-center text-sm text-gray-600">
                      <Play className="w-4 h-4 mr-1" />
                      {study.views} views
                    </div>
                  </div>
                  <CardTitle className="text-lg">{study.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {study.teacher}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-600">{study.date}</div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {study.duration}
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Play className="mr-2 h-4 w-4" />
                    Watch Study
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/bible-studies">
              <Button size="lg" variant="outline">
                View All Bible Studies
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Study Resources */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Study Resources
            </h2>
            <p className="text-lg text-gray-600">
              Download helpful resources to enhance your personal Bible study
              time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {studyResources.map((resource) => {
              const IconComponent = resource.icon;
              return (
                <Card
                  key={resource.id}
                  className="bg-white/70 backdrop-blur-sm"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {resource.title}
                        </div>
                        <div className="text-sm text-gray-600">
                          {resource.type}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <Download className="w-4 h-4 inline mr-1" />
                        {resource.downloads} downloads
                      </div>
                      <Button size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Bible Teachers
            </h2>
            <p className="text-lg text-gray-600">
              Meet our dedicated team of pastors and teachers who are committed
              to sound biblical instruction.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <Card
                key={instructor.id}
                className="bg-white/70 backdrop-blur-sm text-center"
              >
                <CardContent className="pt-6">
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {instructor.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {instructor.title}
                  </p>
                  <Badge variant="secondary" className="mb-4">
                    {instructor.experience}
                  </Badge>
                  <p className="text-sm text-gray-600 mb-4">{instructor.bio}</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {instructor.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Grow in God&apos;s Word?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join our Bible study programs and deepen your understanding of
            Scripture. Transform your life through the power of God&apos;s Word.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <CheckCircle className="mr-2 h-4 w-4" />
              Enroll in a Program
            </Button>
            <Link href="/bible-studies">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600"
              >
                Browse All Studies
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
