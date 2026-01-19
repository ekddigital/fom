// Enhanced authentication types for FOM platform
// Following Prisma camelCase naming and NextAuth integration

import { DefaultSession, DefaultUser } from "next-auth";
import {
  UserRole,
  DisplayNamePreference,
  ProfileVisibility,
} from "@prisma/client";

// Extend the built-in NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      firstName: string;
      lastName: string;
      username?: string;
      displayNamePreference: string;
      displayName: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string;
    firstName: string;
    lastName: string;
    username?: string;
    displayNamePreference: string;
    profileVisibility: string;
    ministryInterests?: string[];
    certificateSharingEnabled?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    firstName: string;
    lastName: string;
    username?: string;
    displayNamePreference: string;
  }
}

// Enhanced User interface matching Prisma schema
export interface FOMUser {
  id: string;
  email: string;
  emailVerified?: Date | null;

  // Enhanced name fields
  firstName: string;
  lastName: string;
  username?: string | null;

  // Profile settings
  displayNamePreference: DisplayNamePreference;
  profileVisibility: ProfileVisibility;

  // Authentication & Role
  role: UserRole;
  password?: string | null;

  // Profile data
  avatarUrl?: string | null;
  ministryInterests?: string[];
  certificateSharingEnabled: boolean;

  // Timestamps
  joinedDate: Date;
  lastActive: Date;
  createdAt: Date;
  updatedAt: Date;
}

// User profile update data
export interface UserProfileUpdateData {
  firstName?: string;
  lastName?: string;
  username?: string;
  displayNamePreference?: DisplayNamePreference;
  profileVisibility?: ProfileVisibility;
  ministryInterests?: string[];
  certificateSharingEnabled?: boolean;
  avatarUrl?: string;
}

// User registration data
export interface UserRegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username?: string;
  ministryInterests?: string[];
}

// Authentication state interface
export interface AuthState {
  user: FOMUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: UserRole | null;
}

// Role permissions mapping - UserRole is now imported from Prisma
export interface RolePermissions {
  canViewContent: boolean;
  canCreateContent: boolean;
  canManageEvents: boolean;
  canAccessDashboard: boolean;
  canManageUsers: boolean;
  canIssueCertificates: boolean;
  canAccessAnalytics: boolean;
  canManageSystem: boolean;
}

// Ministry interests options
export const MINISTRY_INTERESTS = [
  "Evangelism",
  "Teaching",
  "Worship",
  "Youth Ministry",
  "Children's Ministry",
  "Missions",
  "Prayer",
  "Counseling",
  "Administration",
  "Media/Technology",
  "Music",
  "Drama/Arts",
  "Community Outreach",
  "Discipleship",
  "Bible Study Leadership",
] as const;

export type MinistryInterest = (typeof MINISTRY_INTERESTS)[number];

// User search and filter types
export interface UserSearchFilters {
  role?: UserRole[];
  ministryInterests?: MinistryInterest[];
  profileVisibility?: ProfileVisibility[];
  searchTerm?: string;
  joinedAfter?: Date;
  joinedBefore?: Date;
}

export interface UserSearchResult {
  id: string;
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  displayName: string;
  joinedDate: Date;
  lastActive: Date;
}

// Authentication API response types
export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: FOMUser;
  errors?: Record<string, string[]>;
}

export interface SignUpResponse extends AuthResponse {
  emailVerificationRequired?: boolean;
}

export interface SignInResponse extends AuthResponse {
  requiresEmailVerification?: boolean;
}

// Password validation interface
export interface PasswordValidation {
  isValid: boolean;
  errors: string[];
  strength: "weak" | "medium" | "strong";
  score: number;
}

// Session context type for providers
export interface SessionContextType {
  user: FOMUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<SignInResponse>;
  signOut: () => Promise<void>;
  signUp: (data: UserRegistrationData) => Promise<SignUpResponse>;
  updateProfile: (data: UserProfileUpdateData) => Promise<AuthResponse>;
  refreshSession: () => Promise<void>;
}
