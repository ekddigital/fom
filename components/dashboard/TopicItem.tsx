"use client";

import React from "react";
import { ProgressStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, CircleDashed, Pencil } from "lucide-react";
import { toast } from "sonner";

// Define detailed nested structures, assuming these align with your Prisma schema and API responses
// Ideally, these would be in a shared types definition file (e.g., types/prisma.ts or similar)
interface Subject {
  id: string;
  title: string;
  // other subject fields if necessary
}

interface Chapter {
  id: string;
  title: string;
  subject: Subject; // Chapter includes its Subject
  // other chapter fields if necessary
}

interface Topic {
  id: string;
  title: string;
  chapter: Chapter; // Topic now includes its Chapter
  // other topic fields if necessary
}

export interface StudentProgress {
  id: string;
  user_id: string;
  topic_id: string;
  status: ProgressStatus;
  best_score?: number | null;
  last_attempted?: Date | null;
  topic: Topic; // topic is now the detailed Topic interface
}

interface TopicItemProps {
  topic: Topic; // This prop will also be the detailed Topic
  studentProgress?: StudentProgress | null;
  userId: string;
  onStatusChange: (topicId: string, updatedProgress: StudentProgress) => void; // Callback uses detailed StudentProgress
}

const TopicItem: React.FC<TopicItemProps> = ({
  topic,
  studentProgress,
  userId,
  onStatusChange,
}) => {
  const currentStatus: ProgressStatus =
    studentProgress?.status || ProgressStatus.NOT_STARTED;

  const getStatusIcon = (status: ProgressStatus) => {
    switch (status) {
      case ProgressStatus.COMPLETED:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case ProgressStatus.IN_PROGRESS:
        return <Pencil className="h-5 w-5 text-yellow-500" />;
      case ProgressStatus.NOT_STARTED:
      default: // Default to NOT_STARTED or a general icon if status is unexpected
        return <CircleDashed className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleUpdateStatus = async (newStatus: ProgressStatus) => {
    const toastId = toast.loading(
      `Updating status to ${newStatus.replace("_", " ").toLowerCase()}...`
    );
    try {
      const response = await fetch(
        `/api/users/${userId}/progress/topics/${topic.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Failed to parse error response" }));
        throw new Error(errorData.error || "Failed to update topic status");
      }

      // Assuming the API returns the updated StudentProgress with the full 'topic' object
      const updatedProgress: StudentProgress = await response.json();
      toast.success("Status updated successfully!", { id: toastId });
      onStatusChange(topic.id, updatedProgress); // Notify parent component
    } catch (error) {
      console.error("Error updating topic status:", error);
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred.",
        { id: toastId }
      );
    }
  };

  return (
    <li className="flex items-center justify-between p-3 bg-card border rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center space-x-3">
        {getStatusIcon(currentStatus)}
        <span className="text-card-foreground">{topic.title}</span>
      </div>
      <div className="flex items-center space-x-2">
        {currentStatus !== ProgressStatus.NOT_STARTED && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleUpdateStatus(ProgressStatus.NOT_STARTED)}
            // disabled={currentStatus === ProgressStatus.NOT_STARTED} // Redundant if button is conditionally rendered
            className="text-xs"
          >
            Reset
          </Button>
        )}
        {currentStatus !== ProgressStatus.IN_PROGRESS && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleUpdateStatus(ProgressStatus.IN_PROGRESS)}
            // disabled={currentStatus === ProgressStatus.IN_PROGRESS} // Redundant
            className="text-xs"
          >
            {currentStatus === ProgressStatus.NOT_STARTED ? "Start" : "Resume"}
          </Button>
        )}
        {currentStatus !== ProgressStatus.COMPLETED && (
          <Button
            variant="default"
            size="sm"
            onClick={() => handleUpdateStatus(ProgressStatus.COMPLETED)}
            // disabled={currentStatus === ProgressStatus.COMPLETED} // Redundant
            className="text-xs bg-green-600 hover:bg-green-700 text-white"
          >
            Complete
          </Button>
        )}
      </div>
    </li>
  );
};

export default TopicItem;
