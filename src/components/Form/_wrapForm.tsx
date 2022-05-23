import React from 'react';
import classnames from 'classnames';
import { ISharedFormInput } from './_types';
import { FieldMetaState } from 'react-final-form';
import { HelpCircle } from 'react-feather';
import { Tooltip } from '../Tooltip';
import {
  StyledFormGroup,
  StyledFormLabel,
  StyledFormFeedback,
  StyledRequiredAsterick,
} from './Styles';

const isFormMetaWithError = (meta: FieldMetaState<any>) =>
  meta.touched && meta.invalid && meta.error;

export const wrapLabelAndError = (
  formComponent: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  { meta, label, input, required, description, sm }: ISharedFormInput,
) => {
  return (
    <StyledFormGroup>
      <>
      {label && (
        <StyledFormLabel sm={sm} htmlFor={input.name}>
          {label} {required ? <StyledRequiredAsterick>*</StyledRequiredAsterick> : null}
        </StyledFormLabel>
      )}
      {description ? (
        <>
          {' '}
          <HelpCircle data-for="form-wrapper" size="15" data-tip={description} />
        </>
      ) : null}
      {description ? <Tooltip id="form-wrapper" /> : null}
      {formComponent}
      <StyledFormFeedback sm={sm}>{isFormMetaWithError(meta)}&nbsp;</StyledFormFeedback>
      </>
    </StyledFormGroup>
  );
};

// TODO use meta.validating to show a loading indicator that this form is perform an async validation

export const generateClassNames = (
  meta: FieldMetaState<any>,
  constantClassNames = 'form-control',
): string => {
  return classnames({
    [constantClassNames]: true,
    invalid: !!isFormMetaWithError(meta),
  });
};
