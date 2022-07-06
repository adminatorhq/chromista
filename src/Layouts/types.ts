import { DataStateKeys } from '@gothicgeeks/shared';
import { ReactNode } from 'react';
import { Icon } from 'react-feather';
import { SoftButtonIconTypes } from '../components/Button/SoftButton.types';

export interface ISideBarNavigation {
  title: string;
  icon: Icon;
  link?: string;
  action?: () => void;
}

export interface INavigationMenuItems {
  title: string;
  link?: string;
  action?: () => void;
}

export interface ISelectionView extends ISideBarNavigation {
  view?: ReactNode;
  viewMenuItems?: DataStateKeys<INavigationMenuItems[]>;
  description?: string;
  iconButtons?: { onClick: () => void; icon: SoftButtonIconTypes }[];
}
