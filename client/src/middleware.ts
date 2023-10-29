import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && req.nextUrl.pathname === "/login") {
    const redirectUri = req.nextUrl.searchParams.get("redirectUri");
    return NextResponse.redirect(new URL(redirectUri || "/", req.url), {
      status: 302,
    });
  }

  return res;
}

export const config = {
  matcher: ["/login"],
};
