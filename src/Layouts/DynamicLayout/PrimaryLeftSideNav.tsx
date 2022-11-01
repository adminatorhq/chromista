import React, { useCallback, useMemo } from "react";
import { Stack } from "../../ui-blocks";
import { BaseLeftSideNav } from "../BaseLeftSideNav";
import { RenderNavigation } from "../Navigation";
import { useSideBarStore } from "../sidebar.store";
import { ISelectionView } from "../types";
import { useNestedNavStore } from "./nested-nav.store";

interface IProps {
  logo: string;
  navigation: ISelectionView[];
  secondaryNavigation: ISelectionView[];
}

export function PrimaryLeftSideNav({
  logo,
  navigation,
  secondaryNavigation,
}: IProps) {
  const isSidebarOpen = false;

  const [selectMiniSideBar, currentMiniSideBar, closeFullSideBar] =
    useSideBarStore((state) => [
      state.selectMiniSideBar,
      state.currentMiniSideBar,
      state.closeFullSideBar,
    ]);

  const clearDeepLinks = useNestedNavStore((state) => state.clear);

  const mapMapNavigationToUse = useCallback(
    (navigation$1: ISelectionView[]) => {
      return navigation$1.map(({ action, title, ...rest }) => ({
        ...rest,
        action,
        title,
        sideBarAction: () => {
          if (typeof action === "string") {
            closeFullSideBar();
          } else {
            selectMiniSideBar(title);
          }
          clearDeepLinks();
        },
      }));
    },
    [selectMiniSideBar, clearDeepLinks]
  );

  const navigationToUse = useMemo(
    () => mapMapNavigationToUse(navigation),
    [navigation]
  );

  const secondaryNavigationToUse = useMemo(
    () => mapMapNavigationToUse(secondaryNavigation),
    [secondaryNavigation]
  );

  return (
    <BaseLeftSideNav isSidebarOpen={isSidebarOpen} logo={logo}>
      <Stack
        justify="space-between"
        direction="column"
        style={{ height: "calc(100% - 42px)" }}
      >
        <div>
          <RenderNavigation
            navigation={navigationToUse}
            isSidebarOpen={isSidebarOpen}
            currentLink={currentMiniSideBar}
            showDash
          />
        </div>
        <div>
          <RenderNavigation
            navigation={secondaryNavigationToUse}
            isSidebarOpen={isSidebarOpen}
            currentLink={currentMiniSideBar}
            showDash
          />
        </div>
      </Stack>
    </BaseLeftSideNav>
  );
}
