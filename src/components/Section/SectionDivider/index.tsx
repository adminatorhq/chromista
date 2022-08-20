import React, { ReactNode } from "react";
import * as StyledGrid from "styled-bootstrap-grid";
import { Spacer } from "../../../ui-blocks";

export function SectionRow({ children }: { children: ReactNode }) {
  return <StyledGrid.Row>{children}</StyledGrid.Row>;
}

export function SectionLeft({ children }: { children: ReactNode }) {
  return (
    <>
      <StyledGrid.Col sm={12} lg={3}>
        {children}
      </StyledGrid.Col>
      <Spacer />
    </>
  );
}

export function SectionRight({ children }: { children: ReactNode }) {
  return (
    <StyledGrid.Col sm={12} lg={9}>
      {children}
    </StyledGrid.Col>
  );
}

export function SectionCenter({ children }: { children: ReactNode }) {
  return (
    <SectionRow>
      <StyledGrid.Col sm={12} lg={8} lgOffset={2}>
        {children}
      </StyledGrid.Col>
    </SectionRow>
  );
}
