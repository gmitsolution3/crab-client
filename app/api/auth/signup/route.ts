import { connectToDatabase } from "@/lib/mongodb";
import { hashPassword } from "@/lib/auth-utils";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, phone, address } = body;

    if (!email || !password || !firstName || !lastName) {
      return Response.json(
        { error: "Missing required fields" },
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

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return Response.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const result = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone: phone || "",
      address: address || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

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
      { userId: result.insertedId.toString(), email },
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
        message: "Account created successfully",
        user: {
          id: result.insertedId,
          email,
          firstName,
          lastName,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[v0] Signup error details:", error);
    return Response.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}
