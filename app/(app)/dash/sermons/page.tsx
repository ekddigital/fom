"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlayCircle,
  Search,
  Calendar,
  User,
  Download,
  Share,
  Bookmark,
} from "lucide-react";
import { toast } from "sonner";

interface Sermon {
  id: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  audioUrl?: string;
  thumbnailUrl?: string;
  duration?: number;
  series?: string;
  tags: string[];
  createdAt: string;
  publishedAt?: string;
  viewCount: number;
  downloadCount: number;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    avatarUrl?: string;
  };
  isBookmarked?: boolean;
}

export default function SermonsPage() {
  const { user } = useAuth();
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [filterSeries, setFilterSeries] = useState("all");
  const [series, setSeries] = useState<string[]>([]);

  const fetchSermons = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        search: searchTerm,
        sortBy,
        series: filterSeries,
      });

      const response = await fetch(`/api/sermons?${params}`);
      if (response.ok) {
        const data = await response.json();
        setSermons(data.sermons || []);
        setSeries(data.series || []);
      }
    } catch (error) {
      console.error("Failed to fetch sermons:", error);
      toast.error("Failed to load sermons");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, sortBy, filterSeries]);

  useEffect(() => {
    fetchSermons();
  }, [fetchSermons]);

  const handleBookmark = async (sermonId: string) => {
    try {
      const response = await fetch(`/api/sermons/${sermonId}/bookmark`, {
        method: "POST",
      });

      if (response.ok) {
        toast.success("Sermon bookmarked");
        fetchSermons();
      } else {
        toast.error("Failed to bookmark sermon");
      }
    } catch (error) {
      console.error("Failed to bookmark sermon:", error);
      toast.error("Failed to bookmark sermon");
    }
  };

  const handleShare = async (sermon: Sermon) => {
    try {
      await navigator.share({
        title: sermon.title,
        text: sermon.description,
        url: `${window.location.origin}/sermons/${sermon.id}`,
      });
    } catch {
      // Fallback to clipboard
      navigator.clipboard.writeText(
        `${window.location.origin}/sermons/${sermon.id}`
      );
      toast.success("Sermon link copied to clipboard");
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return "Unknown";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Loading...</h2>
          <p className="text-gray-600">
            Please wait while we load the sermon library.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sermon Library</h1>
          <p className="text-gray-600">
            Explore our collection of inspiring messages
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search sermons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterSeries} onValueChange={setFilterSeries}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Series</SelectItem>
                {series.map((seriesName) => (
                  <SelectItem key={seriesName} value={seriesName}>
                    {seriesName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Sermons Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-16 bg-gray-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : sermons.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <PlayCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Sermons Found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterSeries !== "all"
                ? "Try adjusting your search or filters."
                : "Check back soon for new sermon content."}
            </p>
            {(searchTerm || filterSeries !== "all") && (
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setFilterSeries("all");
                }}
              >
                Clear Filters
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sermons.map((sermon) => (
            <Card
              key={sermon.id}
              className="group hover:shadow-lg transition-shadow"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                {sermon.thumbnailUrl ? (
                  <Image
                    src={sermon.thumbnailUrl}
                    alt={sermon.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-fom-primary/10">
                    <PlayCircle className="w-12 h-12 text-fom-primary" />
                  </div>
                )}

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-fom-primary hover:bg-gray-100"
                  >
                    <PlayCircle className="w-6 h-6" />
                  </Button>
                </div>

                {/* Duration Badge */}
                {sermon.duration && (
                  <div className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(sermon.duration)}
                  </div>
                )}
              </div>

              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-fom-primary transition-colors">
                    {sermon.title}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleBookmark(sermon.id)}
                    className={
                      sermon.isBookmarked ? "text-yellow-500" : "text-gray-400"
                    }
                  >
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>

                {sermon.series && (
                  <Badge variant="secondary" className="w-fit">
                    {sermon.series}
                  </Badge>
                )}
              </CardHeader>

              <CardContent className="pt-0">
                <CardDescription className="line-clamp-3 mb-4">
                  {sermon.description}
                </CardDescription>

                {/* Author and Date */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>
                      {sermon.author.firstName} {sermon.author.lastName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(
                        sermon.publishedAt || sermon.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{sermon.viewCount.toLocaleString()} views</span>
                  <span>{sermon.downloadCount.toLocaleString()} downloads</span>
                </div>

                {/* Tags */}
                {sermon.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {sermon.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {sermon.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{sermon.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <PlayCircle className="w-4 h-4 mr-1" />
                    Watch
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare(sermon)}
                  >
                    <Share className="w-4 h-4" />
                  </Button>

                  {sermon.audioUrl && (
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
