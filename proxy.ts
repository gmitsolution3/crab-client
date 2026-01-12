// import { NextRequest, NextResponse } from "next/server";
// import { jwtVerify } from "jose";


// const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

// export async function proxy(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;

//   console.log("try to find token",token)

//   console.log("cookies header:", req.headers.get("cookie"));

//   if (!token) {
//     return NextResponse.redirect(new URL("/auth/sign-in", req.url));
//   }

//   try {
//     const { payload } = await jwtVerify(token, JWT_SECRET);

//     // 🔐 Admin route protection
//     if (req.nextUrl.pathname.startsWith("/admin") && payload.role !== "admin") {
//       return NextResponse.redirect(new URL("/unauthorized", req.url));
//     }

//     // ✅ Profile route → any logged-in user
//     return NextResponse.next();
//   } catch (err) {
//     console.error("JWT VERIFY ERROR 👉", err);

//     return NextResponse.redirect(new URL("/auth/sign-in", req.url));
//   }
// }

// export const config = {
//   matcher: ["/admin/:path*", "/profile/:path*"],
// };


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protected routes that require authentication
const protectedRoutes = ["/admin", "/profile"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  // If no token, redirect to login
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/api/v1/auth/me`,
      {
        method: "GET",
        headers: {
          Cookie: `token=${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    // If backend returns 401/403, user is not authenticated
    if (!backendResponse.ok) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Token is valid, allow access
    return NextResponse.next();
  } catch (error) {
    console.error("[v0] Auth verification error:", error);
    // On error, redirect to login for safety
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    // Protected routes
    "/admin/:path*",
    "/profile/:path*",
  ],
};
