import styled from "styled-components";
import { USE_ROOT_COLOR } from "../theme";

const TEXT_COLORS = {
  main: USE_ROOT_COLOR("main-text"),
  muted: USE_ROOT_COLOR("muted-text"),
  inverse: USE_ROOT_COLOR("text-on-primary"),
};

export type TextProps = {
  size: "1" | "2" | "3" | "4" | "5" | "6";
  color: keyof typeof TEXT_COLORS;
  weight: "light" | "regular" | "bold" | "thick";
  textStyle?: "italic";
  as: "p" | "span";
  ellipsis?: true;
};

const sizes: Record<TextProps["size"], number> = {
  1: 60,
  2: 48,
  3: 24,
  4: 18,
  5: 16,
  6: 14,
};

const weights: Record<TextProps["weight"], number> = {
  light: 300,
  regular: 400,
  bold: 500,
  thick: 600,
};

export const Text = styled.p.attrs((props: TextProps) => ({
  role: props.as || "p",
}))<Partial<TextProps>>(
  ({
    size = "4",
    color = "main",
    weight = "regular",
    textStyle,
    ellipsis,
  }) => ({
    color: TEXT_COLORS[color],
    fontStyle: textStyle || "normal",
    fontWeight: weights[weight],
    fontSize: `${sizes[size]}px`,
    lineHeight: `${sizes[size] * 1.25}px`,
    margin: 0,
    padding: 0,
    textOverflow: ellipsis ? "ellipsis" : undefined,
    whiteSpace: ellipsis ? "nowrap" : undefined,
    overflow: ellipsis ? "hidden" : undefined,
  })
);
