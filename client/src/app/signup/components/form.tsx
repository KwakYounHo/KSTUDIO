"use client";

import * as React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

type SignUpFormProps = {
  email: string;
  password: string;
  PWConfirm: string;
};

const signUpSubmit: SubmitHandler<SignUpFormProps> = async (data) => {
  const { email, password } = data;
  const sendData = { email, password };
  const res = await fetch("/auth/signup/api", {
    method: "post",
    body: JSON.stringify(sendData),
  });
  console.log(await res.json());
};

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<SignUpFormProps>({ mode: "onChange" });
  const pwWatcher = watch("password");
  return (
    <>
      <form onSubmit={handleSubmit(signUpSubmit)}>
        <input {...register("email")} type="email" className={"border-2"} />
        <input
          {...register("password")}
          type="password"
          className={"border-2"}
        />
        <Controller
          name="PWConfirm"
          control={control}
          defaultValue=""
          rules={{
            validate: (value) =>
              value === pwWatcher || "비밀번호가 일치하지 않습니다",
          }}
          render={({ field }) => {
            return (
              <>
                <input {...field} type="password" />
                {errors.PWConfirm && <p>{errors.PWConfirm.message}</p>}
              </>
            );
          }}
        />
        <input type="submit" value="가입" />
      </form>
    </>
  );
};
export default SignUpForm;
