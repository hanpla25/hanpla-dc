"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { createClient } from "@/app/utils/supabase/server";

// --- Constants ---
import {
  ID_EXISTS_MSG,
  idRegex,
  JWT_EXPIRES_IN,
  JWT_SECRET,
  NICKNAME_EXISTS_MSG,
  passwordRegex,
  usernameRegex,
} from "../constants/auth";

// --- Types ---
import { AuthActionType } from "../types/actions";

const authSchema = (nickname: string, id: string, password: string) => {
  if (!usernameRegex.test(nickname)) {
    return {
      success: false,
      filed: "nickname",
      inputs: { nickname, id, password },
      msg: "이름은 2~8자의 한글 또는 영어만 가능해요.",
    };
  }

  if (!idRegex.test(id)) {
    return {
      success: false,
      filed: "id",
      inputs: { nickname, id, password },
      msg: "아이디는 2~8자의 영어 또는 숫자만 가능해요.",
    };
  }

  if (!passwordRegex.test(password)) {
    return {
      success: false,
      filed: "password",
      inputs: { nickname, id, password },
      msg: "비밀번호는 2~8자의 영어 또는 숫자만 가능해요.",
    };
  }
};

export async function signupAction(
  _prevState: AuthActionType,
  formData: FormData
): Promise<AuthActionType> {
  const nickname = formData.get("nickname") as string;
  const id = formData.get("id") as string;
  const password = formData.get("password") as string;

  const schmaMsg = authSchema(nickname, id, password);

  if (schmaMsg)
    return {
      success: false,
      filed: schmaMsg.filed,
      inputs: {
        nickname,
        id,
        password,
      },
      msg: schmaMsg.msg,
    };

  const supabase = await createClient();

  const { error } = await supabase
    .from("users")
    .insert({ nickname, userId: id, password });

  // supabase 아이디 중복 에러
  if (error?.message === ID_EXISTS_MSG) {
    return {
      success: false,
      filed: "id",
      inputs: { nickname, id, password },
      msg: "이미 존재하는 아이디 입니다.",
    };
  }

  // supabase 닉네임 중복 에러
  if (error?.message === NICKNAME_EXISTS_MSG) {
    return {
      success: false,
      filed: "nickname",
      inputs: { nickname, id, password },
      msg: "이미 존재하는 닉네임 입니다.",
    };
  }

  return { success: true };
}

export async function loginAction(
  _prevState: string | null,
  formData: FormData
): Promise<string> {
  const id = formData.get("id") as string;
  const password = formData.get("password") as string;
  const callbackUrl = formData.get("callbackUrl") as string;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .select("userId,password,role")
    .eq("userId", id)
    .single();

  if (error || data.password !== password)
    return "아이디 또는 비밀번호가 일치하지 않아요.";

  const token = jwt.sign({ userId: data.userId, role: data.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });

  redirect(callbackUrl);
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete("token");
}
