import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

const loggedInRoutes = ["/explore", ];
const loggedOutRoutes = ["/auth/login"];

// The main middleware function
export default auth((req) => {
  const isAuthenticated = !!req.auth;
  const { pathname } = req.nextUrl;

  const headers = new Headers(req.headers);
  headers.set("x-current-path", req.nextUrl.pathname);


  if (
    !isAuthenticated &&
    loggedInRoutes.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL(`/auth/login`, req.nextUrl));
  }

  if (
    isAuthenticated &&
    loggedOutRoutes.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL(`/explore`, req.nextUrl));
  }

  return NextResponse.next({
    request: {
    headers
  } });
});
