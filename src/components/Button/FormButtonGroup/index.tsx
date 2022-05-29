import React from 'react';
import styled, { css } from 'styled-components';
import { StyledOutlineButton } from '../Button';
import { ISelectData } from '../../../types';

interface IFormButtonGroup {
  options: ISelectData[];
  value: string;
  onChange: (value: string) => void;
}

export const FormButtonGroup: React.FC<IFormButtonGroup> = ({
  options,
  value: selectedValue,
  onChange,
}) => {
  return (
    <StyledGroup>
      {options.map(({ value, label }, index) => (
        <StyledButton
          as="label"
          size="xs"
          key={value}
          isActive={selectedValue === value || (index === 0 && !selectedValue)}
          onClick={() => onChange(value)}
        >
          <StyledInput type="checkbox" />
          {label}
        </StyledButton>
      ))}
    </StyledGroup>
  );
};

const StyledInput = styled.input`
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
`;

const StyledButton = styled(StyledOutlineButton)<{ isActive: boolean }>`
  ${props =>
    props.isActive &&
    css`
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
