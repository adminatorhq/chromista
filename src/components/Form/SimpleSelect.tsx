import styled, { css } from 'styled-components';
import { StyledInput } from './Styles';
import { StyledSelect } from '../../../styles/Element';
import React from 'react';
import { ISelectData } from '../../../types';

interface ISimpleSelect {
  options: ISelectData[];
  onChange: (value: string) => void;
  value: number | string;
  fullWidth?: boolean;
  sm?: true;
}

export function SimpleSelect({ options, onChange, value, fullWidth, sm }: ISimpleSelect) {
  return (
    <StyledSimpleSelect
      as={StyledSelect}
      value={value}
      sm={sm}
      fullWidth={fullWidth}
      onChange={(e: { target: { value: string } }) => {
        onChange(e.target.value);
      }}
    >
      {options.map(({ value: value$1, label }) => (
        <option key={value$1} value={value$1}>
          {label}
        </option>
      ))}
    </StyledSimpleSelect>
  );
}

const StyledSimpleSelect = styled(StyledInput)<{ fullWidth?: boolean }>`
  display: inline-block;
  width: auto;
  vertical-align: middle;
  background: ${props => props.theme.colors.white}
    url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%232c3652' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e")
    no-repeat right 0.75rem center/8px 10px;
  appearance: none;
  ${props =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
`;
