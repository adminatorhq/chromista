import Link from 'next/link';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

export const BaseLeftSideNav: React.FC<{
  isSidebarOpen: boolean;
  children: ReactNode;
}> = ({ isSidebarOpen, children }) => {
  return (
    <StyledLeftSideNav isSidebarOpen={isSidebarOpen}>
      <StyledBrand>
        <StyledLogo href="/">
          <>
            <span>
              <StyledLogoSm
                src="/assets/images/logo-sm-dark.png"
                alt="logo-small"
                data-test-id="nav-menu__small-logo"
              />
            </span>
            <span>
              <StyledLogoLarge
                isSidebarOpen={isSidebarOpen}
                src="/assets/images/logo.png"
                alt="logo-large"
                data-test-id="nav-menu__large-logo"
              />
            </span>
          </>
        </StyledLogo>
      </StyledBrand>
      <StyledMenuContent>{children}</StyledMenuContent>
    </StyledLeftSideNav>
  );
};

const StyledLogo = styled(Link)`
  line-height: 52px;
`;

const StyledLogoSm = styled.img`
  height: 22px;
`;

const StyledMenuContent = styled.div`
  height: 100%;
  padding-bottom: 30px;
  height: 100%;
`;

const StyledBrand = styled.div`
  text-align: center;
  height: 52px;

  @media (max-width: 1024px) {
    display: none;
    width: 70px;
  }
`;

const StyledLogoLarge = styled.img<{ isSidebarOpen: boolean }>`
  height: 14px;
  margin-left: 4px;
  display: ${props => (props.isSidebarOpen ? 'inline-block' : 'none')};
`;

export const StyledLeftSideNavMenu = styled.ul`
  padding-left: 0;
  margin-bottom: 0;
  padding: 13px;

  hr:first-child {
    display: none;
  }
`;

const StyledLeftSideNav = styled.div<{ isSidebarOpen: boolean }>`
  max-width: ${props => (props.isSidebarOpen ? 220 : 50)}px;
  min-width: ${props => (props.isSidebarOpen ? 220 : 50)}px;
  background-color: ${props => props.theme.colors.theme};
  min-height: 100vh;
  transition: 0.3s;
  position: fixed;
  bottom: 0;
  top: 0;
  border-right: 1px solid ${props => props.theme.colors.border};
  @media (max-width: 1024px) {
    position: absolute;
    overflow-y: auto;
    z-index: 10;
    bottom: 0;
    top: 52px;
    margin-top: 0;
  }
`;
