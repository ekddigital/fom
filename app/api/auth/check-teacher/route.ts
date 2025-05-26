// app/api/auth/check-teacher/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { checkRole } from "@/lib/auth";
import { Role } from "@prisma/client";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isTeacher = await checkRole(Role.TEACHER);
  return NextResponse.json({ isTeacher });
}
