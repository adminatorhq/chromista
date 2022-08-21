import React from "react";
import styled from "styled-components";
import { StyledCard } from "../Card";
import { Text } from "../../ui-blocks/Text";

const StyledWrapper = styled.div`
  text-align: center;
  margin: 30px;
  margin-bottom: 20px;
`;

export function SelectAnItem() {
  return (
    <StyledCard>
      <StyledWrapper>
        <img src="/assets/svgs/select.svg" alt="0" width="100px" />
        <br />
        <br />
        <Text color="muted">I display selected items</Text>
      </StyledWrapper>
    </StyledCard>
  );
}
