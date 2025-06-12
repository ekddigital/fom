import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  location: string;
  avatar?: string;
  featured?: boolean;
}

function TestimonialCard({
  quote,
  author,
  role,
  location,
  avatar,
  featured = false,
}: TestimonialProps) {
  return (
    <Card
      className={`${
        featured
          ? "bg-white shadow-xl border-blue-200 md:col-span-2 lg:col-span-1"
          : "bg-white shadow-lg border-gray-200"
      } group hover:shadow-xl transition-all duration-500 relative overflow-hidden hover:scale-105`}
    >
      {featured && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 group-hover:from-blue-50 group-hover:to-cyan-50 transition-colors"></div>
          <Badge className="absolute top-4 right-4 bg-blue-950 text-white border-0 animate-pulse">
            Featured
          </Badge>
        </>
      )}

      <CardContent className="p-8 space-y-6 relative z-10">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-50 p-3 rounded-xl">
            <Quote className="w-6 h-6 text-blue-950" />
          </div>
          <blockquote
            className={`${
              featured ? "text-lg" : "text-base"
            } text-gray-700 leading-relaxed italic flex-1`}
          >
            &quot;{quote}&quot;
          </blockquote>
        </div>

        <div className="flex items-center space-x-4">
          <Avatar className="w-14 h-14 border-2 border-blue-200">
            <AvatarImage src={avatar} alt={author} />
            <AvatarFallback className="bg-blue-950 text-white font-bold">
              {author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <h4
              className={`${
                featured ? "text-lg" : "text-base"
              } font-bold text-fom-secondary`}
            >
              {author}
            </h4>
            <p className="text-sm text-blue-950">{role}</p>
            <p className="text-xs text-gray-500">{location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface FomTestimonialsProps {
  className?: string;
}

export function FomTestimonials({ className = "" }: FomTestimonialsProps) {
  const testimonials = [
    {
      quote:
        "Joining Fishers of Men changed my entire perspective on life. The community here is genuinely caring, and the Bible studies have deepened my relationship with Christ immeasurably.",
      author: "Sarah Johnson",
      role: "Small Group Leader",
      location: "Atlanta, GA",
      featured: true,
    },
    {
      quote:
        "The mission trip to Guatemala opened my eyes to God's heart for the nations. I've never felt more purpose in my life than when serving others in Jesus' name.",
      author: "Michael Chen",
      role: "Mission Team Member",
      location: "Seattle, WA",
    },
    {
      quote:
        "After years of struggling with my faith, the prayer support and discipleship program here helped me find my way back to God. I'm now leading others in their journey too.",
      author: "David Rodriguez",
      role: "Discipleship Coordinator",
      location: "Phoenix, AZ",
      featured: true,
    },
    {
      quote:
        "The online sermons and Bible studies kept me connected to God during difficult times. The pastors here truly care about each person's spiritual growth.",
      author: "Emily Thompson",
      role: "Youth Ministry Volunteer",
      location: "Nashville, TN",
    },
    {
      quote:
        "Being part of the worship team has allowed me to use my gifts for God's glory. The fellowship and spiritual growth I've experienced here is incredible.",
      author: "James Wilson",
      role: "Worship Team Leader",
      location: "Denver, CO",
    },
    {
      quote:
        "The community outreach programs showed me practical ways to live out my faith. Serving the homeless and elderly has become a passion of mine.",
      author: "Maria Garcia",
      role: "Outreach Coordinator",
      location: "Los Angeles, CA",
    },
  ];

  return (
    <section
      className={`py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden ${className}`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-cyan-50/30"></div>
      <div className="absolute top-20 left-20 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-20 w-64 h-64 bg-cyan-100/30 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "3s" }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-blue-950 to-cyan-600 bg-clip-text text-transparent mb-8">
            Lives Transformed by Faith
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Hear from our community members about their journey with Jesus
            Christ and how FOM has impacted their lives
          </p>
          <div className="mt-8 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-950 rounded-full animate-pulse"></div>
            <div
              className="w-3 h-3 bg-cyan-600 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="w-3 h-3 bg-blue-950 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.author}-${index}`}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
