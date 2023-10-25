import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";

export const GET = async (req: NextRequest) => {
  const requestParams = new URL(req.url).searchParams;
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const session = await supabase.auth.getSession();

  if (session.data.session) {
    await supabase.auth.signOut();
  }

  const redirectUri = String(requestParams.get("redirectUri") || "/");
  revalidatePath(redirectUri);

  return new Response(null, {
    status: 304,
    headers: { location: redirectUri },
  });
};
