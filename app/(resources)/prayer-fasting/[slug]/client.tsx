"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { YouTubePlayer } from "@/components/ui/youtube-player";
import { RichTextViewer } from "@/components/ui/rich-text-viewer";
import {
  ModernReactions,
  useReactions,
} from "@/components/ui/modern-reactions";
import { Comments, useComments } from "@/components/ui/comments";
import { Calendar, Clock, Users, Share2, Eye, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

interface PrayerFastingSession {
  id: string;
  title: string;
  description: string;
  content: string;
  excerpt: string;
  youtubeVideoId: string;
  speaker: string;
  speakerBio?: string;
  speakerImageUrl?: string;
  sessionDate: string;
  duration: string;
  status: "UPCOMING" | "CURRENT" | "ARCHIVED";
  viewCount: number;
  shareCount: number;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  initialSession: PrayerFastingSession;
}

export default function PrayerFastingPostClient({ initialSession }: Props) {
  const [session] = useState<PrayerFastingSession>(initialSession);

  // Initialize reactions and comments hooks with the session data
  const { reactions, addReaction } = useReactions("prayer-fasting", session.id);
  const { comments, addComment } = useComments("prayer-fasting", session.id);

  useEffect(() => {
    // Increment view count when component mounts
    if (session?.id) {
      fetch(`/api/prayer-fasting/${session.id}/view`, {
        method: "POST",
      }).catch(console.error);
    }
  }, [session.id]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: session?.title,
          text: session?.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }

      // Increment share count
      if (session?.id) {
        fetch(`/api/prayer-fasting/${session.id}/share`, {
          method: "POST",
        }).catch(console.error);
      }
    } catch (error) {
      console.error("Failed to share:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link href="/prayer-fasting">
            <Button variant="ghost" className="text-blue-950 hover:bg-blue-100">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Prayer & Fasting
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge
              variant={
                session.status === "CURRENT"
                  ? "default"
                  : session.status === "UPCOMING"
                  ? "secondary"
                  : "outline"
              }
            >
              {session.status.toLowerCase()}
            </Badge>
            <span className="text-sm text-gray-500">
              {format(new Date(session.sessionDate), "MMMM d, yyyy")}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-blue-950 mb-4">
            {session.title}
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            {session.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Speaker: {session.speaker}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{session.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>{session.viewCount} views</span>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="mb-8">
          <YouTubePlayer
            videoId={session.youtubeVideoId}
            title={session.title}
          />

          {/* Reactions and Share - Compact inline */}
          <div className="flex items-center justify-between mt-4 px-2">
            <ModernReactions reactions={reactions} onReact={addReaction} />
            <Button
              variant="outline"
              onClick={handleShare}
              size="sm"
              className="border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Word Shared
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RichTextViewer content={session.content} />
            </CardContent>
          </Card>
        </div>

        {/* Speaker Bio */}
        {session.speakerBio && (
          <div className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  About {session.speaker}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  {session.speakerImageUrl && (
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={session.speakerImageUrl}
                        alt={session.speaker}
                      />
                      <AvatarFallback>
                        {session.speaker
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-950 mb-2">
                      {session.speaker}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {session.speakerBio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Comments */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <Comments
                comments={comments}
                onAddComment={addComment}
                contentType="prayer-fasting"
                contentId={session.id}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
