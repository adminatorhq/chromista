import React from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { USE_ROOT_COLOR } from "../../../AppWrapper/colors";
import { InputStyles } from "../Styles";
import { ISharedFormInput } from "../_types";
import { wrapLabelAndError, generateClassNames } from "../_wrapForm";
import { dateLibraryStyle } from "./defaultStyle";

interface IFormDateInput extends ISharedFormInput {
  minDate?: Date;
  maxDate?: Date;
}

const Root = styled.div`
  ${dateLibraryStyle}
  .react-datepicker {
    border: 1px solid ${USE_ROOT_COLOR("border-color")};
  }
  input {
    ${InputStyles};
  }
  .react-datepicker__day--selected {
    background-color: ${USE_ROOT_COLOR("accent-color")};
  }
  .react-datepicker__header {
    border-bottom: 1px solid ${USE_ROOT_COLOR("border-color")};
  }
  .react-datepicker__close-icon::after {
    background-color: ${USE_ROOT_COLOR("accent-color")};
  }
  .react-datepicker__header {
    background-color: ${USE_ROOT_COLOR("soft-color")};
  }
`;

export const FormDateInput: React.FC<IFormDateInput> = (formInput) => {
  const { input, disabled, meta, required, minDate, maxDate } = formInput;
  let selected = input.value;
  if (selected && typeof selected === "string") {
    selected = new Date(selected);
    input.onChange(selected);
  }
  return wrapLabelAndError(
    <Root>
      <DatePicker
        {...input}
        onChange={(value) => {
          input.onChange(value);
        }}
        showTwoColumnMonthYearPicker
        isClearable={!required}
        selected={selected}
        id={formInput.input.name}
        minDate={minDate}
        maxDate={maxDate}
        className={`${generateClassNames(meta)}`}
        disabled={disabled}
      />
    </Root>,
    formInput
  );
};
