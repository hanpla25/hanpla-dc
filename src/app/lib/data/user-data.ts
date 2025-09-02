import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { UserPayload } from "../type/userType";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET 환경 변수 없음");
}
const JWT_SECRET: string = jwtSecret;

export async function getUserToken(): Promise<UserPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (
      typeof decoded === "object" &&
      "user_id" in decoded &&
      "user_name" in decoded
    ) {
      const { user_id, nickname, created_at } = decoded as UserPayload;
      return { user_id, nickname, created_at };
    }

    return null;
  } catch (err) {
    console.warn("JWT decode 실패", err);
    return null;
  }
}
