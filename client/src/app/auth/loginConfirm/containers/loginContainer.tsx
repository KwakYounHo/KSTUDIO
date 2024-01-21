"use client";

import * as React from "react";
import { useLoginContext } from "@/app/auth/loginConfirm/provider/useLoginContext";
import LoginButton from "@/app/auth/loginConfirm/component/LoginButton";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const LoginContainer: React.FC = () => {
  const router = useRouter();
  const { state, setState } = useLoginContext();

  const pathname = usePathname();
  const searchParams = useSearchParams().toString();

  const redirectUri = `redirectUri=${encodeURIComponent(
    pathname + (searchParams ? "?" + searchParams : "")
  )}`;

  React.useEffect(() => {
    fetch("/auth/is-logged-in")
      .then((result) => result.json())
      .then((result) => setState(result.isLoggedIn));
  }, [setState]);

  React.useEffect(() => {
    router.refresh();
  }, [state]);

  return (
    <LoginButton
      isLoggedIn={state}
      setIsLogin={setState}
      redirectUri={redirectUri}
    />
  );
};
export default LoginContainer;
