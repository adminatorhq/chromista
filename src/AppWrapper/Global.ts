import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";
import { ROOT_COLORS, USE_ROOT_COLOR } from "./colors";

const rootColorString = Object.entries(ROOT_COLORS)
  .map(([key, value]) => `--hadmean-${key}: ${value}`)
  .join(";");

export const GlobalStyle = createGlobalStyle`
*,
*::before,
*::after {
  box-sizing: border-box
}

${normalize()}

:root {
  ${rootColorString};
}

html {
  font-family: "Inter", sans-serif;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: relative;
  min-height: 100%
}

body {
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
  color: ${USE_ROOT_COLOR("main-text")};
  background-color: ${USE_ROOT_COLOR("base-color")};
  min-height: 100vh;
  letter-spacing: 0.1px;
  line-height: 1.5;
  position: relative
}

[tabindex="-1"]:focus:not(:focus-visible) {
  outline: 0 !important
}

p {
  margin-top: 0;
  margin-bottom: 1rem;
  line-height: 1.6;
  font-size: 1rem;
  font-weight: 400
}

a {
  font-family: "Inter", sans-serif;
  color: ${USE_ROOT_COLOR("primary-color")};
  text-decoration: none;
  background-color: transparent
}

a:hover {
  color: ${USE_ROOT_COLOR("primary-color")};
}


hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid ${USE_ROOT_COLOR("border-color")};
  box-sizing: content-box;
  height: 0;
  overflow: visible
}

button {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  overflow: visible;
  border-radius: 0;
  text-transform: none;
  -webkit-appearance: button
}

button:focus {
  outline: 1px dotted;
  outline: 5px auto -webkit-focus-ring-color
}

button::-moz-focus-inner {
  padding: 0;
  border-style: none
}

* {
  outline: none !important
}

@media (max-width: 1024px) {
  body {
      display: block !important
  }
}

@media print {

  *,
  *::before,
  *::after {
      text-shadow: none !important;
      box-shadow: none !important
  }

  a:not(.btn) {
      text-decoration: underline
  }

  img {
      page-break-inside: avoid
  }

  p {
      orphans: 3;
      widows: 3
  }

  @page {
      size: a3
  }

  body {
      min-width: 992px !important
  }

  .container {
      min-width: 992px !important
  }
  .badge {
      border: 1px solid #000
  }
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
  margin-bottom: .5rem;
  font-weight: 500;
  line-height: 1.2;
  color: ${USE_ROOT_COLOR("main-text")};

}
button:not(:disabled), [type="button"]:not(:disabled), [type="reset"]:not(:disabled), [type="submit"]:not(:disabled) {
  cursor: pointer;
}

svg {
  overflow: hidden;
  vertical-align: middle;
}

fieldset {
  min-width: 0;
  padding: 0;
  margin: 0;
  border: 0
}

input {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  overflow: visible;
}

textarea {
  overflow: auto;
  resize: vertical;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

input[type="checkbox"] {
  box-sizing: border-box;
  padding: 0
}

::-webkit-file-upload-button {
  font: inherit;
  -webkit-appearance: button
}

body.react-confirm-alert-body-element {
  overflow: hidden;
}

.react-confirm-alert-blur {
  filter: url(#gaussian-blur);
  filter: blur(2px);
  -webkit-filter: blur(2px);
}

.react-confirm-alert-svg {
  position: absolute;
  top: 0;
  left: 0;
}

.fade {
  transition: opacity .15s linear;
}

.offcanvas-backdrop{
position: fixed;
top: 0;
left: 0;
z-index: 1040;
width: 100vw;
height: 100vh;
background-color: #000;

  &.fade{
      opacity: 0;
  }

  &.show{
    opacity: 0.5;
  }
}
`;
