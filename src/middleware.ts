import { auth } from "@/auth";
import { NextResponse } from "next/server";

/**
 * Runs only on the matcher paths defined below.
 * All other routes ("/", landing pages, static assets, etc.)
 * bypass this file completely.
 */
export default auth((req) => {
  const path = req.nextUrl.pathname;
  const role = req.auth?.user.role ?? "user";   // "user" = hasn’t chosen yet

  // if (role === "user" && !path.startsWith("/role-choice")) {
  //   return NextResponse.redirect(new URL("/role-choice", req.url));
  // }

  // keep each role inside its own prefix
  if (role === "instructor" && path.startsWith("/trainee")) {
    return NextResponse.redirect(new URL("/instructor/dashboard", req.url));
  }
  if (role === "trainee" && path.startsWith("/instructor")) {
    return NextResponse.redirect(new URL("/trainee/dashboard", req.url));
  }

  return NextResponse.next();
});

/**
 * Protect only the private areas:
 *   /instructor/... , /trainee/... , and /role-choice
 * Everything else ("/", marketing pages, images, etc.) stays public.
 */
export const config = {
  matcher: ["/instructor/:path*", "/trainee/:path*"],
};