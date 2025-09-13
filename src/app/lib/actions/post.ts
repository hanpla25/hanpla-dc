"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";

// --- Types ---
import { PostActionType } from "../types/actions";

const getIp = async () => {
  const headersList = await headers();
  const ipAddress =
    headersList.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

  return ipAddress;
};

export async function writeAction(
  _prevState: PostActionType | null,
  formData: FormData
) {
  const [ipAddress] = await Promise.all([getIp()]);

  const abbr = formData.get("abbr") as string;
  const gallName = formData.get("gallName") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content");
  const nickname = formData.get("nickname") as string;
  const password = formData.get("password") as string;

  if (typeof content !== "string")
    return {
      success: false,
      msg: "글쓰기 오류.",
    };

  if (content.length === 0) {
    return {
      success: false,
      msg: "내용을 입력해주세요.",
    };
  }

  const contentJson = JSON.parse(content);

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .insert({
      abbr,
      gallName,
      title,
      content: contentJson,
      nickname,
      ipAddress,
      password,
    })
    .select("id")
    .single();

  if (error) {
    console.error(error);

    return {
      success: false,
      msg: "글쓰기 오류",
    };
  }

  const postId = data.id;

  redirect(`/${abbr}/${postId}`);
}
