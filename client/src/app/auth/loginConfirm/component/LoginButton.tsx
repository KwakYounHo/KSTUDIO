"use client";

import * as React from "react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  isLoggedIn: boolean;
  setIsLogin(value: boolean): void;
  redirectUri: string;
};

const LoginButton: React.FC<Props> = ({
  isLoggedIn,
  setIsLogin,
  redirectUri,
}) => {
  const router = useRouter();

  const loginPath = `/login?${redirectUri}`;
  const logoutPath = `/auth/logout?${redirectUri}`;

  return isLoggedIn ? (
    <a
      href={logoutPath}
      onClick={(e) => {
        e.preventDefault();
        fetch(logoutPath)
          .then((response) => response.json())
          .then((result) => {
            if (result.error) alert("로그아웃 실패");
            setIsLogin(false);
            router.push(result.redirectUri);
          });
      }}
      className={"absolute top-2 right-2"}
    >
      <button>로그아웃</button>
    </a>
  ) : (
    <Link href={loginPath} className={"absolute top-2 right-2 opacity-0"}>
      <button>로그인</button>
    </Link>
  );
};
export default LoginButton;
