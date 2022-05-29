import { Icon } from 'react-feather';
import { SoftButtonIconTypes } from '../Button/SoftButton.types';

export interface ISideBarNavigation {
  title: string;
  icon: Icon;
  link?: string;
  action?: () => void;
  dataTestId: string;
  subMenu?: ISideBarNavigation[];
}

export interface ISelectionView extends ISideBarNavigation {
  view: JSX.Element;
  description: string;
  iconButtons?: { onClick: () => void; icon: SoftButtonIconTypes }[];
}
