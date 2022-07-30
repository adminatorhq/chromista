import React, { ReactNode } from "react";
import * as StyledGrid from "styled-bootstrap-grid";
import { GuestFooter, GuestHeader, GuestContainer } from "./_partials";
import { StyledCard, StyledCardBody } from "../../styles/Card";

export interface IProps {
  children: ReactNode;
  title: string;
  subTitle?: string;
  appDetails?: {
    logo?: string;
    homeLink?: string;
    name?: string;
  };
}

export function GuestLayout({
  children,
  title,
  subTitle,
  appDetails = {},
}: IProps) {
  return (
    <GuestContainer>
      <StyledGrid.Col lg={5}>
        <GuestHeader title={title} subTitle={subTitle} {...appDetails} />
        <StyledCard>
          <StyledCardBody>{children}</StyledCardBody>
          <GuestFooter name={appDetails.name} />
        </StyledCard>
      </StyledGrid.Col>
    </GuestContainer>
  );
}
