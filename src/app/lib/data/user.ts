import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// --- Constants ---
import { JWT_SECRET } from "../constants/auth";

// --- Type ---
import { UserPayload } from "../types/user";

export async function getUserToken(): Promise<UserPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const payload = jwt.verify(token, JWT_SECRET) as UserPayload;
    return { userId: payload.userId, role: payload.role };
  } catch (err) {
    console.error("JWT 검증 실패:", err);
    return null;
  }
}
