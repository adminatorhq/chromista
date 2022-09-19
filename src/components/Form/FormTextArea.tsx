import React from "react";
import styled from "styled-components";
import { StyledInput } from "./Styles";
import { ISharedFormInput } from "./_types";
import { wrapLabelAndError, generateClassNames } from "./_wrapForm";

const StyledTextArea = styled(StyledInput)`
  height: auto;
`;

interface IFormTextArea extends ISharedFormInput {
  rows?: number;
}

export const FormTextArea: React.FC<IFormTextArea> = (formInput) => {
  const { input, rows = 3, label, disabled, meta } = formInput;
  return wrapLabelAndError(
    <StyledTextArea
      as="textarea"
      value={input.value}
      name={input.name}
      id={formInput.input.name}
      onChange={input.onChange}
      onFocus={input.onFocus}
      onBlur={input.onBlur}
      rows={rows}
      placeholder={label}
      className={generateClassNames(meta)}
      disabled={disabled}
    >
      {input.value}
    </StyledTextArea>,
    formInput
  );
};
