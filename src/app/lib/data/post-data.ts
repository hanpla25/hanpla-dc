import { redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";

// --- Types ---
import { Post } from "../type/postType";

// --- Utils ---
import { maskIpAddress } from "@/app/utils/maskIpAddress";

export async function fetchPostData(
  abbr: string,
  postId: number
): Promise<Post> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      "id,nickname,title,content,abbr,gall_name,view_count,like_count,dislike_count,comment_count,ip_address,created_at,is_login"
    )
    .eq("id", postId)
    .single();

  if (error) {
    console.error(error);

    redirect(`/${abbr}`);
  }

  return {
    ...data,
    ip_address: maskIpAddress(data.ip_address),
  };
}
