import {
  ArrowRight,
  ChevronsLeft,
  Edit,
  Eye,
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
  eye: Eye,
  right: ArrowRight,
  help: HelpCircle,
  back: ChevronsLeft,
};

export type SoftButtonIconTypes = keyof typeof ICON_MAP;
