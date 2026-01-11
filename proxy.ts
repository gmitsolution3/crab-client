import { jwtVerify } from "jose";
import { type NextRequest, NextResponse } from "next/server";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Unprotected routes
  if (
    pathname.startsWith("/auth/") ||
    pathname === "/" ||
    pathname.startsWith("/api/auth")
  ) {
    return NextResponse.next();
  }

  // Check for auth token
  const token = request.cookies.get("auth")?.value;

//   if (!token) {
//     return NextResponse.redirect(new URL("/auth/sign-in", request.url));
//   }

//   try {
//     await jwtVerify(token, secret);
//     return NextResponse.next();
//   } catch (err) {
//     return NextResponse.redirect(new URL("/auth/sign-in", request.url));
//   }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
