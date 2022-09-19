import React, { useEffect, useState } from "react";
import { Calendar } from "react-feather";
import useDebounce from "react-use/lib/useDebounce";
import {
  FilterOperators,
  IColumnFilterBag,
  DATE_FILTER_OPTIONS,
  DATE_FILTER_VALUE,
} from "@hadmean/protozoa";
import { FilterWrapper } from "../_FilterWrapper";
import { IFilterProps } from "../types";
import { SEARCH_DEBOUNCE_WAIT } from "../constants";
import { RenderFilterOperator } from "../_FilterOperator";
import { Spacer } from "../../../../ui-blocks";
import { DateSelection } from "./_Selection";

export function FilterTableByDate({
  column: { filterValue, setFilter },
}: IFilterProps<IColumnFilterBag<string>>) {
  const [localValue, setLocalValue] = useState(filterValue);

  useEffect(() => {
    setLocalValue(filterValue);
  }, [filterValue]);

  useDebounce(
    () => {
      setFilter(localValue);
    },
    SEARCH_DEBOUNCE_WAIT,
    [localValue]
  );
  return (
    <FilterWrapper
      filterHasValue={
        filterValue?.value !== undefined || filterValue?.value2 !== undefined
      }
      clearFilter={setFilter}
      IconComponent={Calendar}
    >
      <div style={{ display: "none" }}>
        <RenderFilterOperator
          operators={[FilterOperators.DATE]}
          filterValue={filterValue}
          setFilter={setFilter}
        />
      </div>
      <DateSelection
        setFilter={setFilter}
        filterValue={filterValue}
        field="value"
        defaultValue={DATE_FILTER_VALUE.BEGINNING_OF_TIME_VALUE}
        dateOptions={DATE_FILTER_OPTIONS.filter(
          ({ hideOnFrom }) => !hideOnFrom
        )}
      />
      <Spacer />
      <DateSelection
        setFilter={setFilter}
        filterValue={filterValue}
        field="value2"
        defaultValue={DATE_FILTER_VALUE.NOW}
        dateOptions={DATE_FILTER_OPTIONS.filter(({ hideOnTo }) => !hideOnTo)}
      />
    </FilterWrapper>
  );
}
