"use client";
import * as React from "react";
import { createClient } from "next-sanity";

interface ISanityContext {
  projectId: string;
  dataset: string;
  apiVersion: string;
  useCdn: boolean;
}

interface ISanityClient {
  client: ReturnType<typeof createClient>;
}

export const SanityContext = React.createContext<
  ISanityContext & ISanityClient
>({
  projectId: "",
  dataset: "",
  apiVersion: "",
  useCdn: false,
  client: createClient({
    projectId: "asdwer",
    dataset: "sfasfw",
    apiVersion: "2024-11-11",
    useCdn: false,
  }),
});

export type ChildrenType = {
  children?: React.ReactElement | React.ReactElement[] | undefined;
};
