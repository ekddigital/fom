// app/api/users/[userId]/role/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Reverted to alias path, assuming tsconfig should handle this
import { checkRole } from "@/lib/auth"; // Reverted to alias path
import { Role } from "@prisma/client";

interface UpdateRoleRequestBody {
  role: Role;
}

export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
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

    const targetUserId = params.userId; // This is the internal DB ID
    if (!targetUserId) {
      return NextResponse.json(
        { error: "User ID parameter is missing." },
        { status: 400 }
      );
    }

    let newRole: Role;
    try {
      const body: UpdateRoleRequestBody = await request.json();
      newRole = body.role;
    } catch (parsingError: unknown) {
      console.error(
        "Error parsing request body:",
        parsingError instanceof Error
          ? parsingError.message
          : String(parsingError)
      );
      return NextResponse.json(
        {
          error:
            'Invalid request body. Ensure you are sending a JSON object with a "role" property.',
        },
        { status: 400 }
      );
    }

    if (!newRole || !Object.values(Role).includes(newRole)) {
      return NextResponse.json(
        {
          error: `Invalid role specified. Must be one of: ${Object.values(
            Role
          ).join(", ")}`,
        },
        { status: 400 }
      );
    }

    // const targetUser = await prisma.user.findUnique({
    //   where: { clerk_id: targetUserId }, // Old: was expecting clerk_id
    // });

    // if (!targetUser) {
    //   return NextResponse.json(
    //     { error: "Target user not found." },
    //     { status: 404 }
    //   );
    // }

    // Prevent an admin from accidentally changing their own role via this specific endpoint
    // if they are the only admin, or to prevent self-lockout from admin role.
    // This logic can be adjusted based on specific business rules.
    // For now, we'll allow an admin to change their own role if they explicitly target themselves.
    // However, a more robust system might have separate checks or prevent demoting the last admin.

    const updatedUser = await prisma.user.update({
      where: { id: targetUserId }, // Changed to use internal DB ID
      data: { role: newRole },
    });

    return NextResponse.json(
      {
        message: "User role updated successfully.",
        user: {
          id: updatedUser.id,
          clerk_id: updatedUser.clerk_id,
          email: updatedUser.email,
          role: updatedUser.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user role:", error);
    // Consider more specific error logging or handling if needed
    return NextResponse.json(
      { error: "Internal server error while updating role." },
      { status: 500 }
    );
  } finally {
    // Disconnecting the Prisma client might not be necessary in all Next.js API route scenarios
    // as Prisma handles connection pooling. However, it doesn't hurt in serverless contexts.
    // await prisma.$disconnect(); // Commented out for now, can be re-enabled if issues arise.
  }
}
