"use client";

import { Button } from "@/components/ui/button";
import { FomLogo } from "@/components/ui/branding/fom-logo";
import { useAuth } from "@/lib/hooks/use-auth";
import Link from "next/link";
import {
  User,
  Settings,
  LogOut,
  Menu,
  Shield,
  Bell,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminHeaderProps {
  className?: string;
  onMenuClick?: () => void;
}

export function AdminHeader({ className = "", onMenuClick }: AdminHeaderProps) {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-red-200/60 bg-red-50/90 backdrop-blur-xl",
        className
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-red-700 hover:bg-red-100"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          {/* Logo and Title */}
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <FomLogo size="sm" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-red-950">
                <Shield className="w-4 h-4 inline mr-2" />
                Admin Dashboard
              </h1>
              <p className="text-xs text-red-700">Platform Administration</p>
            </div>
          </Link>
        </div>

        {/* Center Section - Search (hidden on mobile) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users, content, settings..."
              className="w-full pl-10 pr-4 py-2 border border-red-200 rounded-lg bg-white/50 focus:bg-white focus:border-red-400 focus:outline-none transition-colors text-sm"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="text-red-700 hover:bg-red-100 relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-600 rounded-full text-xs"></span>
            <span className="sr-only">Notifications</span>
          </Button>

          {/* Quick Actions */}
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex text-red-700 border-red-200 hover:bg-red-100"
            asChild
          >
            <a href="/admin/users">
              <User className="w-4 h-4 mr-2" />
              Manage Users
            </a>
          </Button>

          {/* Admin Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full bg-red-100 hover:bg-red-200"
              >
                <User className="h-5 w-5 text-red-700" />
                <span className="sr-only">Admin account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Shield className="w-3 h-3 text-red-600" />
                    <p className="text-xs leading-none text-red-700 font-medium">
                      {user?.role}
                    </p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <a href="/dash/profile" className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  My Profile
                </a>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <a href="/dash/settings" className="cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </a>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href="/" className="cursor-pointer">
                  <Shield className="w-4 h-4 mr-2" />
                  Return to Main Site
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-red-600 cursor-pointer"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
