import React from 'react';
import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, themeContext } from './Global';

export const AppWrapper = (props: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={themeContext}>
      <GlobalStyle />
      {props.children}
    </ThemeProvider>
  );
};
