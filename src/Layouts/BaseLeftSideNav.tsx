import Link from "next/link";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { USE_ROOT_COLOR } from "../theme";

const StyledLogo = styled(Link)`
  line-height: 52px;
`;

const StyledLogoSm = styled.img`
  height: 40px;
  width: 24px;
  margin-top: 16px;
`;

const StyledMenuContent = styled.div`
  height: 100%;
  padding-bottom: 30px;
  height: 100%;
`;

const StyledBrand = styled.div`
  text-align: center;
  height: 52px;
  margin-top: 8px;
`;

export const StyledLeftSideNavMenu = styled.ul`
  padding-left: 0;
  height: 100%;
  margin-bottom: 0;
  padding: 13px;

  hr:first-child {
    display: none;
  }
`;

const Root = styled.div<{ isSidebarOpen: boolean }>`
  width: ${(props) => (props.isSidebarOpen ? 220 : 50)}px;
  background-color: ${USE_ROOT_COLOR("primary-color")};
  min-height: 100vh;
  transition: 0.3s;
  position: fixed;
  bottom: 0;
  top: 0;
  border-right: 1px solid ${USE_ROOT_COLOR("border-color")};
`;

interface IProps {
  isSidebarOpen: boolean;
  children: ReactNode;
}

export function BaseLeftSideNav({ isSidebarOpen, children }: IProps) {
  return (
    <Root isSidebarOpen={isSidebarOpen}>
      <StyledBrand>
        <StyledLogo href="/">
          <span>
            <StyledLogoSm
              src="/assets/images/logo.png"
              alt="logo-small"
              data-test-id="nav-menu__small-logo"
            />
          </span>
        </StyledLogo>
      </StyledBrand>
      <StyledMenuContent>
        <StyledLeftSideNavMenu>{children}</StyledLeftSideNavMenu>
      </StyledMenuContent>
    </Root>
  );
}
