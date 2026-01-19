"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Play, Heart, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";

interface PrayerFastingSession {
  id: string;
  title: string;
  description: string;
  excerpt: string;
  youtubeVideoId: string;
  speaker: string;
  date: string;
  duration: string;
  status: "current" | "upcoming" | "archived";
  slug: string;
}

export const FeaturedPrayerFasting = () => {
  const [featuredSessions, setFeaturedSessions] = useState<
    PrayerFastingSession[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedSessions = async () => {
      try {
        // Fetch current sessions and latest upcoming/archived
        const [currentResponse, allResponse] = await Promise.all([
          fetch("/api/prayer-fasting/current"),
          fetch("/api/prayer-fasting/all"),
        ]);

        const [currentData, allData] = await Promise.all([
          currentResponse.json(),
          allResponse.json(),
        ]);

        const sessions: PrayerFastingSession[] = [];

        // Add current sessions (priority)
        if (currentData.sessions && currentData.sessions.length > 0) {
          sessions.push(...currentData.sessions.slice(0, 2));
        }

        // Fill remaining slots with latest sessions
        if (sessions.length < 3 && allData.sessions) {
          const remainingSlots = 3 - sessions.length;
          const additionalSessions = allData.sessions
            .filter(
              (session: PrayerFastingSession) =>
                !sessions.find((s) => s.id === session.id)
            )
            .slice(0, remainingSlots);

          sessions.push(...additionalSessions);
        }

        setFeaturedSessions(sessions);
      } catch (error) {
        console.error("Failed to fetch featured sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedSessions();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-80 bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (featuredSessions.length === 0) {
    return null; // Don't show section if no sessions
  }

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-purple-100 rounded-full">
              <Heart className="h-12 w-12 text-purple-600" />
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Monthly Prayer & Fasting
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us in our monthly prayer and fasting sessions during the last
            week of every month. Experience the power of corporate prayer and be
            encouraged by God&apos;s Word.
          </p>
        </div>

        {/* Featured Sessions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredSessions.map((session, index) => (
            <Card
              key={session.id}
              className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                index === 0 && session.status === "current"
                  ? "ring-2 ring-purple-200 bg-gradient-to-br from-purple-50 to-white"
                  : "bg-white"
              }`}
            >
              <CardContent className="p-0">
                {/* Video Thumbnail */}
                <div className="aspect-video bg-gray-100 rounded-t-lg relative overflow-hidden">
                  <Image
                    src={`https://img.youtube.com/vi/${session.youtubeVideoId}/maxresdefault.jpg`}
                    alt={session.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback to medium quality thumbnail
                      e.currentTarget.src = `https://img.youtube.com/vi/${session.youtubeVideoId}/mqdefault.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 text-purple-600 ml-1" />
                    </div>
                  </div>

                  {/* Status Badge */}
                  {index === 0 && session.status === "current" && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-green-600 text-white">
                        ● LIVE NOW
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      variant={
                        session.status === "current"
                          ? "default"
                          : session.status === "upcoming"
                          ? "secondary"
                          : "outline"
                      }
                      className={
                        session.status === "current"
                          ? "bg-green-100 text-green-800"
                          : session.status === "upcoming"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {format(new Date(session.date), "MMM d, yyyy")}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {session.duration}
                    </span>
                  </div>

                  <Link href={`/prayer-fasting/${session.slug || session.id}`}>
                    <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 hover:text-purple-600 transition-colors">
                      {session.title}
                    </h3>
                  </Link>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {session.excerpt || session.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Speaker: {session.speaker}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link href="/prayer-fasting">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold"
            >
              View All Sessions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
