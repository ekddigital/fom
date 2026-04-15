import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getServerSession, authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const REPORT_TYPE = "CONFERENCE_DOC_SYSTEM";

function isAdminRole(role?: string | null): boolean {
  return role === "ADMIN" || role === "SUPER_ADMIN";
}

function isDatabaseUnavailable(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return error.message.includes("Can't reach database server");
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || !isAdminRole(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const latestDocument = await prisma.report.findFirst({
      where: { reportType: REPORT_TYPE },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        parameters: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      data: latestDocument?.parameters ?? null,
      reportId: latestDocument?.id ?? null,
      savedAt: latestDocument?.createdAt ?? null,
    });
  } catch (error) {
    console.error("Error loading conference document data:", error);

    if (isDatabaseUnavailable(error)) {
      return NextResponse.json(
        {
          error: "Database unavailable",
          code: "DB_UNAVAILABLE",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        error: "Failed to load conference document data",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || !isAdminRole(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!session.user.id) {
      return NextResponse.json(
        { error: "Session user ID is missing" },
        { status: 400 },
      );
    }

    const body = await request.json();
    const payload = body?.data;

    if (!payload || typeof payload !== "object") {
      return NextResponse.json(
        { error: "Invalid payload: data object is required" },
        { status: 400 },
      );
    }

    const existing = await prisma.report.findFirst({
      where: { reportType: REPORT_TYPE },
      orderBy: { createdAt: "desc" },
      select: { id: true },
    });

    const reportData = {
      reportType: REPORT_TYPE,
      parameters: payload as Prisma.InputJsonValue,
      status: "completed",
      generatedBy: session.user.id,
    };

    if (existing) {
      const updated = await prisma.report.update({
        where: { id: existing.id },
        data: reportData,
        select: { id: true },
      });

      return NextResponse.json({
        success: true,
        reportId: updated.id,
        savedAt: new Date().toISOString(),
      });
    }

    const created = await prisma.report.create({
      data: reportData,
      select: { id: true, createdAt: true },
    });

    return NextResponse.json({
      success: true,
      reportId: created.id,
      savedAt: created.createdAt,
    });
  } catch (error) {
    console.error("Error saving conference document data:", error);

    if (isDatabaseUnavailable(error)) {
      return NextResponse.json(
        {
          error: "Database unavailable",
          code: "DB_UNAVAILABLE",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { error: "Failed to save conference document data" },
      { status: 500 },
    );
  }
}
