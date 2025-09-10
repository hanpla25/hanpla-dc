import { redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";

// --- Utils ---
import { maskIpAddress } from "@/app/utils/maskIpAddress";

// --- Types ---
import { PostType } from "../types/post";

export async function fetchPostData(
  abbr: string,
  postId: number
): Promise<PostType> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      "id,nickname,title,content,abbr,gallName,viewCount,likeCount,dislikeCount,commentCount,ipAddress,createdAt,isLogin"
    )
    .eq("id", postId)
    .single();

  if (error) {
    console.error(error);

    redirect(`/${abbr}`);
  }

  return {
    ...data,
    ipAddress: maskIpAddress(data.ipAddress),
  };
}
