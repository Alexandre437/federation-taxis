// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This middleware runs before each request
export function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  // Paths we want to protect
  const protect =
    pathname.startsWith("/admin") || pathname === "/espace";

  if (!protect) return NextResponse.next();

  // Look for NextAuth session cookies
  const sessionCookie =
    req.cookies.get("next-auth.session-token") ||
    req.cookies.get("__Secure-next-auth.session-token");

  // If no session → redirect to login
  if (!sessionCookie) {
    const loginUrl = new URL("/login", origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Otherwise, continue
  return NextResponse.next();
}

// Apply middleware only to these paths
export const config = {
  matcher: ["/admin/:path*", "/espace"],
};
