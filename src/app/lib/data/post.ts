import { redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";

// --- Utils ---
import { maskIpAddress } from "@/app/utils/maskIpAddress";

// --- Types ---
import { CommentType, PostType } from "../types/post";

export async function fetchPostData(
  abbr: string,
  postId: number
): Promise<PostType> {
  const supabase = await createClient();
  const { error: rpcError } = await supabase.rpc("increment_view_count", {
    postId,
  });
  if (rpcError) console.error("조회수 증가 실패:", rpcError);

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

export async function fetchCommentData(postId: number): Promise<CommentType[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comments")
    .select("id,postId,parentId,nickname,content,isLogin,ipAddress,createdAt")
    .eq("postId", postId);

  if (error) {
    console.error(error);

    return [];
  }

  return data.map((comment) => ({
    ...comment,
    ipAddress: maskIpAddress(comment.ipAddress),
  }));
}
