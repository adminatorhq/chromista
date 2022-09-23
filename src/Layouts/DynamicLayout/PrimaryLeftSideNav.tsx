import React, { useMemo } from "react";
import { Settings } from "react-feather";
import { Stack } from "../../ui-blocks";
import { BaseLeftSideNav } from "../BaseLeftSideNav";
import { RenderNavigation } from "../Navigation";
import { useSideBarStore } from "../sidebar.store";
import { ISelectionView } from "../types";
import { useNestedNavStore } from "./nested-nav.store";

interface IProps {
  navigation: ISelectionView[];
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
      navigation.map(({ action, title, ...rest }) => ({
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
      })),
    [navigation, selectMiniSideBar, clearDeepLinks]
  );

  return (
    <BaseLeftSideNav isSidebarOpen={isSidebarOpen}>
      <Stack
        justify="space-between"
        direction="column"
        style={{ height: "calc(100% - 50px)" }}
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
            navigation={[
              {
                icon: Settings,
                action: () => {},
                sideBarAction: () => {},
                title: "Hello",
              },
            ]}
            isSidebarOpen={isSidebarOpen}
            currentLink={currentMiniSideBar}
            showDash
          />
        </div>
      </Stack>
    </BaseLeftSideNav>
  );
}
