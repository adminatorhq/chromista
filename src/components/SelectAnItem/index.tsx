import React from 'react';
import styled from 'styled-components';
import { StyledCard } from '../../styles/Card';
import { StyledMutedText } from '../../styles/Text';

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
        <StyledMutedText>I display selected items</StyledMutedText>
      </StyledWrapper>
    </StyledCard>
  );
}
