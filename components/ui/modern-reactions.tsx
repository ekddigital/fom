"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThumbsUp, Heart, Flame, Hand, Smile, Plus } from "lucide-react";

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

// Extended reaction set with priority at the top
const REACTION_SET = [
  // Priority reactions (always at top)
  "👍",
  "❤️",
  "🙏",
  "🔥",
  // Additional reactions
  "😊",
  "🙌",
  "✨",
  "💯",
  "👏",
  "🎉",
  "💝",
  "🌟",
  "⭐",
  "💪",
  "🕊️",
  "✝️",
];

const reactionConfig = {
  "👍": {
    icon: ThumbsUp,
    label: "Like",
    color: "text-blue-600",
    hoverColor: "hover:text-blue-700",
    bgColor: "bg-blue-50",
    hoverBgColor: "hover:bg-blue-100",
    activeColor: "text-blue-700",
    activeBgColor: "bg-blue-100",
  },
  "❤️": {
    icon: Heart,
    label: "Love",
    color: "text-red-600",
    hoverColor: "hover:text-red-700",
    bgColor: "bg-red-50",
    hoverBgColor: "hover:bg-red-100",
    activeColor: "text-red-700",
    activeBgColor: "bg-red-100",
  },
  "🙏": {
    icon: Hand,
    label: "Pray",
    color: "text-purple-600",
    hoverColor: "hover:text-purple-700",
    bgColor: "bg-purple-50",
    hoverBgColor: "hover:bg-purple-100",
    activeColor: "text-purple-700",
    activeBgColor: "bg-purple-100",
  },
  "🔥": {
    icon: Flame,
    label: "Fire",
    color: "text-orange-600",
    hoverColor: "hover:text-orange-700",
    bgColor: "bg-orange-50",
    hoverBgColor: "hover:bg-orange-100",
    activeColor: "text-orange-700",
    activeBgColor: "bg-orange-100",
  },
  "😊": {
    icon: Smile,
    label: "Smile",
    color: "text-yellow-600",
    hoverColor: "hover:text-yellow-700",
    bgColor: "bg-yellow-50",
    hoverBgColor: "hover:bg-yellow-100",
    activeColor: "text-yellow-700",
    activeBgColor: "bg-yellow-100",
  },
  // Default config for emojis without specific config
  default: {
    icon: Plus,
    label: "React",
    color: "text-gray-600",
    hoverColor: "hover:text-gray-700",
    bgColor: "bg-gray-50",
    hoverBgColor: "hover:bg-gray-100",
    activeColor: "text-gray-700",
    activeBgColor: "bg-gray-100",
  },
};

