import { NextResponse, type NextRequest } from "next/server";

// Inlined (not imported from lib/auth) so the edge proxy bundle stays free of
// Node-only modules like `crypto`.
const SESSION_COOKIE = "akarian_admin";

/**
 * Fast gate for the dashboard: if there's no session cookie, bounce to login
 * before rendering. Cryptographic verification of the cookie happens in the
 * dashboard layout (Node runtime). The login page itself stays public.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/dashboard/login")) return NextResponse.next();

  const hasCookie = Boolean(request.cookies.get(SESSION_COOKIE)?.value);
  if (!hasCookie) {
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
