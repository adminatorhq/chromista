import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { StyledMutedText } from '../../../styles/Text';

interface IEmptyWrapper {
  text: string;
  hideIcon?: true;
  border?: boolean;
  children?: ReactNode;
}

export const EmptyWrapper: React.FC<IEmptyWrapper> = ({ text, hideIcon, border, children }) => {
  return (
    <StyledWrapper border={!!border}>
      {hideIcon ? null : <img src="/assets/svgs/empty.svg" alt="0" width="100px" />}
      <br />
      <br />
      <StyledText> {text} </StyledText>
      {children}
    </StyledWrapper>
  );
};

const StyledText = styled(StyledMutedText)`
  margin-bottom: 0;
`;

const StyledWrapper = styled.div<{ border: boolean }>`
  text-align: center;
  padding: 30px;
  padding-bottom: 20px;
  border-radius: 0.25rem;
  background: ${props => props.theme.colors.white};
  ${({ border }) =>
    border &&
    css`
      border: 1px solid ${props => props.theme.colors.border};
    `}
`;
