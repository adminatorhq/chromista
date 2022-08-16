import { css } from "styled-components";

export const SelectStyles = css`
  .react-select__control {
    &:hover {
      border: 1px solid ${(props) => props.theme.colors.border};
    }
    &:focus {
      color: ${(props) => props.theme.text.main};
      background-color: ${(props) => props.theme.colors.white};
      border-color: ${(props) => props.theme.colors.primary};
      outline: 0;
    }
    .react-select__single-value {
      color: ${(props) => props.theme.text.main};
      font-size: 0.8125rem;
    }
    border: 1px solid ${(props) => props.theme.colors.border};
  }

  &.invalid {
    border-color: ${(props) => props.theme.colors.danger} !important;
  }
`;

export const SharedSelectProps = {
  classNamePrefix: "react-select",
};
