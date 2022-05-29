import React, { ReactNode } from 'react';
import * as StyledGrid from 'styled-bootstrap-grid';

export const SectionRow: React.FC<{ children: ReactNode }> = ({ children }) => (
  <StyledGrid.Container fluid={true}>
    <StyledGrid.Row>{children}</StyledGrid.Row>
  </StyledGrid.Container>
);

export const SectionLeft: React.FC<{ children: ReactNode }> = ({
  children,
}) => (
  <StyledGrid.Col sm={12} lg={3}>
    {children}
  </StyledGrid.Col>
);

export const SectionRight: React.FC<{ children: ReactNode }> = ({
  children,
}) => (
  <StyledGrid.Col sm={12} lg={9}>
    {children}
  </StyledGrid.Col>
);

export const SectionCenter: React.FC<{ children: ReactNode }> = ({
  children,
}) => (
  <SectionRow>
    <StyledGrid.Col sm={12} lg={8} lgOffset={2}>
      {children}
    </StyledGrid.Col>
  </SectionRow>
);
