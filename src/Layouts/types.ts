import { DataStateKeys } from "@hadmean/protozoa";
import { ReactNode } from "react";
import { Icon } from "react-feather";
import { SoftButtonIconTypes } from "../components/Button/SoftButton.types";

export interface INavigationMenuItems {
  title: string;
  searchKeywords?: string;
  secondaryAction?: () => void;
  action: string | (() => void);
}

export interface ISelectionView {
  title: string;
  icon: Icon;
  action?: string | (() => void);
  secondaryAction?: () => void;
  view?: ReactNode;
  viewMenuItems?: DataStateKeys<INavigationMenuItems[]>;
  description?: string;
  iconButtons?: { action: () => void; icon: SoftButtonIconTypes }[];
}
