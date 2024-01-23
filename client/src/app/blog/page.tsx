import * as React from "react";
import { Metadata } from "next";
import { constants } from "@/app/common/domain/models/constants";
import databaseAdapter from "@/app/blog/adapter/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { commonClassName } from "@/app/common/commonClass";
import Link from "next/link";
import { cookies } from "next/headers";
import { toISO8601 } from "@/app/blog/common/dateManagement";

import type { Database } from "@/lib/database.types";

export const metadata: Metadata = {
  title: constants.createTitle("Blog"),
};

const Blog = async (): Promise<React.JSX.Element> => {
  const cookieStroe = cookies();
  const supabase = databaseAdapter(
    createServerComponentClient<Database>({ cookies: () => cookieStroe })
  );

  const posts = await supabase.findList();
  const isLogin = await supabase.isManager();

  return (
    <>
      {isLogin && (
        <Link href={"/blog/create"}>
          <button type={"button"} className={"border-2"}>
            생성
          </button>
        </Link>
      )}
      <ul className={`${commonClassName.topBlank} grid gap-10`}>
        {posts
          ? posts.map((element) => {
              return (
                <li key={element.seq} className={"text-center border-b-2"}>
                  <Link href={`/blog/view/${element.slug}?seq=${element.seq}`}>
                    <div className={"flex items-end gap-5 justify-between"}>
                      <p className={"text-sm"}>{element.seq}.</p>
                      <p className={"text-2xl"}>{element.title}</p>
                      <p className={"text-sm"}>
                        작성일: {toISO8601(element.created_at, "YYYY-MM-DD")}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })
          : null}
      </ul>
    </>
  );
};

export default Blog;
