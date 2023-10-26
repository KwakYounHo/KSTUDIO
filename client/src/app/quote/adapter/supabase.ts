import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

export const quoteSupabase = (client: SupabaseClient<Database>) => {
  const getQuoteAll = async () => {
    const { data: quote, error } = await client
      .from("quote")
      .select("*")
      .order("id", { ascending: false });
    return { quote, error };
  };

  return { getQuoteAll };
};
