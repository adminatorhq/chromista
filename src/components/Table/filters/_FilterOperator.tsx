import React, { useEffect } from "react";
import { Spacer } from "../../../ui-blocks/Spacer";
import { SimpleSelect } from "../../Form/FormSelect/Simple";
import { FilterOperators, IColumnFilterBag } from "./types";

const FILTER_OPERATOR_LABELS: Record<FilterOperators, string> = {
  [FilterOperators.EQUAL_TO]: "Equal To",
  [FilterOperators.GREATER_THAN]: "Greater Than",
  [FilterOperators.LESS_THAN]: "Less Than",
  [FilterOperators.NOT_IN]: "Not In",
  [FilterOperators.IN]: "In",
  [FilterOperators.BETWEEN]: "Between",
  [FilterOperators.CONTAINS]: "Contains",
  [FilterOperators.NOT_EQUAL]: "Not Equal To",
};

interface IProps<T> {
  operators: FilterOperators[];
  filterValue: IColumnFilterBag<T> | undefined;
  setFilter: (value: IColumnFilterBag<T> | undefined) => void;
}

export function RenderFilterOperator<T>({
  operators,
  filterValue,
  setFilter,
}: IProps<T>) {
  useEffect(() => {
    if (!filterValue?.operator && filterValue?.value) {
      setFilter({
        ...filterValue,
        operator: operators[0],
      });
    }
  }, [JSON.stringify(filterValue)]);
  return (
    <>
      <SimpleSelect
        options={[
          ...operators.map((operator) => ({
            value: operator,
            label: FILTER_OPERATOR_LABELS[operator],
          })),
        ]}
        fullWidth
        onChange={(value) => {
          setFilter({
            ...filterValue,
            operator: (value as FilterOperators) || undefined,
          });
        }}
        value={filterValue?.operator || ""}
      />
      <Spacer />
    </>
  );
}
