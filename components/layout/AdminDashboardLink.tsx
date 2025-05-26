// components/layout/AdminDashboardLink.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboardLink() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      setIsLoading(true); // Set loading to true at the start of the fetch
      try {
        const response = await fetch("/api/auth/check-admin");
        if (!response.ok) {
          throw new Error("Failed to fetch admin status");
        }
        const data = await response.json();
        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false); // Default to not admin on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminStatus();
  }, []);

  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (isAdmin) {
    return (
      <Link
        href="/admin"
        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 ease-in-out"
      >
        Admin Dashboard
      </Link>
    );
  }

  return null;
}
