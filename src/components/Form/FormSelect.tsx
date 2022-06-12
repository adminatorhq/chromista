import React from 'react';
import { ISharedFormInput } from './_types';
import { generateClassNames, wrapLabelAndError } from './_wrapForm';
import Select from 'react-select';
import { ISelectData } from '../../types';

interface ISelectOptions extends ISharedFormInput {
  disabledOption?: string;
  nullable?: boolean;
  defaultLabel?: string;
}

interface IFormSelect extends ISelectOptions {
  selectData: ISelectData[];
}

const sharedSelectProps = {
  classNamePrefix: 'react-select',
};

interface IFormMultiSelect {
  selectData: ISelectData[];
  values: string[];
  onChange: (values: string[]) => void;
}

export const FormMultiSelect: React.FC<IFormMultiSelect> = ({
  selectData,
  values = [],
  onChange,
}): JSX.Element => {
  return (
    <Select
      {...sharedSelectProps}
      closeMenuOnSelect={false}
      defaultValue={[]}
      isMulti={true}
      value={values.map(value =>
        selectData.find(selectDatum => selectDatum.value === value)
      )}
      onChange={(newValues: any) => {
        onChange(newValues.map(({ value }: ISelectData) => value));
      }}
      options={selectData}
    />
  );
};

export const FormSelect: React.FC<IFormSelect> = (formInput): JSX.Element => {
  const {
    input,
    selectData,
    meta,
    disabled,
    label: formLabel,
    disabledOption,
    nullable,
    defaultLabel,
  } = formInput;
  const selectDataWithDefault = [
    {
      value: nullable ? null : '',
      label: defaultLabel ? defaultLabel : `--- Select ${formLabel} ---`,
    },
    ...selectData,
  ] as ISelectData[];
  return wrapLabelAndError(
    <Select
      {...input}
      {...sharedSelectProps}
      value={
        selectDataWithDefault.find(({ value }) => value === input.value) || {
          value: '',
          label: '',
        }
      }
      onChange={({ value }: any) => {
        if (nullable && !value) {
          value = null;
        }
        input.onChange(value);
      }}
      className={generateClassNames(meta, '')}
      isDisabled={disabled}
      options={selectDataWithDefault}
      isOptionDisabled={(option: ISelectData) =>
        option.value === disabledOption
      }
    />,
    formInput
  );
};

interface IFormNoValueSelect {
  selectData: ISelectData[];
  disabledOptions: string[];
  onChange: (value: string, label?: string) => void;
}

export const FormNoValueSelect: React.FC<IFormNoValueSelect> = ({
  selectData,
  disabledOptions,
  onChange,
}): JSX.Element => {
  return (
    <Select
      {...sharedSelectProps}
      value={{ value: '', label: '' }}
      onChange={({ value, label }: any) => {
        onChange(value, label);
      }}
      options={selectData.filter(
        ({ value }) => !disabledOptions.includes(value)
      )}
    />
  );
};
