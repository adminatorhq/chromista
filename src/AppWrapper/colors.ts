export const ROOT_COLORS = {
  "main-text": "#5f6270",
  "inverse-text": "#ffffff",
  "muted-text": "#a4abc5",

  "primary-color": "#4b38b3",
  "primary-shade-color": "#4b38b31A",
  "border-color": "#e3ebf6",
  "soft-color": "#f1f5fa",
  "base-color": "#ffffff",
  "foundation-color": "#f3f6f9",
};

export const USE_ROOT_COLOR = (color: keyof typeof ROOT_COLORS) => {
  return `var(--hadmean-${color})`;
};

export const SYSTEM_COLORS = {
  danger: "#f5325c",
  black: "#000",
  white: "#fff",
  warning: "#ffb822",
  info: "#12a4ed",
  success: "#03d87f",
};

export const TEXT_COLORS = {
  main: USE_ROOT_COLOR("main-text"),
  muted: USE_ROOT_COLOR("muted-text"),
  inverse: USE_ROOT_COLOR("inverse-text"),
};
