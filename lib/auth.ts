import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  PrismaClient,
  UserRole,
  DisplayNamePreference,
  ProfileVisibility,
} from "@prisma/client";
import bcrypt from "bcryptjs";
import { formatUserName } from "@/lib/utils/user";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          firstName: profile.given_name || "",
          lastName: profile.family_name || "",
          email: profile.email,
          avatarUrl: profile.picture,
          role: UserRole.MEMBER, // Default role for new users
          displayNamePreference: DisplayNamePreference.FULL_NAME,
          profileVisibility: ProfileVisibility.MEMBERS_ONLY,
          ministryInterests: [],
          certificateSharingEnabled: true,
        };
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            username: true,
            role: true,
            avatarUrl: true,
            displayNamePreference: true,
            profileVisibility: true,
            password: true,
          },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        // Update last active timestamp
        await prisma.user.update({
          where: { id: user.id },
          data: { lastActive: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username || undefined,
          role: user.role,
          avatarUrl: user.avatarUrl,
          displayNamePreference: user.displayNamePreference,
          profileVisibility: user.profileVisibility,
          ministryInterests: [],
          certificateSharingEnabled: true,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours - update session this often
  },
  pages: {
    signIn: "/sign-in",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // If user is signing in for the first time, set initial token data
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.username = user.username;
        token.displayNamePreference = user.displayNamePreference;
      }

      // Always fetch fresh user data from database to ensure latest role/info
      if (token.id) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.id as string },
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              username: true,
              role: true,
              displayNamePreference: true,
              avatarUrl: true,
              profileVisibility: true,
            },
          });

          if (dbUser) {
            // Update token with fresh data from database
            token.role = dbUser.role;
            token.firstName = dbUser.firstName;
            token.lastName = dbUser.lastName;
            token.username = dbUser.username || undefined;
            token.displayNamePreference = dbUser.displayNamePreference;
            token.email = dbUser.email;
            token.picture = dbUser.avatarUrl;
          }
        } catch (error) {
          console.error("Error fetching user data in JWT callback:", error);
        }
      }

      // Update user data on each request for Google OAuth users
      if (account?.provider === "google" && user) {
        await prisma.user.update({
          where: { id: user.id },
          data: { lastActive: new Date() },
        });
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.username = token.username as string | undefined;
        session.user.displayNamePreference =
          token.displayNamePreference as string;
        session.user.displayName = formatUserName(
          {
            firstName: token.firstName as string,
            lastName: token.lastName as string,
            username: token.username as string | undefined,
          },
          token.displayNamePreference as DisplayNamePreference
        );
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Check if user already exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (!existingUser) {
            // Create new user for Google OAuth
            const newUser = await prisma.user.create({
              data: {
                email: user.email!,
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                role: UserRole.MEMBER,
                displayNamePreference: DisplayNamePreference.FULL_NAME,
                profileVisibility: ProfileVisibility.MEMBERS_ONLY,
                avatarUrl: user.image,
                certificateSharingEnabled: true,
                lastActive: new Date(),
                joinedDate: new Date(),
              },
            });

            // Update the user object with the new database ID
            user.id = newUser.id;
          } else {
            // Update existing user's information from Google
            await prisma.user.update({
              where: { id: existingUser.id },
              data: {
                avatarUrl: user.image,
                lastActive: new Date(),
              },
            });

            // Use existing user's ID
            user.id = existingUser.id;
          }
          return true;
        } catch (error) {
          console.error("Error during Google sign-in:", error);
          return false;
        }
      }
      return true;
    },
  },
  debug: process.env.NODE_ENV === "development",
};
