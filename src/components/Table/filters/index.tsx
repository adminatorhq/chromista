import { Column } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { IColumnFilterBag } from "@hadmean/protozoa";
import { useDebounce } from "react-use";
import { TableFilterType } from "./types";
import { FilterWrapper } from "./_FilterWrapper";
import { RenderFilterOperator } from "./_FilterOperator";
import { FilterTypesConfigBag } from "./config";

const FILTER_DEBOUNCE_WAIT = 500;

interface IProps {
  type: TableFilterType;
  column: Column<Record<string, unknown>, unknown>;
  view?: React.ReactNode;
}

export function TableFilter({ type, column, view }: IProps) {
  const filterValue = column.getFilterValue() as IColumnFilterBag<any>;

  const setFilter = (value?: IColumnFilterBag<unknown>) => {
    return column.setFilterValue(value);
  };

  const { filterHasValueImpl, operators, FilterComponent } =
    FilterTypesConfigBag[type._type];

  const [localValue, setLocalValue] = useState<
    IColumnFilterBag<any> | undefined
  >(filterValue);

  useEffect(() => {
    setLocalValue(filterValue);
  }, [filterValue]);

  useDebounce(
    () => {
      setFilter(localValue);
    },
    FILTER_DEBOUNCE_WAIT,
    [localValue]
  );

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
          filterValue: localValue,
          setFilter: (value) => setLocalValue(value),
        }}
        bag={type.bag}
      />
    </FilterWrapper>
  );
}
