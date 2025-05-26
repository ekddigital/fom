// app/api/teacher/assignments/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";
import { checkRole } from "@/lib/auth"; // Assuming checkRole is in lib/auth.ts
import { prisma } from "@/lib/prisma"; // Assuming prisma client is in lib/prisma.ts

export async function GET(_request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isTeacher = await checkRole(Role.TEACHER);
    if (!isTeacher) {
      return NextResponse.json(
        { error: "Forbidden: User is not a teacher" },
        { status: 403 }
      );
    }

    const assignments = await prisma.assignment.findMany({
      where: {
        teacherId: userId, // userId from Clerk is the clerk_id
      },
      include: {
        subject: true, // Include subject details
      },
      orderBy: {
        createdAt: "desc", // Show newest assignments first
      },
    });

    return NextResponse.json(assignments);
  } catch (error) {
    console.error("[TEACHER_GET_ASSIGNMENTS_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isTeacher = await checkRole(Role.TEACHER);
    if (!isTeacher) {
      return NextResponse.json(
        { error: "Forbidden: User is not a teacher" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, description, dueDate, status, subjectId } = body;

    if (!title || !dueDate || !status || !subjectId) {
      return NextResponse.json(
        { error: "Missing required fields: title, dueDate, status, subjectId" },
        { status: 400 }
      );
    }

    // Validate subjectId exists
    const subjectExists = await prisma.subject.findUnique({
      where: { id: subjectId },
    });
    if (!subjectExists) {
      return NextResponse.json(
        { error: "Invalid subjectId: Subject not found" },
        { status: 400 }
      );
    }

    // Validate status enum
    const validStatuses = ["DRAFT", "PUBLISHED", "GRADING", "COMPLETED"];
    if (!validStatuses.includes(status.toUpperCase())) {
      return NextResponse.json(
        {
          error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const newAssignment = await prisma.assignment.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate), // Ensure dueDate is a Date object
        status: status.toUpperCase(), // Ensure status is uppercase to match enum
        subjectId,
        teacherId: userId, // Associate with the logged-in teacher
      },
    });

    return NextResponse.json(newAssignment, { status: 201 });
  } catch (error) {
    console.error("[TEACHER_POST_ASSIGNMENT_ERROR]", error);
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
