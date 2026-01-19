"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Play, ExternalLink } from "lucide-react";

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  thumbnail?: boolean;
  autoplay?: boolean;
  controls?: boolean;
  className?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1";
}

export const YouTubePlayer = ({
  videoId,
  title,
  thumbnail = false,
  autoplay = false,
  controls = true,
  className,
  aspectRatio = "16/9",
}: YouTubePlayerProps) => {
  const [isLoaded, setIsLoaded] = useState(!thumbnail);
  const [hasError, setHasError] = useState(false);

  const extractVideoId = (url: string): string => {
    // Handle various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^[a-zA-Z0-9_-]{11}$/, // Direct video ID
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1] || match[0];
      }
    }

    return url; // Return as-is if no pattern matches
  };

  const cleanVideoId = extractVideoId(videoId);
  const thumbnailUrl = `https://img.youtube.com/vi/${cleanVideoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${cleanVideoId}?${new URLSearchParams(
    {
      autoplay: autoplay ? "1" : "0",
      controls: controls ? "1" : "0",
      rel: "0",
      modestbranding: "1",
      showinfo: "0",
    }
  ).toString()}`;

  const aspectRatioClass = {
    "16/9": "aspect-video",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
  }[aspectRatio];

  const handleThumbnailClick = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div
        className={cn(
          aspectRatioClass,
          "bg-gray-100 rounded-lg flex items-center justify-center",
          className
        )}
      >
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <ExternalLink className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-gray-600 font-medium mb-2">Video Unavailable</p>
          <p className="text-sm text-gray-500 mb-4">
            Unable to load the video. Please check the video ID or try again
            later.
          </p>
          <a
            href={`https://www.youtube.com/watch?v=${cleanVideoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-950 hover:text-blue-800 text-sm font-medium"
          >
            <ExternalLink className="h-4 w-4" />
            Watch on YouTube
          </a>
        </div>
      </div>
    );
  }

  if (thumbnail && !isLoaded) {
    return (
      <div
        className={cn(
          aspectRatioClass,
          "relative bg-gray-900 overflow-hidden cursor-pointer group w-full h-full",
          className
        )}
        onClick={handleThumbnailClick}
      >
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover"
          onError={handleError}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
            <Play className="h-8 w-8 text-red-600 ml-1" fill="currentColor" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-white font-medium text-sm md:text-base line-clamp-2">
            {title}
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        aspectRatioClass,
        "rounded-lg overflow-hidden shadow-lg",
        className
      )}
    >
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full border-0"
        onError={handleError}
      />
    </div>
  );
};
