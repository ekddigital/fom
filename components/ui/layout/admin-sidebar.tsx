"use client";

import { Button } from "@/components/ui/button";
import {
  Shield,
  Users,
  BarChart3,
  Settings,
  FileText,
  Calendar,
  MessageSquare,
  Globe,
  ChevronLeft,
  ChevronRight,
  UserCog,
  Database,
  Mail,
  Bell,
  Lock,
  Activity,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface AdminSidebarProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onToggleCollapse?: (collapsed: boolean) => void;
}

const adminMenuItems = [
  {
    section: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: Shield,
        description: "Admin overview and stats",
      },
      {
        label: "Analytics",
        href: "/admin/analytics",
        icon: BarChart3,
        description: "Platform analytics",
      },
    ],
  },
  {
    section: "User Management",
    items: [
      {
        label: "Users",
        href: "/admin/users",
        icon: Users,
        description: "Manage all users",
      },
      {
        label: "Roles & Permissions",
        href: "/admin/roles",
        icon: UserCog,
        description: "User roles and access",
      },
    ],
  },
  {
    section: "Content Management",
    items: [
      {
        label: "Content",
        href: "/admin/content",
        icon: FileText,
        description: "Manage all content",
      },
      {
        label: "Events",
        href: "/admin/events",
        icon: Calendar,
        description: "Platform events",
      },
      {
        label: "Certificates",
        href: "/admin/certificates",
        icon: Award,
        description: "Certificate templates and issuance",
      },
      {
        label: "Messages",
        href: "/admin/messages",
        icon: MessageSquare,
        description: "Platform messages",
      },
    ],
  },
  {
    section: "System",
    items: [
      {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
        description: "Platform settings",
      },
      {
        label: "Database",
        href: "/admin/database",
        icon: Database,
        description: "Database management",
      },
      {
        label: "Email",
        href: "/admin/email",
        icon: Mail,
        description: "Email configuration",
      },
      {
        label: "Security",
        href: "/admin/security",
        icon: Lock,
        description: "Security settings",
      },
      {
        label: "Activity Logs",
        href: "/admin/logs",
        icon: Activity,
        description: "System activity logs",
      },
    ],
  },
  {
    section: "Quick Actions",
    items: [
      {
        label: "Notifications",
        href: "/admin/notifications",
        icon: Bell,
        description: "Send notifications",
      },
      {
        label: "Back to Site",
        href: "/",
        icon: Globe,
        description: "Return to main site",
      },
    ],
  },
];

export function AdminSidebar({
  className = "",
  isOpen = true,
  onClose,
  onToggleCollapse,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    onToggleCollapse?.(newCollapsed);
  };

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-white border-r border-red-200 transition-all duration-300 flex flex-col",
          collapsed ? "w-16" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          className
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-red-200 flex-shrink-0">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-red-700" />
              <h2 className="text-lg font-semibold text-red-950">
                Admin Panel
              </h2>
            </div>
          )}

          {/* Collapse toggle - only on desktop */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex text-red-700 hover:bg-red-100"
            onClick={handleToggleCollapse}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
          {adminMenuItems.map((section) => (
            <div key={section.section} className="space-y-2">
              {!collapsed && (
                <h3 className="text-xs font-semibold text-red-600 uppercase tracking-wider px-1">
                  {section.section}
                </h3>
              )}

              <div className="space-y-1">
                {section.items.map((item) => {
                  const IconComponent = item.icon;
                  const active = isActive(item.href);

                  return (
                    <Button
                      key={item.href}
                      variant={active ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start text-left h-auto py-2.5",
                        collapsed ? "px-3" : "px-3",
                        active
                          ? "bg-red-100 text-red-900 hover:bg-red-200"
                          : "text-gray-700 hover:bg-red-50 hover:text-red-900"
                      )}
                      asChild
                    >
                      <a href={item.href} onClick={onClose}>
                        <div
                          className={cn(
                            "flex items-center w-full",
                            collapsed ? "justify-center" : "space-x-3"
                          )}
                        >
                          <IconComponent
                            className={cn(
                              "w-5 h-5 flex-shrink-0",
                              active ? "text-red-700" : "text-gray-500"
                            )}
                          />
                          {!collapsed && (
                            <div className="flex-1 min-w-0 overflow-hidden">
                              <div className="font-medium text-sm truncate">
                                {item.label}
                              </div>
                              <div className="text-xs text-gray-500 truncate leading-tight">
                                {item.description}
                              </div>
                            </div>
                          )}
                        </div>
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-red-200 p-4 flex-shrink-0">
          {!collapsed && (
            <div className="text-xs text-gray-500 text-center">
              Admin Panel v1.0
              <br />
              Fishers of Men
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
