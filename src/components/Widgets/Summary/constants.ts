import { ChevronsDown, ChevronsUp, Icon } from "react-feather";
import { SYSTEM_COLORS, USE_ROOT_COLOR } from "../../../theme";

export const DirectionImplementation: Record<
  "up" | "down" | "side",
  {
    color: string;
    label: string;
    Icon: Icon;
  }
> = {
  down: {
    Icon: ChevronsDown,
    label: "Down",
    color: SYSTEM_COLORS.danger,
  },
  up: {
    Icon: ChevronsUp,
    label: "Up",
    color: SYSTEM_COLORS.success,
  },
  side: {
    Icon: () => null,
    label: "Side",
    color: USE_ROOT_COLOR("main-text"),
  },
};
