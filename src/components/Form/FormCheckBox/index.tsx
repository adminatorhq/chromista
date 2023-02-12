import React from "react";
import styled from "styled-components";
import { ISharedFormInput } from "../_types";
import { Stack, Typo } from "../../../ui-blocks";
import { StyledFormFeedback, StyledFormGroup } from "../Styles";
import { isFormMetaWithError } from "../_wrapForm";
import { USE_ROOT_COLOR } from "../../../theme";

const StyledCheckBoxInput = styled.input`
  border-radius: 0.25em;
  width: 1em;
  height: 1em;
  margin-top: 0.25em;
  vertical-align: top;
  background-color: ${USE_ROOT_COLOR("base-color")};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: 1px solid ${USE_ROOT_COLOR("border-color")};
  appearance: none;
  color-adjust: exact;

  &:checked {
    background-color: ${USE_ROOT_COLOR("primary-color")};
    border-color: ${USE_ROOT_COLOR("primary-color")};
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
  }
`;

export function FormCheckBox({ input, label, meta }: ISharedFormInput) {
  return (
    <StyledFormGroup>
      <Stack>
        <StyledCheckBoxInput {...input} type="checkbox" id={input.name} />
        <label htmlFor={input.name}>
          <Typo.MD>{label}</Typo.MD>
        </label>
      </Stack>
      <StyledFormFeedback>
        {isFormMetaWithError(meta)}
        &nbsp;
      </StyledFormFeedback>
    </StyledFormGroup>
  );
}
