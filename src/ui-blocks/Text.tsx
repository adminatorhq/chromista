import styled from 'styled-components';
import { TEXT_COLORS } from '../constants/colors';

export type TextProps = {
  size: '1' | '2' | '3' | '4' | '5' | '6';
  color: keyof typeof TEXT_COLORS;
  weight: 'light' | 'regular' | 'bold' | 'thick';
  as: 'p' | 'span';
};

const sizes: Record<TextProps['size'], number> = {
  1: 60,
  2: 48,
  3: 24,
  4: 18,
  5: 14,
  6: 12,
};

const weights: Record<TextProps['weight'], number> = {
  light: 300,
  regular: 400,
  bold: 500,
  thick: 600,
};

export const Text = styled.p.attrs((props: TextProps) => ({
  role: props.as || 'p',
}))<Partial<TextProps>>(
  ({ size = '4', color = 'primary', weight = 'regular' }) => ({
    color: TEXT_COLORS[color],
    fontWeight: weights[weight],
    fontSize: `${sizes[size]}px`,
    lineHeight: `${sizes[size] * 1.25}px`,
    margin: 0,
    padding: 0,
  })
);
