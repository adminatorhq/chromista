import React, { ReactNode } from 'react';
import noop from 'lodash/noop';
import styled from 'styled-components';
import { StyledMutedText } from '../../styles/Text';
// import Empty  from "../../icons/empty.svg";

export interface IProps {
  text: string;
  hideIcon?: true;
  children?: ReactNode;
}

const StyledText = styled(StyledMutedText)`
  margin-bottom: 0;
`;

const StyledWrapper = styled.div`
  text-align: center;
  padding: 30px;
  padding-bottom: 20px;
  border-radius: 0.25rem;
  background: ${(props) => props.theme.colors.white};
`;

export function EmptyWrapper({
  text,
  hideIcon,
  children,
}: IProps) {
  noop(hideIcon);
  return (
    <StyledWrapper>
      {/* {hideIcon ? null : <img src={Empty} alt="0" width="100px" />} */}
      <br />
      <br />
      <StyledText>
        {' '}
        {text}
        {' '}
      </StyledText>
      {children}
    </StyledWrapper>
  );
}
