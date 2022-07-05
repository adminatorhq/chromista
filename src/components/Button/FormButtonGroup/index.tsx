import React from 'react';
import styled, { css } from 'styled-components';
import { StyledOutlineButton } from '../Button';
import { ISelectData } from '../../../types';

export interface IProps {
  options: ISelectData[];
  value: string | boolean;
  onChange: (value: string | boolean) => void;
}

export const FormButtonGroup: React.FC<IProps> = ({
  options,
  value: selectedValue,
  onChange,
}) => (
  <StyledGroup>
    {options.map(({ value, label }, index) => (
      <StyledButton
        as="label"
        size="sm"
        key={`${value}`}
        isActive={
          selectedValue === value
          || (index === 0 && selectedValue === undefined)
        }
        onClick={() => onChange(value)}
      >
        <StyledInput type="checkbox" />
        {label}
      </StyledButton>
    ))}
  </StyledGroup>
);

const StyledInput = styled.input`
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
`;

const StyledButton = styled(StyledOutlineButton)<{ isActive: boolean }>`
  ${(props) => props.isActive
    && css`
      color: ${props.theme.text.white};
      background-color: ${props.theme.colors.primary};
      border-color: ${props.theme.colors.primary};
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
