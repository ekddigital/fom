// app/api/subjects/[subjectId]/chapters/[chapterId]/topics/[topicId]/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { checkRole } from "@/lib/auth";
import { Role } from "@prisma/client";
import { z } from "zod";

interface TopicRouteParams {
  params: {
    subjectId: string;
    chapterId: string;
    topicId: string;
  };
}

// Define Zod schema for updating a topic
const updateTopicSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: "Topic title cannot be empty." })
      .max(255)
      .optional(),
    order: z.number().int().optional(),
  })
  .refine((data) => data.title !== undefined || data.order !== undefined, {
    message: "Either title or order must be provided for an update.",
    path: ["title", "order"],
  });

// GET a single topic by ID (Admin only)
export async function GET(_request: Request, { params }: TopicRouteParams) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const isAdmin = await checkRole(Role.ADMIN);
  if (!isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { subjectId, chapterId, topicId } = params;

  try {
    const topic = await prisma.topic.findUnique({
      where: {
        id: topicId,
        chapter_id: chapterId,
        chapter: {
          id: chapterId,
          subject_id: subjectId,
        },
      },
    });

    if (!topic) {
      return NextResponse.json(
        {
          error:
            "Topic not found, or does not belong to the specified chapter and subject.",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(topic);
  } catch (error) {
    console.error(`Error fetching topic ${topicId}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch topic" },
      { status: 500 }
    );
  }
}

// PUT to update a topic by ID (Admin only)
export async function PUT(request: Request, { params }: TopicRouteParams) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const isAdmin = await checkRole(Role.ADMIN);
  if (!isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { subjectId, chapterId, topicId } = params;

  try {
    const body = await request.json();
    const validationResult = updateTopicSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { title, order } = validationResult.data;

    // Check if topic exists and belongs to the chapter and subject
    const existingTopic = await prisma.topic.findFirst({
      where: {
        id: topicId,
        chapter_id: chapterId,
        chapter: {
          id: chapterId,
          subject_id: subjectId,
        },
      },
    });

    if (!existingTopic) {
      return NextResponse.json(
        {
          error:
            "Topic not found, or does not belong to the specified chapter and subject.",
        },
        { status: 404 }
      );
    }

    const updatedTopic = await prisma.topic.update({
      where: { id: topicId },
      data: {
        ...(title !== undefined && { title: title.trim() }),
        ...(order !== undefined && { order }),
      },
    });
    return NextResponse.json(updatedTopic);
  } catch (error) {
    console.error(`Error updating topic ${topicId}:`, error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.flatten() },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update topic" },
      { status: 500 }
    );
  }
}

// DELETE a topic by ID (Admin only)
export async function DELETE(_request: Request, { params }: TopicRouteParams) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const isAdmin = await checkRole(Role.ADMIN);
  if (!isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { subjectId, chapterId, topicId } = params;

  try {
    // Check if topic exists and belongs to the chapter and subject before deleting
    const topicToDelete = await prisma.topic.findFirst({
      where: {
        id: topicId,
        chapter_id: chapterId,
        chapter: {
          id: chapterId,
          subject_id: subjectId,
        },
      },
    });

    if (!topicToDelete) {
      return NextResponse.json(
        {
          error:
            "Topic not found, or does not belong to the specified chapter and subject.",
        },
        { status: 404 }
      );
    }

    await prisma.topic.delete({
      where: { id: topicId },
    });
    return NextResponse.json(
      { message: "Topic deleted successfully" },
      { status: 200 }
    ); // Or 204 No Content
  } catch (error) {
    console.error(`Error deleting topic ${topicId}:`, error);
    return NextResponse.json(
      { error: "Failed to delete topic" },
      { status: 500 }
    );
  }
}
