import { ArrowDownLeft, ArrowUpRight, Icon } from "react-feather";
import { SYSTEM_COLORS, USE_ROOT_COLOR } from "../../../AppWrapper/colors";

export const DirectionImplementation: Record<
  "up" | "down" | "side",
  {
    color: string;
    Icon: Icon;
  }
> = {
  down: {
    Icon: ArrowDownLeft,
    color: SYSTEM_COLORS.danger,
  },
  up: {
    Icon: ArrowUpRight,
    color: SYSTEM_COLORS.success,
  },
  side: {
    Icon: () => null,
    color: USE_ROOT_COLOR("main-text"),
  },
};
