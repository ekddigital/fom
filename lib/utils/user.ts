// User utility functions following DRY principles
// Enhanced user name formatting and display logic

export interface UserNameData {
  firstName: string;
  lastName: string;
  username?: string | null;
}

export type DisplayNameFormat = "username" | "full_name" | "first_name";

/**
 * Format user name based on preference following FOM requirements
 * @param user - User data with name fields
 * @param format - Display format preference
 * @returns Formatted display name
 */
export const formatUserName = (
  user: UserNameData,
  format: DisplayNameFormat = "full_name"
): string => {
  switch (format) {
    case "username":
      return user.username || `${user.firstName} ${user.lastName}`;
    case "first_name":
      return user.firstName;
    case "full_name":
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
  const fullName = formatUserName(user, "full_name");
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
  userRole: string,
  requiredRole: "visitor" | "member" | "ministry_leader" | "administrator"
): boolean => {
  const roleHierarchy = {
    visitor: 0,
    member: 1,
    ministry_leader: 2,
    administrator: 3,
  };

  const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] ?? 0;
  const requiredLevel = roleHierarchy[requiredRole];

  return userLevel >= requiredLevel;
};

/**
 * Get role display name for UI
 * @param role - User role
 * @returns Formatted role name
 */
export const getRoleDisplayName = (role: string): string => {
  switch (role) {
    case "visitor":
      return "Visitor";
    case "member":
      return "Member";
    case "ministry_leader":
      return "Ministry Leader";
    case "administrator":
      return "Administrator";
    default:
      return "Unknown Role";
  }
};

/**
 * Check if user can access ministry features
 * @param userRole - Current user role
 * @returns boolean - True if user can access ministry features
 */
export const canAccessMinistryFeatures = (userRole: string): boolean => {
  return hasRolePermission(userRole, "ministry_leader");
};

/**
 * Check if user can access admin features
 * @param userRole - Current user role
 * @returns boolean - True if user can access admin features
 */
export const canAccessAdminFeatures = (userRole: string): boolean => {
  return hasRolePermission(userRole, "administrator");
};
