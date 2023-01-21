import React from "react";
import styled from "styled-components";
import { USE_ROOT_COLOR } from "../../../../theme";
import { StyledCardBody } from "../../../../components/Card";
import { Spacer, Text } from "../../../../ui-blocks";

const Root = styled(StyledCardBody)`
  background-color: ${USE_ROOT_COLOR("primary-color")};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
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
  logo = "/assets/images/logo.png",
  homeLink = "/",
}: IProps) {
  return (
    <Root>
      <a href={homeLink}>
        <img src={logo} height="50" alt="logo" />
        <Spacer />
        <Text color="inverse">{title}</Text>
        <Spacer size="xs" />
        {subTitle ? (
          <Text size="6" color="inverse">
            {subTitle}
          </Text>
        ) : null}
      </a>
    </Root>
  );
}
