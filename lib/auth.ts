import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";
import { Role } from "@prisma/client";

export async function getCurrentUser() {
  const authResult = await auth(); // Await the auth() call
  if (!authResult || !authResult.userId) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: { clerk_id: authResult.userId }, // Use authResult.userId
  });
  return user;
}

export async function checkRole(roleOrRoles: Role | Role[]) {
  const user = await getCurrentUser();
  if (!user) {
    return false;
  }

  if (Array.isArray(roleOrRoles)) {
    return roleOrRoles.includes(user.role);
  } else {
    return user.role === roleOrRoles;
  }
}

export async function syncUserWithDb() {
  const authResult = await auth(); // Await the auth() call
  if (!authResult || !authResult.userId) {
    return null;
  }
  const userId = authResult.userId; // Use userId from the awaited result

  const existingUser = await prisma.user.findUnique({
    where: { clerk_id: userId },
  });

  if (userId && !existingUser) {
    const clerkUser = await currentUser();

    if (clerkUser) {
      const email = clerkUser.emailAddresses.find(
        (e) => e.id === clerkUser.primaryEmailAddressId
      )?.emailAddress;
      const name = clerkUser.firstName
        ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim()
        : email;
      const avatar_url = clerkUser.imageUrl;

      if (email) {
        await prisma.user.create({
          data: {
            clerk_id: userId, // userId is now correctly defined
            email: email,
            name: name,
            avatar_url: avatar_url,
            role: Role.STUDENT, // Default role
          },
        });
      } else {
        console.error(
          "Could not sync user: primary email address not found for Clerk user ID:",
          userId
        );
        return null;
      }
      return await prisma.user.findUnique({ where: { clerk_id: userId } }); // userId is correctly defined
    }
  }
  return existingUser;
}
