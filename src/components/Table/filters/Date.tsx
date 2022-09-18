import React, { useEffect, useState } from "react";
import { Calendar } from "react-feather";
import useDebounce from "react-use/lib/useDebounce";
import { SimpleSelect } from "../../Form/FormSelect/Simple";
import { FilterWrapper } from "./_FilterWrapper";
import { FilterOperators, IColumnFilterBag, IFilterProps } from "./types";
import { SEARCH_DEBOUNCE_WAIT } from "./constants";
import { RenderFilterOperator } from "./_FilterOperator";
import { Spacer } from "../../../ui-blocks";

const BEGINNING_OF_TIME_VALUE = "bot";
const NOW_VALUE = "now";

const DATE_OPTIONS: {
  label: string;
  value: string;
  hideOnFrom?: true;
  hideOnTo?: true;
  countLimit?: number;
}[] = [
  {
    label: "Beggining of time",
    value: BEGINNING_OF_TIME_VALUE,
    hideOnTo: true,
  },
  {
    label: "Beggining of Year",
    value: "boy",
    hideOnTo: true,
  },
  {
    label: "Hour",
    value: "h",
    countLimit: 24,
  },
  {
    label: "Day",
    value: "d",
    countLimit: 7,
  },
  {
    label: "Week",
    value: "w",
    countLimit: 4,
  },
  {
    label: "Month",
    value: "m",
    countLimit: 12,
  },
  {
    label: "Year",
    value: "y",
    countLimit: 10,
  },
  {
    label: "Now",
    value: NOW_VALUE,
    hideOnFrom: true,
  },
];

// custom date

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
        filterValue?.value !== undefined && filterValue?.value2 !== undefined
      }
      clearFilter={setFilter}
      IconComponent={Calendar}
    >
      <div style={{ display: "none" }}>
        <RenderFilterOperator
          operators={[FilterOperators.BETWEEN]}
          filterValue={filterValue}
          setFilter={setFilter}
        />
      </div>

      <SimpleSelect
        options={DATE_OPTIONS.filter(({ hideOnFrom }) => !hideOnFrom).map(
          ({ value, label }) => ({ label, value })
        )}
        fullWidth
        onChange={(value) => {
          setFilter({
            ...filterValue,
            value,
          });
        }}
        value={filterValue?.value || BEGINNING_OF_TIME_VALUE}
      />

      <SimpleSelect
        options={DATE_OPTIONS.filter(({ hideOnFrom }) => !hideOnFrom).map(
          ({ value, label }) => ({ label, value })
        )}
        fullWidth
        onChange={(value) => {
          setFilter({
            ...filterValue,
            value,
          });
        }}
        value={filterValue?.value || BEGINNING_OF_TIME_VALUE}
      />

      <Spacer />
      <SimpleSelect
        options={DATE_OPTIONS.filter(({ hideOnTo }) => !hideOnTo).map(
          ({ value, label }) => ({ label, value })
        )}
        fullWidth
        onChange={(value2) => {
          setFilter({
            ...filterValue,
            value2,
          });
        }}
        value={filterValue?.value2 || NOW_VALUE}
      />
    </FilterWrapper>
  );
}
