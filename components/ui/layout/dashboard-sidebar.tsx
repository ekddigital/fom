"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/hooks/use-auth";
import {
  Home,
  BookOpen,
  Calendar,
  MessageCircle,
  Users,
  Heart,
  Award,
  Settings,
  Shield,
  BarChart3,
} from "lucide-react";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, canManageContent, canAccessAdmin } = useAuth();

  const navigation = [
    {
      name: "Dashboard",
      href: "/dash",
      icon: Home,
      current: pathname === "/dash",
    },
    {
      name: "Prayer Requests",
      href: "/dash/prayer",
      icon: MessageCircle,
      current: pathname === "/dash/prayer",
    },
    {
      name: "Sermons",
      href: "/dash/sermons",
      icon: BookOpen,
      current: pathname === "/dash/sermons",
    },
    {
      name: "Events",
      href: "/dash/events",
      icon: Calendar,
      current: pathname === "/dash/events",
    },
    {
      name: "Community",
      href: "/dash/community",
      icon: Users,
      current: pathname === "/dash/community",
    },
    {
      name: "My Certificates",
      href: "/dash/certificates",
      icon: Award,
      current: pathname === "/dash/certificates",
    },
  ];

  const ministryNavigation = canManageContent()
    ? [
        {
          name: "Content Management",
          href: "/mgmt/content",
          icon: BookOpen,
          current: pathname.startsWith("/mgmt/content"),
        },
        {
          name: "Event Management",
          href: "/mgmt/events",
          icon: Calendar,
          current: pathname.startsWith("/mgmt/events"),
        },
        {
          name: "Certificate Management",
          href: "/mgmt/certificates",
          icon: Award,
          current: pathname.startsWith("/mgmt/certificates"),
        },
      ]
    : [];

  const adminNavigation = canAccessAdmin()
    ? [
        {
          name: "Admin Dashboard",
          href: "/admin",
          icon: Shield,
          current: pathname === "/admin",
        },
        {
          name: "User Management",
          href: "/admin/users",
          icon: Users,
          current: pathname.startsWith("/admin/users"),
        },
        {
          name: "Analytics",
          href: "/admin/analytics",
          icon: BarChart3,
          current: pathname.startsWith("/admin/analytics"),
        },
      ]
    : [];

  const bottomNavigation = [
    {
      name: "Settings",
      href: "/dash/settings",
      icon: Settings,
      current: pathname === "/dash/settings",
    },
  ];

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:pt-20 z-30">
      <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
        <div className="flex-grow flex flex-col">
          <nav className="flex-1 px-2 space-y-1">
            {/* Main Navigation */}
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    item.current
                      ? "bg-fom-primary text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className={cn(
                      item.current
                        ? "text-white"
                        : "text-gray-400 group-hover:text-gray-500",
                      "mr-3 flex-shrink-0 h-5 w-5"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Ministry Navigation */}
            {ministryNavigation.length > 0 && (
              <>
                <div className="pt-6">
                  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Ministry
                  </h3>
                  <div className="mt-1 space-y-1">
                    {ministryNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          item.current
                            ? "bg-fom-primary text-white"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={cn(
                            item.current
                              ? "text-white"
                              : "text-gray-400 group-hover:text-gray-500",
                            "mr-3 flex-shrink-0 h-5 w-5"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Admin Navigation */}
            {adminNavigation.length > 0 && (
              <>
                <div className="pt-6">
                  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Administration
                  </h3>
                  <div className="mt-1 space-y-1">
                    {adminNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          item.current
                            ? "bg-fom-primary text-white"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={cn(
                            item.current
                              ? "text-white"
                              : "text-gray-400 group-hover:text-gray-500",
                            "mr-3 flex-shrink-0 h-5 w-5"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </nav>
        </div>

        {/* Bottom Navigation */}
        <div className="flex-shrink-0 px-2">
          {bottomNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                item.current
                  ? "bg-fom-primary text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              )}
            >
              <item.icon
                className={cn(
                  item.current
                    ? "text-white"
                    : "text-gray-400 group-hover:text-gray-500",
                  "mr-3 flex-shrink-0 h-5 w-5"
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
