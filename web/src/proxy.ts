import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/chat", "/index-repo"];
const publicRoutes = ["/login"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.includes(path);
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && token) {
    // return NextResponse.redirect(new URL("/chat", req.nextUrl));
    return NextResponse.redirect(new URL(req.nextUrl.pathname, req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chat/:path*", "/index-repo/:path*", "/login", "/"],
};
