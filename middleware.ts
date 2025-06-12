import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
    const isProtectedRoute =
      req.nextUrl.pathname.startsWith("/dash") ||
      req.nextUrl.pathname.startsWith("/mgmt") ||
      req.nextUrl.pathname.startsWith("/admin");

    // Redirect authenticated users away from auth pages
    if (isAuthPage && token) {
      return NextResponse.redirect(new URL("/dash", req.url));
    }

    // Allow unauthenticated access to auth pages
    if (isAuthPage) {
      return NextResponse.next();
    }

    // Protect dashboard routes
    if (isProtectedRoute && !token) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    }

    // Role-based protection
    if (token) {
      const userRole = token.role as string;

      // Ministry leader routes
      if (req.nextUrl.pathname.startsWith("/mgmt")) {
        if (!["ministry_leader", "administrator"].includes(userRole)) {
          return NextResponse.redirect(new URL("/dash", req.url));
        }
      }

      // Admin routes
      if (req.nextUrl.pathname.startsWith("/admin")) {
        if (userRole !== "administrator") {
          return NextResponse.redirect(new URL("/dash", req.url));
        }
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow all requests to proceed to middleware logic
        return true;
      },
    },
  }
);

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
