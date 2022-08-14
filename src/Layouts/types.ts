import { DataStateKeys } from "@gothicgeeks/shared";
import { ReactNode } from "react";
import { Icon } from "react-feather";
import { SoftButtonIconTypes } from "../components/Button/SoftButton.types";

export interface ISideBarNavigation {
  title: string;
  icon: Icon;
  action: string | (() => void);
}

export interface INavigationMenuItems {
  title: string;
  searchKeywordsField?: string;
  action: string | (() => void);
}

export interface ISelectionView extends ISideBarNavigation {
  view?: ReactNode;
  viewMenuItems?: DataStateKeys<INavigationMenuItems[]>;
  description?: string;
  iconButtons?: { action: () => void; icon: SoftButtonIconTypes }[];
}
