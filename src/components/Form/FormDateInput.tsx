import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ISharedFormInput } from "./_types";
import { wrapLabelAndError, generateClassNames } from "./_wrapForm";

interface IFormDateInput extends ISharedFormInput {
  minDate?: Date;
  maxDate?: Date;
}

export const FormDateInput: React.FC<IFormDateInput> = (formInput) => {
  const { input, disabled, meta, required, minDate, maxDate } = formInput;
  let selected = input.value;
  if (selected && typeof selected === "string") {
    selected = new Date(selected);
    input.onChange(selected);
  }
  return wrapLabelAndError(
    <DatePicker
      {...input}
      onChange={(value) => {
        input.onChange(value);
      }}
      showTwoColumnMonthYearPicker
      isClearable={!required}
      selected={selected}
      minDate={minDate}
      maxDate={maxDate}
      className={generateClassNames(meta)}
      disabled={disabled}
    />,
    formInput
  );
};
