// app/api/subjects/[subjectId]/chapters/[chapterId]/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { checkRole } from "@/lib/auth";
import { Prisma, Role } from "@prisma/client"; // Import Role
import { z } from "zod";

interface ChapterRouteParams {
  params: {
    subjectId: string;
    chapterId: string;
  };
}

// Zod schema for updating a chapter
const updateChapterSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: "Chapter title cannot be empty." })
      .max(255)
      .optional(),
    order: z
      .number()
      .int()
      .positive({ message: "Order must be a positive integer." })
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field (title or order) must be provided for update.",
  });

// GET a single chapter by ID (Admin only)
export async function GET(
  _request: Request, // Prefixed as not directly used
  { params }: ChapterRouteParams
) {
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
    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
        subject_id: subjectId, // Ensure chapter belongs to the subject
      },
    });
    if (!chapter) {
      return NextResponse.json(
        { error: "Chapter not found or does not belong to this subject" },
        { status: 404 }
      );
    }
    return NextResponse.json(chapter);
  } catch (error) {
    console.error(
      `Error fetching chapter ${chapterId} for subject ${subjectId}:`,
      error
    );
    return NextResponse.json(
      { error: "Failed to fetch chapter" },
      { status: 500 }
    );
  }
}

// PUT to update a chapter by ID (Admin only)
export async function PUT(request: Request, { params }: ChapterRouteParams) {
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
    // First, verify the chapter belongs to the subject
    const existingChapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
        subject_id: subjectId,
      },
    });

    if (!existingChapter) {
      return NextResponse.json(
        { error: "Chapter not found or does not belong to this subject" },
        { status: 404 }
      );
    }

    const rawBody = await request.json();
    const validationResult = updateChapterSchema.safeParse(rawBody);

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

    const dataToUpdate: { title?: string; order?: number } = {};
    if (title !== undefined) dataToUpdate.title = title;
    if (order !== undefined) dataToUpdate.order = order;

    // Zod .refine ensures at least one field is present

    const updatedChapter = await prisma.chapter.update({
      where: {
        id: chapterId,
      },
      data: dataToUpdate,
    });
    return NextResponse.json(updatedChapter);
  } catch (e) {
    console.error(
      `Error updating chapter ${chapterId} for subject ${subjectId}:`,
      e
    );
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return NextResponse.json(
          { error: "Chapter not found" },
          { status: 404 }
        );
      }
    }
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request body.", details: e.flatten().fieldErrors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update chapter" },
      { status: 500 }
    );
  }
}

// DELETE a chapter by ID (Admin only)
export async function DELETE(
  _request: Request, // Prefixed as not directly used
  { params }: ChapterRouteParams
) {
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
    // First, verify the chapter belongs to the subject before deleting
    const chapterToDelete = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
        subject_id: subjectId,
      },
    });

    if (!chapterToDelete) {
      return NextResponse.json(
        { error: "Chapter not found or does not belong to this subject" },
        { status: 404 }
      );
    }

    await prisma.chapter.delete({
      where: {
        id: chapterId,
        // subject_id: subjectId // Not strictly needed if checked above, but good for safety
      },
    });
    return NextResponse.json(null, { status: 204 }); // No content
  } catch (e) {
    console.error(
      `Error deleting chapter ${chapterId} for subject ${subjectId}:`,
      e
    );
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return NextResponse.json(
          { error: "Chapter not found" },
          { status: 404 }
        );
      }
      // P2003: Foreign key constraint failed on the field: `chapter_id` (if topics exist and no cascade delete)
      if (e.code === "P2003") {
        return NextResponse.json(
          {
            error:
              "Cannot delete chapter as it has related topics. Please remove them first.",
          },
          { status: 409 } // Conflict
        );
      }
    }
    return NextResponse.json(
      { error: "Failed to delete chapter" },
      { status: 500 }
    );
  }
}
