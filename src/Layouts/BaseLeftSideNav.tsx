import Link from "next/link";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { USE_ROOT_COLOR } from "../theme";

const StyledLogo = styled(Link)`
  line-height: 52px;
`;

const StyledLogoSm = styled.img`
  width: 28px;
  margin-top: 16px;
`;

const StyledMenuContent = styled.div`
  height: 100%;
  padding-bottom: 30px;
`;

const StyledBrand = styled.div`
  text-align: center;
  height: 52px;
  margin-top: 8px;
`;

const Root = styled.div`
  background-color: ${USE_ROOT_COLOR("primary-color")};
  min-height: 100vh;
  transition: 0.3s;
  position: fixed;
  bottom: 0;
  top: 0;
  border-right: 1px solid ${USE_ROOT_COLOR("border-color")};
`;

interface IProps {
  logo: string;
  children: ReactNode;
}

export function BaseLeftSideNav({ children, logo }: IProps) {
  return (
    <Root>
      <StyledBrand>
        <StyledLogo href="/">
          <span>
            <StyledLogoSm
              src={logo}
              alt="logo-small"
              data-test-id="nav-menu__small-logo"
            />
          </span>
        </StyledLogo>
      </StyledBrand>
      <StyledMenuContent>{children}</StyledMenuContent>
    </Root>
  );
}
