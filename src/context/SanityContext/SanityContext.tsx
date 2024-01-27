"use client";
import * as React from "react";
import { ChildrenType, SanityContext } from "./Sanity";

export const SanityContextProvider = ({
  children,
}: ChildrenType): React.ReactElement => {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) throw new Error("Missing Sanity Project ID");

  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!dataset) throw new Error("Missing Sanity Dataset");
  // get latest date and parse it the format YYYY-MM-DD
  const today = new Date();
  const apiVersion =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const useCdn = process.env.NODE_ENV === "production";
  return (
    <SanityContext.Provider value={{ projectId, dataset, apiVersion, useCdn }}>
      {children}
    </SanityContext.Provider>
  );
};
