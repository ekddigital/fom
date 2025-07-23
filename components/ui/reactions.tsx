"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart, Flame, Smile, Hand, Check } from "lucide-react";

interface Reaction {
  emoji: string;
  count: number;
  hasReacted: boolean;
}

interface ReactionsProps {
  reactions: Reaction[];
  onReact: (emoji: string) => Promise<void>;
  className?: string;
  disabled?: boolean;
}

const reactionConfig = {
  like: {
    emoji: "👍",
    icon: Heart,
    label: "Like",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  love: {
    emoji: "❤️",
    icon: Heart,
    label: "Love",
    color: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  pray: {
    emoji: "🙏",
    icon: Hand,
    label: "Pray",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  amen: {
    emoji: "✋",
    icon: Check,
    label: "Amen",
    color: "text-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  fire: {
    emoji: "🔥",
    icon: Flame,
    label: "Fire",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  smile: {
    emoji: "😊",
    icon: Smile,
    label: "Smile",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
};

export const Reactions = ({
  reactions,
  onReact,
  className,
  disabled = false,
}: ReactionsProps) => {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleReact = useCallback(
    async (emoji: string) => {
      if (disabled || isLoading) return;

      setIsLoading(emoji);
      try {
        await onReact(emoji);
      } catch (error) {
        console.error("Failed to react:", error);
      } finally {
        setIsLoading(null);
      }
    },
    [onReact, disabled, isLoading]
  );

  const getReactionData = useCallback(
    (emoji: string) => {
      return (
        reactions.find((r) => r.emoji === emoji) || {
          emoji,
          count: 0,
          hasReacted: false,
        }
      );
    },
    [reactions]
  );

  const totalReactions = reactions.reduce(
    (sum, reaction) => sum + reaction.count,
    0
  );

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {/* Reaction Buttons */}
      {Object.entries(reactionConfig).map(([key, config]) => {
        const reactionData = getReactionData(key);
        const isActive = reactionData.hasReacted;
        const isCurrentlyLoading = isLoading === key;

        return (
          <Button
            key={key}
            variant={isActive ? "default" : "outline"}
            size="sm"
            className={cn(
              "h-8 px-3 transition-all duration-200 hover:scale-105",
              isActive && [
                config.color,
                config.bgColor,
                config.borderColor,
                "border",
              ],
              !isActive && "hover:bg-gray-50",
              isCurrentlyLoading && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => handleReact(key)}
            disabled={disabled || isCurrentlyLoading}
            title={config.label}
          >
            <span className="mr-1.5 text-sm">{config.emoji}</span>
            {reactionData.count > 0 && (
              <span className="text-xs font-medium">{reactionData.count}</span>
            )}
          </Button>
        );
      })}

      {/* Total reactions display */}
      {totalReactions > 0 && (
        <div className="flex items-center text-xs text-gray-500 ml-2">
          <span>
            {totalReactions} reaction{totalReactions !== 1 ? "s" : ""}
          </span>
        </div>
      )}
    </div>
  );
};

// Hook for managing reactions
export const useReactions = (targetType: string, targetId: string) => {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReactions = useCallback(async () => {
    // Don't fetch if targetId is empty
    if (!targetId || targetId.trim() === "") {
      setReactions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/reactions?targetType=${targetType}&targetId=${targetId}`
      );
      if (response.ok) {
        const data = await response.json();
        setReactions(data.reactions || []);
      }
    } catch (error) {
      console.error("Failed to fetch reactions:", error);
    } finally {
      setIsLoading(false);
    }
  }, [targetType, targetId]);

  const addReaction = useCallback(
    async (emoji: string) => {
      // Don't add reaction if targetId is empty
      if (!targetId || targetId.trim() === "") {
        console.error("Cannot add reaction: targetId is empty");
        throw new Error("Target ID is required");
      }

      try {
        const response = await fetch("/api/reactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            targetType,
            targetId,
            emoji,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setReactions(data.reactions || []);
        } else {
          throw new Error("Failed to add reaction");
        }
      } catch (error) {
        console.error("Failed to add reaction:", error);
        throw error;
      }
    },
    [targetType, targetId]
  );

  useEffect(() => {
    fetchReactions();
  }, [fetchReactions]);

  return {
    reactions,
    isLoading,
    fetchReactions,
    addReaction,
  };
};
