// app/api/subjects/[subjectId]/chapters/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { checkRole } from "@/lib/auth";
import { Role } from "@prisma/client"; // Import Role, Prisma removed
import { z } from "zod";

// Zod schema for creating a chapter
const createChapterSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Chapter title cannot be empty." })
    .max(255),
  order: z
    .number()
    .int()
    .positive({ message: "Order must be a positive integer." }),
});

// GET all chapters for a subject (Admin only)
export async function GET(
  request: Request,
  { params }: { params: { subjectId: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const isAdmin = await checkRole(Role.ADMIN); // Use Role enum
  if (!isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { subjectId } = params;

  try {
    const chapters = await prisma.chapter.findMany({
      where: { subject_id: subjectId },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(chapters);
  } catch (error) {
    console.error(`Error fetching chapters for subject ${subjectId}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch chapters" },
      { status: 500 }
    );
  }
}

// POST a new chapter to a subject (Admin only)
export async function POST(
  request: Request,
  { params }: { params: { subjectId: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const isAdmin = await checkRole(Role.ADMIN);
  if (!isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { subjectId } = params;

  try {
    const rawBody = await request.json();
    const validationResult = createChapterSchema.safeParse(rawBody);

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

    // Check if subject exists
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
    });
    if (!subject) {
      return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    }

    const newChapter = await prisma.chapter.create({
      data: {
        title,
        order,
        subject_id: subjectId,
      },
    });
    return NextResponse.json(newChapter, { status: 201 });
  } catch (error) {
    console.error(`Error creating chapter for subject ${subjectId}:`, error);
    if (error instanceof z.ZodError) {
      // Should be caught by safeParse
      return NextResponse.json(
        {
          error: "Invalid request body.",
          details: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }
    // Handle other potential errors, e.g., Prisma errors
    return NextResponse.json(
      { error: "Failed to create chapter" },
      { status: 500 }
    );
  }
}
