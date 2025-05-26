// app/api/users/subjects/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { checkRole } from "@/lib/auth";

export async function GET(_request: Request) {
  const { userId } = await auth(); // Added await

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isTeacher = await checkRole(["TEACHER"]);
  const isAdmin = await checkRole(["ADMIN"]);

  if (!isTeacher && !isAdmin) {
    return NextResponse.json(
      { error: "Forbidden. User is not a Teacher or Admin." },
      { status: 403 }
    );
  }

  try {
    const subjects = await prisma.subject.findMany({
      include: {
        chapters: {
          orderBy: { title: "asc" },
          include: {
            topics: {
              select: { id: true },
            },
          },
        },
      },
      orderBy: {
        title: "asc",
      },
    });

    const result = subjects.map((subject) => {
      let totalTopics = 0;
      subject.chapters.forEach((chapter) => {
        totalTopics += chapter.topics.length;
      });
      return {
        id: subject.id,
        title: subject.title,
        description: subject.description,
        totalTopics: totalTopics,
        // completedTopics: 0, // This field is not relevant for the teacher's general subject overview
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch subjects for teacher/admin:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal server error", details: errorMessage },
      { status: 500 }
    );
  }
}
