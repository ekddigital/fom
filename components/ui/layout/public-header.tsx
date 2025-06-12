"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FomLogo } from "@/components/ui/branding/fom-logo";
import { FOM_NAVIGATION, FOM_FEATURES } from "@/lib/constants/fom";
import { useAuth } from "@/lib/hooks/use-auth";
import {
  Menu,
  ChevronDown,
  Heart,
  Users,
  Globe,
  BookOpen,
  Calendar,
  MessageCircle,
  User,
  Settings,
  Shield,
  Award,
  FileText,
  Video,
  Book,
  Home,
  HandHeart,
  UserPlus,
  Coffee,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PublicHeaderProps {
  className?: string;
}

const featuresIcons = {
  ministry: Heart,
  community: Users,
  missions: Globe,
  study: BookOpen,
  events: Calendar,
  prayer: MessageCircle,
};

const accountIcons = {
  "My Dashboard": User,
  "My Profile": User,
  Settings: Settings,
  "My Journey": Award,
};

const resourceIcons = {
  Sermons: Video,
  "Bible Studies": Book,
  Devotionals: BookOpen,
  Testimonies: MessageCircle,
  "Mission Reports": FileText,
  "Resources Library": BookOpen,
};

const communityIcons = {
  "Community Hub": Home,
  "Prayer Requests": HandHeart,
  "Small Groups": Users,
  Fellowship: Coffee,
  Connect: UserPlus,
};

export function PublicHeader({ className = "" }: PublicHeaderProps) {
  const { isAuthenticated, user, signOut } = useAuth();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-gray-200/60 bg-white/90 backdrop-blur-xl",
        className
      )}
    >
      <div className="container mx-auto px-4">
        {/* Main Navigation Row */}
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <FomLogo size="md" />
          </div>

          {/* Primary Desktop Navigation - Core Items */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="flex items-center gap-8">
              {/* Home */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/"
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-300",
                        "text-gray-700 hover:text-blue-950 hover:bg-blue-50/80",
                        "focus:bg-blue-50 focus:text-blue-950 focus:outline-none",
                        "disabled:pointer-events-none disabled:opacity-50"
                      )}
                    >
                      Home
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* About */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/about"
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-300",
                        "text-gray-700 hover:text-blue-950 hover:bg-blue-50/80",
                        "focus:bg-blue-50 focus:text-blue-950 focus:outline-none",
                        "disabled:pointer-events-none disabled:opacity-50"
                      )}
                    >
                      About
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Resources - Dropdown */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-gray-700 hover:text-blue-950 hover:bg-blue-50/80 data-[state=open]:bg-blue-50 data-[state=open]:text-blue-950">
                      Resources
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="bg-white/95 backdrop-blur-xl border border-gray-200/80 shadow-xl rounded-lg">
                        <div className="grid gap-3 p-6 w-[400px] lg:w-[450px] lg:grid-cols-2">
                          <div className="col-span-2">
                            <h3 className="text-lg font-semibold text-blue-950 mb-2">
                              Spiritual Resources
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                              Access sermons, studies, and spiritual content to
                              grow in faith.
                            </p>
                          </div>
                          {FOM_NAVIGATION.resources.map((item) => {
                            const IconComponent =
                              resourceIcons[
                                item.label as keyof typeof resourceIcons
                              ] || BookOpen;
                            return (
                              <NavigationMenuLink
                                key={item.href}
                                href={item.href}
                                className="group flex items-start space-x-3 rounded-lg p-3 hover:bg-blue-50 transition-all duration-200 hover:shadow-sm border border-transparent hover:border-blue-100"
                              >
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                  <IconComponent className="w-4 h-4 text-blue-950" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium text-gray-900 group-hover:text-blue-950">
                                    {item.label}
                                  </div>
                                </div>
                              </NavigationMenuLink>
                            );
                          })}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Ministry - Dropdown */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-gray-700 hover:text-blue-950 hover:bg-blue-50/80 data-[state=open]:bg-blue-50 data-[state=open]:text-blue-950">
                      Ministry
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="bg-white/95 backdrop-blur-xl border border-gray-200/80 shadow-xl rounded-lg">
                        <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-2">
                          <div className="col-span-2">
                            <h3 className="text-lg font-semibold text-blue-950 mb-2">
                              Ministry & Outreach
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                              Join our mission to spread the gospel through
                              various ministry programs.
                            </p>
                          </div>
                          {Object.entries(FOM_FEATURES).map(
                            ([key, feature]) => {
                              const IconComponent =
                                featuresIcons[
                                  key as keyof typeof featuresIcons
                                ];
                              return (
                                <NavigationMenuLink
                                  key={key}
                                  href={`/ministry/${key}`}
                                  className="group flex items-start space-x-3 rounded-lg p-3 hover:bg-blue-50 transition-all duration-200 hover:shadow-sm border border-transparent hover:border-blue-100"
                                >
                                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                    <IconComponent className="w-4 h-4 text-blue-950" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-gray-900 group-hover:text-blue-950">
                                      {feature.title}
                                    </div>
                                    <div className="text-xs text-gray-600 line-clamp-2">
                                      {feature.description}
                                    </div>
                                  </div>
                                </NavigationMenuLink>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Community - Dropdown */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-gray-700 hover:text-blue-950 hover:bg-blue-50/80 data-[state=open]:bg-blue-50 data-[state=open]:text-blue-950">
                      Community
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="bg-white/95 backdrop-blur-xl border border-gray-200/80 shadow-xl rounded-lg">
                        <div className="grid gap-3 p-6 w-[350px]">
                          <div className="mb-2">
                            <h3 className="text-lg font-semibold text-blue-950 mb-2">
                              Community Life
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                              Connect and grow together in faith.
                            </p>
                          </div>
                          {FOM_NAVIGATION.community.map((item) => {
                            const IconComponent =
                              communityIcons[
                                item.label as keyof typeof communityIcons
                              ] || Users;
                            return (
                              <NavigationMenuLink
                                key={item.href}
                                href={item.href}
                                className="flex items-center space-x-3 rounded-lg p-3 hover:bg-blue-50 transition-all duration-200 group border border-transparent hover:border-blue-100"
                              >
                                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                  <IconComponent className="w-3 h-3 text-blue-950" />
                                </div>
                                <span className="text-sm font-medium text-gray-900 group-hover:text-blue-950">
                                  {item.label}
                                </span>
                              </NavigationMenuLink>
                            );
                          })}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            {/* Account Dropdown - Only show when authenticated */}
            {isAuthenticated && (
              <NavigationMenu viewport={false}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-blue-950 hover:bg-blue-50/80 hover:text-blue-800 font-medium border border-blue-200 bg-blue-50/30">
                      <User className="w-4 h-4 mr-2" />
                      Account
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="!left-auto !right-0 !translate-x-0">
                      <div className="bg-white/95 backdrop-blur-xl border border-gray-200/80 shadow-xl rounded-lg">
                        <div className="grid gap-2 p-4 w-[280px]">
                          <div className="mb-2 pb-2 border-b border-gray-200">
                            <h3 className="text-sm font-semibold text-blue-950 mb-1">
                              Account Management
                            </h3>
                            <p className="text-xs text-gray-600">
                              Manage your profile and settings
                            </p>
                          </div>
                          {FOM_NAVIGATION.account.map((item) => {
                            const IconComponent =
                              accountIcons[
                                item.label as keyof typeof accountIcons
                              ] || User;
                            return (
                              <NavigationMenuLink
                                key={item.href}
                                href={item.href}
                                className="flex items-center space-x-3 rounded-lg p-2 hover:bg-blue-50 transition-all duration-200 group border border-transparent hover:border-blue-100"
                              >
                                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                  <IconComponent className="w-3 h-3 text-blue-950" />
                                </div>
                                <span className="text-sm font-medium text-gray-900 group-hover:text-blue-950">
                                  {item.label}
                                </span>
                              </NavigationMenuLink>
                            );
                          })}

                          {/* Sign Out Button */}
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <button
                              onClick={() => signOut()}
                              className="flex items-center space-x-3 rounded-lg p-2 hover:bg-red-50 transition-all duration-200 group border border-transparent hover:border-red-100 w-full text-left"
                            >
                              <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-md flex items-center justify-center group-hover:bg-red-200 transition-colors">
                                <LogOut className="w-3 h-3 text-red-700" />
                              </div>
                              <span className="text-sm font-medium text-red-700 group-hover:text-red-800">
                                Sign Out
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}

            {/* Authentication Buttons */}
            {!isAuthenticated && (
              <>
                <Button
                  variant="ghost"
                  className="text-blue-950 hover:bg-blue-50/80 hover:text-blue-800 font-medium"
                  asChild
                >
                  <a href="/sign-in">Sign In</a>
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-950 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                  asChild
                >
                  <a href="/sign-up">
                    Join Us
                    <Badge
                      variant="secondary"
                      className="ml-2 bg-white/20 text-white border-0 font-medium"
                    >
                      Free
                    </Badge>
                  </a>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-950 hover:bg-blue-50/80"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[320px] bg-white border-gray-200 overflow-y-auto"
            >
              <div className="flex flex-col space-y-6 mt-6">
                <FomLogo size="sm" className="mb-4" />

                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Navigation
                  </h3>
                  {FOM_NAVIGATION.public.map((item) => (
                    <Button
                      key={item.href}
                      variant="ghost"
                      className="justify-start text-gray-700 hover:bg-blue-50/80 hover:text-blue-950 h-11 w-full font-medium"
                      asChild
                    >
                      <a href={item.href}>{item.label}</a>
                    </Button>
                  ))}
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Resources
                  </h3>
                  {FOM_NAVIGATION.resources.slice(0, 4).map((item) => {
                    const IconComponent =
                      resourceIcons[item.label as keyof typeof resourceIcons] ||
                      BookOpen;
                    return (
                      <Button
                        key={item.href}
                        variant="ghost"
                        className="justify-start text-gray-700 hover:bg-blue-50/80 hover:text-blue-950 h-auto p-3 w-full"
                        asChild
                      >
                        <a
                          href={item.href}
                          className="flex items-start space-x-3"
                        >
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center">
                            <IconComponent className="w-3 h-3 text-blue-950" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-medium text-sm">
                              {item.label}
                            </div>
                          </div>
                        </a>
                      </Button>
                    );
                  })}
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Ministry
                  </h3>
                  {Object.entries(FOM_FEATURES)
                    .slice(0, 3)
                    .map(([key, feature]) => {
                      const IconComponent =
                        featuresIcons[key as keyof typeof featuresIcons];
                      return (
                        <Button
                          key={key}
                          variant="ghost"
                          className="justify-start text-gray-700 hover:bg-blue-50/80 hover:text-blue-950 h-auto p-3 w-full"
                          asChild
                        >
                          <a
                            href={`/ministry/${key}`}
                            className="flex items-start space-x-3"
                          >
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center">
                              <IconComponent className="w-3 h-3 text-blue-950" />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="font-medium text-sm">
                                {feature.title}
                              </div>
                              <div className="text-xs text-gray-600 mt-1 line-clamp-1">
                                {feature.description}
                              </div>
                            </div>
                          </a>
                        </Button>
                      );
                    })}
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Community
                  </h3>
                  {FOM_NAVIGATION.community.slice(0, 4).map((item) => (
                    <Button
                      key={item.href}
                      variant="ghost"
                      className="justify-start text-gray-700 hover:bg-blue-50/80 hover:text-blue-950 h-11 w-full font-medium"
                      asChild
                    >
                      <a href={item.href}>{item.label}</a>
                    </Button>
                  ))}
                </div>

                {/* Account Section - Only show when authenticated */}
                {isAuthenticated && (
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      Account
                    </h3>
                    {FOM_NAVIGATION.account.slice(0, 3).map((item) => {
                      const IconComponent =
                        accountIcons[item.label as keyof typeof accountIcons] ||
                        User;
                      return (
                        <Button
                          key={item.href}
                          variant="ghost"
                          className="justify-start text-gray-700 hover:bg-blue-50/80 hover:text-blue-950 h-auto p-3 w-full"
                          asChild
                        >
                          <a
                            href={item.href}
                            className="flex items-start space-x-3"
                          >
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center">
                              <IconComponent className="w-3 h-3 text-blue-950" />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="font-medium text-sm">
                                {item.label}
                              </div>
                            </div>
                          </a>
                        </Button>
                      );
                    })}

                    {/* Sign Out Button in Account Section */}
                    <Button
                      variant="ghost"
                      className="justify-start text-red-700 hover:bg-red-50/80 hover:text-red-800 h-auto p-3 w-full mt-2 border-t border-gray-200"
                      onClick={() => signOut()}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-md flex items-center justify-center">
                          <LogOut className="w-3 h-3 text-red-700" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium text-sm">Sign Out</div>
                        </div>
                      </div>
                    </Button>
                  </div>
                )}

                {/* Authentication Buttons */}
                <div className="border-t border-gray-200 pt-6 space-y-3">
                  {!isAuthenticated && (
                    <>
                      <Button
                        variant="outline"
                        className="w-full border-blue-200 text-blue-950 hover:bg-blue-950 hover:text-white font-medium h-11"
                        asChild
                      >
                        <a href="/sign-in">Sign In</a>
                      </Button>
                      <Button
                        className="w-full bg-gradient-to-r from-blue-950 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white shadow-md font-medium h-11"
                        asChild
                      >
                        <a href="/sign-up">
                          Join Us
                          <Badge
                            variant="secondary"
                            className="ml-2 bg-white/20 text-white border-0"
                          >
                            Free
                          </Badge>
                        </a>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Secondary Navigation Row - Better spacing for additional items */}
        <div className="hidden lg:flex justify-center py-3">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-8">
              {/* Events */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/events"
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-300",
                    "text-gray-700 hover:text-blue-950 hover:bg-blue-50/80",
                    "focus:bg-blue-50 focus:text-blue-950 focus:outline-none",
                    "disabled:pointer-events-none disabled:opacity-50"
                  )}
                >
                  Events
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Give */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/give"
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-300",
                    "text-gray-700 hover:text-blue-950 hover:bg-blue-50/80",
                    "focus:bg-blue-50 focus:text-blue-950 focus:outline-none",
                    "disabled:pointer-events-none disabled:opacity-50"
                  )}
                >
                  Give
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Contact Us */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/contact"
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-300",
                    "text-gray-700 hover:text-blue-950 hover:bg-blue-50/80",
                    "focus:bg-blue-50 focus:text-blue-950 focus:outline-none",
                    "disabled:pointer-events-none disabled:opacity-50"
                  )}
                >
                  Contact Us
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}
