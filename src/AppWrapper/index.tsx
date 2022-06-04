import React from 'react';
import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, themeContext } from './Global';
import { QueryProvider } from '@gothicgeeks/shared';

export const AppWrapper = (props: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <ThemeProvider theme={themeContext}>
        <GlobalStyle />
        {props.children}
      </ThemeProvider>
    </QueryProvider>
  );
};
