"use client";

import * as React from "react";
import EditArticle from "@/app/blog/containers/EditArticle";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

type CreateForm = {
  title: string;
  article: string;
  slug: string;
};

const CreateContainer: React.FC = () => {
  const router = useRouter();
  const form = useForm<CreateForm>();
  const { register, setValue, handleSubmit } = form;
  const [content, setContent] = React.useState<string>("");

  React.useEffect(() => {
    setValue("article", content);
  }, [content]);

  const submit: SubmitHandler<CreateForm> = async (data) => {
    data.slug = encodeURIComponent(data.title);

    const request = await fetch("/blog/create/api", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (request.status < 400) {
      router.push(await request.json());
      router.refresh();
    } else {
      alert("게시물 생성에 실패하였습니다");
      console.error(await request.json());
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`w-full flex flex-col gap-5`}
    >
      <input type="text" {...register("title")} className={"w-full border-2"} />
      <EditArticle content={content} setContent={setContent} />
      <input
        type="submit"
        value={"생성"}
        className={"w-full border-2 m-auto"}
      />
    </form>
  );
};
export default CreateContainer;
