"use server";

import { createClient } from "@/app/utils/supabase/server";

export async function fetchGallListData(
  sort?: "popular" | "newest",
  size?: number
) {
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
