import { connectToDatabase } from "@/lib/mongodb";
import { comparePasswords } from "@/lib/auth-utils";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    let db;
    try {
      const connection = await connectToDatabase();
      db = connection.db;
    } catch (dbError) {
      console.error("[v0] MongoDB Connection Error:", dbError);
      return Response.json(
        {
          error:
            "Database connection failed. Check MONGODB_URI environment variable.",
        },
        { status: 500 }
      );
    }

    // Find user by email
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return Response.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare passwords
    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      return Response.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("[v0] JWT_SECRET not set");
      return Response.json(
        { error: "Server configuration error. JWT_SECRET not set." },
        { status: 500 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      jwtSecret,
      { expiresIn: "7d" }
    );

    // Set HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return Response.json(
      {
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[v0] Login error details:", error);
    return Response.json({ error: "Login failed" }, { status: 500 });
  }
}
