import { Icon } from "react-feather";

export interface ISideBarNavigation {
  title: string;
  icon: Icon;
  link?: string | (() => void);
}
