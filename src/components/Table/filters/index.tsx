import { Column } from "@tanstack/react-table";
import React from "react";
import { IColumnFilterBag } from "@hadmean/protozoa";
import { FilterTableByStatus } from "./Status";
import { TableFilterType } from "./types";
import { FilterTableByListSelection } from "./List";
import { FilterTableByIdField } from "./IdField";
import { FilterTableByText } from "./Text";
import { FilterTableByNumbers } from "./Number";
import { FilterTableByBooleans } from "./Boolean";
import { FilterTableByDate } from "./Date";

interface IProps {
  type?: TableFilterType;
  column: Column<Record<string, unknown>, unknown>;
}

export function TableFilter({ type, column }: IProps) {
  if (!type) {
    return null;
  }
  const getComponent = () => {
    switch (type._type) {
      case "idField":
        return FilterTableByIdField;
      case "number":
        return FilterTableByNumbers;
      case "boolean":
        return FilterTableByBooleans(type.bag);
      case "string":
        return FilterTableByText;
      case "status":
        return FilterTableByStatus(type.bag);
      case "date":
        return FilterTableByDate;
      case "list":
        return FilterTableByListSelection(type.bag);
    }
  };

  const FilterComponent = getComponent();

  return (
    <FilterComponent
      column={{
        filterValue: column.getFilterValue() as IColumnFilterBag<any>,
        setFilter: (value?: IColumnFilterBag<unknown>) => {
          return column.setFilterValue(value);
        },
      }}
    />
  );
}
