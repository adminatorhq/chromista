import React from 'react';
import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, themeContext } from './Global';
import { QueryProvider } from '@gothicgeeks/shared';
import { Toaster } from 'react-hot-toast';

export const AppWrapper = (props: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <ThemeProvider theme={themeContext}>
        <Toaster />
        <GlobalStyle />
        {props.children}
      </ThemeProvider>
    </QueryProvider>
  );
};
