import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { checkRole } from "@/lib/auth";
import { ProgressStatus } from "@prisma/client";

export async function GET(
  request: Request,
  { params: paramsFromContext }: { params: { userId: string } } // Renamed for clarity
) {
  const { userId: authUserId } = await auth();

  // Address the Next.js error: "params should be awaited before using its properties"
  const params = await paramsFromContext;
  const requestedClerkId = params.userId;

  const { searchParams } = new URL(request.url);
  const subjectId = searchParams.get("subjectId");

  if (!authUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // A user can fetch their own progress.
  // A teacher or admin can fetch any user's progress.
  if (
    authUserId !== requestedClerkId &&
    !(await checkRole(["ADMIN", "TEACHER"]))
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    if (subjectId) {
      // Fetch all topics for the given subject first
      const topicsInSubject = await prisma.topic.findMany({
        where: {
          chapter: {
            subject_id: subjectId,
          },
        },
        include: {
          chapter: {
            include: {
              subject: true,
            },
          },
        },
        orderBy: [
          { chapter: { subject: { title: "asc" } } },
          { chapter: { title: "asc" } }, // Assuming chapters have a title or order field
          { title: "asc" }, // Assuming topics have a title or order field
        ],
      });

      if (topicsInSubject.length === 0) {
        return NextResponse.json([]); // No topics for this subject, so no progress to show
      }

      // Then fetch existing progress for these topics for the user
      const existingProgress = await prisma.studentProgress.findMany({
        where: {
          user_id: requestedClerkId,
          topic_id: {
            in: topicsInSubject.map((t) => t.id),
          },
        },
        include: {
          topic: {
            include: {
              chapter: {
                include: {
                  subject: true,
                },
              },
            },
          },
        },
      });

      // Merge topics with their progress, creating default NOT_STARTED if no progress exists
      const allProgressData = topicsInSubject.map((topic) => {
        const progress = existingProgress.find((p) => p.topic_id === topic.id);
        if (progress) {
          return progress;
        }
        // Create a synthetic progress object for topics not yet started
        return {
          // Synthetic ID, or handle differently if ID is crucial and must be from DB
          id: `synthetic-${topic.id}`,
          user_id: requestedClerkId,
          topic_id: topic.id,
          status: ProgressStatus.NOT_STARTED,
          best_score: null,
          last_attempted: null,
          created_at: new Date(), // Or null, depending on needs
          updated_at: new Date(), // Or null
          topic: topic, // Already includes chapter and subject
        };
      });
      return NextResponse.json(allProgressData);
    } else {
      // Original behavior: fetch all progress for the user if no subjectId is specified
      const userProgress = await prisma.studentProgress.findMany({
        where: {
          user_id: requestedClerkId,
        },
        include: {
          topic: {
            include: {
              chapter: {
                include: {
                  subject: true,
                },
              },
            },
          },
        },
        orderBy: {
          topic: {
            chapter: {
              subject: {
                title: "asc",
              },
              // title: "asc", // if chapters are ordered by title
            },
            // title: "asc", // if topics are ordered by title
          },
        },
      });
      return NextResponse.json(userProgress);
    }
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
