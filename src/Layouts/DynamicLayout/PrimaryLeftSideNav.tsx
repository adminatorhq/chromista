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

  const [selectMiniSideBar, currentMiniSideBar] = useSideBarStore(state => [
    state.selectMiniSideBar,
    state.currentMiniSideBar,
  ]);

  const clearDeepLinks = useNestedNavStore(state => state.clear);

  const navigationToUse = useMemo(() => {
    return navigation.map(({ link, ...rest }) => {
      return {
        ...rest,
        link,
        action: () => {
          selectMiniSideBar(link as string);
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
