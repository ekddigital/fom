"use client";

import { AdminHeader } from "@/components/ui/layout/admin-header";
import { AdminSidebar } from "@/components/ui/layout/admin-sidebar";
import { useAuth } from "@/lib/hooks/use-auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Check authentication and admin role
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/sign-in?redirect=/admin");
      return;
    }

    if (
      !isLoading &&
      user &&
      user.role !== "ADMIN" &&
      user.role !== "SUPER_ADMIN"
    ) {
      router.push("/dash");
      return;
    }
  }, [isAuthenticated, user, isLoading, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <Shield className="w-8 h-8 text-red-700 animate-spin mx-auto mb-4" />
          <p className="text-red-700">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Show unauthorized state
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <Alert className="max-w-md border-red-200">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            Please sign in to access the admin panel.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Show insufficient permissions state
  if (user && user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <Alert className="max-w-md border-red-200">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            You don&apos;t have permission to access the admin panel.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={(collapsed: boolean) =>
          setSidebarCollapsed(collapsed)
        }
      />

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        }`}
      >
        {/* Admin Header */}
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
