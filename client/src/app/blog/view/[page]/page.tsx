import { notion } from "@/utils/notion";
import { constants } from "@/app/common/domain/models/constants";
import { commonClassName } from "@/app/common/commonClass";
import { NotionToMarkdown } from "notion-to-md";
import { toISO8601 } from "@/app/blog/common/dateManagement";
import MarkdownRenderer from "@/utils/MarkdownRenderer";

import type { Metadata } from "next";

interface Props {
  params: {
    page: string;
  };
  searchParams: {
    title: string;
    created_at: string;
  };
}

export const generateMetadata = async ({
  searchParams,
}: Props): Promise<Metadata> => {
  const titleText = decodeURIComponent(searchParams.title);
  return {
    title: constants.createTitle(titleText),
  };
};

const PageDetail = async ({ params, searchParams }: Props) => {
  try {
    const n2m = new NotionToMarkdown({ notionClient: notion.getClient });
    const mdBlocks = await n2m.pageToMarkdown(params.page);
    const content = n2m.toMarkdownString(mdBlocks);
    const created_time = toISO8601(
      searchParams.created_at.replace(/\s/g, "+"),
      "YYYY-MM-DD"
    );

    return (
      <main>
        <div
          className={`${commonClassName.topBlank} flex flex-col gap-1 items-center`}
        >
          <h1 className={"font-bold text-4xl"}>
            {decodeURIComponent(searchParams.title)}
          </h1>
          <p className={"text-black/50 text-sm"}>작성일 : {created_time}</p>
        </div>
        <MarkdownRenderer
          content={content.parent}
          className={commonClassName.topBlank}
        />
      </main>
    );
  } catch (e) {
    return (
      <main>
        <div>
          <h1>존재하지 않는 페이지입니다.</h1>
        </div>
      </main>
    );
  }
};
export default PageDetail;
