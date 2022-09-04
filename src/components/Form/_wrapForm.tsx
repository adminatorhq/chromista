import React from "react";
import classnames from "classnames";
import { FieldMetaState } from "react-final-form";
import { HelpCircle } from "react-feather";
import { ISharedFormInput } from "./_types";
import { Tooltip } from "../Tooltip";
import {
  StyledFormGroup,
  StyledFormLabel,
  StyledFormFeedback,
  StyledRequiredAsterick,
} from "./Styles";
import { Stack } from "../../ui-blocks";
import { SoftButton } from "../Button";

export const isFormMetaWithError = (meta: FieldMetaState<any>) =>
  meta.touched && meta.invalid && meta.error;

export const wrapLabelAndError = (
  formComponent: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  {
    meta,
    label,
    input,
    required,
    description,
    sm,
    rightActions = [],
  }: ISharedFormInput
) => (
  <StyledFormGroup>
    <>
      <Stack justify="space-between" align="baseline">
        <div>
          {label && (
            <>
              <StyledFormLabel sm={sm} htmlFor={input.name}>
                {label}
              </StyledFormLabel>
              {required ? (
                <StyledRequiredAsterick> *</StyledRequiredAsterick>
              ) : null}
            </>
          )}
          {description ? (
            <>
              {" "}
              <HelpCircle
                data-for="form-wrapper"
                size="15"
                data-tip={description}
              />
              <Tooltip id="form-wrapper" />
            </>
          ) : null}
        </div>
        <Stack flex={1} justify="end">
          {rightActions.map((rightAction) => (
            <SoftButton
              key={rightAction.label}
              action={rightAction.action}
              size="xs"
              type="button"
              icon="settings"
              label={rightAction.label}
            />
          ))}
        </Stack>
      </Stack>
      {formComponent}
      <StyledFormFeedback sm={sm}>
        {isFormMetaWithError(meta)}
        &nbsp;
      </StyledFormFeedback>
    </>
  </StyledFormGroup>
);

// TODO use meta.validating to show a loading indicator
// that this form is perform an async validation

export const generateClassNames = (meta: FieldMetaState<any>): string =>
  classnames({
    invalid: !!isFormMetaWithError(meta),
  });
