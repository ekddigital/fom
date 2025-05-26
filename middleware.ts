import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes that do not require authentication
const isPublicRoute = createRouteMatcher([
  "/", // Make the root page public
  "/sign-in(.*)", // Public sign-in route
  "/sign-up(.*)", // Public sign-up route
  "/api/auth/webhooks/clerk(.*)", // Public webhook route
]);

export default clerkMiddleware((authObject, req) => {
  // If the route is not public, protect it
  if (!isPublicRoute(req)) {
    authObject.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
