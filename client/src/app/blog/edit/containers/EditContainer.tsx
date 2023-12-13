"use client";

import * as React from "react";
import EditBoard from "@/app/blog/containers/EditBoard";
import { useForm } from "react-hook-form";

type EditContainerProps = {
  article: string;
};

const EditContainer: React.FC<EditContainerProps> = ({ article }) => {
  const { control } = useForm();
  return (
    <form>
      <EditBoard control={control} name="EditArticle" preArticle={article} />
    </form>
  );
};
export default EditContainer;
