import { DefaultTheme } from 'styled-components';
import { ColorTypes } from './types';

const hexToRgba = (hex: string, opacity: number): string => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? 'rgba(' +
        parseInt(result[1], 16) +
        ',' +
        parseInt(result[2], 16) +
        ',' +
        parseInt(result[3], 16) +
        ',' +
        opacity +
        ')'
    : '';
};

interface IGetColor {
  color?: ColorTypes;
  theme: DefaultTheme;
}

export const getColor = (opacity = 1) => (props: IGetColor) => {
  const color = props.theme.colors[props.color || 'primary'];
  if (opacity === 1) {
    return color;
  }
  return hexToRgba(color, opacity);
};
