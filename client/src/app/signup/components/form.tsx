"use client";

import * as React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

type SignUpFormProps = {
  email: string;
  password: string;
  PWConfirm: string;
};

const SignUpForm: React.FC = () => {
  const [running, setRunning] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<SignUpFormProps>({ mode: "onChange" });
  const pwWatcher = watch("password");
  const Router = useRouter();

  const signUpSubmit: SubmitHandler<SignUpFormProps> = async (data) => {
    if (running === true) return;

    setRunning(true);
    const { email, password } = data;
    const sendData = { email, password };
    const res = await fetch("/auth/signup/api", {
      method: "post",
      body: JSON.stringify(sendData),
    });
    const resultState = await res.status;
    const result = await res.json();
    if (resultState < 400) {
      alert("이메일을 확인하여 가입을 완료해 주세요");
      Router.push("/");
      setRunning(false);
    } else if (result.message === "email duplicationed") {
      alert("중복된 이메일 입니다");
      setRunning(false);
    } else {
      alert("실패했습니다 콘솔을 확인해 주세요");
      console.error(result.message);
      setRunning(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(signUpSubmit)}>
        <div>
          <input {...register("email")} type="email" className={"border-2"} />
        </div>
        <div>
          <input
            {...register("password", { required: true, minLength: 6 })}
            type="password"
            className={"border-2"}
          />
          {errors.password && <p>비밀번호는 최소 6자리 이상이어야 합니다</p>}
        </div>
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
                <input {...field} type="password" className={"border-2"} />
                {errors.PWConfirm && <p>{errors.PWConfirm.message}</p>}
              </>
            );
          }}
        />
        <div>
          <input type="submit" value="가입" />
        </div>
      </form>
      {running && (
        <div
          className={
            "absolute inset-0 bg-black/10 flex justify-center items-center"
          }
        >
          진행중...
        </div>
      )}
    </>
  );
};
export default SignUpForm;
