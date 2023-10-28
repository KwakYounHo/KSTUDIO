import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";

export const GET = async (req: NextRequest) => {
  const requestParams = new URL(req.url).searchParams;
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  const session = await supabase.auth.getSession();

  if (session.data.session) {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "로그아웃 실패" }, { status: 400 });
    } else {
      const redirectUri = String(requestParams.get("redirectUri"));
      revalidatePath(redirectUri);

      return NextResponse.json({ redirectUri }, { status: 301 });
    }
  }
};
