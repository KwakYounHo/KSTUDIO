"use client";

import * as React from "react";
import EditArticle from "@/app/blog/containers/EditArticle";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toUTC } from "@/app/blog/common/dateManagement";
import { useRouter } from "next/navigation";

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
  seq: number;
  article: string;
  updated_at: string;
};

const EditContainer: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const from = useForm<EditForm>();
  const { register, setValue, handleSubmit } = from;
  const [content, setContent] = React.useState<string>("");

  React.useEffect(() => {
    setContent(data[0].article);
  }, []);

  React.useEffect(() => {
    setValue("article", content);
  }, [content]);

  const submit: SubmitHandler<EditForm> = async (formData) => {
    formData.seq = data[0].seq;
    formData.updated_at = toUTC(new Date(Date.now()));

    const request = await fetch("/blog/edit/api", {
      method: "PATCH",
      body: JSON.stringify(formData),
    });

    if (request.status < 400) {
      router.push(await request.json());
      router.refresh();
    } else {
      alert("업데이트 중 오류");
      console.error(await request.json());
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={"w-full flex flex-col gap-5"}
    >
      <input
        type="text"
        className={"w-full"}
        {...register("title", { value: data[0].title })}
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
