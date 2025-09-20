import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// --- Constants ---
import { JWT_SECRET } from "../constants/auth";

// --- Type ---
import { UserPayload } from "../types/user";
import { createClient } from "@/app/utils/supabase/server";

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

export async function fetchUserNickname(tokenId?: string): Promise<string> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("nickname")
    .eq("userId", tokenId)
    .single();

  if (error) {
    console.error(error);

    return "ㅇㅇ";
  }

  return data.nickname;
}
