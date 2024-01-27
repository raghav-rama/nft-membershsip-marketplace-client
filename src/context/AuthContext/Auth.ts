"use client";
import * as React from "react";

interface IAuth {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = React.createContext<IAuth>({
  isAuth: false,
  setIsAuth: () => {},
});

export type ChildrenType = {
  children?: React.ReactElement | React.ReactElement[] | undefined;
};
