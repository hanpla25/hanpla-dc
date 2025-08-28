"use server";

import { createClient } from "@/app/utils/supabase/server";

// --- Types ---
import { GallMeta } from "../type/gallType";
import { PostListData } from "../type/postType";
import {
  POST_LIST_ITEM_PER_PAGE,
  POST_LIST_LIKE_CUT,
} from "../constants/post-constants";
import { maskIpAddress } from "@/app/utils/maskIpAddress";

export async function fetchGallListData(
  sort?: "popular" | "newest",
  size?: number
): Promise<GallMeta[]> {
  const supabase = await createClient();

  const query = supabase.from("galls").select("abbr,name");

  if (sort === "newest") query.order("id", { ascending: false });
  if (sort === "popular") query.order("today_post_count", { ascending: false });
  if (size) query.limit(size);

  const { data, error } = await query;

  if (error) {
    console.error(error);

    return [];
  }

  return data;
}

export async function fetchPostListData({
  abbr,
  page = 1,
  isPopular,
  search,
  option,
}: {
  abbr?: string;
  page: number;
  isPopular?: boolean;
  search?: string;
  option?: string;
}): Promise<PostListData> {
  const supabase = await createClient();

  const from = (page - 1) * POST_LIST_ITEM_PER_PAGE;
  const to = from + POST_LIST_ITEM_PER_PAGE - 1;

  const query = supabase
    .from("posts")
    .select(
      "id,title,nickname,abbr,gall_name,view_count,like_count,comment_count,ip_address,created_at,is_login",
      { count: "exact" }
    )
    .range(from, to)
    .order("id", { ascending: false });

  if (abbr !== "best") query.eq("abbr", abbr);
  if (isPopular) query.gte("like_count", POST_LIST_LIKE_CUT);
  if (search && option) query.ilike(option, `%${search}%`);

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    return {
      postList: [],
      count: 0,
    };
  }

  const maskedData = data.map((item) => ({
    ...item,
    ip_address: maskIpAddress(item.ip_address),
  }));

  return {
    postList: maskedData,
    count: count ?? 0,
  };
}

export async function fetchPostListTotalPage({
  abbr,
  page = 1,
  isPopular,
  search,
  option,
}: {
  abbr?: string;
  page: number;
  isPopular?: boolean;
  search?: string;
  option?: string;
}): Promise<number> {
  const supabase = await createClient();

  const from = (page - 1) * POST_LIST_ITEM_PER_PAGE;
  const to = from + POST_LIST_ITEM_PER_PAGE - 1;

  const query = supabase
    .from("posts")
    .select("id", { count: "exact" })
    .range(from, to);

  if (abbr) query.eq("abbr", abbr);
  if (isPopular) query.gte("like_count", POST_LIST_LIKE_CUT);
  if (search && option) query.ilike(option, `%${search}%`);

  const { error, count } = await query;

  if (error) {
    console.error(error);

    return 0;
  }

  const total_page = count ? Math.ceil(count / POST_LIST_ITEM_PER_PAGE) : 0;

  return total_page;
}
