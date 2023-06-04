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
  LogIn,
  Square,
} from "react-feather";

export const ICON_MAP = {
  logIn: LogIn,
  edit: Edit,
  add: Plus,
  save: Save,
  eye: Eye,
  settings: Settings,
  close: X,
  ban: Slash,
  square: Square,
  check: CheckSquare,
  right: ArrowRight,
  help: HelpCircle,
  back: ChevronsLeft,
};

export type ButtonIconTypes = keyof typeof ICON_MAP;
