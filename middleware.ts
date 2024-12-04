import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: ["/(.*)"],
  debug: true,
  ignoredRoutes: [
    "/((?!api|trpc))(_next.*|.+.[w]+$)",
  ],
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
} 