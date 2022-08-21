import { css } from "styled-components";
import { SYSTEM_COLORS, USE_ROOT_COLOR } from "../../../AppWrapper/colors";

export const SelectStyles = css`
  .react-select__control {
    &:hover {
      border: 1px solid ${USE_ROOT_COLOR("border-color")};
    }
    &:focus {
      color: ${USE_ROOT_COLOR("main-text")};
      background-color: ${USE_ROOT_COLOR("base-color")};
      border-color: ${USE_ROOT_COLOR("primary-color")};
      outline: 0;
    }
    .react-select__single-value {
      color: ${USE_ROOT_COLOR("main-text")};
      font-size: 0.8125rem;
    }
    border: 1px solid ${USE_ROOT_COLOR("border-color")};
  }

  &.invalid {
    border-color: ${SYSTEM_COLORS.danger} !important;
  }
`;

export const SharedSelectProps = {
  classNamePrefix: "react-select",
};
