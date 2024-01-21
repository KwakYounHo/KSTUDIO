"use client";

import * as React from "react";
import AceWrapper from "@/utils/AceWrapper";
import MarkdownRenderer from "@/utils/MarkdownRenderer";

type Props = React.ComponentProps<"div"> & {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
};

const EditArticle = ({
  content,
  setContent,
  className,
  ...props
}: Props): JSX.Element => {
  return (
    <>
      <div {...props} className={`${className} flex flex-col`}>
        <AceWrapper
          content={content}
          setContent={setContent}
          value={content}
          width={"100%"}
        />
        <MarkdownRenderer content={content} />
      </div>
    </>
  );
};
export default EditArticle;
