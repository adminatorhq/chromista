import {
  DATE_FILTER_OPTIONS,
  IColumnFilterBag,
  IDateFilterOption,
} from "@hadmean/protozoa";
import React from "react";
import { Col, Row } from "styled-bootstrap-grid";
import styled from "styled-components";
import { SimpleSelect } from "../../../Form/FormSelect/Simple";

const getOptionValue = (value: string) => {
  const dateOption = DATE_FILTER_OPTIONS.find(
    (option) => option.value === value
  );
  return dateOption?.countLimit ? `1:${value}` : value;
};

const getFilterValue = (filterValue: string) => {
  if (!filterValue.includes(":")) {
    return filterValue;
  }
  return filterValue.split(":")[1];
};

const setCountValue = (countValue: string, filterValue: string) => {
  const value = filterValue.split(":")[1];
  return `${countValue}:${value}`;
};

const getCountValue = (filterValue: string) => {
  const [value] = filterValue.split(":");
  return value;
};

const getOptionCountLimit = (filterValue: string) => {
  const value = filterValue.split(":")[1];
  const dateOption = DATE_FILTER_OPTIONS.find(
    (option) => option.value === value
  );
  return dateOption?.countLimit || 1;
};

interface IProps {
  filterValue?: IColumnFilterBag<string>;
  setFilter: (value: IColumnFilterBag<string> | undefined) => void;
  field: "value" | "value2";
  defaultValue: string;
  dateOptions: IDateFilterOption[];
}

const LeftCol = styled(Col)`
  padding-right: 0;
`;

const RightCol = styled(Col)<{ hasLeft: boolean }>`
  ${(props) => props.hasLeft && `padding-left: 0`};
`;

export function DateSelection({
  filterValue,
  setFilter,
  field,
  defaultValue,
  dateOptions,
}: IProps) {
  const currentFilterValue = filterValue?.[field] || "";
  const hasCountValue = currentFilterValue?.includes(":");
  return (
    <Row>
      {hasCountValue && (
        <LeftCol sm={3}>
          <SimpleSelect
            options={Array.from(
              { length: getOptionCountLimit(currentFilterValue) },
              (_, k) => `${k + 1}`
            ).map((count) => ({ label: count, value: count }))}
            fullWidth
            onChange={(value) => {
              setFilter({
                ...filterValue,
                [field]: setCountValue(value, currentFilterValue),
              });
            }}
            value={getCountValue(currentFilterValue) || "1"}
          />
        </LeftCol>
      )}
      <RightCol sm={hasCountValue ? 9 : 12} hasLeft={hasCountValue}>
        <SimpleSelect
          options={dateOptions.map(({ value, label }) => ({ label, value }))}
          fullWidth
          onChange={(value) => {
            setFilter({
              ...filterValue,
              [field]: getOptionValue(value),
            });
          }}
          value={getFilterValue(currentFilterValue || defaultValue)}
        />
      </RightCol>
    </Row>
  );
}
