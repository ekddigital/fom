// app/api/auth/check-admin/route.ts
import { NextResponse } from "next/server";
import { checkRole } from "@/lib/auth";

export async function GET() {
  try {
    const isAdmin = await checkRole("ADMIN");
    return NextResponse.json({ isAdmin });
  } catch (error) {
    console.error("Error checking admin status:", error);
    return NextResponse.json({ isAdmin: false }, { status: 500 });
  }
}
