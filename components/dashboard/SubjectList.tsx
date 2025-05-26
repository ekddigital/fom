"use client";

import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs"; // Import useUser
import SubjectCard from "./SubjectCard";
import { ProgressStatus, Role } from "@prisma/client"; // Assuming ProgressStatus is available

// Define interfaces based on your Prisma schema and API response
// These should ideally be in a shared types file

interface Subject {
  id: string;
  title: string;
  description?: string | null;
  // other fields like 'createdAt', 'updatedAt' if needed
}

interface Chapter {
  id: string;
  title: string;
  subject_id: string;
  subject: Subject;
  // other fields
}

interface Topic {
  id: string;
  title: string;
  chapter_id: string;
  chapter: Chapter;
  // other fields
}

// This represents the structure of items returned by /api/users/[userId]/progress
interface UserProgressItem {
  id: string; // Progress entry ID
  user_id: string;
  topic_id: string;
  status: ProgressStatus;
  // other progress fields like score, last_attempted
  topic: Topic; // Nested topic, chapter, and subject
}

interface SubjectWithProgress extends Subject {
  totalTopics: number;
  completedTopics: number;
}

// Add a new interface for teacher's subject view
interface TeacherSubjectView extends Subject {
  totalTopics: number;
  // Teachers don't have 'completedTopics' in the same way students do for their own progress
  // This could be adapted later to show average student completion, etc.
}

const SubjectList: React.FC = () => {
  const { userId } = useAuth();
  const { user } = useUser();
  const [subjectsToDisplay, setSubjectsToDisplay] = useState<
    Array<SubjectWithProgress | TeacherSubjectView>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCurrentUserTeacherOrAdmin, setIsCurrentUserTeacherOrAdmin] =
    useState<boolean>(false); // Added state for role

  useEffect(() => {
    if (!userId || !user) {
      setIsLoading(false);
      return;
    }

    const fetchSubjects = async () => {
      setIsLoading(true);
      setError(null);
      // Reset role state on new fetch, default to false (student)
      setIsCurrentUserTeacherOrAdmin(false);
      try {
        // Fetch user details from our DB to get the role
        const userDetailsResponse = await fetch(`/api/users/${userId}/details`);
        let roleDeterminedIsTeacherOrAdmin = false; // Local var for this fetch operation
        if (userDetailsResponse.ok) {
          const userDetails = await userDetailsResponse.json();
          if (
            userDetails.role === Role.TEACHER ||
            userDetails.role === Role.ADMIN
          ) {
            roleDeterminedIsTeacherOrAdmin = true;
          }
        } else {
          console.warn(
            "Could not fetch user details to determine role for SubjectList. Defaulting to student view logic."
          );
          // Keep roleDeterminedIsTeacherOrAdmin as false (student view)
        }
        setIsCurrentUserTeacherOrAdmin(roleDeterminedIsTeacherOrAdmin); // Set state based on fetch

        if (roleDeterminedIsTeacherOrAdmin) {
          const response = await fetch("/api/users/subjects"); // UPDATED ROUTE
          if (!response.ok) {
            const errorData = await response
              .json()
              .catch(() => ({ error: "Failed to parse error response" }));
            throw new Error(
              errorData.error || "Failed to fetch teacher subjects"
            );
          }
          const teacherSubjects: TeacherSubjectView[] = await response.json();
          setSubjectsToDisplay(teacherSubjects);
        } else {
          // Existing logic for students
          const response = await fetch(`/api/users/${userId}/progress`);
          if (!response.ok) {
            const errorData = await response
              .json()
              .catch(() => ({ error: "Failed to parse error response" }));
            throw new Error(errorData.error || "Failed to fetch progress data");
          }
          const progressData: UserProgressItem[] = await response.json();

          if (!Array.isArray(progressData)) {
            console.error(
              "Fetched progress data is not an array:",
              progressData
            );
            throw new Error("Received invalid data format for progress.");
          }

          const subjectsMap = new Map<
            string,
            {
              subject: Subject;
              topics: Set<string>;
              completedTopics: Set<string>;
            }
          >();

          progressData.forEach((item) => {
            if (!item.topic?.chapter?.subject) {
              console.warn(
                "Skipping progress item with missing subject data:",
                item
              );
              return;
            }
            const subject = item.topic.chapter.subject;
            if (!subjectsMap.has(subject.id)) {
              subjectsMap.set(subject.id, {
                subject: {
                  id: subject.id,
                  title: subject.title,
                  description: subject.description,
                },
                topics: new Set<string>(),
                completedTopics: new Set<string>(),
              });
            }
            const currentSubjectData = subjectsMap.get(subject.id)!;
            currentSubjectData.topics.add(item.topic_id);
            if (item.status === ProgressStatus.COMPLETED) {
              currentSubjectData.completedTopics.add(item.topic_id);
            }
          });

          const processedSubjects: SubjectWithProgress[] = Array.from(
            subjectsMap.values()
          ).map((data) => ({
            ...data.subject,
            totalTopics: data.topics.size,
            completedTopics: data.completedTopics.size,
          }));
          setSubjectsToDisplay(processedSubjects);
        }
      } catch (err) {
        console.error("Error fetching subjects and progress:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubjects();
  }, [userId, user]); // Add user to dependency array

  if (isLoading) {
    return <div className="text-center py-10">Loading subjects...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500\">Error: {error}</div>
    );
  }

  if (subjectsToDisplay.length === 0) {
    // Customize message based on the fetched and stored role
    const message = isCurrentUserTeacherOrAdmin
      ? "No subjects found. You can create new subjects."
      : "No subjects found or no progress recorded yet.";
    return <div className="text-center py-10 text-gray-500">{message}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {subjectsToDisplay.map((subject) => {
        let progressDisplay: string | number = 0;
        if ("completedTopics" in subject) {
          // Student view
          progressDisplay =
            subject.totalTopics > 0
              ? Math.round(
                  (subject.completedTopics / subject.totalTopics) * 100
                )
              : 0;
        } else {
          // Teacher view or subject with no progress data structure
          progressDisplay = `${subject.totalTopics} topics`;
        }

        return (
          <SubjectCard
            key={subject.id}
            id={subject.id}
            title={subject.title}
            description={subject.description || undefined}
            progress={progressDisplay}
          />
        );
      })}
    </div>
  );
};

export default SubjectList;
