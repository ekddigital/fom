"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Heart,
  Plus,
  MessageCircle,
  Clock,
  Filter,
  MoreHorizontal,
} from "lucide-react";
import { toast } from "sonner";

interface PrayerRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  urgency: string;
  isAnonymous: boolean;
  prayerCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
  } | null;
  isPrivate: boolean;
  isAnswered: boolean;
}

const PRAYER_CATEGORIES = [
  "PERSONAL",
  "FAMILY",
  "MINISTRY",
  "WORLD",
  "HEALING",
  "SALVATION",
];

const PRAYER_URGENCY = ["LOW", "MEDIUM", "HIGH", "URGENT"];

export default function PrayerPage() {
  const { user } = useAuth();
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [isCreating, setIsCreating] = useState(false);
  const [newPrayer, setNewPrayer] = useState({
    title: "",
    description: "",
    category: "PERSONAL",
    urgency: "MEDIUM",
    isAnonymous: false,
    isPrivate: false,
  });

  const fetchPrayerRequests = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/prayer-requests?filter=${filter}`);
      if (response.ok) {
        const data = await response.json();
        setPrayerRequests(data.prayerRequests || []);
      }
    } catch (error) {
      console.error("Failed to fetch prayer requests:", error);
      toast.error("Failed to load prayer requests");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchPrayerRequests();
  }, [filter, fetchPrayerRequests]);

  const handleCreatePrayer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPrayer.title.trim() || !newPrayer.description.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsCreating(true);
      const response = await fetch("/api/prayer-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPrayer),
      });

      if (response.ok) {
        toast.success("Prayer request created successfully");
        setNewPrayer({
          title: "",
          description: "",
          category: "PERSONAL",
          urgency: "MEDIUM",
          isAnonymous: false,
          isPrivate: false,
        });
        fetchPrayerRequests();
      } else {
        toast.error("Failed to create prayer request");
      }
    } catch (error) {
      console.error("Failed to create prayer request:", error);
      toast.error("Failed to create prayer request");
    } finally {
      setIsCreating(false);
    }
  };

  const handlePrayForRequest = async (requestId: string) => {
    try {
      const response = await fetch(`/api/prayer-requests/${requestId}/pray`, {
        method: "POST",
      });

      if (response.ok) {
        toast.success("Prayer added");
        fetchPrayerRequests();
      } else {
        toast.error("Failed to add prayer");
      }
    } catch (error) {
      console.error("Failed to pray for request:", error);
      toast.error("Failed to add prayer");
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "URGENT":
        return "bg-red-100 text-red-800";
      case "HIGH":
        return "bg-orange-100 text-orange-800";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800";
      case "LOW":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "HEALING":
        return "bg-blue-100 text-blue-800";
      case "FAMILY":
        return "bg-purple-100 text-purple-800";
      case "MINISTRY":
        return "bg-indigo-100 text-indigo-800";
      case "WORLD":
        return "bg-green-100 text-green-800";
      case "SALVATION":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Loading...</h2>
          <p className="text-gray-600">
            Please wait while we load your prayer network.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prayer Network</h1>
          <p className="text-gray-600">Connect in prayer with our community</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-fom-primary text-gray-100 hover:bg-fom-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              New Prayer Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create Prayer Request</DialogTitle>
              <DialogDescription>
                Share your prayer request with the community. Choose to remain
                anonymous if preferred.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreatePrayer} className="space-y-4">
              <div>
                <Label htmlFor="title">Prayer Request Title *</Label>
                <Input
                  id="title"
                  value={newPrayer.title}
                  onChange={(e) =>
                    setNewPrayer({ ...newPrayer, title: e.target.value })
                  }
                  placeholder="Brief description of your prayer need"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Details *</Label>
                <Textarea
                  id="description"
                  value={newPrayer.description}
                  onChange={(e) =>
                    setNewPrayer({ ...newPrayer, description: e.target.value })
                  }
                  placeholder="Share more details about your prayer request..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newPrayer.category}
                    onValueChange={(value) =>
                      setNewPrayer({ ...newPrayer, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PRAYER_CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="urgency">Priority</Label>
                  <Select
                    value={newPrayer.urgency}
                    onValueChange={(value) =>
                      setNewPrayer({ ...newPrayer, urgency: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PRAYER_URGENCY.map((urgency) => (
                        <SelectItem key={urgency} value={urgency}>
                          {urgency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newPrayer.isAnonymous}
                    onChange={(e) =>
                      setNewPrayer({
                        ...newPrayer,
                        isAnonymous: e.target.checked,
                      })
                    }
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">Post anonymously</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newPrayer.isPrivate}
                    onChange={(e) =>
                      setNewPrayer({
                        ...newPrayer,
                        isPrivate: e.target.checked,
                      })
                    }
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">Private (members only)</span>
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <DialogTrigger asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogTrigger>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? "Creating..." : "Create Prayer Request"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center space-x-4">
        <Filter className="w-4 h-4 text-gray-500" />
        <div className="flex space-x-2">
          {["all", "my-requests", "urgent", "recent"].map((filterOption) => (
            <Button
              key={filterOption}
              variant={filter === filterOption ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(filterOption)}
            >
              {filterOption
                .replace("-", " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </Button>
          ))}
        </div>
      </div>

      {/* Prayer Requests */}
      {loading ? (
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : prayerRequests.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Prayer Requests
            </h3>
            <p className="text-gray-600 mb-4">
              Be the first to share a prayer request with the community.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Prayer Request
                </Button>
              </DialogTrigger>
            </Dialog>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {prayerRequests.map((prayer) => (
            <Card key={prayer.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={
                        prayer.isAnonymous ? undefined : prayer.user?.avatarUrl
                      }
                      alt={
                        prayer.isAnonymous
                          ? "Anonymous"
                          : prayer.user?.username || "User"
                      }
                    />
                    <AvatarFallback className="bg-fom-primary text-white">
                      {prayer.isAnonymous
                        ? "?"
                        : prayer.user?.firstName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {prayer.title}
                        </h3>
                        {prayer.isAnswered && (
                          <Badge className="bg-green-100 text-green-800">
                            Answered
                          </Badge>
                        )}
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center space-x-3 mb-3">
                      <p className="text-sm text-gray-600">
                        {prayer.isAnonymous
                          ? "Anonymous"
                          : `${prayer.user?.firstName || ""} ${
                              prayer.user?.lastName || ""
                            }`.trim() ||
                            prayer.user?.username ||
                            "Unknown User"}
                      </p>
                      <Badge
                        className={getCategoryColor(prayer.category)}
                        variant="secondary"
                      >
                        {prayer.category.replace("_", " ")}
                      </Badge>
                      <Badge
                        className={getUrgencyColor(prayer.urgency)}
                        variant="secondary"
                      >
                        {prayer.urgency}
                      </Badge>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(prayer.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {prayer.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {prayer.prayerCount} prayers
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {prayer.commentCount} comments
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePrayForRequest(prayer.id)}
                        >
                          <Heart className="w-4 h-4 mr-1" />
                          Pray
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
