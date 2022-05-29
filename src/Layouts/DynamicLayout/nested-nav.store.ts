import { createStore } from '@gothicgeeks/shared';
import { SoftButtonIconTypes } from '../../components/Button/SoftButton.types';

interface IDeepLink {
  description?: string;
  title: string;
  key: string;
  iconButtons?: { onClick: () => void; icon: SoftButtonIconTypes }[];
}

type IStore = {
  deepLinks: IDeepLink[];
  push: (link: IDeepLink) => void;
  goToIndex: (index: number) => void;
  pop: () => void;
  clear: () => void;
};

export const useNestedNavStore = createStore<IStore>(set => ({
  deepLinks: [],
  clear: () => set(() => ({ deepLinks: [] })),
  goToIndex: (index: number) =>
    set(({ deepLinks }) => {
      while (index > 0) {
        deepLinks.pop();
        --index;
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
