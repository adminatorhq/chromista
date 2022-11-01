import { REPLACE_WITH_PRIMARY } from "./modes";
import { prefixVarNameSpace } from "./root";
import { IColorMode } from "./types";

export const generateRootColors = (
  primaryColor: string,
  colorMode: IColorMode
): Record<string, string> => {
  const rootColors: Record<string, string> = {};

  rootColors[prefixVarNameSpace("primary-color")] = primaryColor;
  rootColors[prefixVarNameSpace("primary-shade-color")] =
    primaryColor + colorMode["shade-opacity"];

  Object.entries(colorMode).forEach(([key, value]) => {
    rootColors[prefixVarNameSpace(key)] =
      value === REPLACE_WITH_PRIMARY ? primaryColor : value;
  });
  return rootColors;
};
