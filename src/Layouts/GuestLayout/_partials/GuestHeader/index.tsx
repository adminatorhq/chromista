import React from "react";
import styled from "styled-components";
import { USE_ROOT_COLOR } from "../../../../AppWrapper/colors";
import { StyledCardBody } from "../../../../styles/Card";
import { Spacer, Text } from "../../../../ui-blocks";

const Root = styled(StyledCardBody)`
  background-color: ${USE_ROOT_COLOR("primary-color")};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 0px;
  text-align: center;
  padding: 1rem;
`;

interface IProps {
  title: string;
  subTitle?: string;
  logo?: string;
  homeLink?: string;
}

export function GuestHeader({
  title,
  subTitle,
  logo = "/assets/images/logo.svg",
  homeLink = "/",
}: IProps) {
  return (
    <Root>
      <a href={homeLink}>
        <img src={logo} height="50" alt="logo" />
        <Spacer />
        <Text color="inverse" data-test-id="guest__header">
          {title}
        </Text>
        <Spacer size="xs" />
        {subTitle ? (
          <Text color="muted" size="5">
            {subTitle}
          </Text>
        ) : null}
      </a>
    </Root>
  );
}
