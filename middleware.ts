import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhook/clerk",
    "/sign-in(.*)",
    "/sign-up(.*)",
  ],
  ignoredRoutes: [
    "/api/webhook/clerk",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 