"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
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
        void fetch(logoutPath)
          .then((response) => response.json())
          .then((result) => {
            const redirectUri = result.redirectUri || "/";
            setIsLogin(false);
            router.refresh;
            router.push(redirectUri);
          });
      }}
    >
      <button>로그아웃</button>
    </a>
  ) : (
    <Link href={loginPath}>
      <button>로그인</button>
    </Link>
  );
};
export default LoginButton;
