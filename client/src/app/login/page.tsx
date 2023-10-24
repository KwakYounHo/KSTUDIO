import * as React from "react";
import LoginForm from "@/app/login/components/form";
import { constants } from "@/app/common/domain/models/constants";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: constants.createTitle("Sign Up"),
};

const Login: React.FC = async () => {
  return <LoginForm />;
};
export default Login;
