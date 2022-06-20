import React, { useMemo } from 'react';
import { BaseLeftSideNav } from '../BaseLeftSideNav';
import { RenderNavigation } from '../Navigation';
import { useSideBarStore } from '../sidebar.store';
import { ISideBarNavigation } from '../types';
import { useNestedNavStore } from './nested-nav.store';

interface IProps {
  navigation: ISideBarNavigation[];
}

export const PrimaryLeftSideNav: React.FC<IProps> = ({ navigation }) => {
  const isSidebarOpen = false;

  const [
    selectMiniSideBar,
    currentMiniSideBar,
    closeFullSideBar,
  ] = useSideBarStore(state => [
    state.selectMiniSideBar,
    state.currentMiniSideBar,
    state.closeFullSideBar,
  ]);

  const clearDeepLinks = useNestedNavStore(state => state.clear);

  const navigationToUse = useMemo(() => {
    return navigation.map(({ link, title, ...rest }) => {
      return {
        ...rest,
        link,
        title,
        action: () => {
          if (link) {
            closeFullSideBar();
            clearDeepLinks();
            return;
          }
          selectMiniSideBar(title);
          clearDeepLinks();
        },
      };
    });
  }, [navigation, selectMiniSideBar, clearDeepLinks]);

  return (
    <BaseLeftSideNav isSidebarOpen={isSidebarOpen}>
      <RenderNavigation
        navigation={navigationToUse}
        isSidebarOpen={isSidebarOpen}
        currentLink={currentMiniSideBar}
        showDash={true}
      />
    </BaseLeftSideNav>
  );
};
