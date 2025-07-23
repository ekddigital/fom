"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Users,
  Play,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";
import {
  usePrayerFasting,
  type PrayerFastingSession,
} from "@/lib/hooks/use-prayer-fasting";
import { YouTubePlayer } from "@/components/ui/youtube-player";
import { RichTextViewer } from "@/components/ui/rich-text-viewer";
import { format } from "date-fns";

export default function PrayerFastingPage() {
  const {
    loading,
    getCurrentSession,
    getUpcomingSessions,
    getArchiveSessions,
  } = usePrayerFasting();
  const [currentSession, setCurrentSession] =
    useState<PrayerFastingSession | null>(null);
  const [upcomingSessions, setUpcomingSessions] = useState<
    PrayerFastingSession[]
  >([]);
  const [archiveSessions, setArchiveSessions] = useState<
    PrayerFastingSession[]
  >([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [current, upcoming, archive] = await Promise.all([
          getCurrentSession(),
          getUpcomingSessions(),
          getArchiveSessions(6), // Get last 6 sessions
        ]);
        setCurrentSession(current);
        setUpcomingSessions(upcoming);
        setArchiveSessions(archive);
      } catch (error) {
        console.error("Error loading prayer & fasting data:", error);
      }
    };

    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getNextSessionDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    // Get last week of current month
    const lastDay = new Date(year, month + 1, 0).getDate();
    const lastWeekStart = lastDay - 6;
    const sessionDate = new Date(year, month, lastWeekStart);

    // If we're past this month's session, get next month's
    if (now.getDate() > lastDay - 3) {
      const nextMonth = month + 1;
      const nextYear = nextMonth > 11 ? year + 1 : year;
      const actualNextMonth = nextMonth > 11 ? 0 : nextMonth;
      const nextLastDay = new Date(nextYear, actualNextMonth + 1, 0).getDate();
      const nextLastWeekStart = nextLastDay - 6;
      return new Date(nextYear, actualNextMonth, nextLastWeekStart);
    }

    return sessionDate;
  };

  const nextSession = getNextSessionDate();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="p-4 bg-blue-100 rounded-full inline-block mb-4">
            <Heart className="h-12 w-12 text-blue-950 animate-pulse" />
          </div>
          <p className="text-blue-950 text-lg">
            Loading Prayer & Fasting content...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-100 rounded-full">
                <Heart className="h-12 w-12 text-blue-950" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-blue-950 mb-6">
              Monthly Prayer & Fasting
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join us for our monthly prayer and fasting during the last week of
              every month. Experience powerful times of worship, word sharing,
              and unified prayer as we seek God&apos;s heart together.
            </p>
          </div>

          {/* Next Session Countdown */}
          <div className="max-w-2xl mx-auto">
            <Card className="bg-gradient-to-r from-blue-950 to-blue-800 text-white border-0 shadow-xl">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Next Prayer & Fasting
                </h3>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Calendar className="h-6 w-6" />
                  <span className="text-xl">
                    {format(nextSession, "MMMM d, yyyy")}
                  </span>
                </div>
                <p className="text-blue-100">
                  Last week of {format(nextSession, "MMMM")} • 7 Days of Prayer
                  & Fasting
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Current Session */}
      {currentSession && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <Badge className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 mb-4">
                Current Session
              </Badge>
              <h2 className="text-3xl font-bold text-blue-950 mb-4">
                {currentSession.title}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {currentSession.description}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Video Player */}
              <div>
                <YouTubePlayer
                  videoId={currentSession.youtubeVideoId}
                  title={currentSession.title}
                  className="mb-6"
                />
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    Speaker: {currentSession.speaker}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(currentSession.date), "MMMM d, yyyy")}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    {currentSession.duration}
                  </div>
                </div>
                <Button className="w-full bg-blue-950 hover:bg-blue-800">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share This Session
                </Button>
              </div>

              {/* Content */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Word Shared
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RichTextViewer content={currentSession.content} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Sessions */}
      {upcomingSessions.length > 0 && (
        <section className="py-16 px-4 bg-blue-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <Badge className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 mb-4">
                Coming Soon
              </Badge>
              <h2 className="text-3xl font-bold text-blue-950 mb-4">
                Upcoming Sessions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Mark your calendar for these upcoming prayer and fasting
                sessions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingSessions.map((session) => (
                <Card
                  key={session.id}
                  className="group hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <Badge className="mb-3 text-xs bg-blue-100 text-blue-800">
                      {format(new Date(session.date), "MMM d, yyyy")}
                    </Badge>
                    <h3 className="font-semibold text-blue-950 mb-2 line-clamp-2">
                      {session.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                      {session.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Speaker: {session.speaker}</span>
                      <span>{session.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-blue-950 mb-6">
                What is Monthly Prayer & Fasting?
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Every month during the last 7 days, Fishers of Men comes
                  together for intensive prayer and fasting. This is a time
                  where we seek God&apos;s face collectively and individually.
                </p>
                <p>
                  Each session features a different member or leader sharing a
                  word from the Lord, followed by corporate prayer where
                  everyone can participate and lift up their hearts to God.
                </p>
                <p>
                  These sessions are recorded and shared so that members who
                  cannot attend live can still be blessed by the word shared and
                  join in prayer from wherever they are.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-blue-950" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-950 mb-2">When</h3>
                    <p className="text-gray-600 text-sm">
                      Last 7 days of every month
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-950 mb-2">Who</h3>
                    <p className="text-gray-600 text-sm">
                      All FOM members and friends are welcome
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Heart className="h-6 w-6 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-950 mb-2">
                      Purpose
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Seek God&apos;s face through prayer, fasting, and His Word
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Archive Sessions */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-950 mb-4">
              Previous Sessions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse through our archive of prayer and fasting sessions to be
              blessed by the words shared by our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {archiveSessions.map((session) => (
              <Card
                key={session.id}
                className="group hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-gray-100 rounded-t-lg relative overflow-hidden">
                  <YouTubePlayer
                    videoId={session.youtubeVideoId}
                    title={session.title}
                    thumbnail={true}
                    className="h-full"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 text-blue-950 ml-0.5" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3 text-xs">
                    {format(new Date(session.date), "MMM yyyy")}
                  </Badge>
                  <h3 className="font-semibold text-blue-950 mb-2 line-clamp-2">
                    {session.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {session.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Speaker: {session.speaker}</span>
                    <span>{session.duration}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white"
            >
              View All Sessions
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-950 to-blue-800 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Join Us in Prayer & Fasting
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Be part of our monthly prayer and fasting sessions. Experience the
            power of corporate prayer and be encouraged by God&apos;s Word.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-950 hover:bg-blue-50">
              <Calendar className="h-4 w-4 mr-2" />
              Add to Calendar
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-950"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Get Notifications
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
