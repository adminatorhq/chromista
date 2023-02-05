import styled, { css } from "styled-components";
import { SYSTEM_COLORS, USE_ROOT_COLOR } from "../../theme";

export interface IStyledBaseButton {
  block?: boolean;
  size?: "sm" | "xs";
  color?: keyof typeof SYSTEM_COLORS;
}

export const StyledBaseButton = styled.button<IStyledBaseButton>`
  display: inline-block;
  font-weight: 400;
  color: ${USE_ROOT_COLOR("main-text")};
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 0.8125rem;
  box-shadow: none;
  line-height: 1.8;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  ${({ block }) =>
    block &&
    css`
      display: block;
      width: 100%;
    `}

  ${(props) =>
    props.size === "sm" &&
    css`
      padding: 0.25rem 0.5rem;
      font-size: 0.71rem;
      line-height: 1.8;
      border-radius: 0.2rem;
    `}

    ${(props) =>
    props.size === "xs" &&
    css`
      padding: .25rem .5rem;
      font-size: .71rem;
      line-height: 1.2;
      border-radius: .2rem;
  }
      `}

  &:focus {
    box-shadow: none;
    outline: 0;
    box-shadow: 0 0 0 0.2rem ${USE_ROOT_COLOR("primary-color")};
  }

  &:disabled {
    opacity: 0.65;
  }

  &:not(:disabled):not(.disabled) {
    cursor: pointer;
  }

  position: relative;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

export const StyledButton = styled(StyledBaseButton)`
  color: ${USE_ROOT_COLOR("text-on-primary")};
  background-color: ${USE_ROOT_COLOR("primary-color")};
  border-color: ${USE_ROOT_COLOR("primary-color")};
`;

export const StyledSoftButton = styled(StyledBaseButton)`
  background-color: ${USE_ROOT_COLOR("primary-shade-color")};
  color: ${USE_ROOT_COLOR("text-on-shade")};
  border-width: 0;
  &:hover {
    background-color: ${USE_ROOT_COLOR("primary-color")};
    color: ${USE_ROOT_COLOR("text-on-primary")};
  }

  &:focus {
    box-shadow: 0 0 0 0.1rem ${USE_ROOT_COLOR("primary-shade-color")};
    background-color: ${USE_ROOT_COLOR("primary-color")};
    color: ${USE_ROOT_COLOR("text-on-primary")};
  }
`;

export const StyledOutlineButton = styled(StyledBaseButton)`
  color: ${USE_ROOT_COLOR("primary-color")};
  border-color: ${USE_ROOT_COLOR("primary-color")};

  &:hover {
    color: ${USE_ROOT_COLOR("text-on-primary")};
    background-color: ${USE_ROOT_COLOR("primary-color")};
    border-color: ${USE_ROOT_COLOR("primary-color")};
  }

  &:focus {
    box-shadow: 0 0 0 0.2rem ${USE_ROOT_COLOR("primary-shade-color")};
  }

  &:disabled {
    color: ${USE_ROOT_COLOR("primary-color")};
    background-color: transparent;
  }

  &:not(:disabled):not(.disabled):active,
  &:not(:disabled):not(.disabled).active {
    color: ${USE_ROOT_COLOR("text-on-primary")};
    background-color: ${USE_ROOT_COLOR("primary-color")};
    border-color: ${USE_ROOT_COLOR("primary-color")};
  }

  &:not(:disabled):not(.disabled):active:focus,
  &:not(:disabled):not(.disabled).active:focus {
    box-shadow: 0 0 0 0.2rem ${USE_ROOT_COLOR("primary-shade-color")};
  }
`;

export const StyledDeleteButton = styled(StyledSoftButton)`
  background-color: ${SYSTEM_COLORS.danger}1A;
  color: ${SYSTEM_COLORS.danger};
  border-color: ${SYSTEM_COLORS.danger};

  &:hover {
    background-color: ${SYSTEM_COLORS.danger};
  }
`;
