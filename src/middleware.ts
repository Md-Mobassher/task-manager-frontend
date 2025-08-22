import { TUser } from "@/utils/tokenHelper";
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import { authAccessKey } from "./constant/authkey";

// Function to decode and validate JWT token
function decodeToken(token: string): TUser | null {
  try {
    const decoded = jwtDecode<TUser>(token);

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

// Function to get token from cookies
function getTokenFromCookies(request: NextRequest): string | null {
  return request.cookies.get(authAccessKey)?.value || null;
}

// Protected routes that require authentication
const protectedRoutes = ["/dashboard"];

// Function to check if the current path is protected
function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some((route) => pathname.startsWith(route));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Check if the current route is protected
  if (isProtectedRoute(pathname)) {
    // Get token from cookies
    const token = getTokenFromCookies(request);

    // If no token exists, redirect to login
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      // Add the current URL as a redirect parameter
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Decode and validate the token
    const user = decodeToken(token);

    // If token is invalid or expired, redirect to login
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Token is valid, allow access
    return NextResponse.next();
  }

  // For non-protected routes, allow access
  return NextResponse.next();
}

// Configure which routes the middleware should run on
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
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
