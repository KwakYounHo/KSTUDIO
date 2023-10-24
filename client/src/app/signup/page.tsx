import * as React from "react";
import SignUpForm from "@/app/signup/components/form";
import { constants } from "@/app/common/domain/models/constants";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: constants.createTitle("Sign Up"),
};

const SignUp: React.FC = async () => {
  return <SignUpForm />;
};
export default SignUp;
