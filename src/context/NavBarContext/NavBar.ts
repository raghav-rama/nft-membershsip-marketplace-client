"use client";
import * as React from "react";

export type Link = {
  id: number;
  link: string;
};

interface ILinks {
  links: Link[];
}

interface IConnected {
  connected: boolean;
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IConnectClicked {
  connectClicked: boolean;
  setConnectClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

interface INav {
  nav: boolean;
  setNav: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IRecoveredAddress {
  recoveredAddress: string;
  setRecoveredAddress: React.Dispatch<React.SetStateAction<string>>;
}

export const NavBarContext = React.createContext<
  ILinks & IConnected & IConnectClicked & INav & IRecoveredAddress
>({
  links: [],
  connected: false,
  setConnected: () => {},
  connectClicked: false,
  setConnectClicked: () => {},
  nav: false,
  setNav: () => {},
  recoveredAddress: "",
  setRecoveredAddress: () => {},
});

export type ChildrenType = {
  children?: React.ReactElement | React.ReactElement[] | undefined;
};
