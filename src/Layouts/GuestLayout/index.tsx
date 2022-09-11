import React, { ReactNode } from "react";
import { Col } from "styled-bootstrap-grid";
import styled from "styled-components";
import { GuestFooter, GuestHeader, GuestContainer } from "./_partials";
import { StyledCardBody } from "../../components/Card";

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
  box-shadow: 0 4px 6px 0 rgb(85 85 85 / 9%), 0 1px 20px 0 rgb(0 0 0 / 8%),
    0px 1px 11px 0px rgb(0 0 0 / 6%);
  border-radius: 24px;
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
          <StyledCardBody>{children}</StyledCardBody>
          <GuestFooter name={appDetails.name} />
        </Root>
      </Col>
    </GuestContainer>
  );
}
