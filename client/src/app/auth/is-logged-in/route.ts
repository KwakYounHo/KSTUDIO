import { NextRequest } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { Database } from "@/lib/database.types";

export const GET = async (req: NextRequest) => {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
  const session = (await supabase.auth.getSession()).data.session;

  return NextResponse.json({ isLoggedIn: !!session }, { status: 200 });
};
