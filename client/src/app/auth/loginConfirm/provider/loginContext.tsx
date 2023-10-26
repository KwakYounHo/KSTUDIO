"use client";

import * as React from "react";

export const loginContext = React.createContext<{
  state: boolean;
  setState(value: boolean): void;
}>({ state: false, setState: () => {} });

const LoginContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isLoggedIn, setIsLogin] = React.useState<boolean>(false);
  return (
    <loginContext.Provider value={{ state: isLoggedIn, setState: setIsLogin }}>
      {children}
    </loginContext.Provider>
  );
};
export default LoginContextProvider;
