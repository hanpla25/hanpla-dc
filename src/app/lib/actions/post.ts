"use server";

import { createClient } from "@/app/utils/supabase/server";
import { PostActionType } from "../types/actions";
import { redirect } from "next/navigation";

export async function writeAction(
  _prevState: PostActionType | null,
  formData: FormData
) {
  const content = formData.get("content");

  if (typeof content !== "string")
    return {
      success: false,
      msg: "글쓰기 오류",
    };

  const contentJson = JSON.parse(content);

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .insert({
      content: contentJson,
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

  redirect(`/test/${postId}`);
}
