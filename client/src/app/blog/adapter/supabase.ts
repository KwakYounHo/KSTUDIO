import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

export const blogSupabase = (client: SupabaseClient<Database>) => {
  const findList = async () => {
    const { data: posts, error: selectError } = await client
      .from("posts")
      .select("seq, title, slug, created_at")
      .order("seq", { ascending: false });
    return posts;
  };
  const selectSlug = async (slug: string) => {
    const { data: post, error: selectError } = await client
      .from("posts")
      .select("*")
      .eq("slug", slug);

    return post;
  };
  return { findList, selectSlug };
};
