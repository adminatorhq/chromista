import React, { ReactNode } from "react";
import { Col } from "styled-bootstrap-grid";
import styled from "styled-components";
import { GuestFooter, GuestHeader, GuestContainer } from "./_partials";
import { SHADOW_CSS, StyledCardBody } from "../../components/Card";

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

const Root = styled.div`
  ${SHADOW_CSS}
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-width: 0px;
`;

export function GuestLayout({
  children,
  title,
  subTitle,
  appDetails = {},
}: IProps) {
  return (
    <GuestContainer>
      <Col lg={5}>
        <Root>
          <GuestHeader title={title} subTitle={subTitle} {...appDetails} />
          <StyledCardBody radiusLess>{children}</StyledCardBody>
          <GuestFooter name={appDetails.name} />
        </Root>
      </Col>
    </GuestContainer>
  );
}
