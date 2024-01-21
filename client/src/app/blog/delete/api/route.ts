import { type NextRequest, NextResponse } from "next/server";
import databaseAdapter from "@/app/blog/adapter/supabase";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

export const DELETE = async (req: NextRequest) => {
  const database = databaseAdapter(
    createRouteHandlerClient<Database>({ cookies })
  );
  const target = req.nextUrl.searchParams.get("seq");

  const option = (statusCode: number) => {
    return { status: statusCode, headers: { "Cache-Control": "no-store" } };
  };

  if (!target) return NextResponse.json("잘못 된 인식 번호", option(400));
  if (target) {
    const error = await database.deletepost(target);
    if (error) return NextResponse.json(error, option(400));

    const redirectURL = new URL("/blog", req.url);
    return NextResponse.json(redirectURL, option(200));
  }
};
