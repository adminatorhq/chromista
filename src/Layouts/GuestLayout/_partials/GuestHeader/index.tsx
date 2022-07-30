import React from "react";
import styled from "styled-components";
import { StyledCardBody } from "../../../../styles/Card";
import { Spacer, Text } from "../../../../ui-blocks";

const Root = styled(StyledCardBody)`
  background-color: ${(props) => props.theme.colors.theme};
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
  logo = "/assets/images/logo-sm-dark.png",
  homeLink = "/",
}: IProps) {
  return (
    <Root>
      <a href={homeLink}>
        <img src={logo} height="50" alt="logo" />
        <Spacer />
        <Text color="white" data-test-id="guest__header">
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
