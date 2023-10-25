import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();

  const requestParams = new URL(req.url).searchParams;

  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  const redirectUri = String(requestParams.get("redirectUri") || "/");
  revalidatePath(redirectUri);

  if (error) {
    return new Response("failed", {
      status: 400,
    });
  }
  return new Response(null, {
    status: 303,
    headers: { location: redirectUri },
  });
};
