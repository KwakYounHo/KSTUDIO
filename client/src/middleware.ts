import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { ENV } from "@/app/common/env";

import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // check url
  if (user && req.nextUrl.pathname === "/login") {
    const redirectUri = req.nextUrl.searchParams.get("redirectUri");
    return NextResponse.redirect(new URL(redirectUri || "/", req.url), {
      status: 302,
    });
  }

  if (req.nextUrl.pathname.includes("/blog/edit/")) {
    if (!user) {
      return NextResponse.redirect(new URL("/404", req.url), { status: 302 });
    } else {
      if (user.id !== ENV.MANAGER_ID) {
        return NextResponse.redirect(new URL("/404", req.url), { status: 302 });
      }
    }
  }

  if (req.nextUrl.pathname.includes("/blog/create")) {
    if (!user) {
      return NextResponse.redirect(new URL("/404", req.url), { status: 302 });
    } else {
      if (user.id !== ENV.MANAGER_ID) {
        return NextResponse.redirect(new URL("/404", req.url), { status: 302 });
      }
    }
  }

  return res;
}

export const config = {
  matcher: ["/login", "/blog/edit/:path*", "/blog/create"],
};
