// app/api/subjects/[subjectId]/chapters/[chapterId]/topics/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { checkRole } from "@/lib/auth";
import { Role } from "@prisma/client";
import { z } from "zod";

interface TopicsRouteParams {
  params: {
    subjectId: string;
    chapterId: string;
  };
}

// Zod schema for creating a topic
const createTopicSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Topic title cannot be empty." })
    .max(255),
  order: z
    .number()
    .int()
    .positive({ message: "Order must be a positive integer." }),
});

// GET all topics for a chapter (Admin only)
export async function GET(_request: Request, { params }: TopicsRouteParams) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const isAdmin = await checkRole(Role.ADMIN); // Use Role enum
  if (!isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { subjectId, chapterId } = params;

  try {
    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId, subject_id: subjectId },
    });

    if (!chapter) {
      return NextResponse.json(
        {
          error:
            "Chapter not found or does not belong to the specified subject.",
        },
        { status: 404 }
      );
    }

    const topics = await prisma.topic.findMany({
      where: { chapter_id: chapterId },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(topics);
  } catch (error) {
    console.error(`Error fetching topics for chapter ${chapterId}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch topics" },
      { status: 500 }
    );
  }
}

// POST a new topic to a chapter (Admin only)
export async function POST(request: Request, { params }: TopicsRouteParams) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const isAdmin = await checkRole(Role.ADMIN);
  if (!isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { subjectId, chapterId } = params;

  try {
    const rawBody = await request.json();
    const validationResult = createTopicSchema.safeParse(rawBody);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request body.",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { title, order } = validationResult.data;

    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId, subject_id: subjectId },
    });
    if (!chapter) {
      return NextResponse.json(
        {
          error:
            "Chapter not found or does not belong to the specified subject.",
        },
        { status: 404 }
      );
    }

    const newTopic = await prisma.topic.create({
      data: {
        title,
        order,
        chapter_id: chapterId,
      },
    });
    return NextResponse.json(newTopic, { status: 201 });
  } catch (error) {
    console.error(`Error creating topic for chapter ${chapterId}:`, error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid request body.",
          details: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create topic" },
      { status: 500 }
    );
  }
}
