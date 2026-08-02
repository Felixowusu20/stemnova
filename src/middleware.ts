import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { getAuthSecret } from "@/lib/env";

/**
 * Auth.js sets `__Secure-authjs.session-token` on HTTPS.
 * getToken() defaults secureCookie to false, so production logins looked
 * successful but middleware never saw the session cookie.
 */
function useSecureAuthCookie(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-proto");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() === "https";
  }
  if (request.nextUrl.protocol === "https:") return true;
  // Most production hosts terminate TLS at a proxy — prefer secure cookies there.
  return process.env.NODE_ENV === "production";
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  if (pathname.startsWith("/admin/login") || pathname.startsWith("/api/auth")) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  const secret = getAuthSecret();
  if (!secret) {
    console.error(
      "[middleware] Missing AUTH_SECRET / NEXTAUTH_SECRET — admin auth cannot verify sessions."
    );
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    loginUrl.searchParams.set("error", "Configuration");
    return NextResponse.redirect(loginUrl);
  }

  const secureCookie = useSecureAuthCookie(request);
  let token = await getToken({
    req: request,
    secret,
    secureCookie,
  });

  // Fallback if proxy headers and cookie prefix disagree.
  if (!token) {
    token = await getToken({
      req: request,
      secret,
      secureCookie: !secureCookie,
    });
  }

  if (!token) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/).*)"],
};
