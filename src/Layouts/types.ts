import { DataStateKeys } from '@gothicgeeks/shared';
import { Icon } from 'react-feather';
import { SoftButtonIconTypes } from '../components/Button/SoftButton.types';

export interface ISideBarNavigation {
  title: string;
  icon: Icon;
  link?: string;
  action?: () => void;
  subMenu?: ISideBarNavigation[];
}

export interface INavigationMenuItems {
  title: string;
  link?: string;
  action?: () => void;
}

export interface ISelectionView extends ISideBarNavigation {
  view?: JSX.Element;
  viewMenuItems?: DataStateKeys<INavigationMenuItems[]>;
  description?: string;
  iconButtons?: { onClick: () => void; icon: SoftButtonIconTypes }[];
}
