import * as React from "react";
import { Metadata } from "next";
import { constants } from "@/app/common/domain/models/constants";
import { commonClassName } from "@/app/common/commonClass";
import Link from "next/link";
import { toISO8601 } from "@/app/blog/common/dateManagement";
import { notion } from "@/utils/notion";

export const metadata: Metadata = {
  title: constants.createTitle("Blog"),
};

const Blog = async (): Promise<React.JSX.Element> => {
  const posts = await notion.getThinkingAll();

  return (
    <>
      <ul className={`${commonClassName.topBlank} grid gap-10`}>
        {posts
          ? posts.map((element) => {
              return (
                <li key={element.seq} className={"text-center border-b-2"}>
                  <Link
                    href={`/blog/view/${element.url}?title=${element.title}&created_at=${element.created_at}`}
                  >
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
