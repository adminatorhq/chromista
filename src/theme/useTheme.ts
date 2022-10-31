import { useEffect } from "react";
import { DEFAULT_PRIMARY_COLOR } from "./constants";
import { generateRootColors } from "./generate";
import { DARK_MODE, LIGHT_MODE } from "./modes";
import { IColorMode } from "./types";

const getColorModeImplementation = (
  colorMode?: "light" | "dark" | IColorMode
): IColorMode => {
  if (!colorMode) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? DARK_MODE
      : LIGHT_MODE;
  }
  if (typeof colorMode === "string") {
    return colorMode === "light" ? LIGHT_MODE : DARK_MODE;
  }
  return colorMode;
};

export const useTheme = (
  themeColor?: string,
  colorMode?: "light" | "dark" | IColorMode
) => {
  useEffect(() => {
    const colorModeImplementation = getColorModeImplementation(colorMode);
    const primaryColor = themeColor || DEFAULT_PRIMARY_COLOR;
    Object.entries(
      generateRootColors(primaryColor, colorModeImplementation)
    ).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [themeColor]);
};
