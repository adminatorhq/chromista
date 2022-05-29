import React, { ReactNode } from 'react';
import noop from 'lodash/noop';
import styled, { css } from 'styled-components';
import { StyledMutedText } from '../../styles/Text';
// import Empty  from "../../icons/empty.svg";

export interface IProps {
  text: string;
  hideIcon?: true;
  border?: boolean;
  children?: ReactNode;
}

export const EmptyWrapper: React.FC<IProps> = ({
  text,
  hideIcon,
  border,
  children,
}) => {
  noop(hideIcon);
  return (
    <StyledWrapper border={!!border}>
      {/* {hideIcon ? null : <img src={Empty} alt="0" width="100px" />} */}
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
