import React, { ReactNode } from "react";
import { QueryProvider } from "@adminator/protozoa";
import { Toaster } from "react-hot-toast";
import { GlobalStyle } from "./Global";
import "../fonts/font-face.css";

export function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <Toaster />
      <GlobalStyle />
      {children}
    </QueryProvider>
  );
}
