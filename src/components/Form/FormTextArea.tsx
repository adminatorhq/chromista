import React from 'react';
import styled from 'styled-components';
import { StyledInput } from './Styles';
import { ISharedFormInput } from './_types';
import { wrapLabelAndError, generateClassNames } from './_wrapForm';

interface IFormTextArea extends ISharedFormInput {
  rows?: number;
}

export const FormTextArea: React.FC<IFormTextArea> = (
  formInput,
): JSX.Element => {
  const {
    input, rows = 3, label, disabled, meta,
  } = formInput;

  return wrapLabelAndError(
    <StyledTextArea
      as="textarea"
      {...input}
      rows={rows}
      placeholder={label}
      className={generateClassNames(meta)}
      disabled={disabled}
    >
      {input.value}
    </StyledTextArea>,
    formInput,
  );
};

const StyledTextArea = styled(StyledInput)`
  height: initial;
`;
