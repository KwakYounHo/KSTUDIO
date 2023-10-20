"use client";

import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { clientSupabase } from "@/utils/supabase";

type myInput = {
  email: string;
  password: string;
};

const myOnsubmit: SubmitHandler<myInput> = async (data) => {
  console.log(data);
};

const MyForm: React.FC = async () => {
  const { register, handleSubmit } = useForm<myInput>();
  return (
    <form onSubmit={handleSubmit(myOnsubmit)}>
      <input
        {...register("email")}
        type="email"
        className={"border-2 border-black"}
      />
      <input
        {...register("password")}
        type="password"
        className={"border-2 border-black"}
      />
      <input {...register} type="submit" />
    </form>
  );
};
export default MyForm;
