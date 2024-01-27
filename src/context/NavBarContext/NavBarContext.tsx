"use client";
import * as React from "react";
import { ChildrenType, Link, NavBarContext } from "./NavBar";
export const NavBarContextProvider = ({
  children,
}: ChildrenType): React.ReactElement => {
  const links: Link[] = [
    {
      id: 1,
      link: "artists",
    },
    {
      id: 2,
      link: "memberships",
    },
    {
      id: 3,
      link: "discover",
    },
    {
      id: 4,
      link: "trending",
    },
    {
      id: 5,
      link: "about",
    },
  ];
  const [connected, setConnected] = React.useState<boolean>(false);
  const [connectClicked, setConnectClicked] = React.useState<boolean>(false);
  const [nav, setNav] = React.useState<boolean>(false);
  return (
    <NavBarContext.Provider
      value={{
        links,
        connected,
        setConnected,
        connectClicked,
        setConnectClicked,
        nav,
        setNav,
      }}
    >
      {children}
    </NavBarContext.Provider>
  );
};
