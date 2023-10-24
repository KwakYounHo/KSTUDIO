import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { Database } from "@/lib/database.types";
import { cookies } from "next/headers";

import type { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();
  const cookieStrore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStrore,
  });
  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${req.nextUrl.origin + "/auth/callback"}`,
    },
  });

  if (signUpError) {
    console.log(signUpError);
    if (signUpError.message === "Email rate limit exceeded") {
      return NextResponse.json(
        { message: "email duplicationed" },
        { status: 429 }
      );
    }
    return NextResponse.json({ message: signUpError }, { status: 400 });
  }
  return NextResponse.json({ message: "success" }, { status: 201 });
};
