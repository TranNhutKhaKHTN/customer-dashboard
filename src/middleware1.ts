// TODO: enhance view login/main with middleware
import { NextResponse, NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(request.nextUrl.pathname)
  ) {
    return NextResponse.next();
  }

  const isAuthenticated = request.cookies.has("dashboard_token");
  const isLoginPage = request.nextUrl.pathname?.startsWith("/login");

  if (!isLoginPage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
