// app/api/subjects/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { checkRole } from "@/lib/auth";
import { Role } from "@prisma/client";
import { z } from "zod";

// Define Zod schema for subject creation
const createSubjectSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Subject title cannot be empty." })
    .max(255),
  description: z.string().optional(),
});

// GET all subjects (Admin only)
export async function GET(_request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isAdmin = await checkRole(["ADMIN"]);
  if (!isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const subjects = await prisma.subject.findMany({
      orderBy: {
        title: "asc",
      },
    });
    return NextResponse.json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return NextResponse.json(
      { error: "Failed to fetch subjects" },
      { status: 500 }
    );
  }
}

// POST a new subject (Admin only)
export async function POST(request: Request) {
  try {
    const isAdmin = await checkRole(Role.ADMIN);
    if (!isAdmin) {
      return NextResponse.json(
        {
          error:
            "Forbidden: You do not have permission to perform this action.",
        },
        { status: 403 }
      );
    }

    const rawBody = await request.json();
    const validationResult = createSubjectSchema.safeParse(rawBody);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request body.",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { title, description } = validationResult.data;

    const newSubject = await prisma.subject.create({
      data: {
        title,
        description: description || null, // Ensure optional fields are handled
      },
    });

    return NextResponse.json(newSubject, { status: 201 });
  } catch (error) {
    console.error("Error creating subject:", error);
    if (error instanceof z.ZodError) {
      // Should be caught by safeParse, but as a fallback
      return NextResponse.json(
        {
          error: "Invalid request body.",
          details: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error while creating subject." },
      { status: 500 }
    );
  }
}
