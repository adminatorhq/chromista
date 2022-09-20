import { css } from "styled-components";
import { SYSTEM_COLORS, USE_ROOT_COLOR } from "../../../AppWrapper/colors";

export const SelectStyles = css`
  .react-select__control {
    &:hover {
      border: 1px solid ${USE_ROOT_COLOR("primary-color")};
    }
    .react-select__placeholder {
      color: ${USE_ROOT_COLOR("main-text")};
      font-size: 0.8125rem;
    }
    .react-select__single-value {
      color: ${USE_ROOT_COLOR("main-text")};
      font-size: 0.8125rem;
    }
    box-shadow: none;
    border: 1px solid ${USE_ROOT_COLOR("border-color")};
  }

  .react-select__option {
    padding: 4px 8px;
    text-align: left;
    font-size: 14px;
  }

  .react-select__option--is-focused {
    background: ${USE_ROOT_COLOR("primary-shade-color")};
  }

  .react-select__option--is-selected {
    background: ${USE_ROOT_COLOR("primary-color")};
  }

  .react-select__multi-value {
    background: ${USE_ROOT_COLOR("primary-shade-color")};
  }

  &.invalid {
    border-color: ${SYSTEM_COLORS.danger} !important;
  }
`;

export const SharedSelectProps = {
  classNamePrefix: "react-select",
};
