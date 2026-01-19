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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  MessageCircle,
  Heart,
  Share,
  Plus,
  Search,
  Calendar,
  MapPin,
  Globe,
  Lock,
  Crown,
} from "lucide-react";
import { toast } from "sonner";

interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  maxMembers?: number;
  isPrivate: boolean;
  requiresApproval: boolean;
  tags: string[];
  createdAt: string;
  coverImageUrl?: string;
  leader: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    avatarUrl?: string;
  };
  isJoined?: boolean;
  isPending?: boolean;
  lastActivity?: string;
  location?: string;
  meetingSchedule?: string;
}

interface CommunityPost {
  id: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  isLiked?: boolean;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    avatarUrl?: string;
  };
  group?: {
    id: string;
    name: string;
  };
}

const GROUP_CATEGORIES = [
  "BIBLE_STUDY",
  "PRAYER",
  "YOUTH",
  "MISSIONS",
  "WORSHIP",
  "FELLOWSHIP",
  "OUTREACH",
  "DISCIPLESHIP",
];

export default function CommunityPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"groups" | "feed">("feed");
  const [groups, setGroups] = useState<CommunityGroup[]>([]);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [newPost, setNewPost] = useState("");

  const fetchGroups = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        search: searchTerm,
        category: filterCategory,
      });

      const response = await fetch(`/api/community/groups?${params}`);
      if (response.ok) {
        const data = await response.json();
        setGroups(data.groups || []);
      }
    } catch (error) {
      console.error("Failed to fetch groups:", error);
      toast.error("Failed to load community groups");
    }
  }, [searchTerm, filterCategory]);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch("/api/community/posts");
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      toast.error("Failed to load community posts");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (activeTab === "groups") {
        await fetchGroups();
      } else {
        await fetchPosts();
      }
      setLoading(false);
    };

    fetchData();
  }, [activeTab, fetchGroups, fetchPosts]);

  const handleJoinGroup = async (groupId: string) => {
    try {
      const response = await fetch(`/api/community/groups/${groupId}/join`, {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.requiresApproval) {
          toast.success("Join request sent for approval");
        } else {
          toast.success("Successfully joined group");
        }
        fetchGroups();
      } else {
        toast.error("Failed to join group");
      }
    } catch (error) {
      console.error("Failed to join group:", error);
      toast.error("Failed to join group");
    }
  };

  const handleLeaveGroup = async (groupId: string) => {
    try {
      const response = await fetch(`/api/community/groups/${groupId}/join`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Successfully left group");
        fetchGroups();
      } else {
        toast.error("Failed to leave group");
      }
    } catch (error) {
      console.error("Failed to leave group:", error);
      toast.error("Failed to leave group");
    }
  };

  const handleLikePost = async (postId: string) => {
    try {
      const response = await fetch(`/api/community/posts/${postId}/like`, {
        method: "POST",
      });

      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error("Failed to like post:", error);
      toast.error("Failed to like post");
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPost.trim()) {
      toast.error("Please enter some content for your post");
      return;
    }

    try {
      const response = await fetch("/api/community/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newPost,
        }),
      });

      if (response.ok) {
        toast.success("Post created successfully");
        setNewPost("");
        fetchPosts();
      } else {
        toast.error("Failed to create post");
      }
    } catch (error) {
      console.error("Failed to create post:", error);
      toast.error("Failed to create post");
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "BIBLE_STUDY":
        return "bg-blue-100 text-blue-800";
      case "PRAYER":
        return "bg-purple-100 text-purple-800";
      case "YOUTH":
        return "bg-green-100 text-green-800";
      case "MISSIONS":
        return "bg-orange-100 text-orange-800";
      case "WORSHIP":
        return "bg-pink-100 text-pink-800";
      case "FELLOWSHIP":
        return "bg-yellow-100 text-yellow-800";
      case "OUTREACH":
        return "bg-red-100 text-red-800";
      case "DISCIPLESHIP":
        return "bg-indigo-100 text-indigo-800";
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
            Please wait while we load the community.
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
          <h1 className="text-2xl font-bold text-gray-900">Community</h1>
          <p className="text-gray-600">
            Connect, share, and grow together in faith
          </p>
        </div>

        <div className="flex gap-2">
          {(user.role === "MINISTRY_LEADER" ||
            user.role === "ADMIN" ||
            user.role === "SUPER_ADMIN") && (
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === "feed" ? "default" : "ghost"}
          onClick={() => setActiveTab("feed")}
          className="px-6"
        >
          Community Feed
        </Button>
        <Button
          variant={activeTab === "groups" ? "default" : "ghost"}
          onClick={() => setActiveTab("groups")}
          className="px-6"
        >
          Groups
        </Button>
      </div>

      {/* Community Feed Tab */}
      {activeTab === "feed" && (
        <div className="space-y-6">
          {/* Create Post */}
          <Card>
            <CardHeader>
              <CardTitle>Share with the Community</CardTitle>
              <CardDescription>
                What&apos;s on your heart today?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreatePost} className="space-y-4">
                <Textarea
                  placeholder="Share your thoughts, prayer requests, testimonies, or encouragement..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={!newPost.trim()}>
                    Share Post
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-16 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Posts Yet
                </h3>
                <p className="text-gray-600">
                  Be the first to share something with the community!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={post.author.avatarUrl}
                          alt={post.author.username}
                        />
                        <AvatarFallback className="bg-fom-primary text-white">
                          {post.author.firstName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {post.author.firstName} {post.author.lastName}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <span>
                                {new Date(post.createdAt).toLocaleDateString()}
                              </span>
                              {post.group && (
                                <>
                                  <span>•</span>
                                  <span className="text-fom-primary">
                                    {post.group.name}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Share className="w-4 h-4" />
                          </Button>
                        </div>

                        <p className="text-gray-700 mb-4 leading-relaxed whitespace-pre-wrap">
                          {post.content}
                        </p>

                        {post.imageUrl && (
                          <div className="mb-4">
                            <Image
                              src={post.imageUrl}
                              alt="Post image"
                              width={500}
                              height={300}
                              className="max-w-full h-auto rounded-lg"
                            />
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <button
                              onClick={() => handleLikePost(post.id)}
                              className={`flex items-center space-x-1 hover:text-red-600 transition-colors ${
                                post.isLiked ? "text-red-600" : ""
                              }`}
                            >
                              <Heart
                                className={`w-4 h-4 ${
                                  post.isLiked ? "fill-current" : ""
                                }`}
                              />
                              <span>{post.likeCount}</span>
                            </button>

                            <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.commentCount}</span>
                            </button>

                            <span className="flex items-center space-x-1">
                              <Share className="w-4 h-4" />
                              <span>{post.shareCount}</span>
                            </span>
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
      )}

      {/* Groups Tab */}
      {activeTab === "groups" && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {GROUP_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Groups Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-32 bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-12 bg-gray-200 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : groups.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Groups Found
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || filterCategory !== "all"
                    ? "Try adjusting your search or filters."
                    : "Be the first to create a community group!"}
                </p>
                {(searchTerm || filterCategory !== "all") && (
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setFilterCategory("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
                <Card
                  key={group.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  {/* Group Cover */}
                  <div className="relative h-32 bg-gradient-to-r from-fom-primary to-fom-primary/80 rounded-t-lg overflow-hidden">
                    {group.coverImageUrl ? (
                      <Image
                        src={group.coverImageUrl}
                        alt={group.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                    )}

                    {/* Privacy Indicator */}
                    <div className="absolute top-2 right-2">
                      {group.isPrivate ? (
                        <Lock className="w-4 h-4 text-white" />
                      ) : (
                        <Globe className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                          {group.name}
                        </h3>
                        <Badge
                          className={getCategoryColor(group.category)}
                          variant="secondary"
                        >
                          {group.category.replace("_", " ")}
                        </Badge>
                      </div>

                      <p className="text-gray-600 text-sm line-clamp-2">
                        {group.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>
                            {group.memberCount}{" "}
                            {group.maxMembers ? `/ ${group.maxMembers}` : ""}{" "}
                            members
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Crown className="w-4 h-4" />
                          <span>{group.leader.firstName}</span>
                        </div>
                      </div>

                      {group.location && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>{group.location}</span>
                        </div>
                      )}

                      {group.meetingSchedule && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{group.meetingSchedule}</span>
                        </div>
                      )}

                      <div className="pt-2">
                        {group.isJoined ? (
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                            >
                              View Group
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleLeaveGroup(group.id)}
                            >
                              Leave
                            </Button>
                          </div>
                        ) : group.isPending ? (
                          <Button disabled size="sm" className="w-full">
                            Pending Approval
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() => handleJoinGroup(group.id)}
                            disabled={
                              !!(
                                group.maxMembers &&
                                group.memberCount >= group.maxMembers
                              )
                            }
                          >
                            {group.maxMembers &&
                            group.memberCount >= group.maxMembers
                              ? "Group Full"
                              : group.requiresApproval
                              ? "Request to Join"
                              : "Join Group"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
