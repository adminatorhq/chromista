import React, { ReactNode } from "react";
import { QueryProvider } from "@hadmean/protozoa";
import { Toaster } from "react-hot-toast";
import { GlobalStyles } from "./GlobalStyles";
import "../fonts/font-face.css";

export function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <Toaster />
      <GlobalStyles />
      <></>
      {children}
    </QueryProvider>
  );
}
