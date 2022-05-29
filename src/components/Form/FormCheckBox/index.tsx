import React from 'react';
import { ISharedFormInput } from '../_types';
import styled from 'styled-components';

const StyledCheckBox = styled.div`
  position: relative;
  z-index: 1;
  display: block;
  min-height: 1.4625rem;
  padding-left: 1.5rem;
  color-adjust: exact;
`;

const StyledCheckBoxLabel = styled.label`
  position: relative;
  margin-bottom: 0;
  vertical-align: top;
  color: ${props => props.theme.text.main};

  &::before {
    position: absolute;
    top: 0.23125rem;
    left: -1.5rem;
    display: block;
    width: 1rem;
    height: 1rem;
    pointer-events: none;
    content: '';
    background-color: ${props => props.theme.colors.white};
    border: #8997bd solid 1px;
    transition: background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  &::after {
    position: absolute;
    top: 0.23125rem;
    left: -1.5rem;
    display: block;
    width: 1rem;
    height: 1rem;
    content: '';
    background: no-repeat 50% / 50% 50%;
  }
`;

const StyledCheckBoxInput = styled.input`
  position: absolute;
  left: 0;
  z-index: -1;
  width: 1rem;
  height: 1.23125rem;
  opacity: 0;
`;

export const FormCheckBox: React.FC<ISharedFormInput> = (
  formInput
): JSX.Element => {
  const { input } = formInput;
  return (
    <StyledCheckBox className="custom-control custom-checkbox">
      <StyledCheckBoxInput
        {...input}
        type="checkbox"
        className="custom-control-input"
        id={input.name}
      />
      <StyledCheckBoxLabel
        className="custom-control-label"
        htmlFor={input.name}
      >
        Remember me
      </StyledCheckBoxLabel>
    </StyledCheckBox>
  );
};
