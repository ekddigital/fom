"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ModernReactions,
  useReactions,
} from "@/components/ui/modern-reactions";
import { cn } from "@/lib/utils";
import { MessageCircle, Reply, ChevronDown } from "lucide-react";
import { format } from "date-fns";

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
    replies: number;
  };
}

interface CommentsProps {
  comments: Comment[];
  onAddComment: (content: string, parentId?: string) => Promise<void>;
  className?: string;
  maxDepth?: number;
  contentType: string;
  contentId: string;
}

interface CommentItemProps {
  comment: Comment;
  onReply: (content: string, parentId: string) => Promise<void>;
  depth?: number;
  maxDepth?: number;
  contentType: string;
  contentId: string;
}

const CommentItem = ({
  comment,
  onReply,
  depth = 0,
  maxDepth = 3,
  contentType,
  contentId,
}: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllReplies, setShowAllReplies] = useState(false);

  // Use reactions for this specific comment
  const { reactions, addReaction } = useReactions(
    `${contentType}-comment`,
    comment.id
  );

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
  const replies = comment.replies || [];
  const visibleReplies = showAllReplies ? replies : replies.slice(0, 3);
  const hiddenRepliesCount = replies.length - visibleReplies.length;

  return (
    <div className={cn("border-l-2 border-gray-100", depth > 0 && "ml-4 pl-3")}>
      <div className="py-2">
        <div className="flex items-start gap-2">
          <Avatar className="h-7 w-7 flex-shrink-0">
            <AvatarImage
              src={comment.user.avatarUrl}
              alt={`${comment.user.firstName} ${comment.user.lastName}`}
            />
            <AvatarFallback className="text-xs">
              {comment.user.firstName[0]}
              {comment.user.lastName[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm">
                {comment.user.firstName} {comment.user.lastName}
              </span>
              {comment.user.role !== "MEMBER" && (
                <Badge variant="secondary" className="text-xs px-1 py-0">
                  {comment.user.role.replace("_", " ").toLowerCase()}
                </Badge>
              )}
              <span className="text-xs text-gray-500">
                {format(new Date(comment.createdAt), "MMM d, h:mm a")}
              </span>
            </div>

            <p className="text-sm text-gray-700 mb-2 whitespace-pre-wrap">
              {comment.content}
            </p>

            <div className="mb-2">
              <ModernReactions
                reactions={reactions}
                onReact={addReaction}
                className="scale-90 origin-left"
              />
            </div>

            <div className="flex items-center gap-3 mb-2">
              {canReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsReplying(!isReplying)}
                  className="h-6 px-2 text-xs hover:bg-gray-100"
                >
                  <Reply className="h-3 w-3 mr-1" />
                  Reply
                </Button>
              )}
            </div>

            {isReplying && (
              <div className="mb-3 space-y-2">
                <Textarea
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="text-sm resize-none min-h-[60px]"
                  rows={2}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleReply}
                    disabled={!replyContent.trim() || isSubmitting}
                    className="h-6 px-3 text-xs"
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
                    className="h-6 px-3 text-xs hover:bg-gray-100"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {replies.length > 0 && (
              <div className="space-y-1">
                {visibleReplies.map((reply) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    onReply={onReply}
                    depth={depth + 1}
                    maxDepth={maxDepth}
                    contentType={contentType}
                    contentId={contentId}
                  />
                ))}

                {hiddenRepliesCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAllReplies(true)}
                    className="h-6 px-2 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 ml-9"
                  >
                    <ChevronDown className="h-3 w-3 mr-1" />
                    Show {hiddenRepliesCount} more{" "}
                    {hiddenRepliesCount === 1 ? "reply" : "replies"}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Comments = ({
  comments,
  onAddComment,
  className,
  maxDepth = 3,
  contentType,
  contentId,
}: CommentsProps) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  // Use reactions for the main content
  const { reactions, addReaction } = useReactions(contentType, contentId);

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
  const visibleComments = showAllComments
    ? topLevelComments
    : topLevelComments.slice(0, 5);
  const hiddenCommentsCount = topLevelComments.length - visibleComments.length;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Comments Header */}
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-gray-600" />
        <h3 className="font-semibold text-gray-900">
          Comments ({topLevelComments.length})
        </h3>
      </div>

      {/* Main Content Reactions */}
      <div className="pb-2">
        <ModernReactions reactions={reactions} onReact={addReaction} />
      </div>

      {/* Add New Comment */}
      <Card className="shadow-sm">
        <CardContent className="p-3">
          <div className="space-y-3">
            <Textarea
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="resize-none min-h-[80px] text-sm"
              rows={3}
            />
            <div className="flex justify-end">
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim() || isSubmitting}
                className="bg-blue-950 hover:bg-blue-800 text-gray-100 h-8 px-4 text-sm"
              >
                {isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-2">
        {topLevelComments.length === 0 ? (
          <div className="text-center py-6 text-gray-500 text-sm">
            No comments yet. Be the first to share your thoughts!
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg border shadow-sm">
              <div className="divide-y divide-gray-100">
                {visibleComments.map((comment, index) => (
                  <div
                    key={comment.id}
                    className={cn(
                      "px-3",
                      index === 0 && "pt-3",
                      index === visibleComments.length - 1 && "pb-3"
                    )}
                  >
                    <CommentItem
                      comment={comment}
                      onReply={handleReply}
                      maxDepth={maxDepth}
                      contentType={contentType}
                      contentId={contentId}
                    />
                  </div>
                ))}
              </div>
            </div>

            {hiddenCommentsCount > 0 && (
              <div className="text-center">
                <Button
                  variant="ghost"
                  onClick={() => setShowAllComments(true)}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8 px-4 text-sm"
                >
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Show {hiddenCommentsCount} more{" "}
                  {hiddenCommentsCount === 1 ? "comment" : "comments"}
                </Button>
              </div>
            )}
          </>
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
    // Don't fetch if targetId is empty
    if (!targetId || targetId.trim() === "") {
      setComments([]);
      setIsLoading(false);
      return;
    }

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
      // Don't add comment if targetId is empty
      if (!targetId || targetId.trim() === "") {
        console.error("Cannot add comment: targetId is empty");
        throw new Error("Target ID is required");
      }

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
        } else {
          throw new Error("Failed to add comment");
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
