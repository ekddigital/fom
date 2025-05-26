"use client";

import React, { useEffect, useState, useCallback } from "react";
import { ProgressStatus } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@clerk/nextjs";
import TopicItem, { StudentProgress as StudentProgressType } from "./TopicItem"; // Import StudentProgress type

// Define local interfaces, ideally these would come from a shared types file
interface Subject {
  id: string;
  title: string;
}

interface Chapter {
  id: string;
  title: string;
  subject: Subject;
  // order?: number;
}

interface Topic {
  id: string;
  title: string;
  chapter: Chapter;
  // order?: number;
}

// This StudentProgress interface should align with the one in TopicItem.tsx
// and the data structure returned by your API.
// It includes the nested Topic, Chapter, and Subject.
interface FullStudentProgress extends StudentProgressType {
  topic: Topic & {
    chapter: Chapter & {
      subject: Subject;
    };
  };
}

interface ChapterWithTopicsAndProgress extends Chapter {
  topics: Array<Topic & { progress?: FullStudentProgress }>;
}

interface ChartDataPoint {
  status: ProgressStatus;
  count: number;
}

interface ChapterDetailsProps {
  subjectId: string;
  onDataLoaded: (progress: ChartDataPoint[], subjectName?: string) => void;
}

const ChapterDetails: React.FC<ChapterDetailsProps> = ({ subjectId, onDataLoaded }) => {
  const { userId } = useAuth();
  const [chaptersWithTopics, setChaptersWithTopics] = useState<ChapterWithTopicsAndProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subjectTitle, setSubjectTitle] = useState<string>("");

  const aggregateProgressForChart = (progressItems: FullStudentProgress[], allTopicsInSubject: Topic[]): ChartDataPoint[] => {
    const counts: Record<ProgressStatus, number> = {
      NOT_STARTED: 0,
      IN_PROGRESS: 0,
      COMPLETED: 0,
      // Initialize other statuses if they exist and are relevant
    };

    const progressMap = new Map(progressItems.map(p => [p.topic_id, p.status]));

    allTopicsInSubject.forEach(topic => {
      const status = progressMap.get(topic.id) || ProgressStatus.NOT_STARTED;
      if (counts[status] !== undefined) {
        counts[status]++;
      }
    });
    
    return Object.entries(counts).map(([status, count]) => ({
        status: status as ProgressStatus,
        count,
    }));
  };


  const fetchChapterDetails = useCallback(async () => {
    if (!userId || !subjectId) return;
    setIsLoading(true);
    setError(null);
    try {
      // API should return all topics for the subject, with progress merged or default.
      const response = await fetch(`/api/users/${userId}/progress?subjectId=${subjectId}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Failed to parse error response" }));
        throw new Error(errorData.error || `Failed to fetch progress data: ${response.statusText}`);
      }
      // Expecting API to return FullStudentProgress[] where each item has topic.chapter.subject
      // OR it returns a structure containing all topics and their progress (even if NOT_STARTED)
      const returnedData: FullStudentProgress[] = await response.json();

      let currentSubjectTitle = "";
      const allTopicsForSubject: Topic[] = []; // To store all topics for chart aggregation

      if (returnedData.length > 0 && returnedData[0].topic?.chapter?.subject) {
        currentSubjectTitle = returnedData[0].topic.chapter.subject.title;
        setSubjectTitle(currentSubjectTitle);
      } else if (returnedData.length > 0 && !returnedData[0].topic?.chapter?.subject) {
        // This case implies the API returned progress items but they are not fully populated
        // with subject details. This might require a separate subject fetch or API adjustment.
        console.warn("Progress data is missing full subject details. Fetching subject title separately might be needed.");
        // Attempt to fetch subject title if not in progress data (example)
        // const subjectRes = await fetch(`/api/subjects/${subjectId}`); // Hypothetical endpoint
        // if (subjectRes.ok) {
        //   const subjectData = await subjectRes.json();
        //   currentSubjectTitle = subjectData.title;
        //   setSubjectTitle(currentSubjectTitle);
        // }
      }


      const chaptersMap = new Map<string, ChapterWithTopicsAndProgress>();

      returnedData.forEach((item) => {
        // Ensure item.topic and item.topic.chapter are defined
        if (!item.topic || !item.topic.chapter) {
          console.warn(`Skipping progress item with missing topic/chapter data: ${item.id}`);
          return;
        }
        allTopicsForSubject.push(item.topic); // Add to list for chart aggregation

        const chapter = item.topic.chapter;
        if (!chaptersMap.has(chapter.id)) {
          chaptersMap.set(chapter.id, {
            ...chapter,
            topics: [],
          });
        }
        const currentChapterData = chaptersMap.get(chapter.id)!;
        // The 'item' itself is the progress, and it contains the topic.
        currentChapterData.topics.push({ ...item.topic, progress: item });
      });

      const sortedChapters = Array.from(chaptersMap.values()).sort((a, b) =>
        a.title.localeCompare(b.title) // Add ordering logic if available (e.g., chapter.order)
      );
      sortedChapters.forEach((chapter) => {
        chapter.topics.sort((a, b) => a.title.localeCompare(b.title)); // Add ordering logic for topics
      });

      setChaptersWithTopics(sortedChapters);
      
      // Aggregate data for the chart using all topics for the subject
      // The API at /api/users/${userId}/progress?subjectId=${subjectId} should return all topics
      // for the subject, with their progress status (defaulting to NOT_STARTED if no entry).
      // 'returnedData' here represents those items.
      const chartProgressData = aggregateProgressForChart(returnedData, allTopicsForSubject);
      onDataLoaded(chartProgressData, currentSubjectTitle);

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unknown error occurred while fetching chapter details"
      );
      console.error("Error in fetchChapterDetails:", err);
      onDataLoaded([], ""); // Pass empty data on error
    } finally {
      setIsLoading(false);
    }
  }, [userId, subjectId, onDataLoaded]); // Removed aggregateProgressForChart from deps as it's stable

  useEffect(() => {
    fetchChapterDetails();
  }, [fetchChapterDetails]); // userId and subjectId are deps of fetchChapterDetails

  const handleTopicStatusChange = (topicId: string, updatedProgress: FullStudentProgress) => {
    let newSubjectTitle = subjectTitle;
    const newChaptersWithTopics = chaptersWithTopics.map(chapter => ({
      ...chapter,
      topics: chapter.topics.map(topic =>
        topic.id === topicId
          ? { ...topic, progress: updatedProgress }
          : topic
      ),
    }));
    setChaptersWithTopics(newChaptersWithTopics);

    // Recalculate progress counts for the chart
    const allProgressItems: FullStudentProgress[] = newChaptersWithTopics
        .flatMap(chapter => chapter.topics.map(topic => topic.progress))
        .filter(p => p !== undefined) as FullStudentProgress[];

    const allTopics = newChaptersWithTopics.flatMap(c => c.topics.map(t => t as Topic));


    const newChartData = aggregateProgressForChart(allProgressItems, allTopics);

    if (!newSubjectTitle && updatedProgress.topic?.chapter?.subject?.title) {
        newSubjectTitle = updatedProgress.topic.chapter.subject.title;
        setSubjectTitle(newSubjectTitle); // Update subject title if it changed/was found
    }
    onDataLoaded(newChartData, newSubjectTitle || subjectTitle);
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading chapter details...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error loading chapter details: {error}</div>;
  }

  if (chaptersWithTopics.length === 0 && !isLoading) {
    return (
      <Card>
        <CardHeader>
            <CardTitle>{subjectTitle || "Subject Details"}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground py-4 text-center">
                No chapters or topics found for this subject, or no progress has been recorded yet.
                If this subject should have content, please ensure it has been seeded correctly and the API returns all topics.
            </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{subjectTitle || "Subject Chapters"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {chaptersWithTopics.map((chapter) => (
            <AccordionItem value={chapter.id} key={chapter.id}>
              <AccordionTrigger className="text-lg font-medium hover:no-underline">
                {chapter.title}
              </AccordionTrigger>
              <AccordionContent className="pt-1">
                {chapter.topics.length > 0 ? (
                  <ul className="space-y-3 pt-2">
                    {chapter.topics.map((topic) => (
                      <TopicItem
                        key={topic.id}
                        topic={topic} // topic object itself
                        studentProgress={topic.progress} // progress object for this topic
                        userId={userId!} 
                        onStatusChange={handleTopicStatusChange} 
                      />
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground pl-2 pt-2">
                    No topics found in this chapter.
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ChapterDetails;