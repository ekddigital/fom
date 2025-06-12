// Enhanced authentication hook for Fishers of Men platform
// Real NextAuth integration with role-based access control

"use client";

import {
  useSession,
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FOMUser,
  UserRegistrationData,
  SignInResponse,
  SignUpResponse,
  AuthResponse,
  UserProfileUpdateData,
} from "@/lib/types/auth";
import { formatUserName } from "@/lib/utils/user";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = status === "authenticated" && !!session?.user;
  const loading = status === "loading" || isLoading;

  // Convert NextAuth session to FOM user format
  const user: FOMUser | null = session?.user
    ? {
        id: session.user.id,
        email: session.user.email!,
        emailVerified: null, // Would be populated from database if needed
        firstName: session.user.firstName,
        lastName: session.user.lastName,
        username: session.user.username || null,
        displayNamePreference: session.user.displayNamePreference as any,
        profileVisibility: "members_only", // Default, would be loaded from database
        role: session.user.role as any,
        password: null,
        avatarUrl: session.user.image || null,
        ministryInterests: [], // Would be loaded from database
        certificateSharingEnabled: true, // Default
        joinedDate: new Date(), // Would be actual date from database
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    : null;

  const signIn = async (
    email: string,
    password: string
  ): Promise<SignInResponse> => {
    setIsLoading(true);
    try {
      const result = await nextAuthSignIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        return {
          success: false,
          message: "Invalid email or password",
          errors: { credentials: ["Invalid email or password"] },
        };
      }

      if (result?.ok) {
        router.push("/dash");
        return {
          success: true,
          message: "Successfully signed in",
        };
      }

      return {
        success: false,
        message: "Sign in failed",
      };
    } catch (error) {
      console.error("Sign in error:", error);
      return {
        success: false,
        message: "An unexpected error occurred",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async (): Promise<SignInResponse> => {
    setIsLoading(true);
    try {
      const result = await nextAuthSignIn("google", {
        redirect: false,
        callbackUrl: "/dash",
      });

      if (result?.error) {
        return {
          success: false,
          message: "Google sign-in failed",
        };
      }

      return {
        success: true,
        message: "Successfully signed in with Google",
      };
    } catch (error) {
      console.error("Google sign in error:", error);
      return {
        success: false,
        message: "Google sign-in failed",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await nextAuthSignOut({ redirect: false });
      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (
    userData: UserRegistrationData
  ): Promise<SignUpResponse> => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Registration failed",
          errors: data.errors,
        };
      }

      // Automatically sign in after successful registration
      const signInResult = await signIn(userData.email, userData.password);

      return {
        success: true,
        message: "Account created successfully",
        user: data.user,
      };
    } catch (error) {
      console.error("Sign up error:", error);
      return {
        success: false,
        message: "An unexpected error occurred during registration",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (
    profileData: UserProfileUpdateData
  ): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Profile update failed",
          errors: data.errors,
        };
      }

      return {
        success: true,
        message: "Profile updated successfully",
        user: data.user,
      };
    } catch (error) {
      console.error("Profile update error:", error);
      return {
        success: false,
        message: "An unexpected error occurred",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const checkUsernameAvailability = async (
    username: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        `/api/users/check-username?username=${encodeURIComponent(username)}`
      );
      const data = await response.json();
      return data.available;
    } catch (error) {
      console.error("Username check error:", error);
      return false;
    }
  };

  // Role-based permission checks
  const hasRole = (role: string): boolean => {
    return user?.role === role;
  };

  const hasMinimumRole = (minimumRole: string): boolean => {
    const roleHierarchy = {
      visitor: 0,
      member: 1,
      ministry_leader: 2,
      administrator: 3,
    };

    const userLevel =
      roleHierarchy[user?.role as keyof typeof roleHierarchy] ?? 0;
    const requiredLevel =
      roleHierarchy[minimumRole as keyof typeof roleHierarchy] ?? 0;

    return userLevel >= requiredLevel;
  };

  const canAccessDashboard = (): boolean => {
    return hasMinimumRole("member");
  };

  const canManageContent = (): boolean => {
    return hasMinimumRole("ministry_leader");
  };

  const canAccessAdmin = (): boolean => {
    return hasRole("administrator");
  };

  const getDisplayName = (): string => {
    if (!user) return "";
    return formatUserName(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      },
      user.displayNamePreference
    );
  };

  const getUserInitials = (): string => {
    if (!user) return "";
    return `${user.firstName.charAt(0)}${user.lastName.charAt(
      0
    )}`.toUpperCase();
  };

  return {
    // User data
    user,
    isAuthenticated,
    isLoading: loading,

    // Authentication methods
    signIn,
    signInWithGoogle,
    signOut,
    signUp,

    // Profile management
    updateProfile,
    checkUsernameAvailability,

    // Role-based access
    hasRole,
    hasMinimumRole,
    canAccessDashboard,
    canManageContent,
    canAccessAdmin,

    // User utilities
    getDisplayName,
    getUserInitials,

    // Convenience properties
    role: user?.role || null,
    displayName: getDisplayName(),
    initials: getUserInitials(),
  };
}
