// app/api/teacher/analytics/class-summary/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { checkRole } from "@/lib/auth";
import { Role } from "@prisma/client";

const OVERALL_PROGRESS_THRESHOLD = 40; // Percentage
const SUBJECT_PROGRESS_THRESHOLD = 30; // Percentage

export async function GET(_request: Request) {
  try {
    const { userId: authUserId } = await auth(); // Changed: Added await and aliased to avoid conflict
    if (!authUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isTeacher = await checkRole(Role.TEACHER);
    if (!isTeacher) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 1. Fetch all students
    const students = await prisma.user.findMany({
      where: { role: Role.STUDENT },
      select: { id: true, clerk_id: true, name: true },
    });

    if (students.length === 0) {
      return NextResponse.json({
        totalStudents: 0,
        overallAverageCompletion: 0,
        studentsNeedingAttentionCount: 0,
        studentsNeedingAttentionThreshold: OVERALL_PROGRESS_THRESHOLD,
        subjectBreakdown: [],
        detailedStudentsNeedingAttention: [],
      });
    }

    // 2. Fetch all subjects and their topics to get total topic counts
    const subjectsWithTopics = await prisma.subject.findMany({
      select: {
        id: true,
        title: true,
        chapters: {
          select: {
            topics: {
              select: { id: true },
            },
          },
        },
      },
    });

    const totalTopicsPerSubject: Record<string, number> = {};
    let grandTotalTopics = 0;
    subjectsWithTopics.forEach((subject) => {
      let topicsInSubject = 0;
      subject.chapters.forEach((chapter) => {
        topicsInSubject += chapter.topics.length;
      });
      totalTopicsPerSubject[subject.id] = topicsInSubject;
      grandTotalTopics += topicsInSubject;
    });

    if (grandTotalTopics === 0) {
      // No topics in the system, so all progress is 0 or 100 if no topics.
      // For simplicity, returning 0 progress.
      return NextResponse.json({
        totalStudents: students.length,
        overallAverageCompletion: 0,
        studentsNeedingAttentionCount: 0,
        studentsNeedingAttentionThreshold: OVERALL_PROGRESS_THRESHOLD,
        subjectBreakdown: subjectsWithTopics.map((s) => ({
          subjectId: s.id,
          subjectTitle: s.title,
          averageCompletion: 0,
          studentsStrugglingInSubject: 0,
          studentsStrugglingThreshold: SUBJECT_PROGRESS_THRESHOLD,
        })),
        detailedStudentsNeedingAttention: [],
      });
    }

    // 3. Fetch progress for all students
    const studentProgressRecords = await prisma.studentProgress.findMany({
      where: {
        user_id: { in: students.map((s) => s.id) }, // Changed: userId to user_id
        status: "COMPLETED",
      },
      select: { user_id: true, topic_id: true }, // Changed: userId to user_id, topicId to topic_id
    });

    // Helper to map topicId to subjectId
    const topicToSubjectMap: Record<string, string> = {};
    subjectsWithTopics.forEach((subject) => {
      subject.chapters.forEach((chapter) => {
        chapter.topics.forEach((topic) => {
          topicToSubjectMap[topic.id] = subject.id;
        });
      });
    });

    // 4. Calculate progress
    let totalOverallCompletionSum = 0;
    let studentsNeedingAttentionCount = 0;
    const detailedStudentsNeedingAttention: {
      studentId: string;
      studentName: string | null;
      overallCompletion: number;
    }[] = [];

    const subjectProgressSums: Record<string, number> = {};
    const studentsStrugglingInSubjectCounts: Record<string, number> = {};
    subjectsWithTopics.forEach((s) => {
      subjectProgressSums[s.id] = 0;
      studentsStrugglingInSubjectCounts[s.id] = 0;
    });

    for (const student of students) {
      const completedTopicsByStudent = studentProgressRecords.filter(
        (p) => p.user_id === student.id // Changed: p.userId to p.user_id
      );

      // Overall progress for this student
      const overallCompletion =
        grandTotalTopics > 0
          ? (completedTopicsByStudent.length / grandTotalTopics) * 100
          : 0;
      totalOverallCompletionSum += overallCompletion;

      if (overallCompletion < OVERALL_PROGRESS_THRESHOLD) {
        studentsNeedingAttentionCount++;
        detailedStudentsNeedingAttention.push({
          studentId: student.clerk_id, // Using clerk_id for frontend identification
          studentName: student.name,
          overallCompletion: parseFloat(overallCompletion.toFixed(1)),
        });
      }

      // Per-subject progress for this student
      const completedTopicsBySubjectForStudent: Record<string, number> = {};
      subjectsWithTopics.forEach(
        (s) => (completedTopicsBySubjectForStudent[s.id] = 0)
      );

      completedTopicsByStudent.forEach((p) => {
        const subjectId = topicToSubjectMap[p.topic_id]; // Changed: p.topicId to p.topic_id
        if (subjectId) {
          completedTopicsBySubjectForStudent[subjectId]++;
        }
      });

      subjectsWithTopics.forEach((subject) => {
        const subjectTotalTopics = totalTopicsPerSubject[subject.id];
        const studentSubjectCompletion =
          subjectTotalTopics > 0
            ? (completedTopicsBySubjectForStudent[subject.id] /
                subjectTotalTopics) *
              100
            : 0;
        subjectProgressSums[subject.id] += studentSubjectCompletion;
        if (studentSubjectCompletion < SUBJECT_PROGRESS_THRESHOLD) {
          studentsStrugglingInSubjectCounts[subject.id]++;
        }
      });
    }

    const overallAverageCompletion =
      students.length > 0 ? totalOverallCompletionSum / students.length : 0;

    const subjectBreakdown = subjectsWithTopics.map((subject) => ({
      subjectId: subject.id,
      subjectTitle: subject.title,
      averageCompletion:
        students.length > 0
          ? parseFloat(
              (subjectProgressSums[subject.id] / students.length).toFixed(1)
            )
          : 0,
      studentsStrugglingInSubject:
        studentsStrugglingInSubjectCounts[subject.id],
      studentsStrugglingThreshold: SUBJECT_PROGRESS_THRESHOLD,
    }));

    return NextResponse.json({
      totalStudents: students.length,
      overallAverageCompletion: parseFloat(overallAverageCompletion.toFixed(1)),
      studentsNeedingAttentionCount,
      studentsNeedingAttentionThreshold: OVERALL_PROGRESS_THRESHOLD,
      subjectBreakdown,
      detailedStudentsNeedingAttention,
    });
  } catch (error) {
    console.error("[API_TEACHER_CLASS_SUMMARY] Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
