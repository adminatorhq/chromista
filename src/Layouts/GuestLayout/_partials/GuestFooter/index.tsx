import React from "react";
import styled from "styled-components";
import { StyledCardBody } from "../../../../styles/Card";
import { Text, Stack } from "../../../../ui-blocks";

const Root = styled(StyledCardBody)`
  background-color: ${(props) => props.theme.colors.softBackground};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

interface IProps {
  name?: string;
}

export function GuestFooter({ name }: IProps) {
  return (
    <Root>
      <Stack justify="center">
        <Text as="span" size="5">
          {name || "My Site"} © 2022
        </Text>
      </Stack>
    </Root>
  );
}
