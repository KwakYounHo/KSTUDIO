"use client";

import * as React from "react";
import MarkdownRenderer from "@/utils/MarkdownRenderer";
import dynamic from "next/dynamic";
import { Controller, useForm } from "react-hook-form";

import type { Control } from "react-hook-form";

const AceNoSSR = dynamic(() => import("@utils/AceWrapper"));

type ComponentProps = {
  control: Control;
  preArticle: string;
  name: string;
};

const EditBoard: React.FC<ComponentProps> = ({
  control,
  name,
  preArticle = "",
}) => {
  const [content, setContent] = React.useState<string>("");

  React.useEffect(() => {
    setContent(preArticle);
  }, [preArticle]);

  return (
    <div className={"flex gap-4 flex-col"}>
      <div className={"border-2"}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => {
            return (
              <AceNoSSR
                className={"w-[80rem]"}
                placeholder="마크다운 언어를 사용하면 오른쪽에 렌더링 됩니다 :)"
                defaultValue={preArticle}
                onChange={(e) => {
                  setContent(e);
                }}
                value={value}
                fontSize={14}
              />
            );
          }}
        />
      </div>
      <div className={"border-2"}>
        <MarkdownRenderer
          className={"p-2 w-[80rem] whitespace-normal overflow-wrap"}
          content={content}
        />
      </div>
    </div>
  );
};
export default EditBoard;
