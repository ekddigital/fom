import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import { isUsernameAvailable } from "@/lib/utils/user";

const prisma = new PrismaClient();

// Validation schema for profile updates
const profileUpdateSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters")
    .optional(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters")
    .optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .optional()
    .nullable(),
  displayNamePreference: z
    .enum(["username", "full_name", "first_name"])
    .optional(),
  profileVisibility: z.enum(["public", "members_only", "private"]).optional(),
  ministryInterests: z
    .array(z.string())
    .max(10, "Maximum 10 interests allowed")
    .optional(),
  certificateSharingEnabled: z.boolean().optional(),
  avatarUrl: z.string().url().optional().nullable(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        username: true,
        displayNamePreference: true,
        profileVisibility: true,
        role: true,
        avatarUrl: true,
        ministryInterests: true,
        certificateSharingEnabled: true,
        joinedDate: true,
        lastActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        ...user,
        ministryInterests: user.ministryInterests
          ? JSON.parse(user.ministryInterests as string)
          : [],
      },
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate input data
    const validationResult = profileUpdateSchema.safeParse(body);
    if (!validationResult.success) {
      const errors: Record<string, string[]> = {};
      validationResult.error.errors.forEach((error) => {
        const field = error.path.join(".");
        if (!errors[field]) errors[field] = [];
        errors[field].push(error.message);
      });

      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors,
        },
        { status: 400 }
      );
    }

    const updateData = validationResult.data;

    // Check username availability if username is being updated
    if (updateData.username !== undefined) {
      if (updateData.username) {
        const usernameAvailable = await isUsernameAvailable(
          updateData.username,
          session.user.id
        );
        if (!usernameAvailable) {
          return NextResponse.json(
            {
              success: false,
              message: "Username not available",
              errors: { username: ["This username is already taken"] },
            },
            { status: 400 }
          );
        }
      }
    }

    // Prepare update object
    const updateObject: any = {};

    if (updateData.firstName !== undefined)
      updateObject.firstName = updateData.firstName;
    if (updateData.lastName !== undefined)
      updateObject.lastName = updateData.lastName;
    if (updateData.username !== undefined)
      updateObject.username = updateData.username;
    if (updateData.displayNamePreference !== undefined)
      updateObject.displayNamePreference = updateData.displayNamePreference;
    if (updateData.profileVisibility !== undefined)
      updateObject.profileVisibility = updateData.profileVisibility;
    if (updateData.certificateSharingEnabled !== undefined)
      updateObject.certificateSharingEnabled =
        updateData.certificateSharingEnabled;
    if (updateData.avatarUrl !== undefined)
      updateObject.avatarUrl = updateData.avatarUrl;
    if (updateData.ministryInterests !== undefined) {
      updateObject.ministryInterests = JSON.stringify(
        updateData.ministryInterests
      );
    }

    // Always update the lastActive timestamp
    updateObject.lastActive = new Date();

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateObject,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        username: true,
        displayNamePreference: true,
        profileVisibility: true,
        role: true,
        avatarUrl: true,
        ministryInterests: true,
        certificateSharingEnabled: true,
        joinedDate: true,
        lastActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Log profile update event
    await prisma.analyticsEvent.create({
      data: {
        eventType: "profile_updated",
        userId: session.user.id,
        metadata: {
          fieldsUpdated: Object.keys(updateObject),
          timestamp: new Date().toISOString(),
        },
        ipAddress:
          request.headers.get("x-forwarded-for") ||
          request.headers.get("x-real-ip") ||
          request.headers.get("cf-connecting-ip") ||
          "unknown",
        userAgent: request.headers.get("user-agent") || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        ...updatedUser,
        ministryInterests: updatedUser.ministryInterests
          ? JSON.parse(updatedUser.ministryInterests as string)
          : [],
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
