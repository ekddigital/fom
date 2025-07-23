import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get("videoId");

    if (!videoId) {
      return NextResponse.json(
        { error: "Video ID is required" },
        { status: 400 }
      );
    }

    // Basic validation for YouTube video ID format
    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      return NextResponse.json(
        { error: "Invalid YouTube video ID format" },
        { status: 400 }
      );
    }

    // Try to get video info using oEmbed API (no API key required)
    try {
      const oEmbedResponse = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      );

      if (oEmbedResponse.ok) {
        const oEmbedData = await oEmbedResponse.json();

        // For duration, we can make a simple fetch to the video page and extract from meta
        const videoPageResponse = await fetch(
          `https://www.youtube.com/watch?v=${videoId}`
        );
        let duration = "Unknown";
        let description = "No description available";

        if (videoPageResponse.ok) {
          const html = await videoPageResponse.text();

          // Extract duration from meta tag
          const durationMatch = html.match(/"lengthSeconds":"(\d+)"/);
          if (durationMatch) {
            const seconds = parseInt(durationMatch[1]);
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            duration = `${minutes}:${remainingSeconds
              .toString()
              .padStart(2, "0")}`;
          }

          // Extract description from meta tag
          const descMatch = html.match(
            /<meta name="description" content="([^"]+)"/
          );
          if (descMatch) {
            description = descMatch[1];
          }
        }

        return NextResponse.json({
          videoId,
          title: oEmbedData.title || `YouTube Video ${videoId}`,
          description,
          duration,
          author: oEmbedData.author_name || "Unknown",
          thumbnails: {
            default: `https://img.youtube.com/vi/${videoId}/default.jpg`,
            medium: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
            high: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
            maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          },
          status: "success",
        });
      }
    } catch (embedError) {
      console.error("oEmbed error:", embedError);
    }

    // Fallback response
    return NextResponse.json({
      videoId,
      title: `YouTube Video ${videoId}`,
      description:
        "Description not available - video exists but details could not be fetched",
      duration: "Unknown",
      author: "Unknown",
      thumbnails: {
        default: `https://img.youtube.com/vi/${videoId}/default.jpg`,
        medium: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        high: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      },
      status: "partial",
    });
  } catch (error) {
    console.error("Error fetching YouTube details:", error);
    return NextResponse.json(
      { error: "Failed to fetch video details" },
      { status: 500 }
    );
  }
}
