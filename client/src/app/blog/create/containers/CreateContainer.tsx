"use client";

import * as React from "react";
import EditBoard from "@/app/blog/containers/EditBoard";
import { useForm } from "react-hook-form";

const CreateContainer: React.FC = () => {
  const { control } = useForm();

  return (
    <form>
      <EditBoard control={control} preArticle={""} name={"createArticle"} />
    </form>
  );
};
export default CreateContainer;
