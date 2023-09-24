"use client";

import * as React from "react";
import MarkdownRenderer from "@/utils/MarkdownRenderer";
import dynamic from "next/dynamic";

const AceNoSSR = dynamic(() => import("@utils/AceWrapper"));

const EditBoard: React.FC = () => {
  const [content, setContent] = React.useState<string>("");

  return (
    <div className={"flex"}>
      <div className={'border-2'}>
        <AceNoSSR
          placeholder="마크다운 언어를 사용하면 오른쪽에 렌더링 됩니다 :)"
          onChange={(e: string) => {
            setContent(e);
          }}
          fontSize={14}
        />
      </div>
      <div className={'border-2'}>
        <MarkdownRenderer
          className={"text-4xl"}
          style={{ padding: "0.5rem", width: 500 }}
          content={content}
        />
      </div>
    </div>
  );
};
export default EditBoard;
