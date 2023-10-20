import { cleanEnv, str } from "envalid";

export const ENV = cleanEnv(
  {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_API_KEY: process.env.NEXT_PUBLIC_SUPABASE_API_KEY,
  },
  {
    NEXT_PUBLIC_SUPABASE_URL: str(),
    NEXT_PUBLIC_SUPABASE_API_KEY: str(),
  }
);
