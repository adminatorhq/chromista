import { Column } from "@tanstack/react-table";
import React from "react";
import { IColumnFilterBag } from "@hadmean/protozoa";
import { TableFilterType } from "./types";
import { FilterWrapper } from "./_FilterWrapper";
import { RenderFilterOperator } from "./_FilterOperator";
import { FilterComponentImpl } from "./config";

interface IProps {
  type?: TableFilterType;
  column: Column<Record<string, unknown>, unknown>;
  view?: React.ReactNode;
}

export function TableFilter({ type, column, view }: IProps) {
  if (!type) {
    return null;
  }

  const filterValue: IColumnFilterBag<any> =
    column.getFilterValue() as IColumnFilterBag<any>;

  const setFilter = (value?: IColumnFilterBag<unknown>) => {
    return column.setFilterValue(value);
  };

  const { filterHasValueImpl, operators, FilterComponent } =
    FilterComponentImpl[type._type];

  return (
    <FilterWrapper
      filterHasValue={filterHasValueImpl(filterValue)}
      clearFilter={setFilter}
      columnLabel={view}
      filterType={type._type}
    >
      {operators.length > 0 && (
        <div style={{ display: operators.length === 1 ? "none" : "block" }}>
          <RenderFilterOperator
            operators={operators}
            filterValue={filterValue}
            setFilter={setFilter}
          />
        </div>
      )}
      <FilterComponent
        column={{
          filterValue,
          setFilter,
        }}
        bag={type.bag}
      />
    </FilterWrapper>
  );
}
