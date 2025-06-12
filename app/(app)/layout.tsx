import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { DashboardHeader } from "@/components/ui/layout/dashboard-header";
import { DashboardSidebar } from "@/components/ui/layout/dashboard-sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex pt-20">
        <DashboardSidebar />
        <main className="flex-1 md:ml-64 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
