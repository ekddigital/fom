import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";
import type { NextAuthRequest } from "next-auth";
import { isLaunchpadHost, requestHostname } from "@/lib/seo/site-url";

const { auth } = NextAuth(authConfig);

const PRIVATE_PREFIXES = ["/dash", "/admin", "/mgmt"];

const NOINDEX_PREFIXES = [
  ...PRIVATE_PREFIXES,
  "/content",
  "/manage-events",
  "/ministry-certificates",
  "/jicf/ekddigital",
  "/jicf/wedding-certificate",
];

const AUTH_PATHS = ["/sign-in", "/sign-up"];

function pathStartsWith(path: string, prefixes: string[]): boolean {
  return prefixes.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}

function isPrivatePath(path: string): boolean {
  return pathStartsWith(path, PRIVATE_PREFIXES);
}

function isNoindexPath(path: string): boolean {
  return pathStartsWith(path, NOINDEX_PREFIXES);
}

function isAuthPage(path: string): boolean {
  return AUTH_PATHS.includes(path) || path.startsWith("/auth");
}

function isCrawlerDiscoveryPath(path: string): boolean {
  return (
    path === "/robots.txt" ||
    path === "/sitemap.xml" ||
    path.endsWith("/opengraph-image") ||
    path.endsWith("/twitter-image")
  );
}

function applySeoHeaders(req: NextAuthRequest, response: NextResponse) {
  const host = requestHostname(
    req.headers.get("x-forwarded-host"),
    req.nextUrl.hostname,
  );

  if (
    isLaunchpadHost(host) ||
    isNoindexPath(req.nextUrl.pathname) ||
    isAuthPage(req.nextUrl.pathname)
  ) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export default auth((req: NextAuthRequest) => {
  const session = req.auth;
  const path = req.nextUrl.pathname;

  // Do not 301 apex → https://www.fomjesus.org.
  // Launchpad nginx already 301s www → apex when both names are attached.
  // Those two redirects chase each other: the health check
  // `curl -fsSIL --resolve www.fomjesus.org:80:127.0.0.1 http://www.fomjesus.org`
  // follows www → https://fomjesus.org → www until curl error 47.
  // Serve 200 for both hosts. rel=canonical stays https://www.fomjesus.org.

  if (isCrawlerDiscoveryPath(path) || !isPrivatePath(path)) {
    if (isAuthPage(path) && session) {
      return applySeoHeaders(req, NextResponse.redirect(new URL("/", req.url)));
    }
    return applySeoHeaders(req, NextResponse.next());
  }

  if (!session) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("callbackUrl", path);
    return applySeoHeaders(req, NextResponse.redirect(signInUrl));
  }

  const userRole = (session.user as unknown as Record<string, unknown>)
    ?.role as string;

  if (path.startsWith("/mgmt")) {
    if (!["MINISTRY_LEADER", "ADMIN", "SUPER_ADMIN"].includes(userRole)) {
      return applySeoHeaders(req, NextResponse.redirect(new URL("/dash", req.url)));
    }
  }

  if (path.startsWith("/admin")) {
    if (!["ADMIN", "SUPER_ADMIN"].includes(userRole)) {
      return applySeoHeaders(req, NextResponse.redirect(new URL("/dash", req.url)));
    }
  }

  return applySeoHeaders(req, NextResponse.next());
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
