// User utility functions following DRY principles
// Enhanced user name formatting and display logic

import { UserRole, DisplayNamePreference } from "@prisma/client";

export interface UserNameData {
  firstName: string;
  lastName: string;
  username?: string | null;
}

/**
 * Format user name based on preference following FOM requirements
 * @param user - User data with name fields
 * @param format - Display format preference
 * @returns Formatted display name
 */
export const formatUserName = (
  user: UserNameData,
  format: DisplayNamePreference = "FULL_NAME"
): string => {
  switch (format) {
    case "USERNAME":
      return user.username || `${user.firstName} ${user.lastName}`;
    case "FIRST_NAME":
      return user.firstName;
    case "FULL_NAME":
    default:
      return `${user.firstName} ${user.lastName}`;
  }
};

/**
 * Get user initials for avatar fallback
 * @param user - User data with name fields
 * @returns User initials (e.g., "JD")
 */
export const getUserInitials = (user: UserNameData): string => {
  const firstInitial = user.firstName?.charAt(0)?.toUpperCase() || "";
  const lastInitial = user.lastName?.charAt(0)?.toUpperCase() || "";
  return `${firstInitial}${lastInitial}`;
};

/**
 * Format user name with username context for mentions and search
 * @param user - User data with name fields
 * @returns Full name with username context (e.g., "John Doe (@johndoe)")
 */
export const formatUserNameWithUsername = (user: UserNameData): string => {
  const fullName = formatUserName(user, "FULL_NAME");
  const usernameContext = user.username ? ` (@${user.username})` : "";
  return `${fullName}${usernameContext}`;
};

/**
 * Check if username is available (excluding current user)
 * @param username - Username to check
 * @param excludeUserId - User ID to exclude from check (for updates)
 * @returns Promise<boolean> - True if available
 */
export const isUsernameAvailable = async (
  username: string,
  excludeUserId?: string
): Promise<boolean> => {
  try {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    const existingUser = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    // Username is available if no user found, or if found user is the excluded user
    return !existingUser || existingUser.id === excludeUserId;
  } catch (error) {
    console.error("Error checking username availability:", error);
    return false;
  }
};

/**
 * Generate username suggestions based on first name and last name
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @returns Array of username suggestions
 */
export const generateUsernameSuggestions = (
  firstName: string,
  lastName: string
): string[] => {
  const cleanFirst = firstName.toLowerCase().replace(/[^a-z0-9]/g, "");
  const cleanLast = lastName.toLowerCase().replace(/[^a-z0-9]/g, "");

  return [
    `${cleanFirst}${cleanLast}`,
    `${cleanFirst}_${cleanLast}`,
    `${cleanFirst}.${cleanLast}`,
    `${cleanFirst}${cleanLast.charAt(0)}`,
    `${cleanFirst.charAt(0)}${cleanLast}`,
    `${cleanFirst}${cleanLast}${Math.floor(Math.random() * 100)}`,
  ].filter((suggestion) => suggestion.length >= 3 && suggestion.length <= 30);
};

/**
 * Validate user role permissions
 * @param userRole - Current user role
 * @param requiredRole - Required minimum role
 * @returns boolean - True if user has sufficient permissions
 */
export const hasRolePermission = (
  userRole: UserRole,
  requiredRole: UserRole
): boolean => {
  const roleHierarchy = {
    [UserRole.VISITOR]: 0,
    [UserRole.MEMBER]: 1,
    [UserRole.MINISTRY_LEADER]: 2,
    [UserRole.ADMIN]: 3,
    [UserRole.SUPER_ADMIN]: 4,
  };

  const userLevel = roleHierarchy[userRole] ?? 0;
  const requiredLevel = roleHierarchy[requiredRole];

  return userLevel >= requiredLevel;
};

/**
 * Get role display name for UI
 * @param role - User role
 * @returns Formatted role name
 */
export const getRoleDisplayName = (role: UserRole): string => {
  switch (role) {
    case UserRole.VISITOR:
      return "Visitor";
    case UserRole.MEMBER:
      return "Member";
    case UserRole.MINISTRY_LEADER:
      return "Ministry Leader";
    case UserRole.ADMIN:
      return "Administrator";
    case UserRole.SUPER_ADMIN:
      return "Super Administrator";
    default:
      return "Unknown Role";
  }
};

/**
 * Check if user can access ministry features
 * @param userRole - Current user role
 * @returns boolean - True if user can access ministry features
 */
export const canAccessMinistryFeatures = (userRole: UserRole): boolean => {
  return hasRolePermission(userRole, UserRole.MINISTRY_LEADER);
};

/**
 * Check if user can access admin features
 * @param userRole - Current user role
 * @returns boolean - True if user can access admin features
 */
export const canAccessAdminFeatures = (userRole: UserRole): boolean => {
  return hasRolePermission(userRole, UserRole.ADMIN);
};
