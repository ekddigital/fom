import { NextRequest, NextResponse } from "next/server";
import {
  PrismaClient,
  UserRole,
  DisplayNamePreference,
  ProfileVisibility,
} from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { isUsernameAvailable } from "@/lib/utils/user";
import { emailService } from "@/lib/services/email-service";

const prisma = new PrismaClient();

// Validation schema for user registration
const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .optional(),
  ministryInterests: z
    .array(z.string())
    .max(10, "Maximum 10 interests allowed")
    .optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input data
    const validationResult = registerSchema.safeParse(body);
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

    const {
      email,
      password,
      firstName,
      lastName,
      username,
      ministryInterests,
    } = validationResult.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
          errors: { email: ["An account with this email already exists"] },
        },
        { status: 400 }
      );
    }

    // Check username availability if provided
    if (username) {
      const usernameAvailable = await isUsernameAvailable(username);
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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate verification token first
    const verificationToken = uuidv4();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Prepare email template before database operations
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const verificationUrl = `${baseUrl}/api/auth/verify-email?token=${verificationToken}&email=${encodeURIComponent(
      email
    )}`;

    const emailTemplate = emailService.generateVerificationEmail(
      verificationUrl,
      firstName
    );

    // Test email sending first (without creating user)
    const emailSent = await emailService.sendSimpleEmail(
      email,
      emailTemplate.subject,
      emailTemplate.html,
      emailTemplate.text
    );

    if (!emailSent) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Failed to send verification email. Please check your email address and try again.",
          errors: {
            email: ["Unable to send verification email to this address"],
          },
        },
        { status: 400 }
      );
    }

    // Only create user if email was sent successfully
    const newUser = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          username: username || null,
          ministryInterests:
            ministryInterests && ministryInterests.length > 0
              ? JSON.stringify(ministryInterests)
              : undefined,
          role: UserRole.MEMBER, // Default role
          displayNamePreference: DisplayNamePreference.FULL_NAME,
          profileVisibility: ProfileVisibility.MEMBERS_ONLY,
          certificateSharingEnabled: true,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          username: true,
          role: true,
          displayNamePreference: true,
          profileVisibility: true,
          ministryInterests: true,
          certificateSharingEnabled: true,
          joinedDate: true,
          createdAt: true,
        },
      });

      // Store verification token
      await tx.verificationToken.create({
        data: {
          identifier: email,
          token: verificationToken,
          expires,
        },
      });

      // Log registration event
      await tx.analyticsEvent.create({
        data: {
          eventType: "user_registered",
          userId: user.id,
          metadata: {
            registrationMethod: "email",
            hasUsername: !!username,
            ministryInterestsCount: ministryInterests?.length || 0,
          },
          ipAddress:
            request.headers.get("x-forwarded-for") ||
            request.headers.get("x-real-ip") ||
            request.headers.get("cf-connecting-ip") ||
            "unknown",
          userAgent: request.headers.get("user-agent") || null,
        },
      });

      return user;
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Account created successfully! Please check your email to verify your account before signing in.",
        user: {
          ...newUser,
          ministryInterests: newUser.ministryInterests
            ? JSON.parse(newUser.ministryInterests as string)
            : [],
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
