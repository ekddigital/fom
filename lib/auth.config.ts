/**
 * Edge-safe auth config — no Prisma, no Node.js-only imports.
 * Used by middleware.ts (Edge runtime).
 * Full auth (with Prisma) lives in lib/auth.ts (Node.js runtime only).
 */
import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  providers: [],
  pages: {
    signIn: "/sign-in",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token }) {
      // No-op: token is already populated by the full auth in lib/auth.ts.
      // This stub prevents next-auth from complaining in the edge config.
      return token;
    },
    async session({ session, token }) {
      // Map custom JWT fields to session.user so middleware can read them.
      const u = session.user as typeof session.user & Record<string, unknown>;
      if (token) {
        u.id = (token.id ?? token.sub) as string;
        u.role = token.role as string;
        u.firstName = token.firstName as string;
        u.lastName = token.lastName as string;
        u.username = token.username as string | undefined;
        u.displayNamePreference = token.displayNamePreference as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthPage =
        nextUrl.pathname === "/sign-in" ||
        nextUrl.pathname === "/sign-up" ||
        nextUrl.pathname.startsWith("/auth");
      const isProtectedRoute =
        nextUrl.pathname.startsWith("/dash") ||
        nextUrl.pathname.startsWith("/mgmt") ||
        nextUrl.pathname.startsWith("/admin");

      if (isAuthPage && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      if (isProtectedRoute && !isLoggedIn) {
        const signInUrl = new URL("/sign-in", nextUrl);
        signInUrl.searchParams.set("callbackUrl", nextUrl.pathname);
        return Response.redirect(signInUrl);
      }
      return true;
    },
  },
  trustHost: true,
};
