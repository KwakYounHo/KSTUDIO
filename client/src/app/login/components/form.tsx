"use client";

import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { clientSupabase } from "@/utils/supabase";

type myInput = {
  email: string;
  password: string;
  PWCheck: string;
};

const myOnsubmit: SubmitHandler<myInput> = async (data) => {
  console.log(data);
};

const LoginForm: React.FC = () => {
  const { register, handleSubmit, watch } = useForm<myInput>();
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
      <input type="submit" value="로그인" />
    </form>
  );
};
export default LoginForm;
