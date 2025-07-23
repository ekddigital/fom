"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { YouTubePlayer } from "@/components/ui/youtube-player";
import {
  Calendar,
  Users,
  Video,
  FileText,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";

interface PrayerFastingSession {
  id: string;
  title: string;
  description: string;
  content: string;
  excerpt: string;
  youtubeVideoId: string;
  speaker: string;
  speakerBio?: string;
  sessionDate: string;
  duration: string;
  status: "UPCOMING" | "CURRENT" | "ARCHIVED";
  slug: string;
  supportingVerses?: string; // Optional field for supporting verses
  createdAt: string;
  updatedAt: string;
}

export default function AdminPrayerFastingPage() {
  const [sessions, setSessions] = useState<PrayerFastingSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingSession, setEditingSession] =
    useState<PrayerFastingSession | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    excerpt: "",
    youtubeVideoId: "",
    speaker: "",
    speakerBio: "",
    sessionDate: "",
    status: "UPCOMING" as "UPCOMING" | "CURRENT" | "ARCHIVED",
    slug: "",
    supportingVerses: "", // New field for supporting verses
  });

  const fetchSessions = async () => {
    try {
      const response = await fetch("/api/admin/prayer-fasting");
      if (response.ok) {
        const data = await response.json();
        setSessions(data.sessions || []);
      }
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Extract YouTube video ID from URL or return as-is if already an ID
  const extractYouTubeId = (input: string): string => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = input.match(regex);
    return match ? match[1] : input.trim();
  };

  // Fetch YouTube video details
  const fetchYouTubeDetails = async (videoId: string) => {
    try {
      // Note: In production, you'd use YouTube Data API
      // For now, we'll use a placeholder that could be enhanced
      const response = await fetch(`/api/youtube/details?videoId=${videoId}`);
      if (response.ok) {
        const data = await response.json();
        return {
          title: data.title || "",
          description: data.description || "",
        };
      }
    } catch (error) {
      console.error("Failed to fetch YouTube details:", error);
    }
    return null;
  };

  // Handle YouTube input with auto-fetch
  const handleYouTubeInput = async (input: string) => {
    const videoId = extractYouTubeId(input);
    setFormData((prev) => ({ ...prev, youtubeVideoId: videoId }));

    // If we have a valid video ID, try to fetch details
    if (videoId && videoId.length === 11) {
      const details = await fetchYouTubeDetails(videoId);
      if (details) {
        // Only update description if it's empty
        if (details.description && !formData.description) {
          const truncatedDesc =
            details.description.length > 500
              ? details.description.substring(0, 500) + "..."
              : details.description;

          setFormData((prev) => ({
            ...prev,
            description: truncatedDesc,
          }));
        }
      }
    }
  };

  // Auto-generate excerpt from title (theme) and supporting verses
  const generateExcerptFromTheme = (
    title: string,
    supportingVerses: string
  ): string => {
    let excerpt = "";

    // Use the title as the main theme
    if (title.trim()) {
      // Clean up the title to extract the core theme
      const theme = title
        .replace(/monthly\s+prayer\s+(&|and)\s+fasting\s*[-:]?\s*/i, "")
        .replace(/^\s*[-:]?\s*/, "")
        .trim();

      if (theme) {
        excerpt += `Theme: ${theme}. `;
      }
    }

    // Add supporting verses if provided
    if (supportingVerses.trim()) {
      // Clean and format the verses
      const verses = supportingVerses
        .split(/[,;]/)
        .map((v) => v.trim())
        .filter((v) => v.length > 0)
        .slice(0, 3); // Limit to 3 verses

      if (verses.length > 0) {
        excerpt += `Scripture: ${verses.join(", ")}. `;
      }
    }

    // Add a general statement about prayer and fasting
    if (excerpt) {
      excerpt +=
        "Join us for this powerful time of seeking God through prayer and fasting.";
    } else {
      excerpt = "A monthly prayer and fasting session to draw closer to God.";
    }

    return excerpt.trim();
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Auto-generate slug from title
    if (field === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .slice(0, 100);
      setFormData((prev) => ({ ...prev, slug }));

      // Auto-generate excerpt when title changes
      const excerpt = generateExcerptFromTheme(
        value,
        formData.supportingVerses
      );
      setFormData((prev) => ({ ...prev, excerpt }));
    }

    // Auto-generate excerpt when supporting verses change
    if (field === "supportingVerses") {
      const excerpt = generateExcerptFromTheme(formData.title, value);
      setFormData((prev) => ({ ...prev, excerpt }));
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      content: "",
      excerpt: "",
      youtubeVideoId: "",
      speaker: "",
      speakerBio: "",
      sessionDate: "",
      status: "UPCOMING" as "UPCOMING" | "CURRENT" | "ARCHIVED",
      slug: "",
      supportingVerses: "",
    });
    setEditingSession(null);
    setIsCreating(false);
  };

  const handleEdit = (session: PrayerFastingSession) => {
    setFormData({
      title: session.title,
      description: session.description,
      content: session.content,
      excerpt: session.excerpt,
      youtubeVideoId: session.youtubeVideoId,
      speaker: session.speaker,
      speakerBio: session.speakerBio || "",
      sessionDate: session.sessionDate.split("T")[0],
      status: session.status,
      slug: session.slug,
      supportingVerses: session.supportingVerses || "",
    });
    setEditingSession(session);
    setIsCreating(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingSession
        ? `/api/admin/prayer-fasting/${editingSession.id}`
        : "/api/admin/prayer-fasting";

      const method = editingSession ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          sessionDate: new Date(formData.sessionDate).toISOString(),
        }),
      });

      if (response.ok) {
        await fetchSessions();
        resetForm();
        alert("Session saved successfully!");
      } else {
        const errorData = await response.json();
        console.error("Failed to save session:", errorData);

        if (response.status === 403) {
          alert(
            "You don't have permission to create sessions. Please contact an administrator."
          );
        } else if (response.status === 401) {
          alert("You need to be logged in to create sessions.");
        } else {
          alert(
            `Failed to save session: ${errorData.error || "Unknown error"}`
          );
        }
      }
    } catch (error) {
      console.error("Error saving session:", error);
      alert("An error occurred while saving the session. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this session?")) return;

    try {
      const response = await fetch(`/api/admin/prayer-fasting/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchSessions();
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-950">
            Prayer & Fasting Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage monthly prayer and fasting sessions
          </p>
        </div>

        <Button
          onClick={() => setIsCreating(true)}
          className="bg-blue-950 hover:bg-blue-800 text-gray-100"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Session
        </Button>
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {editingSession ? "Edit Session" : "Create New Session"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Monthly Prayer & Fasting - January 2025"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="speaker">Speaker *</Label>
                  <Input
                    id="speaker"
                    value={formData.speaker}
                    onChange={(e) =>
                      handleInputChange("speaker", e.target.value)
                    }
                    placeholder="Rev. John Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionDate">Session Date *</Label>
                  <Input
                    id="sessionDate"
                    type="date"
                    value={formData.sessionDate}
                    onChange={(e) =>
                      handleInputChange("sessionDate", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleInputChange("status", value)
                    }
                  >
                    <SelectTrigger className="bg-white border border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                      <SelectItem
                        value="UPCOMING"
                        className="hover:bg-gray-100"
                      >
                        Upcoming
                      </SelectItem>
                      <SelectItem value="CURRENT" className="hover:bg-gray-100">
                        Current
                      </SelectItem>
                      <SelectItem
                        value="ARCHIVED"
                        className="hover:bg-gray-100"
                      >
                        Archived
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="youtubeVideoId">
                    YouTube Video URL or ID *
                  </Label>
                  <Input
                    id="youtubeVideoId"
                    value={formData.youtubeVideoId}
                    onChange={(e) => handleYouTubeInput(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ or dQw4w9WgXcQ"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Enter a YouTube URL or video ID. Description and duration
                    will be fetched automatically.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Brief description of the session (auto-filled from YouTube when available)..."
                  rows={3}
                  required
                />
                <p className="text-xs text-gray-500">
                  This will be auto-populated from YouTube video description
                  when available.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supportingVerses">
                  Supporting Verses (Optional)
                </Label>
                <Textarea
                  id="supportingVerses"
                  value={formData.supportingVerses}
                  onChange={(e) =>
                    handleInputChange("supportingVerses", e.target.value)
                  }
                  placeholder="e.g., Matthew 6:16-18, Joel 2:12, Daniel 10:3"
                  rows={2}
                />
                <p className="text-xs text-gray-500">
                  Enter scripture references separated by commas. These will be
                  included in the auto-generated excerpt.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">
                  Excerpt (Auto-generated from Title & Verses)
                </Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                  placeholder="Auto-generated from title/theme and supporting verses - you can edit if needed..."
                  rows={3}
                  className="bg-gray-50"
                />
                <p className="text-xs text-gray-500">
                  This is automatically generated from your title (theme) and
                  supporting verses. You can edit it manually if needed.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="speakerBio">Speaker Bio</Label>
                <Textarea
                  id="speakerBio"
                  value={formData.speakerBio}
                  onChange={(e) =>
                    handleInputChange("speakerBio", e.target.value)
                  }
                  placeholder="Brief bio about the speaker..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Content *</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const excerpt = generateExcerptFromTheme(
                        formData.title,
                        formData.supportingVerses
                      );
                      setFormData((prev) => ({ ...prev, excerpt }));
                    }}
                    className="text-xs"
                  >
                    Generate Excerpt
                  </Button>
                </div>
                <RichTextEditor
                  value={formData.content}
                  onChange={(value) => handleInputChange("content", value)}
                  placeholder="Write the full content for this session..."
                  minHeight="300px"
                />
                <p className="text-xs text-gray-500">
                  The excerpt is generated from your title (theme) and
                  supporting verses, not from this content.
                </p>
              </div>

              {formData.youtubeVideoId && (
                <div className="space-y-2">
                  <Label>YouTube Preview</Label>
                  <YouTubePlayer
                    videoId={formData.youtubeVideoId}
                    title={formData.title || "Preview"}
                    className="max-w-md"
                  />
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="bg-blue-950 hover:bg-blue-800 text-gray-100"
                >
                  {editingSession ? "Update Session" : "Create Session"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Sessions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <Card key={session.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
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
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(session)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(session.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-blue-950 mb-2 line-clamp-2">
                    {session.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {session.description}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3" />
                    <span>Speaker: {session.speaker}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {format(new Date(session.sessionDate), "MMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="h-3 w-3" />
                    <span>YouTube: {session.youtubeVideoId}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sessions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <FileText className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No sessions yet
          </h3>
          <p className="text-gray-500 mb-6">
            Create your first prayer & fasting session to get started.
          </p>
          <Button
            onClick={() => setIsCreating(true)}
            className="bg-blue-950 hover:bg-blue-800 text-gray-100"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create First Session
          </Button>
        </div>
      )}
    </div>
  );
}
