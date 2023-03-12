import {
  ArrowRight,
  CheckSquare,
  ChevronsLeft,
  Edit,
  HelpCircle,
  Plus,
  Save,
  Settings,
  X,
} from "react-feather";

export const ICON_MAP = {
  edit: Edit,
  add: Plus,
  save: Save,
  settings: Settings,
  close: X,
  check: CheckSquare,
  right: ArrowRight,
  help: HelpCircle,
  back: ChevronsLeft,
};

export type ButtonIconTypes = keyof typeof ICON_MAP;
