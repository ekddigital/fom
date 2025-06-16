import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { emailService } from "@/lib/services/email-service";

const prisma = new PrismaClient();

// Send verification email
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { success: false, message: "Email already verified" },
        { status: 400 }
      );
    }

    // Generate verification token
    const token = uuidv4();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Store verification token
    await prisma.verificationToken.upsert({
      where: {
        identifier_token: {
          identifier: email,
          token,
        },
      },
      update: {
        expires,
      },
      create: {
        identifier: email,
        token,
        expires,
      },
    });

    // Send verification email
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const verificationUrl = `${baseUrl}/api/auth/verify-email?token=${token}&email=${encodeURIComponent(
      email
    )}`;

    const emailTemplate = emailService.generateVerificationEmail(
      verificationUrl,
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
        { success: false, message: "Failed to send verification email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Verification email sent successfully",
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Verify email token
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      return NextResponse.redirect(
        new URL("/auth/error?error=invalid_verification_link", request.url)
      );
    }

    // Find verification token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        identifier_token: {
          identifier: email,
          token,
        },
      },
    });

    if (!verificationToken) {
      return NextResponse.redirect(
        new URL("/auth/error?error=invalid_verification_token", request.url)
      );
    }

    // Check if token is expired
    if (verificationToken.expires < new Date()) {
      // Delete expired token
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: email,
            token,
          },
        },
      });

      return NextResponse.redirect(
        new URL("/auth/error?error=verification_token_expired", request.url)
      );
    }

    // Find user and verify email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.redirect(
        new URL("/auth/error?error=user_not_found", request.url)
      );
    }

    // Update user email verification status
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
      },
    });

    // Delete used verification token
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: email,
          token,
        },
      },
    });

    // Send welcome email
    const loginUrl = `${
      process.env.NEXTAUTH_URL || "http://localhost:3000"
    }/sign-in`;
    const welcomeTemplate = emailService.generateWelcomeEmail(
      user.firstName,
      loginUrl
    );
    await emailService.sendSimpleEmail(
      email,
      welcomeTemplate.subject,
      welcomeTemplate.html,
      welcomeTemplate.text
    );

    // Redirect to success page
    return NextResponse.redirect(new URL("/auth/email-verified", request.url));
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.redirect(
      new URL("/auth/error?error=verification_failed", request.url)
    );
  } finally {
    await prisma.$disconnect();
  }
}
