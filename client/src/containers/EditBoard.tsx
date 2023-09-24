"use client";

import * as React from "react";
import MarkdownRenderer from "@/utils/MarkdownRenderer";
import dynamic from "next/dynamic";

const AceNoSSR = dynamic(import("@utils/AceWrapper"), { ssr: false });

const EditBoard: React.FC = () => {
  const [content, setContent] = React.useState<string>("");
  const toRender = React.useRef<string>("");

  React.useEffect(() => {
    const saveData = setInterval(() => {
      setContent(toRender.current);
    }, 1500);
    
    return () => {
      clearInterval(saveData);
    };
  }, []);

  return (
    <div>
      <AceNoSSR
        placeholder="오늘의 기분은 어떠신가요? :)"
        onChange={(e: string) => {
          toRender.current = e;
        }}
      />
      <MarkdownRenderer content={content} />
    </div>
  );
};
export default EditBoard;
