import React from "react";
import styled, { css } from "styled-components";
import { StyledOutlineButton } from "../Button";
import { ISelectData } from "../../../types";
import { USE_ROOT_COLOR } from "../../../AppWrapper/colors";

export interface IProps {
  options: ISelectData[];
  value: string | boolean;
  onChange: (value: string | boolean) => void;
}

const StyledInput = styled.input`
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
`;

const StyledButton = styled(StyledOutlineButton)<{ isActive: boolean }>`
  ${(props) =>
    props.isActive &&
    css`
      color: ${USE_ROOT_COLOR("inverse-text")}
      background-color: ${USE_ROOT_COLOR("primary-color")};
      border-color: ${USE_ROOT_COLOR("primary-color")};
    `}
`;

const StyledGroup = styled.div`
  position: relative;
  display: inline-flex;
  vertical-align: middle;

  & > label:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  & > label:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: -1px;
  }
`;

export function FormButtonGroup({
  options,
  value: selectedValue,
  onChange,
}: IProps) {
  return (
    <StyledGroup>
      {options.map(({ value, label }, index) => (
        <StyledButton
          as="label"
          size="sm"
          key={`${value}`}
          isActive={
            selectedValue === value ||
            (index === 0 && selectedValue === undefined)
          }
          onClick={() => onChange(value)}
        >
          <StyledInput type="checkbox" />
          {label}
        </StyledButton>
      ))}
    </StyledGroup>
  );
}
