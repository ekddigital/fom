"use client";

import { useState } from "react";
import { toast } from "sonner";

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  eventsThisMonth: number;
  prayerRequests: number;
  systemHealth: string;
  storageUsed: string;
  userGrowthChange: string;
  activeUsersChange: string;
  eventsChange: string;
  prayerRequestsChange: string;
}

export interface AdminActivity {
  id: string;
  type: string;
  message: string;
  time: string;
  severity: "info" | "success" | "warning" | "error";
  userId?: string;
  userName?: string;
}

export interface AdminQuickStats {
  onlineUsers: number;
  activeSessions: number;
  pendingApprovals: number;
  serverLoad: string;
}

export function useAdminDashboard() {
  const [loading, setLoading] = useState(false);

  const getAdminStats = async (): Promise<AdminStats> => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/stats");
      if (!response.ok) {
        throw new Error("Failed to fetch admin stats");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      toast.error("Failed to load dashboard statistics");
      // Return mock data as fallback
      return {
        totalUsers: 0,
        activeUsers: 0,
        newUsersThisMonth: 0,
        eventsThisMonth: 0,
        prayerRequests: 0,
        systemHealth: "Unknown",
        storageUsed: "0%",
        userGrowthChange: "+0%",
        activeUsersChange: "+0%",
        eventsChange: "+0%",
        prayerRequestsChange: "+0%",
      };
    } finally {
      setLoading(false);
    }
  };

  const getRecentActivity = async (): Promise<AdminActivity[]> => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/activity");
      if (!response.ok) {
        throw new Error("Failed to fetch recent activity");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching recent activity:", error);
      toast.error("Failed to load recent activity");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getQuickStats = async (): Promise<AdminQuickStats> => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/quick-stats");
      if (!response.ok) {
        throw new Error("Failed to fetch quick stats");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching quick stats:", error);
      toast.error("Failed to load quick statistics");
      return {
        onlineUsers: 0,
        activeSessions: 0,
        pendingApprovals: 0,
        serverLoad: "Unknown",
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getAdminStats,
    getRecentActivity,
    getQuickStats,
  };
}
