import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";

export const GET = async (req: NextRequest) => {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code");

  console.log("리퀘스트 유알엘 : " + requestUrl);
  console.log("코드 : " + requestUrl.searchParams.get("code"));

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore,
    });
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(requestUrl.origin);
};
