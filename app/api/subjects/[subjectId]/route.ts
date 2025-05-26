// app/api/subjects/[subjectId]/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { checkRole } from "@/lib/auth";
import { Prisma, Role } from "@prisma/client"; // Import Role
import { z } from "zod";

// Define Zod schema for subject update
const updateSubjectSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Subject name cannot be empty." })
      .max(255)
      .optional(),
    description: z
      .string()
      .max(1000, {
        message: "Description cannot exceed 1000 characters.",
      })
      .optional()
      .nullable(), // Allow null
  })
  .refine((data) => Object.keys(data).length > 0, {
    message:
      "At least one field (name or description) must be provided for update.",
  });

// GET a single subject by ID (Admin only)
export async function GET(
  _request: Request, // Prefixed with _ as it's not used
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
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
    });
    if (!subject) {
      return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    }
    return NextResponse.json(subject);
  } catch (error) {
    console.error(`Error fetching subject ${subjectId}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch subject" },
      { status: 500 }
    );
  }
}

// PUT (update) a subject by ID (Admin only)
export async function PUT(
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
    const rawBody = await request.json();
    const validationResult = updateSubjectSchema.safeParse(rawBody);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request body.",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, description } = validationResult.data;

    // Construct dataToUpdate carefully to only include provided fields
    const dataToUpdate: { name?: string; description?: string | null } = {};
    if (name !== undefined) {
      dataToUpdate.name = name;
    }
    if (description !== undefined) {
      dataToUpdate.description = description;
    }

    const updatedSubject = await prisma.subject.update({
      where: { id: subjectId },
      data: dataToUpdate,
    });
    return NextResponse.json(updatedSubject);
  } catch (e) {
    console.error(`Error updating subject ${subjectId}:`, e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return NextResponse.json(
          { error: "Subject not found" },
          { status: 404 }
        );
      }
    }
    // ZodError should be caught by safeParse, but as a fallback
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request body.", details: e.flatten().fieldErrors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update subject" },
      { status: 500 }
    );
  }
}

// DELETE a subject by ID (Admin only)
export async function DELETE(
  _request: Request, // Prefixed with _ as it's not used
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
    await prisma.subject.delete({
      where: { id: subjectId },
    });
    return NextResponse.json(null, { status: 204 });
  } catch (e) {
    console.error(`Error deleting subject ${subjectId}:`, e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return NextResponse.json(
          { error: "Subject not found" },
          { status: 404 }
        );
      }
      if (e.code === "P2003") {
        return NextResponse.json(
          {
            error:
              "Cannot delete subject as it has related data (e.g., chapters, topics). Please remove them first.",
          },
          { status: 409 }
        );
      }
    }
    return NextResponse.json(
      { error: "Failed to delete subject" },
      { status: 500 }
    );
  }
}
