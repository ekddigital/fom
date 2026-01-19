import { useState, useCallback } from "react";

export interface PrayerFastingSession {
  id: string;
  title: string;
  description: string;
  content: string;
  excerpt: string;
  youtubeVideoId: string;
  speaker: string;
  date: string;
  duration: string;
  status: "current" | "upcoming" | "archived";
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export const usePrayerFasting = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentSession =
    useCallback(async (): Promise<PrayerFastingSession | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/prayer-fasting/current");
        if (!response.ok) {
          throw new Error("Failed to fetch current session");
        }
        const data = await response.json();
        return data.session || null;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        return null;
      } finally {
        setLoading(false);
      }
    }, []);

  const getUpcomingSessions = useCallback(async (): Promise<
    PrayerFastingSession[]
  > => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/prayer-fasting/upcoming");
      if (!response.ok) {
        throw new Error("Failed to fetch upcoming sessions");
      }
      const data = await response.json();
      return data.sessions || [];
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getArchiveSessions = useCallback(
    async (limit: number = 10): Promise<PrayerFastingSession[]> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/prayer-fasting/archive?limit=${limit}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch archive sessions");
        }
        const data = await response.json();
        return data.sessions || [];
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        return [];
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getSessionById = useCallback(
    async (id: string): Promise<PrayerFastingSession | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/prayer-fasting/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch session");
        }
        const data = await response.json();
        return data.session || null;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    error,
    getCurrentSession,
    getUpcomingSessions,
    getArchiveSessions,
    getSessionById,
  };
};
