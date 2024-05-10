import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const clerkConfig = {
    matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
