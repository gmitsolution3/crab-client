import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";


const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  console.log("try to find token",token)

  console.log("cookies header:", req.headers.get("cookie"));

  if (!token) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // 🔐 Admin route protection
    if (req.nextUrl.pathname.startsWith("/admin") && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // ✅ Profile route → any logged-in user
    return NextResponse.next();
  } catch (err) {
    console.error("JWT VERIFY ERROR 👉", err);

    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
};

