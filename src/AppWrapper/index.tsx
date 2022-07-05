import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { QueryProvider } from '@gothicgeeks/shared';
import { Toaster } from 'react-hot-toast';
import { GlobalStyle, themeContext } from './Global';

export function AppWrapper(props: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider theme={themeContext}>
        <Toaster />
        <GlobalStyle />
        {props.children}
      </ThemeProvider>
    </QueryProvider>
  );
}
