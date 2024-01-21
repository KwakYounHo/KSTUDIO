import databaseAdapter from "@/app/blog/adapter/supabase";
import { Database } from "@/lib/database.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const updateData = await req.json();
  const database = databaseAdapter(
    createRouteHandlerClient<Database>({ cookies })
  );

  const { data, error } = await database.updatePost({ ...updateData });
  const option = (statusCode: number) => {
    return { status: statusCode, headers: { "Cache-Control": "no-store" } };
  };

  if (error) return NextResponse.json(error, option(400));
  if (data) {
    const redirectURL = new URL(
      `/blog/view/${data[0].slug}?seq=${data[0].seq}`,
      req.url
    );
    return NextResponse.json(redirectURL, option(200));
  } else {
    return NextResponse.json("알 수 없는 오류 : 데이터 없음", option(400));
  }
};
