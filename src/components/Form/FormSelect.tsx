import React from "react";
import Select from "react-select";
import styled from "styled-components";
import { ISharedFormInput } from "./_types";
import { generateClassNames, wrapLabelAndError } from "./_wrapForm";
import { ISelectData } from "../../types";

export interface IBaseFormSelect extends ISharedFormInput {
  disabledOptions?: string[];
  nullable?: boolean;
  defaultLabel?: string;
}

interface IFormSelect extends IBaseFormSelect {
  selectData: ISelectData[];
}

const sharedSelectProps = {
  classNamePrefix: "react-select",
};

export const StyledSelect = styled(Select)`
  .react-select__control {
    &:hover {
      border: 1px solid ${(props) => props.theme.colors.border};
    }
    &:focus {
      color: ${(props) => props.theme.text.main};
      background-color: ${(props) => props.theme.colors.white};
      border-color: rgba(23, 97, 253, 0.5);
      outline: 0;
    }
    .react-select__single-value {
      color: ${(props) => props.theme.text.main};
      font-size: 0.8125rem;
    }
    border: 1px solid ${(props) => props.theme.colors.border};
  }

  &.invalid {
    border-color: ${(props) => props.theme.colors.danger} !important;
  }
`;

interface IFormMultiSelect {
  selectData: ISelectData[];
  values: string[];
  onChange: (values: string[]) => void;
}

export function FormMultiSelect({
  selectData,
  values = [],
  onChange,
}: IFormMultiSelect) {
  return (
    <Select
      classNamePrefix={sharedSelectProps.classNamePrefix}
      closeMenuOnSelect={false}
      defaultValue={[]}
      isMulti
      value={values.map((value) =>
        selectData.find((selectDatum) => selectDatum.value === value)
      )}
      onChange={(newValues: any) => {
        onChange(newValues.map(({ value }: ISelectData) => value));
      }}
      options={selectData}
    />
  );
}

export const FormSelect: React.FC<IFormSelect> = (props) => {
  const {
    input,
    selectData,
    meta,
    disabled,
    label: formLabel,
    disabledOptions,
    nullable,
    defaultLabel,
  } = props;
  const selectDataWithDefault = [
    {
      value: nullable ? null : "",
      label: defaultLabel || `--- Select ${formLabel} ---`,
    },
    ...selectData,
  ] as ISelectData[];
  return wrapLabelAndError(
    <StyledSelect
      {...input}
      classNamePrefix={sharedSelectProps.classNamePrefix}
      value={
        selectDataWithDefault.find(({ value }) => value === input.value) || {
          value: "",
          label: "",
        }
      }
      onChange={({ value }: any) => {
        input.onChange(nullable && !value ? null : value);
      }}
      className={generateClassNames(meta)}
      isDisabled={disabled}
      options={selectDataWithDefault}
      isOptionDisabled={(option: unknown) => {
        if (!disabledOptions) {
          return false;
        }
        return disabledOptions.includes(
          (option as ISelectData).value as string
        );
      }}
    />,
    props
  );
};

interface IFormNoValueSelect {
  selectData: ISelectData[];
  disabledOptions: string[];
  onChange: (value: string, label?: string) => void;
}

export function FormNoValueSelect({
  selectData,
  disabledOptions,
  onChange,
}: IFormNoValueSelect) {
  return (
    <Select
      classNamePrefix={sharedSelectProps.classNamePrefix}
      value={{ value: "", label: "" }}
      onChange={({ value, label }: any) => {
        onChange(value, label);
      }}
      options={
        selectData.filter(
          ({ value }) => !disabledOptions.includes(value as string)
        ) as { value: string; label: string }[]
      }
    />
  );
}
