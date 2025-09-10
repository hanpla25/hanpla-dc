import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

// --- Utils ---
import { maskIpAddress } from "@/app/utils/maskIpAddress";

// --- Constants ---
import { POST_LIST_ITEM_PER_PAGE, POST_LIST_LIKE_CUT } from "../constants/post";

// --- Types ---
import { GallMeta } from "../types/gall";
import { PostListData } from "../types/post";

export async function fetchGallList(
  order?: "popular" | "newest",
  size?: number
): Promise<GallMeta[]> {
  const supabase = await createClient();

  const query = supabase.from("galls").select("abbr,name");

  if (order === "newest") query.order("id", { ascending: false });
  if (order === "popular") query.order("todayPostCount", { ascending: false });
  if (size) query.limit(size);

  const { data, error } = await query;

  if (error) {
    console.error(error);

    return [];
  }

  return data;
}

export async function fetchGallName(abbr: string): Promise<string> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("galls")
    .select("name")
    .eq("abbr", abbr)
    .single();

  if (error) {
    console.error(error);

    redirect("/");
  }

  return data.name;
}

export async function fetchPostListData({
  abbr,
  page,
  isPopular,
  search,
  option,
}: {
  abbr: string;
  page: number;
  isPopular: boolean;
  search?: string;
  option?: string;
}): Promise<PostListData> {
  const supabase = await createClient();

  const from = (page - 1) * POST_LIST_ITEM_PER_PAGE;
  const to = from + POST_LIST_ITEM_PER_PAGE - 1;

  const query = supabase
    .from("posts")
    .select(
      "id,title,nickname,abbr,gallName,viewCount,likeCount,commentCount,ipAddress,createdAt,isLogin",
      { count: "exact" }
    )
    .range(from, to)
    .order("id", { ascending: false });

  if (abbr !== "best") query.eq("abbr", abbr);
  if (isPopular) query.gte("likeCount", POST_LIST_LIKE_CUT);
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
    ip_address: maskIpAddress(item.ipAddress),
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
  abbr: string;
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

  if (abbr !== "best") query.eq("abbr", abbr);
  if (isPopular) query.gte("likeCount", POST_LIST_LIKE_CUT);
  if (search && option) query.ilike(option, `%${search}%`);

  const { error, count } = await query;

  if (error) {
    console.error(error);

    return 0;
  }

  const total_page = count ? Math.ceil(count / POST_LIST_ITEM_PER_PAGE) : 0;

  return total_page;
}
