export const ROOT_COLORS = {
  "main-text": "#5f6270",
  "inverse-text": "#ffffff",
  "muted-text": "#a4abc5",

  "primary-color": "#0B5D6B",
  "accent-color": "#0B5D6B",
  "border-color": "#e3ebf6",
  "soft-color": "#f1f5fa",
  "base-color": "#ffffff",
  "foundation-color": "rgb(243, 246, 249)",
};

export const USE_ROOT_COLOR = (color: keyof typeof ROOT_COLORS) => {
  return `var(--adminator-${color})`;
};

export const SYSTEM_COLORS = {
  accent: "#0B5D6B", // USE_ROOT_COLOR("accent-color"),
  danger: "#f5325c",
  warning: "#ffb822",
  info: "#12a4ed",
  success: "#03d87f",
};

export const TEXT_COLORS = {
  main: USE_ROOT_COLOR("main-text"),
  muted: USE_ROOT_COLOR("muted-text"),
  inverse: USE_ROOT_COLOR("inverse-text"),
};
