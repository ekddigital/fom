// app/api/users/[userId]/details/route.ts
import { NextResponse } from "next/server";
import { auth, clerkClient as getClerkClient } from "@clerk/nextjs/server"; // Renamed import
import { prisma } from "@/lib/prisma";
import { checkRole } from "@/lib/auth";
import { z } from "zod";
import { Role } from "@prisma/client";

// Zod schema for updating user details
const updateUserDetailsSchema = z.object({
  name: z.string().min(1, "Name cannot be empty").max(255).optional(),
  avatar_url: z.string().url("Invalid URL format for avatar").optional(),
});

export async function GET(
  request: Request,
  { params: paramsProp }: { params: { userId: string } } // Rename to avoid conflict
) {
  // Await params if necessary
  const resolvedParams = await Promise.resolve(paramsProp);
  const { userId: authUserId } = await auth(); // ID of the user making the request
  const requestedClerkId = resolvedParams.userId; // ID of the user whose details are being requested

  if (!authUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Users can fetch their own details.
  // Admins can fetch any user's details.
  if (authUserId !== requestedClerkId && !(await checkRole(Role.ADMIN))) {
    return NextResponse.json(
      {
        error:
          "Forbidden. You can only fetch your own details or you must be an admin.",
      },
      { status: 403 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        clerk_id: requestedClerkId,
      },
      select: {
        id: true,
        clerk_id: true,
        email: true,
        name: true,
        avatar_url: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(
      `Failed to fetch user details for ${requestedClerkId}:`,
      error
    );
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal server error", details: errorMessage },
      { status: 500 }
    );
  }
}

// PUT handler to update user details
export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId: authUserId } = await auth(); // Clerk ID of the authenticated user
  const targetClerkId = params.userId; // Clerk ID from the URL, of the user to be updated

  if (!authUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // A user can update their own details.
  // An admin can update any user's details.
  if (authUserId !== targetClerkId && !(await checkRole(Role.ADMIN))) {
    return NextResponse.json(
      {
        error:
          "Forbidden. You can only update your own details or you must be an admin.",
      },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const validationResult = updateUserDetailsSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { name, avatar_url } = validationResult.data;

    // Data to update in Prisma
    const prismaUpdateData: { name?: string; avatar_url?: string } = {};
    if (name) prismaUpdateData.name = name;
    if (avatar_url) prismaUpdateData.avatar_url = avatar_url;

    // Data to update in Clerk (if name or avatar is being changed)
    // Clerk's primary way to update user is via `clerkClient.users.updateUser`
    // It can also update `firstName`, `lastName`, `username`, `publicMetadata`, `privateMetadata` etc.
    // For simplicity, if 'name' is provided, we'll attempt to update firstName in Clerk.
    // Clerk manages its own avatar/profile image system, so `avatar_url` here is for our DB.

    if (Object.keys(prismaUpdateData).length === 0) {
      return NextResponse.json(
        { error: "No valid fields provided for update." },
        { status: 400 }
      );
    }

    // Update Clerk user if name is provided
    // This is a simplified example. You might want to split name into firstName/lastName for Clerk.
    if (name) {
      try {
        const clerk = await getClerkClient(); // Get the Clerk client instance

        // Parse name into firstName and lastName
        const nameParts = name.split(" ");
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(" ");

        await clerk.users.updateUser(targetClerkId, {
          firstName: firstName,
          lastName: lastName || undefined, // Pass undefined if lastName is empty
          // publicMetadata: { ... } // if you store avatar_url or other info here
        });
      } catch (clerkError) {
        console.error(
          `Failed to update user ${targetClerkId} in Clerk:`,
          clerkError
        );
        // Decide if this should be a fatal error or just a warning
        // For now, we'll proceed with Prisma update but log the Clerk error
      }
    }

    // Update user in our database
    const updatedUser = await prisma.user.update({
      where: { clerk_id: targetClerkId },
      data: prismaUpdateData,
      select: {
        // Select the fields to return, matching the GET request
        id: true,
        clerk_id: true,
        email: true,
        name: true,
        avatar_url: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(`Failed to update user details for ${targetClerkId}:`, error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.flatten() },
        { status: 400 }
      );
    }
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal server error", details: errorMessage },
      { status: 500 }
    );
  }
}
