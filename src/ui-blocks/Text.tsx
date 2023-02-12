import React, { ReactNode } from "react";
import styled from "styled-components";
import { SYSTEM_COLORS, USE_ROOT_COLOR } from "../theme";

const TEXT_COLORS = {
  main: USE_ROOT_COLOR("main-text"),
  muted: USE_ROOT_COLOR("muted-text"),
  inverse: USE_ROOT_COLOR("text-on-primary"),
  danger: SYSTEM_COLORS.danger,
};

export type TextProps = {
  size: "1" | "2" | "3" | "4" | "5" | "6";
  color: keyof typeof TEXT_COLORS;
  weight: "light" | "regular" | "bold" | "thick";
  textStyle?: "italic";
  as: "p" | "span";
  ellipsis?: true;
  children: ReactNode;
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

const Text = styled.p.attrs((props: TextProps) => ({
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

type EscapeTypoProps = Partial<TextProps>;
type TypoProps = Omit<EscapeTypoProps, "size">;

export function Typo(
  props: Partial<TypoProps> & {
    P: (props: TypoProps) => Element;
    Small: (props: TypoProps) => Element;
    Tiny: (props: TypoProps) => Element;
    Large: (props: TypoProps) => Element;
    XLarge: (props: TypoProps) => Element;
    Escape: (props: TypoProps & { size: TextProps["size"] }) => Element;
  }
) {
  return <Text {...props} />;
}

Typo.Escape = function Escape(props: TypoProps & { size: TextProps["size"] }) {
  return <Text {...props} />;
};

Typo.XL = function XLarge(props: TypoProps) {
  return <Text {...props} size="2" />;
};

Typo.L = function Large(props: TypoProps) {
  return <Text {...props} size="3" />;
};

Typo.MD = function Medium(props: TypoProps) {
  return <Text {...props} size="4" />;
};

Typo.SM = function Small(props: TypoProps) {
  return <Text {...props} size="5" />;
};

Typo.XS = function XSmall(props: TypoProps) {
  return <Text {...props} size="6" />;
};
