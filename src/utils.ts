import { SYSTEM_COLORS } from "./AppWrapper/colors";

interface IGetColor {
  color?: keyof typeof SYSTEM_COLORS;
}

const percentToHex = (inputPercent: number): string => {
  const percent = Math.max(0, Math.min(100, inputPercent));
  const intValue = Math.round((percent / 100) * 255);
  const hexValue = intValue.toString(16);
  return hexValue.padStart(2, "0").toUpperCase();
};

export const getColor =
  (opacity = 1) =>
  (props: IGetColor) => {
    const color = SYSTEM_COLORS[props.color || "accent"];
    if (opacity === 1) {
      return color;
    }
    return color + percentToHex(opacity * 100);
  };
