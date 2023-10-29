"use client";

import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useLoginContext } from "@/app/auth/loginConfirm/provider/useLoginContext";
import { useSearchParams } from "next/navigation";

type myInput = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { register, handleSubmit } = useForm<myInput>();
  const { setState } = useLoginContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  const myOnsubmit: SubmitHandler<myInput> = async (data) => {
    const request = await fetch("/auth/login", {
      method: "post",
      body: JSON.stringify(data),
    });

    const result = await request.json();

    if (!result.error) {
      alert("로그인 성공");
      setState(true);
      const redirectUri = searchParams.get("redirectUri") || "/";
      router.push(redirectUri);
    } else if (result.error === "Invalid login credentials") {
      alert("아이디 혹은 비밀번호가 잘못 입력되었습니다.");
    } else {
      alert("지정되지 않은 에러입니다 관리자에게 문의 부탁드립니다.");
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
