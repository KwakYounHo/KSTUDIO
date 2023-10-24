"use client";

import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

type myInput = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { register, handleSubmit } = useForm<myInput>();
  const Router = useRouter();

  const myOnsubmit: SubmitHandler<myInput> = async (data) => {
    const request = await fetch("/auth/login/api", {
      method: "post",
      body: JSON.stringify(data),
    });

    const resultStatus = await request.status;

    if (resultStatus < 400) {
      alert("로그인 성공");
      Router.push("/");
    }
  };

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
