// isAuth.tsx

"use client";
import * as React from "react";
import { AuthContext } from "@/context/AuthContext/Auth";
import { redirect } from "next/navigation";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { isAuth } = React.useContext(AuthContext);

    React.useEffect(() => {
      if (!isAuth) {
        return redirect("/");
      }
    }, []);

    if (!isAuth) {
      return null;
    }

    return <Component {...props} />;
  };
}
