import styled, { css } from "styled-components";
import { SYSTEM_COLORS, USE_ROOT_COLOR } from "../../theme";

interface IInput {
  sm?: true;
}

export const InputStyles = css<IInput>`
  display: block;
  width: 100%;
  height: calc(1.8em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.8;
  color: ${USE_ROOT_COLOR("main-text")};
  background-color: ${USE_ROOT_COLOR("base-color")};
  background-clip: padding-box;
  border: 1px solid ${USE_ROOT_COLOR("border-color")};
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out;

  ${(props) =>
    props.sm &&
    css`
      height: calc(1.8em + 0.5rem + 2px);
      padding: 0.25rem 0.5rem;
      font-size: 0.71rem;
      line-height: 1.8;
      border-radius: 0.2rem;
    `}

  &:focus {
    color: ${USE_ROOT_COLOR("main-text")};
    background-color: ${USE_ROOT_COLOR("base-color")};
    border-color: ${USE_ROOT_COLOR("primary-color")};
    outline: 0;
  }

  &[aria-invalid] {
    border-color: ${SYSTEM_COLORS.danger} !important;
  }

  &::-ms-expand {
    background-color: transparent;
    border: 0;
  }

  &:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 ${USE_ROOT_COLOR("main-text")};
  }

  &:disabled {
    background-color: ${USE_ROOT_COLOR("soft-color")};
    opacity: 1;
  }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const StyledInput = styled.input<IInput>`
  ${InputStyles}
`;

export const StyledFormGroup = styled.div`
  margin-bottom: 0px;
  margin-top: 0px;
`;

export const StyledFormLabel = styled.label<{ sm?: true }>`
  padding-bottom: 1px;
  margin-bottom: 0;
  font-size: inherit;
  line-height: 1.8;
  text-align: right;
  display: inline-block;
  font-weight: 400;
  ${(props) =>
    props.sm &&
    css`
      font-size: 11px;
    `}
  color: ${USE_ROOT_COLOR("main-text")};
`;

export const StyledFormFeedback = styled.p<{ sm?: true }>`
  color: ${SYSTEM_COLORS.danger};
  font-size: 12px;
  padding-bottom: 0px;
  margin-bottom: 0px;
  ${(props) =>
    props.sm &&
    css`
      font-size: 10px;
    `}
`;

export const StyledRequiredAsterick = styled.span`
  color: ${SYSTEM_COLORS.danger};
  font-weight: bolder;
`;
