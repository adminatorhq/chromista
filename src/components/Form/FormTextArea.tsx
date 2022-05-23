import React from 'react';
import { StyledTextarea } from '../../../styles/Element';
import { StyledInput } from './Styles';
import { ISharedFormInput } from './_types';
import { wrapLabelAndError, generateClassNames } from './_wrapForm';
interface IFormTextArea extends ISharedFormInput {
  rows?: number;
}

export const FormTextArea: React.FC<IFormTextArea> = (formInput): JSX.Element => {
  const { input, rows = 3, label, disabled, meta } = formInput;

  return wrapLabelAndError(
    <StyledInput
      as={StyledTextarea}
      {...input}
      rows={rows}
      placeholder={label}
      className={generateClassNames(meta)}
      disabled={disabled}
    >
      {input.value}
    </StyledInput>,
    formInput,
  );
};
