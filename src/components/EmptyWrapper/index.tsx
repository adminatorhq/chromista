import React, { ReactNode } from "react";
import noop from "lodash/noop";
import styled from "styled-components";
import { Text } from "../../ui-blocks";
import { USE_ROOT_COLOR } from "../../AppWrapper/colors";

export interface IProps {
  text: string;
  hideIcon?: true;
  children?: ReactNode;
}

const StyledWrapper = styled.div`
  text-align: center;
  padding: 30px;
  padding-bottom: 20px;
  border-radius: 0.25rem;
  background: ${USE_ROOT_COLOR("base-color")};
`;

export function EmptyWrapper({ text, hideIcon, children }: IProps) {
  noop(hideIcon);
  return (
    <StyledWrapper>
      {/* {hideIcon ? null : <img src={Empty} alt="0" width="100px" />} */}
      <br />
      <br />
      <Text color="muted"> {text} </Text>
      {children}
    </StyledWrapper>
  );
}
