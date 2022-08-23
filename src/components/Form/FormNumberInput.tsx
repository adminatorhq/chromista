import React from "react";
import { StyledInput } from "./Styles";
import { ISharedFormInput } from "./_types";
import { wrapLabelAndError, generateClassNames } from "./_wrapForm";

interface IFormNumberInput extends ISharedFormInput {
  allowNegative?: boolean;
}

const getNumberValue = (value: string | number | null, required: boolean) => {
  if (!required && !value) {
    return null;
  }
  if (value) {
    return +value;
  }
  return value;
};

export const FormNumberInput: React.FC<IFormNumberInput> = (formInput) => {
  const { input, label, disabled, meta, allowNegative, required, sm } =
    formInput;
  if (typeof input.value === "string") {
    input.onChange(getNumberValue(input.value, !!required));
  }
  const moreProps = { min: allowNegative ? Number.NEGATIVE_INFINITY : 0 };

  return wrapLabelAndError(
    <StyledInput
      {...input}
      {...moreProps}
      sm={sm}
      onChange={(e) => {
        input.onChange(getNumberValue(e.target.value, !!required));
      }}
      placeholder={label}
      type="number"
      className={generateClassNames(meta)}
      disabled={disabled}
    />,
    formInput
  );
};
