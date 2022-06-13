import React from 'react';
import { ISharedFormInput } from '../_types';
import styled from 'styled-components';
import { Text } from '../../../ui-blocks/Text';
import { Stack } from '../../../ui-blocks';
import { StyledFormFeedback, StyledFormGroup } from '../Styles';
import { isFormMetaWithError } from '../_wrapForm';

const StyledCheckBoxInput = styled.input`
  border-radius: 0.25em;
  width: 1em;
  height: 1em;
  margin-top: 0.25em;
  vertical-align: top;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: 1px solid rgba(0, 0, 0, 0.25);
  appearance: none;
  color-adjust: exact;

  &:checked {
    background-color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
  }
`;

export const FormCheckBox: React.FC<ISharedFormInput> = (
  formInput
): JSX.Element => {
  const { input, label, meta } = formInput;
  return (
    <StyledFormGroup>
      <Stack>
        <StyledCheckBoxInput {...input} type="checkbox" id={input.name} />
        <label htmlFor={input.name}>
          <Text size="4">{label}</Text>
        </label>
      </Stack>
      <StyledFormFeedback>{isFormMetaWithError(meta)}&nbsp;</StyledFormFeedback>
    </StyledFormGroup>
  );
};
