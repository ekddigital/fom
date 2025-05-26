// app/api/subjects/[subjectId]/details/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { Role, ProgressStatus, StudentProgress } from "@prisma/client"; // Added StudentProgress

// Minimal interface for what we expect in studentProgress array items
interface StudentProgressItem extends StudentProgress {}

export async function GET(
  _request: Request,
  { params }: { params: { subjectId: string } }
) {
  const authResult = await auth();
  console.log(
    "API route /api/subjects/[subjectId]/details - authResult:",
    JSON.stringify(authResult)
  );

  const { userId: clerkId } = authResult || {}; // Ensure authResult is not null before destructuring

  if (!clerkId) {
    console.error(
      "API route /api/subjects/[subjectId]/details - Unauthorized: clerkId is null or undefined. Full authResult:",
      JSON.stringify(authResult) // Corrected: Use JSON.stringify for the object
    );
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Destructure params *after* initial await and auth check
  const { subjectId } = params;

  if (!subjectId) {
    return NextResponse.json(
      { error: "Subject ID is required" },
      { status: 400 }
    );
  }

  try {
    const subjectDetails = await prisma.subject.findUnique({
      where: { id: subjectId },
      include: {
        chapters: {
          orderBy: { title: "asc" }, // Or use an 'order' field if available
          include: {
            topics: {
              orderBy: { title: "asc" }, // Or use an 'order' field
            },
          },
        },
      },
    });

    if (!subjectDetails) {
      return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    }

    // Check user role to determine if progress data should be fetched
    const user = await prisma.user.findUnique({
      where: { clerk_id: clerkId },
      select: { role: true, id: true }, // Fetch internal DB user ID as well
    });

    if (!user) {
      // This case should ideally not happen if Clerk auth passed and webhook sync is working
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }

    if (user.role === Role.STUDENT) {
      // Fetch student's progress for all topics in this subject
      const topicIds = subjectDetails.chapters.flatMap((chapter) =>
        chapter.topics.map((topic) => topic.id)
      );

      let studentProgress: StudentProgressItem[] = []; // Use the defined interface
      if (topicIds.length > 0 && user.id) {
        studentProgress = await prisma.studentProgress.findMany({
          where: {
            user_id: user.id, // Corrected: Use internal DB user ID (UUID)
            topic_id: { in: topicIds },
          },
        });
      }

      // Augment topics with progress status
      const chaptersWithProgress = subjectDetails.chapters.map((chapter) => ({
        ...chapter,
        topics: chapter.topics.map((topic) => {
          const progress = studentProgress.find((p) => p.topic_id === topic.id);
          return {
            ...topic,
            status: progress ? progress.status : ProgressStatus.NOT_STARTED,
          };
        }),
      }));

      return NextResponse.json({
        ...subjectDetails,
        chapters: chaptersWithProgress,
      });
    } else {
      // For TEACHER or ADMIN, return subject details without student-specific progress
      // The topics will not have the 'status' field added by default
      return NextResponse.json(subjectDetails);
    }
  } catch (error) {
    console.error(`Failed to fetch subject details for ${subjectId}:`, error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal server error", details: errorMessage },
      { status: 500 }
    );
  }
}
