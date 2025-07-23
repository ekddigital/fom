import { useState, useCallback } from "react";
import { UserRole } from "@prisma/client";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string | null;
  role: UserRole;
  avatarUrl: string | null;
  joinedDate: Date;
  lastActive: Date;
  emailVerified: Date | null;
  ministryInterests: unknown;
  certificateSharingEnabled: boolean;
  displayNamePreference: string;
  profileVisibility: string;
  _count: {
    certificatesReceived: number;
    posts: number;
    prayerRequests: number;
  };
}

export interface UserStats {
  total: number;
  active: number;
  pending: number;
  inactive: number;
  byRole: Record<string, number>;
}

export interface UsersResponse {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  stats: UserStats;
}

export function useUsers() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUsers = useCallback(
    async (params?: {
      page?: number;
      limit?: number;
      search?: string;
      role?: string;
      status?: string;
    }) => {
      setLoading(true);
      setError(null);

      try {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.append("page", params.page.toString());
        if (params?.limit)
          searchParams.append("limit", params.limit.toString());
        if (params?.search) searchParams.append("search", params.search);
        if (params?.role) searchParams.append("role", params.role);
        if (params?.status) searchParams.append("status", params.status);

        const query = searchParams.toString()
          ? `?${searchParams.toString()}`
          : "";

        const response = await fetch(`/api/admin/users${query}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch users");
        }

        const data: UsersResponse = await response.json();
        return data;
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateUser = useCallback(
    async (
      id: string,
      updates: { role?: UserRole; [key: string]: unknown }
    ) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/admin/users/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updates),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to update user");
        }

        const data = await response.json();
        return data.user;
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteUser = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete user");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getUsers,
    updateUser,
    deleteUser,
  };
}
