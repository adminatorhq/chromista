import React, { useMemo } from "react";
import { BaseLeftSideNav } from "../BaseLeftSideNav";
import { RenderNavigation } from "../Navigation";
import { useSideBarStore } from "../sidebar.store";
import { ISideBarNavigation } from "../types";
import { useNestedNavStore } from "./nested-nav.store";

interface IProps {
  navigation: ISideBarNavigation[];
}

export function PrimaryLeftSideNav({ navigation }: IProps) {
  const isSidebarOpen = false;

  const [selectMiniSideBar, currentMiniSideBar, closeFullSideBar] =
    useSideBarStore((state) => [
      state.selectMiniSideBar,
      state.currentMiniSideBar,
      state.closeFullSideBar,
    ]);

  const clearDeepLinks = useNestedNavStore((state) => state.clear);

  const navigationToUse = useMemo(
    () =>
      navigation.map(({ link, title, ...rest }) => ({
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
      })),
    [navigation, selectMiniSideBar, clearDeepLinks]
  );

  return (
    <BaseLeftSideNav isSidebarOpen={isSidebarOpen}>
      <RenderNavigation
        navigation={navigationToUse}
        isSidebarOpen={isSidebarOpen}
        currentLink={currentMiniSideBar}
        showDash
      />
    </BaseLeftSideNav>
  );
}
