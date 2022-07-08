import React from "react";
import { StyledInput } from "./Styles";
import { ISharedFormInput } from "./_types";
import { wrapLabelAndError, generateClassNames } from "./_wrapForm";

interface IFormInput extends ISharedFormInput {
  type?: "email" | "password" | "url" | "color";
}

export const FormInput: React.FC<IFormInput> = (formInput) => {
  const { input, type, label, disabled, meta, ...rest } = formInput;

  return wrapLabelAndError(
    <StyledInput
      {...input}
      {...rest}
      type={type}
      placeholder={label}
      className={generateClassNames(meta)}
      disabled={disabled}
    />,
    formInput
  );
};
