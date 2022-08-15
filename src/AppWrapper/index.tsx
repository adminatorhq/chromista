import React, { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { QueryProvider } from "@adminator/protozoa";
import { Toaster } from "react-hot-toast";
import { GlobalStyle, themeContext } from "./Global";

export function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider theme={themeContext}>
        <Toaster />
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
}
