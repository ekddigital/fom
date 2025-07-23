"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MessageCircle, Reply } from "lucide-react";
import { format } from "date-fns";
import { Reactions, useReactions } from "./reactions";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
    role: string;
  };
  parentId?: string;
  replies?: Comment[];
  _count?: {
    reactions: number;
    replies: number;
  };
}

interface CommentsProps {
  comments: Comment[];
  onAddComment: (content: string, parentId?: string) => Promise<void>;
  className?: string;
  maxDepth?: number;
}

interface CommentItemProps {
  comment: Comment;
  onReply: (content: string, parentId: string) => Promise<void>;
  depth?: number;
  maxDepth?: number;
}

const CommentItem = ({
  comment,
  onReply,
  depth = 0,
  maxDepth = 3,
}: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { reactions, addReaction } = useReactions("comment", comment.id);

  const handleReply = useCallback(async () => {
    if (!replyContent.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onReply(replyContent, comment.id);
      setReplyContent("");
      setIsReplying(false);
    } catch (error) {
      console.error("Failed to reply:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [replyContent, onReply, comment.id, isSubmitting]);

  const canReply = depth < maxDepth;

  return (
    <Card className={cn("border-l-2 border-blue-100", depth > 0 && "ml-6")}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={comment.user.avatarUrl}
              alt={`${comment.user.firstName} ${comment.user.lastName}`}
            />
            <AvatarFallback>
              {comment.user.firstName[0]}
              {comment.user.lastName[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-sm">
                {comment.user.firstName} {comment.user.lastName}
              </span>
              {comment.user.role !== "MEMBER" && (
                <Badge variant="secondary" className="text-xs">
                  {comment.user.role.replace("_", " ").toLowerCase()}
                </Badge>
              )}
              <span className="text-xs text-gray-500">
                {format(new Date(comment.createdAt), "MMM d, yyyy 'at' h:mm a")}
              </span>
            </div>

            <p className="text-sm text-gray-700 mb-3 whitespace-pre-wrap">
              {comment.content}
            </p>

            <div className="flex items-center gap-4">
              <Reactions
                reactions={reactions}
                onReact={addReaction}
                className="flex-1"
              />

              {canReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsReplying(!isReplying)}
                  className="h-7 px-2 text-xs"
                >
                  <Reply className="h-3 w-3 mr-1" />
                  Reply
                </Button>
              )}
            </div>

            {isReplying && (
              <div className="mt-3 space-y-2">
                <Textarea
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="text-sm resize-none"
                  rows={2}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleReply}
                    disabled={!replyContent.trim() || isSubmitting}
                    className="h-7 px-3 text-xs"
                  >
                    {isSubmitting ? "Replying..." : "Reply"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsReplying(false);
                      setReplyContent("");
                    }}
                    className="h-7 px-3 text-xs"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-4 space-y-3">
                {comment.replies.map((reply) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    onReply={onReply}
                    depth={depth + 1}
                    maxDepth={maxDepth}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const Comments = ({
  comments,
  onAddComment,
  className,
  maxDepth = 3,
}: CommentsProps) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddComment = useCallback(async () => {
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAddComment(newComment);
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [newComment, onAddComment, isSubmitting]);

  const handleReply = useCallback(
    async (content: string, parentId: string) => {
      await onAddComment(content, parentId);
    },
    [onAddComment]
  );

  const topLevelComments = comments.filter((comment) => !comment.parentId);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Comments Header */}
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-gray-600" />
        <h3 className="font-semibold text-gray-900">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Add New Comment */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            <Textarea
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="resize-none"
              rows={3}
            />
            <div className="flex justify-end">
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim() || isSubmitting}
                className="bg-blue-950 hover:bg-blue-800"
              >
                {isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {topLevelComments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No comments yet. Be the first to share your thoughts!
          </div>
        ) : (
          topLevelComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={handleReply}
              maxDepth={maxDepth}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Hook for managing comments
export const useComments = (targetType: string, targetId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/comments?targetType=${targetType}&targetId=${targetId}`
      );
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments || []);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setIsLoading(false);
    }
  }, [targetType, targetId]);

  const addComment = useCallback(
    async (content: string, parentId?: string) => {
      try {
        const response = await fetch("/api/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            targetType,
            targetId,
            content,
            parentId,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setComments(data.comments || []);
        }
      } catch (error) {
        console.error("Failed to add comment:", error);
        throw error;
      }
    },
    [targetType, targetId]
  );

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return {
    comments,
    isLoading,
    fetchComments,
    addComment,
  };
};
