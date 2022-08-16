import styled, { css } from "styled-components";

interface IInput {
  sm?: true;
}

export const StyledInput = styled.input<IInput>`
  display: block;
  width: 100%;
  height: calc(1.8em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.8;
  color: ${(props) => props.theme.text.main};
  background-color: ${(props) => props.theme.colors.white};
  background-clip: padding-box;
  border: 1px solid ${(props) => props.theme.colors.border};
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
    color: ${(props) => props.theme.text.main};
    background-color: ${(props) => props.theme.colors.white};
    border-color: ${(props) => props.theme.colors.primary};
    outline: 0;
  }

  &.invalid {
    border-color: ${(props) => props.theme.colors.danger} !important;
  }

  &::-ms-expand {
    background-color: transparent;
    border: 0;
  }

  &:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 ${(props) => props.theme.text.main};
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.softBackground};
    opacity: 1;
  }
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
  color: ${(props) => props.theme.text.main};
`;

export const StyledFormFeedback = styled.p<{ sm?: true }>`
  color: ${(props) => props.theme.colors.danger};
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
  color: ${(props) => props.theme.colors.danger};
  font-weight: bolder;
`;
