"use client";
import * as React from "react";
import { ChildrenType, AuthContext } from "./Auth";
export const AuthContextProvider = ({
  children,
}: ChildrenType): React.ReactElement => {
  const [isAuth, setIsAuth] = React.useState<boolean>(false);
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
