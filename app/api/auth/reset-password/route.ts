import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { emailService } from "@/lib/services/email-service";

const prisma = new PrismaClient();

// Request password reset
export async function POST(request: NextRequest) {
  try {
    const { email, newPassword, token } = await request.json();

    // If it's a password reset request (no token provided)
    if (!token && email) {
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        // Don't reveal that user doesn't exist for security
        return NextResponse.json({
          success: true,
          message:
            "If an account with that email exists, we'll send a password reset link.",
        });
      }

      // Generate reset token
      const resetToken = uuidv4();
      const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      // Store reset token (reuse verification tokens table)
      await prisma.verificationToken.upsert({
        where: {
          identifier_token: {
            identifier: `reset_${email}`,
            token: resetToken,
          },
        },
        update: {
          expires,
        },
        create: {
          identifier: `reset_${email}`,
          token: resetToken,
          expires,
        },
      });

      // Send password reset email
      const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
      const resetUrl = `${baseUrl}/auth/reset-password?token=${resetToken}&email=${encodeURIComponent(
        email
      )}`;

      const emailTemplate = emailService.generatePasswordResetEmail(
        resetUrl,
        user.firstName
      );
      const emailSent = await emailService.sendSimpleEmail(
        email,
        emailTemplate.subject,
        emailTemplate.html,
        emailTemplate.text
      );

      if (!emailSent) {
        return NextResponse.json(
          { success: false, message: "Failed to send password reset email" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message:
          "If an account with that email exists, we'll send a password reset link.",
      });
    }

    // If it's a password reset completion (token and new password provided)
    if (token && newPassword && email) {
      const passwordSchema = z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        );

      const validation = passwordSchema.safeParse(newPassword);
      if (!validation.success) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid password",
            errors: validation.error.errors.map((e) => e.message),
          },
          { status: 400 }
        );
      }

      // Find reset token
      const resetToken = await prisma.verificationToken.findUnique({
        where: {
          identifier_token: {
            identifier: `reset_${email}`,
            token,
          },
        },
      });

      if (!resetToken) {
        return NextResponse.json(
          { success: false, message: "Invalid reset token" },
          { status: 400 }
        );
      }

      // Check if token is expired
      if (resetToken.expires < new Date()) {
        // Delete expired token
        await prisma.verificationToken.delete({
          where: {
            identifier_token: {
              identifier: `reset_${email}`,
              token,
            },
          },
        });

        return NextResponse.json(
          { success: false, message: "Reset token has expired" },
          { status: 400 }
        );
      }

      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return NextResponse.json(
          { success: false, message: "User not found" },
          { status: 404 }
        );
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 12);

      // Update user password
      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
        },
      });

      // Delete used reset token
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: `reset_${email}`,
            token,
          },
        },
      });

      return NextResponse.json({
        success: true,
        message: "Password reset successfully",
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid request" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error in password reset:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
