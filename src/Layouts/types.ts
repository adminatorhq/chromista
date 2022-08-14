import { DataStateKeys } from "@gothicgeeks/shared";
import { ReactNode } from "react";
import { Icon } from "react-feather";
import { SoftButtonIconTypes } from "../components/Button/SoftButton.types";

export interface ISideBarNavigation {
  title: string;
  icon: Icon;
  link?: string | (() => void);
}

export interface INavigationMenuItems {
  title: string;
  searchKeywordsField?: string;
  link?: string;
  action?: () => void;
}

export interface ISelectionView extends ISideBarNavigation {
  view?: ReactNode;
  viewMenuItems?: DataStateKeys<INavigationMenuItems[]>;
  description?: string;
  iconButtons?: { action: () => void; icon: SoftButtonIconTypes }[];
}
