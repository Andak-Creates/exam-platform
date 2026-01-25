import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const path = req.nextUrl.pathname;

  // Public routes
  if (
    path === "/" ||
    path.startsWith("/login") ||
    path.startsWith("/register") ||
    path.startsWith("/api/auth") ||
    path === "/admin/login" // 👈 allow admin login
  ) {
    return NextResponse.next();
  }

  // Not logged in -> redirect based on path
  if (!token) {
    if (path.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect logged-in admin away from admin login page
  if (path === "/admin/login" && token.role === "admin") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Redirect logged-in user away from user login page
  if (path === "/login" && token.role === "user") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Admin routes - check role
  if (path.startsWith("/admin") && path !== "/admin/login") {
    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // User routes - prevent admin access
  if (
    (path.startsWith("/dashboard") ||
      path.startsWith("/exams") ||
      path.startsWith("/wallet") ||
      path.startsWith("/leaderboard") ||
      path.startsWith("/profile") ||
      path.startsWith("/settings")) &&
    token.role === "admin"
  ) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
