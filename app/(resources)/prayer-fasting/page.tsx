"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Play,
  Heart,
  Share2,
  Facebook,
  Twitter,
  Copy,
  MessageCircle,
} from "lucide-react";
import {
  usePrayerFasting,
  type PrayerFastingSession,
} from "@/lib/hooks/use-prayer-fasting";
import { YouTubePlayer } from "@/components/ui/youtube-player";
import { format } from "date-fns";
import Link from "next/link";

export default function PrayerFastingPage() {
  const { loading } = usePrayerFasting();

  const [allSessions, setAllSessions] = useState<PrayerFastingSession[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<
    PrayerFastingSession[]
  >([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Get all sessions and organize them
  const loadAllSessions = async () => {
    try {
      const response = await fetch("/api/prayer-fasting/all");
      if (!response.ok) {
        throw new Error("Failed to fetch sessions");
      }
      const data = await response.json();

      setAllSessions(data.sessions || []);
      setFilteredSessions(data.sessions || []);
    } catch (error) {
      console.error("Error loading all sessions:", error);
    }
  };

  // Filter sessions based on selected criteria
  const filterSessions = () => {
    let filtered = [...allSessions];

    // Filter by month
    if (selectedMonth !== "all") {
      filtered = filtered.filter((session) => {
        const sessionDate = new Date(session.date);
        return sessionDate.getMonth() === parseInt(selectedMonth);
      });
    }

    // Filter by year
    if (selectedYear !== "all") {
      filtered = filtered.filter((session) => {
        const sessionDate = new Date(session.date);
        return sessionDate.getFullYear() === parseInt(selectedYear);
      });
    }

    // Filter by status
    if (selectedStatus !== "all") {
      if (selectedStatus === "current") {
        filtered = filtered.filter((session) => session.status === "current");
      } else if (selectedStatus === "upcoming") {
        filtered = filtered.filter((session) => session.status === "upcoming");
      } else if (selectedStatus === "archived") {
        filtered = filtered.filter((session) => session.status === "archived");
      }
    }

    setFilteredSessions(filtered);
  };

  // Get unique months and years for filter options
  const getFilterOptions = () => {
    const months: { value: string; label: string }[] = [];
    const years: { value: string; label: string }[] = [];

    allSessions.forEach((session) => {
      const sessionDate = new Date(session.date);
      const month = sessionDate.getMonth();
      const year = sessionDate.getFullYear();

      const monthLabel = format(sessionDate, "MMMM");
      const monthOption = { value: month.toString(), label: monthLabel };
      if (!months.find((m) => m.value === monthOption.value)) {
        months.push(monthOption);
      }

      const yearOption = { value: year.toString(), label: year.toString() };
      if (!years.find((y) => y.value === yearOption.value)) {
        years.push(yearOption);
      }
    });

    return { months, years };
  };

  const { months, years } = getFilterOptions();

  // Sharing functions
  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info",
  ) => {
    const toast = document.createElement("div");
    const bgColor =
      type === "success"
        ? "bg-green-600"
        : type === "error"
          ? "bg-red-600"
          : "bg-blue-600";
    toast.className = `fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
  };

  const handleShare = async (
    platform: string,
    session: PrayerFastingSession,
  ) => {
    const sessionUrl = `${window.location.origin}/prayer-fasting/${
      session.slug || session.id
    }`;
    const shareText = `🙏 Join us for ${session.title} - Monthly Prayer & Fasting Session\n\n${session.description}`;

    try {
      switch (platform) {
        case "whatsapp":
          window.open(
            `https://wa.me/?text=${encodeURIComponent(
              `${shareText}\n\n🔗 ${sessionUrl}`,
            )}`,
          );
          break;
        case "facebook":
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              sessionUrl,
            )}&quote=${encodeURIComponent(shareText)}`,
          );
          break;
        case "twitter":
          const twitterText =
            shareText.length > 240
              ? shareText.substring(0, 240) + "..."
              : shareText;
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              twitterText,
            )}&url=${encodeURIComponent(
              sessionUrl,
            )}&hashtags=PrayerAndFasting,FishersOfMen`,
          );
          break;
        case "copy":
          await navigator.clipboard.writeText(`${shareText}\n\n${sessionUrl}`);
          showToast("Link copied to clipboard!", "success");
          break;
        case "native":
          if (navigator.share) {
            await navigator.share({
              title: session.title,
              text: shareText,
              url: sessionUrl,
            });
          } else {
            // Fallback to copy
            await navigator.clipboard.writeText(
              `${shareText}\n\n${sessionUrl}`,
            );
            showToast("Link copied to clipboard!", "info");
          }
          break;
        default:
          await navigator.clipboard.writeText(`${shareText}\n\n${sessionUrl}`);
          showToast("Link copied to clipboard!", "info");
      }

      // Track share event (optional)
      if (session.id) {
        fetch(`/api/prayer-fasting/${session.id}/share`, {
          method: "POST",
        }).catch(console.error);
      }
    } catch (error) {
      console.error("Error sharing:", error);
      showToast("Failed to share. Please try again.", "error");
    }
  };

  useEffect(() => {
    loadAllSessions();
  }, []);

  useEffect(() => {
    filterSessions();
  }, [selectedMonth, selectedYear, selectedStatus, allSessions]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="p-4 bg-blue-100 rounded-full inline-block mb-4">
            <Heart className="h-12 w-12 text-blue-950 animate-pulse" />
          </div>
          <p className="text-blue-950 text-lg">
            Loading Prayer & Fasting sessions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Heart className="h-10 w-10 text-blue-950" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-blue-950 mb-4">
              Monthly Prayer & Fasting Sessions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join us for our monthly prayer and fasting during the last week of
              every month. Browse through all our sessions, watch previous
              recordings, and be blessed by God&apos;s Word shared by our
              community.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48 bg-white border-gray-200">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 shadow-lg">
                <SelectItem value="all">All Sessions</SelectItem>
                <SelectItem value="current">Current</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32 bg-white border-gray-200">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 shadow-lg">
                <SelectItem value="all">All Years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year.value} value={year.value}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-40 bg-white border-gray-200">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 shadow-lg">
                <SelectItem value="all">All Months</SelectItem>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="text-center mb-6">
            <p className="text-gray-600">
              Showing {filteredSessions.length} of {allSessions.length} sessions
            </p>
          </div>
        </div>
      </section>

      {/* All Sessions Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {filteredSessions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Heart className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No sessions found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your filters to see more sessions.
              </p>
              <Button
                onClick={() => {
                  setSelectedMonth("all");
                  setSelectedYear("all");
                  setSelectedStatus("all");
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSessions.map((session) => (
                <Card
                  key={session.id}
                  className="group hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <Link href={`/prayer-fasting/${session.slug || session.id}`}>
                    <div className="aspect-video bg-gray-100 rounded-t-lg relative overflow-hidden">
                      <YouTubePlayer
                        videoId={session.youtubeVideoId}
                        title={session.title}
                        thumbnail={true}
                        className="w-full h-full rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="h-6 w-6 text-blue-950 ml-0.5" />
                        </div>
                      </div>
                    </div>
                  </Link>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge
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
                      <Badge variant="outline" className="text-xs">
                        {session.status.toLowerCase()}
                      </Badge>
                    </div>

                    <Link
                      href={`/prayer-fasting/${session.slug || session.id}`}
                    >
                      <h3 className="font-semibold text-blue-950 mb-2 line-clamp-2 hover:text-blue-700 transition-colors">
                        {session.title}
                      </h3>
                    </Link>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {session.excerpt || session.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        Speaker: {session.speaker} • {session.duration}
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Share2 className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare("whatsapp", session);
                            }}
                            className="cursor-pointer"
                          >
                            <div className="flex items-center">
                              <div className="w-4 h-4 mr-2 bg-green-500 rounded-sm flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  W
                                </span>
                              </div>
                              WhatsApp
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare("facebook", session);
                            }}
                            className="cursor-pointer"
                          >
                            <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                            Facebook
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare("twitter", session);
                            }}
                            className="cursor-pointer"
                          >
                            <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                            Twitter
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare("copy", session);
                            }}
                            className="cursor-pointer"
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Link
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-950 to-blue-800 text-white">
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
