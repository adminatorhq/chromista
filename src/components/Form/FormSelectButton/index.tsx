import React from "react";
import styled from "styled-components";
import { StyledOutlineButton } from "../../Button/Button";
import { ISelectData } from "../../../types";
import { IBaseFormSelect } from "../FormSelect/types";
import { generateFormArias, wrapLabelAndError } from "../_wrapForm";

interface IProps {
  id?: string;
  disabled?: boolean;
  options: ISelectData[];
  value: string | boolean;
  onChange: (value: string | boolean) => void;
}

const StyledInput = styled.input`
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
`;

const Root = styled.div`
  position: relative;
  display: inline-flex;
  vertical-align: middle;

  & > button:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  & > button:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: -1px;
  }
`;

function BaseFormSelectButton({
  options,
  id,
  value: selectedValue,
  onChange,
  disabled,
}: IProps) {
  return (
    <Root id={id}>
      {options.map(({ value, label }, index) => {
        const isChecked =
          selectedValue === value ||
          (index === 0 && selectedValue === undefined);

        return (
          <StyledOutlineButton
            size="xs"
            type="button"
            disabled={disabled}
            key={`${value}`}
            className={isChecked ? "active" : ""}
            onClick={() => onChange(value)}
          >
            <StyledInput type="checkbox" checked={isChecked} readOnly />
            {label}
          </StyledOutlineButton>
        );
      })}
    </Root>
  );
}

interface IFormSelect extends IBaseFormSelect {
  selectData: ISelectData[];
}

export function FormSelectButton(props: IFormSelect) {
  const { input, selectData, meta, disabled } = props;

  return wrapLabelAndError(
    <BaseFormSelectButton
      {...input}
      {...generateFormArias(meta)}
      id={input.name}
      disabled={disabled}
      options={selectData}
    />,
    props
  );
}
