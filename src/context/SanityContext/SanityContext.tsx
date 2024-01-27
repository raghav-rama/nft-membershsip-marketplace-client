"use client";
import * as React from "react";
import { ChildrenType, SanityContext } from "./Sanity";
import { createClient } from "next-sanity";

export const SanityContextProvider = ({
  children,
}: ChildrenType): React.ReactElement => {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) throw new Error("Missing Sanity Project ID");

  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!dataset) throw new Error("Missing Sanity Dataset");
  // get latest date and parse it the format YYYY-MM-DD
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // pad with '0' if month is single digit
  const date = String(today.getDate()).padStart(2, "0"); // pad with '0' if date is single digit
  const apiVersion = `${year}-${month}-${date}`;

  const useCdn = process.env.NODE_ENV === "production";
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
  });
  return (
    <SanityContext.Provider
      value={{ projectId, dataset, apiVersion, useCdn, client }}
    >
      {children}
    </SanityContext.Provider>
  );
};
