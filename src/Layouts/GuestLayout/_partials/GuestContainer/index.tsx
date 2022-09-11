import React, { ReactNode } from "react";
import styled from "styled-components";
import { Container } from "styled-bootstrap-grid";
import { Stack } from "../../../../ui-blocks";

const Root = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url("/assets/images/auth-bg.jpg");
  background-position: center center;
  background-size: cover;
  background-repeat: repeat;
  background-color: rgba(0, 0, 0, 0.04);
`;

const StyledWrapperRow = styled(Stack)`
  height: 100vh;
`;

export function GuestContainer({ children }: { children: ReactNode }) {
  return (
    <Root>
      <Container>
        <StyledWrapperRow justify="center" align="center">
          {children}
        </StyledWrapperRow>
      </Container>
    </Root>
  );
}
