import { NextResponse } from "next/server.js";
import NextAuth from "next-auth";

import { authConfig } from "@/lib/auth/config";

export const { auth } = NextAuth(authConfig);

const protectedPaths = ["/dashboard", "/foods"];

export default auth(async function middleware(req) {
  const requestHeaders = new Headers(req.headers);

  requestHeaders.set("x-url", req.url);

  const pathname = req.nextUrl.pathname;
  const isLoggedIn = !!req.auth;

  if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }

  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect_to", pathname + req.nextUrl.search);
    const redirectResponse = NextResponse.redirect(loginUrl);
    redirectResponse.headers.set("x-url", req.url);
    return redirectResponse;
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
});

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
