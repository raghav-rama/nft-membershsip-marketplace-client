"use client";
import * as React from "react";
import { createClient } from "next-sanity";

interface ISanityContext {
  projectId: string;
  dataset: string;
  apiVersion: string;
  useCdn: boolean;
}

export const SanityContext = React.createContext<ISanityContext>({
  projectId: "",
  dataset: "",
  apiVersion: "",
  useCdn: false,
});

export type ChildrenType = {
  children?: React.ReactElement | React.ReactElement[] | undefined;
};
