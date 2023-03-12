import {
  ArrowRight,
  CheckSquare,
  ChevronsLeft,
  Edit,
  Eye,
  HelpCircle,
  Plus,
  Save,
  Settings,
  Slash,
  X,
} from "react-feather";

export const ICON_MAP = {
  edit: Edit,
  add: Plus,
  save: Save,
  eye: Eye,
  settings: Settings,
  close: X,
  ban: Slash,
  check: CheckSquare,
  right: ArrowRight,
  help: HelpCircle,
  back: ChevronsLeft,
};

export type ButtonIconTypes = keyof typeof ICON_MAP;