export const ModernReactions = ({
  reactions,
  onReact,
  className,
  disabled = false,
}: ReactionsProps) => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [hoveredReaction, setHoveredReaction] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close reaction picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setHoveredReaction(null);
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle hover enter with immediate show
  const handleMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredReaction("👍");
    setShowPicker(true);
  }, []);

  // Handle hover leave with delay
  const handleMouseLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredReaction(null);
      setShowPicker(false);
    }, 300); // 300ms delay before hiding
  }, []);

  // Keep picker open when hovering over it
  const handlePickerMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleReact = useCallback(
    async (emoji: string) => {
      if (disabled || isLoading) return;

      setIsLoading(emoji);
      setHoveredReaction(null);
      setShowPicker(false);
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

  // Get the primary reaction (like) data
  const primaryReaction = getReactionData("👍");

  // Get other reactions that have counts > 0, excluding the primary
  const otherReactions = reactions.filter(
    (r) => r.emoji !== "👍" && r.count > 0
  );

  // Get config for a reaction
  const getConfig = (emoji: string) => {
    return (
      reactionConfig[emoji as keyof typeof reactionConfig] ||
      reactionConfig.default
    );
  };

  const PrimaryReactionButton = () => {
    const config = getConfig("👍");
    const IconComponent = config.icon;

    return (
      <div className="relative" ref={pickerRef}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleReact("👍")}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          disabled={disabled || isLoading === "👍"}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 h-auto min-w-[60px] rounded-full transition-all duration-200",
            primaryReaction.hasReacted
              ? `${config.activeBgColor} ${config.activeColor} border border-current`
              : `${config.bgColor} ${config.color} ${config.hoverBgColor} ${config.hoverColor} border border-gray-200 hover:border-current`,
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          {isLoading === "👍" ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <IconComponent
              className={cn(
                "w-4 h-4",
                primaryReaction.hasReacted && "fill-current"
              )}
            />
          )}
          {primaryReaction.count > 0 && (
            <span className="text-sm font-medium">{primaryReaction.count}</span>
          )}
        </Button>

        {/* Reaction Picker on Hover */}
        {(hoveredReaction === "👍" || showPicker) && !disabled && (
          <div
            className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-200 p-2 min-w-[280px] z-50 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 duration-200"
            onMouseEnter={handlePickerMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="grid grid-cols-6 gap-1">
              {REACTION_SET.map((emoji) => {
                const reactionData = getReactionData(emoji);
                const config = getConfig(emoji);

                return (
                  <button
                    key={emoji}
                    onClick={() => handleReact(emoji)}
                    disabled={disabled || isLoading === emoji}
                    className={cn(
                      "p-2 rounded-lg transition-all duration-150 hover:scale-110 hover:bg-gray-100 relative group",
                      reactionData.hasReacted &&
                        "bg-blue-50 ring-2 ring-blue-200",
                      disabled && "opacity-50 cursor-not-allowed"
                    )}
                    title={config.label}
                  >
                    <span className="text-xl">{emoji}</span>
                    {reactionData.count > 0 && (
                      <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                        {reactionData.count > 99 ? "99+" : reactionData.count}
                      </span>
                    )}

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {config.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Reaction Summary (Facebook-style) */}
      {reactions.length > 0 && reactions.some((r) => r.count > 0) && (
        <div className="flex items-center gap-2">
          {/* Emoji Stack */}
          <div className="flex items-center -space-x-1">
            {reactions
              .filter((r) => r.count > 0)
              .slice(0, 3)
              .map((reaction, index) => (
                <div
                  key={reaction.emoji}
                  className="w-6 h-6 bg-white rounded-full border border-gray-200 flex items-center justify-center text-sm shadow-sm"
                  style={{ zIndex: reactions.length - index }}
                >
                  {reaction.emoji}
                </div>
              ))}
          </div>

          {/* Total Count */}
          <span className="text-sm text-gray-600 font-medium hover:underline cursor-pointer">
            {reactions.reduce((sum, r) => sum + r.count, 0)}
          </span>
        </div>
      )}

      {/* Primary Like Button */}
      <PrimaryReactionButton />

      {/* Other Active Reactions */}
      {otherReactions.length > 0 && (
        <div className="flex items-center gap-1">
          {otherReactions.slice(0, 2).map((reaction) => {
            const config = getConfig(reaction.emoji);

            return (
              <Button
                key={reaction.emoji}
                variant="ghost"
                size="sm"
                onClick={() => handleReact(reaction.emoji)}
                disabled={disabled || isLoading === reaction.emoji}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 h-auto rounded-full transition-all duration-200",
                  reaction.hasReacted
                    ? `${config.activeBgColor} ${config.activeColor} border border-current`
                    : `${config.bgColor} ${config.color} ${config.hoverBgColor} ${config.hoverColor} border border-gray-200 hover:border-current`,
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {isLoading === reaction.emoji ? (
                  <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span className="text-sm">{reaction.emoji}</span>
                )}
                <span className="text-xs font-medium">{reaction.count}</span>
              </Button>
            );
          })}

          {/* Show more button if there are more reactions */}
          {otherReactions.length > 2 && (
            <Button
              variant="ghost"
              size="sm"
              className="px-2 py-1 h-auto text-xs text-gray-500 hover:text-gray-700 rounded-full"
            >
              +{otherReactions.length - 2}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

// Hook for managing reactions
export const useReactions = (contentType: string, contentId: string) => {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch reactions
  const fetchReactions = useCallback(async () => {
    if (!contentId) return;

    try {
      const response = await fetch(
        `/api/reactions/${contentType}/${contentId}`
      );
      if (response.ok) {
        const data = await response.json();
        setReactions(data.reactions || []);
      }
    } catch (error) {
      console.error("Failed to fetch reactions:", error);
    } finally {
      setLoading(false);
    }
  }, [contentType, contentId]);

  // Add or remove reaction
  const addReaction = useCallback(
    async (emoji: string) => {
      if (!contentId) return;

      try {
        const response = await fetch(
          `/api/reactions/${contentType}/${contentId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ emoji }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setReactions(data.reactions || []);
        }
      } catch (error) {
        console.error("Failed to add reaction:", error);
      }
    },
    [contentType, contentId]
  );

  useEffect(() => {
    fetchReactions();
  }, [fetchReactions]);

  return {
    reactions,
    addReaction,
    loading,
  };
};

// Export as default for easy importing
export default ModernReactions;
