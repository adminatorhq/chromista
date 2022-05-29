import { createStore } from '@gothicgeeks/shared';

type IStore = {
  currentMiniSideBar?: string;
  isFullSideBarOpen: boolean;
  closeFullSideBar: () => void;
  selectMiniSideBar: (selection: string) => void;
};

export const useSideBarStore = createStore<IStore>(set => ({
  currentMiniSideBar: undefined,
  isFullSideBarOpen: true,
  closeFullSideBar: () =>
    set(() => ({
      currentMiniSideBar: undefined,
      isFullSideBarOpen: false,
    })),
  selectMiniSideBar: (selection: string) =>
    set(({ currentMiniSideBar, isFullSideBarOpen }) => ({
      currentMiniSideBar: selection,
      isFullSideBarOpen: currentMiniSideBar === selection ? !isFullSideBarOpen : true,
    })),
}));
