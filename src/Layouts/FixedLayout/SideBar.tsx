import React from 'react';
import { ArrowLeftCircle, ArrowRightCircle } from 'react-feather';
import { BaseLeftSideNav, StyledLeftSideNavMenu } from '../BaseLeftSideNav';
import { RenderNavigation } from '../Navigation';
import { ISideBarNavigation } from './types';

interface IAppLeftSideNav {
  isSidebarOpen: boolean;
  toogleSidebar: () => void;
  navigation: ISideBarNavigation[];
}

export function AppLeftSideNav({
  isSidebarOpen,
  toogleSidebar,
  navigation,
}: IAppLeftSideNav) {
  const sideBarMenu = React.useMemo(
    () => [
      {
        title: 'Collapse Menu',
        icon: isSidebarOpen ? ArrowLeftCircle : ArrowRightCircle,
        action: toogleSidebar,
        dataTestId: 'toogle-sidebar',
      },
    ],
    [isSidebarOpen, toogleSidebar],
  );

  return (
    <BaseLeftSideNav isSidebarOpen={isSidebarOpen}>
      <StyledLeftSideNavMenu data-test-id="app-menu">
        <RenderNavigation
          navigation={navigation}
          label="Navigation"
          isSidebarOpen={isSidebarOpen}
        />
        <RenderNavigation
          navigation={sideBarMenu}
          isSidebarOpen={isSidebarOpen}
          showDash
        />
      </StyledLeftSideNavMenu>
    </BaseLeftSideNav>
  );
}
