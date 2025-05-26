// components/layout/TeacherDashboardLink.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function TeacherDashboardLink() {
  const [isTeacher, setIsTeacher] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeacherStatus = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/auth/check-teacher");
        if (!response.ok) {
          throw new Error("Failed to fetch teacher status");
        }
        const data = await response.json();
        setIsTeacher(data.isTeacher);
      } catch (error) {
        console.error("Error checking teacher status:", error);
        setIsTeacher(false); // Default to not teacher on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeacherStatus();
  }, []);

  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (isTeacher) {
    return (
      <Link
        href="/teacher" // Assuming /teacher is the route for the teacher dashboard
        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 ease-in-out"
      >
        Teacher Dashboard
      </Link>
    );
  }

  return null;
}
