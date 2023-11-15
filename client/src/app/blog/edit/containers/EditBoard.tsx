"use client";

import * as React from "react";
import MarkdownRenderer from "@/utils/MarkdownRenderer";
import dynamic from "next/dynamic";

const AceNoSSR = dynamic(() => import("@utils/AceWrapper"));

type ComponentProps = {
  article: string;
};

const EditBoard: React.FC<ComponentProps> = ({ article = "" }) => {
  const [content, setContent] = React.useState<string>("");

  React.useEffect(() => {
    setContent(article);
  }, [article]);

  return (
    <div className={"flex gap-4"}>
      <div className={"border-2"}>
        <AceNoSSR
          placeholder="마크다운 언어를 사용하면 오른쪽에 렌더링 됩니다 :)"
          onChange={(e: string) => {
            setContent(e);
          }}
          defaultValue={article}
          fontSize={14}
        />
      </div>
      <div className={"border-2"}>
        <MarkdownRenderer className={"p-2 w-[500px]"} content={content} />
      </div>
    </div>
  );
};
export default EditBoard;
