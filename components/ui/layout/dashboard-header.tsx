"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FomLogo } from "@/components/ui/branding/fom-logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Bell,
  Settings,
  LogOut,
  User,
  Menu,
  Home,
  BookOpen,
  Calendar,
  MessageCircle,
  Users,
  Award,
  Shield,
  BarChart3,
} from "lucide-react";

// Mobile Sidebar Component
function MobileSidebar({ onClose }: { onClose: () => void }) {
  const { canManageContent, canAccessAdmin } = useAuth();
  const pathname = usePathname();

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
      name: "My Journey",
      href: "/dash/journey",
      icon: Award,
      current: pathname === "/dash/journey",
    },
    {
      name: "Settings",
      href: "/dash/settings",
      icon: Settings,
      current: pathname === "/dash/settings",
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
          name: "Certificates",
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

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {/* Back to Main Site - Mobile Only */}
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-b border-gray-100 mb-2 pb-2"
        >
          <Home className="mr-3 h-5 w-5 text-gray-400" />
          Back to Main Site
        </Link>

        {navigation.map((item) => {
          const IconComponent = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                item.current
                  ? "bg-fom-primary text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <IconComponent
                className={`mr-3 h-5 w-5 ${
                  item.current ? "text-white" : "text-gray-400"
                }`}
              />
              {item.name}
            </a>
          );
        })}

        {ministryNavigation.length > 0 && (
          <>
            <div className="pt-4 pb-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Ministry
              </h3>
            </div>
            {ministryNavigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    item.current
                      ? "bg-fom-primary text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <IconComponent
                    className={`mr-3 h-5 w-5 ${
                      item.current ? "text-white" : "text-gray-400"
                    }`}
                  />
                  {item.name}
                </a>
              );
            })}
          </>
        )}

        {adminNavigation.length > 0 && (
          <>
            <div className="pt-4 pb-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Administration
              </h3>
            </div>
            {adminNavigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    item.current
                      ? "bg-fom-primary text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <IconComponent
                    className={`mr-3 h-5 w-5 ${
                      item.current ? "text-white" : "text-gray-400"
                    }`}
                  />
                  {item.name}
                </a>
              );
            })}
          </>
        )}
      </nav>
    </div>
  );
}

export function DashboardHeader() {
  const { user, displayName, initials, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-6 py-4 z-40">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <MobileSidebar onClose={() => setIsMobileMenuOpen(false)} />
            </SheetContent>
          </Sheet>
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <FomLogo size="md" />
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
            <Button variant="outline" size="sm" asChild>
              <Link href="/" className="flex items-center space-x-1">
                <Home className="w-4 h-4" />
                <span>Back to Main Site</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Right side - notifications and user menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 px-2"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={user?.avatarUrl || undefined}
                    alt={displayName}
                  />
                  <AvatarFallback className="bg-fom-primary text-white text-sm">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-sm font-medium">
                  {displayName}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{displayName}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a href="/dash/profile" className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/dash/settings" className="flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut()}
                className="text-red-600"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
