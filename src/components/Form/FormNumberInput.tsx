import React from "react";
import { StyledInput } from "./Styles";
import { ISharedFormInput } from "./_types";
import { wrapLabelAndError, generateClassNames } from "./_wrapForm";

interface IFormNumberInput extends ISharedFormInput {
  allowNegative?: boolean;
}

// const format = (input: number,
// decimalCount: number, numberSpace = 3, comma = ',', point = '.') => {
//   console.log('Please format', { input });
//   const re = '\\d(?=(\\d{' + numberSpace + '})+' + (decimalCount > 0 ? '\\D' : '$') + ')';

//   const num = input.toFixed(Math.max(0, decimalCount));

//   console.log(input.toFixed(0));
//   console.log(input.toFixed(2));

//   return num.replace('.', point).replace(new RegExp(re, 'g'), '$&' + comma);
// };

// export const formatMoney = (value: string) => {
//   console.log('formatMoney', { value });
//   if (!value) return null;
//   return format(parseFloat(value), 2);
// };

// export const parseMoney = (value: string): any => {
//   console.log('parseMoney', { value });
//   if (!value) {
//     return null;
//   }
//   const split = value.split('.');
//   const first = split[0].replace(/[^\d]/g, '');
//   if (!value.includes('.')) {
//     return +first;
//   }
//   return first + '.0' + split[1].replace(/[^\d]/g, '');
// };

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
