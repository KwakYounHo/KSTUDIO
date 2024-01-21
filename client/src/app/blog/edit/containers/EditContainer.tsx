"use client";

import * as React from "react";
import EditArticle from "@/app/blog/containers/EditArticle";
import { useForm, type SubmitHandler } from "react-hook-form";

type Props = {
  data: {
    article: string;
    created_at: string;
    seq: number;
    slug: string;
    title: string;
    updated_at: string | null;
  }[];
};

type EditForm = {
  title: string;
  seq: string;
  article: string;
  updated_at: string;
};

const EditContainer: React.FC<Props> = ({ data }) => {
  const from = useForm<EditForm>();
  const { register, setValue, handleSubmit } = from;
  const [content, setContent] = React.useState<string>("");

  React.useEffect(() => {
    setContent(data[0].article);
  }, []);

  React.useEffect(() => {
    setValue("article", content);
  }, [content]);

  const submit: SubmitHandler<EditForm> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={"w-full flex flex-col gap-5"}
    >
      <input
        type="text"
        className={"w-full"}
        {...(register("title"), { defaultValue: data[0].title })}
      />
      <EditArticle content={content} setContent={setContent} />
      <input
        type="submit"
        value={"수정"}
        className={"w-full border-2 m-auto"}
      />
    </form>
  );
};
export default EditContainer;
