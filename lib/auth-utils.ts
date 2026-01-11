import bcrypt from "bcryptjs";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import * as jose from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createToken(userId: string): Promise<string> {
  const token = await new jose.SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);
  return token;
}

export async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth")?.value;

  if (!token) {
    return null;
  }

  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload as { userId: string };
  } catch (err) {
    return null;
  }
}
