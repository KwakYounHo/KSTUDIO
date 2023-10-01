import { ENV } from "@/app/common/env";

export const supabaseConfig = {
  url: ENV.NEXT_PUBLIC_SUPABASE_URL,
  key: ENV.NEXT_PUBLIC_SUPABASE_API_KEY,
};
