import { createStore } from "@adminator/protozoa";
import { SoftButtonIconTypes } from "../../components/Button/SoftButton.types";

interface IDeepLink {
  description?: string;
  title: string;
  key: string;
  iconButtons?: { action: () => void; icon: SoftButtonIconTypes }[];
}

type IStore = {
  deepLinks: IDeepLink[];
  push: (link: IDeepLink) => void;
  goToIndex: (index: number) => void;
  pop: () => void;
  clear: () => void;
};

export const useNestedNavStore = createStore<IStore>((set) => ({
  deepLinks: [],
  clear: () => set(() => ({ deepLinks: [] })),
  goToIndex: (index: number) =>
    set(({ deepLinks }) => {
      let loopIndex = index;
      while (loopIndex > 0) {
        deepLinks.pop();
        loopIndex -= 1;
      }
    }),
  pop: () => {
    set(({ deepLinks }) => {
      deepLinks.pop();
    });
  },
  push: (link: IDeepLink) =>
    set(({ deepLinks }) => {
      deepLinks.push(link);
    }),
}));
