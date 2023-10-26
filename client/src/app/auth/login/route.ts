import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";

export const POST = async (req: NextRequest) => {
  const requestParams = new URL(req.url).searchParams;

  const supabase = createRouteHandlerClient<Database>({ cookies });
  const { email, password } = await req.json();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  const redirectUri = String(requestParams.get("redirectUri") || "/");
  revalidatePath(redirectUri);

  if (error) {
    console.log("에러 이름 : " + error.message);
    if (error.message === "Invalid login credentials") {
      return NextResponse.json(
        { error: "Invalid login credentials" },
        { status: 200 }
      );
    }
    console.error(`로그인 중 지정되지 않은 에러 : ${error}`);
    return NextResponse.json({ error: error }, { status: 422 });
  }
  return NextResponse.json("login Success", { status: 201 });
};
