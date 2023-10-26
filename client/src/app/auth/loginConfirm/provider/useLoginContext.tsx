"use client";

import { useContext } from "react";
import { loginContext } from "@/app/auth/loginConfirm/provider/loginContext";

export const useLoginContext = () => useContext(loginContext);
