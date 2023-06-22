import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import { Spacer, Stack } from "../../../ui-blocks";
import { BREAKPOINTS } from "../../../constants";

interface IProps {
  children: ReactNode;
}

export const GridRoot = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 3fr 9fr;
  @media (max-width: ${BREAKPOINTS.md}) {
    grid-template-columns: 1fr;
  }
`;

export type TContentLayout = ((params: IProps) => ReactElement) & {
  Left: (params: IProps) => ReactElement;
  Right: (params: IProps) => ReactElement;
  Center: (params: IProps) => ReactElement;
};

// eslint-disable-next-line react/function-component-definition
export const ContentLayout: TContentLayout = ({ children }: IProps) => {
  return <GridRoot>{children}</GridRoot>;
};

ContentLayout.Left = function SectionLeft({ children }: IProps) {
  return (
    <div>
      {children}
      <Spacer />
    </div>
  );
};

ContentLayout.Right = function SectionRight({ children }: IProps) {
  return <div>{children}</div>;
};

ContentLayout.Center = function SectionCenter({ children }: IProps) {
  return (
    <Stack justify="center">
      <div style={{ maxWidth: "900px", width: "100%" }}>{children}</div>
    </Stack>
  );
};
