import { DataStateKeys } from "@hadmean/protozoa";
import { ReactNode } from "react";
import { Icon } from "react-feather";
import { SoftButtonIconTypes } from "../components/Button/SoftButton.types";

export interface INavigationMenuItems {
  title: string;
  searchKeywordsField?: string;
  action: string | (() => void);
}

export interface ISelectionView {
  title: string;
  icon: Icon;
  action?: string | (() => void);
  view?: ReactNode;
  viewMenuItems?: DataStateKeys<INavigationMenuItems[]>;
  description?: string;
  iconButtons?: { action: () => void; icon: SoftButtonIconTypes }[];
}
