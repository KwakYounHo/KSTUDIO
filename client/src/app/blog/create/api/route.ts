import databaseAdapter from "@/app/blog/adapter/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";
import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
  const requestBody = await req.json();
  const database = databaseAdapter(
    createRouteHandlerClient<Database>({ cookies })
  );
  const { data, error } = await database.insertPost(requestBody);

  const option = (statusCode: number) => {
    return { status: statusCode, headers: { "Cache-Control": "no-store" } };
  };

  if (error) return NextResponse.json(error, option(400));
  if (data) {
    const redirectURL = new URL(
      `/blog/view/${data[0].slug}?seq=${data[0].seq}`,
      req.url
    );
    return NextResponse.json(redirectURL, option(201));
  }
};
