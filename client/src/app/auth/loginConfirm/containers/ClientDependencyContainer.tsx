import * as React from "react";
import LoginContextProvider from "@/app/auth/loginConfirm/provider/loginContext";

const ClientDependencyContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <LoginContextProvider>{children}</LoginContextProvider>;
};
export default ClientDependencyContainer;
