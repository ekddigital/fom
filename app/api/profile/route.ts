import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Get user profile with related data
    const userProfile = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        avatarUrl: true,
        role: true,
        displayNamePreference: true,
        profileVisibility: true,
        ministryInterests: true,
        certificateSharingEnabled: true,
        joinedDate: true,
        lastActive: true,
        _count: {
          select: {
            prayerRequests: true,
            certificatesReceived: true,
            posts: true,
            eventRegistrations: true,
          },
        },
      },
    });

    if (!userProfile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get recent activity for the profile
    interface ActivityItem {
      id: string;
      type: string;
      title: string;
      date: string;
      icon: string;
    }

    const recentActivities: ActivityItem[] = [];

    // Add recent certificates
    const recentCertificates = await prisma.certificate.findMany({
      where: { issuedTo: userId },
      take: 3,
      orderBy: { issueDate: "desc" },
      select: {
        id: true,
        template: {
          select: {
            name: true,
          },
        },
        issueDate: true,
      },
    });

    recentCertificates.forEach((cert) => {
      recentActivities.push({
        id: `cert-${cert.id}`,
        type: "certificate",
        title: `Completed '${cert.template.name}'`,
        date: getTimeAgo(cert.issueDate),
        icon: "BookOpen",
      });
    });

    // Add recent events registrations
    const recentEventRegistrations = await prisma.eventRegistration.findMany({
      where: { userId: userId },
      take: 2,
      orderBy: { registrationDate: "desc" },
      select: {
        id: true,
        event: {
          select: {
            title: true,
          },
        },
        registrationDate: true,
      },
    });

    recentEventRegistrations.forEach((reg) => {
      recentActivities.push({
        id: `event-${reg.id}`,
        type: "event",
        title: `Registered for ${reg.event.title}`,
        date: getTimeAgo(reg.registrationDate),
        icon: "Calendar",
      });
    });

    // Sort by most recent (activities are already sorted from DB queries)

    // Format ministry interests
    const ministryInterests = Array.isArray(userProfile.ministryInterests)
      ? (userProfile.ministryInterests as string[])
      : [];

    const formattedProfile = {
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      username: userProfile.username,
      email: userProfile.email,
      avatarUrl: userProfile.avatarUrl,
      role: userProfile.role,
      displayNamePreference: userProfile.displayNamePreference,
      profileVisibility: userProfile.profileVisibility,
      ministryInterests: ministryInterests,
      certificateSharingEnabled: userProfile.certificateSharingEnabled,
      joinedDate: userProfile.joinedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      }),
      stats: {
        completedCourses: userProfile._count.certificatesReceived,
        upcomingEvents: userProfile._count.eventRegistrations,
        prayerRequests: userProfile._count.prayerRequests,
        posts: userProfile._count.posts,
      },
      recentActivity: recentActivities.slice(0, 5),
    };

    return NextResponse.json({ profile: formattedProfile });
  } catch (error) {
    console.error("Profile data error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile data" },
      { status: 500 }
    );
  }
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) {
    return "Less than an hour ago";
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else {
      const months = Math.floor(diffInDays / 30);
      return `${months} month${months > 1 ? "s" : ""} ago`;
    }
  }
}
