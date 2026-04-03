import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextAuthRequest } from "next-auth";

export default auth((req: NextAuthRequest) => {
  // req.auth is the Session object (null if unauthenticated)
  const session = req.auth;
  const isAuthPage =
    req.nextUrl.pathname === "/sign-in" ||
    req.nextUrl.pathname === "/sign-up" ||
    req.nextUrl.pathname.startsWith("/auth");
  const isProtectedRoute =
    req.nextUrl.pathname.startsWith("/dash") ||
    req.nextUrl.pathname.startsWith("/mgmt") ||
    req.nextUrl.pathname.startsWith("/admin");

  // Redirect authenticated users away from auth pages
  if (isAuthPage && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow unauthenticated access to auth pages
  if (isAuthPage) {
    return NextResponse.next();
  }

  // Protect dashboard routes
  if (isProtectedRoute && !session) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Role-based protection
  if (session) {
    const userRole = (session.user as unknown as Record<string, unknown>)
      ?.role as string;

    // Ministry leader routes
    if (req.nextUrl.pathname.startsWith("/mgmt")) {
      if (!["MINISTRY_LEADER", "ADMIN", "SUPER_ADMIN"].includes(userRole)) {
        return NextResponse.redirect(new URL("/dash", req.url));
      }
    }

    // Admin routes
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (!["ADMIN", "SUPER_ADMIN"].includes(userRole)) {
        return NextResponse.redirect(new URL("/dash", req.url));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)",
  ],
};
