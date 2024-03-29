import type { SupabaseClient, PostgrestError } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";
import { ENV } from "@/app/common/env";

type PostRows = Database["public"]["Tables"]["posts"]["Row"];
type UpdateData = Pick<PostRows, "article" | "title" | "updated_at"> & {
  seq: string;
};

export default (client: SupabaseClient<Database>) => {
  const isManager = async () => {
    const { data } = await client.auth.getSession();
    const user = data.session?.user.id;
    return user === ENV.MANAGER_ID;
  };

  const findList = async () => {
    const { data, error } = await client
      .from("posts")
      .select("seq, title, slug, created_at")
      .order("seq", { ascending: false });
    return data;
  };

  const selectSlugSeq = async (slug: string, seq: string) => {
    const { data, error } = await client
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("seq", seq);
    return { data, error };
  };

  const insertPost = async (
    insertData: Pick<PostRows, "article" | "title" | "slug">
  ) => {
    const { data, error } = await client
      .from("posts")
      .insert([{ ...insertData }])
      .select();
    return { data, error };
  };

  const deletePost = async (seq: string): Promise<void | PostgrestError> => {
    const { error } = await client.from("posts").delete().eq("seq", seq);
    if (error) return error;
    return;
  };

  const updatePost = async ({ seq, ...updateData }: UpdateData) => {
    const { data, error } = await client
      .from("posts")
      .update({ ...updateData })
      .eq("seq", seq)
      .select();
    return { data, error };
  };

  return {
    findList,
    selectSlugSeq,
    insertPost,
    isManager,
    deletePost,
    updatePost,
  };
};
