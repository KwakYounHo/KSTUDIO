import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "@/app/common/Adapter/supabaseConfig";
import { Database } from "@/lib/database.types";

export const supabase = createClient<Database>(
  supabaseConfig.url,
  supabaseConfig.key
);
