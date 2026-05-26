import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  
  const isAuthPage = nextUrl.pathname === "/login" || nextUrl.pathname === "/register";

  if (isAuthPage) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/", nextUrl));
    }
    return;
  }

  if (!isLoggedIn) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
  }
});

// Configure protected routes that require logging in
export const config = {
  matcher: [
    "/wallet/:path*",
    "/favorites/:path*",
    "/login",
    "/register",
  ],
};
