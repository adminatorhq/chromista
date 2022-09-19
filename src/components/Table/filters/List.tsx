import React from "react";
import { Filter } from "react-feather";
import { FilterOperators, IColumnFilterBag } from "@hadmean/protozoa";
import { FilterWrapper } from "./_FilterWrapper";
import { IFilterProps } from "./types";
import { RenderFilterOperator } from "./_FilterOperator";

import { AsyncFormMultiSelect } from "../../Form/FormSelect/Async";

export const FilterTableByListSelection = (bag: string) =>
  function FilterTableByListSelectionImpl({
    column: { filterValue, setFilter },
  }: IFilterProps<IColumnFilterBag<string[]>>) {
    return (
      <FilterWrapper
        filterHasValue={
          filterValue?.value !== undefined && filterValue.value.length > 0
        }
        clearFilter={setFilter}
        IconComponent={Filter}
      >
        <RenderFilterOperator
          operators={[FilterOperators.IN, FilterOperators.NOT_IN]}
          filterValue={filterValue}
          setFilter={setFilter}
        />
        <div style={{ minWidth: "250px" }}>
          <AsyncFormMultiSelect
            url={bag}
            values={filterValue?.value || []}
            onChange={(value) => {
              setFilter({
                ...filterValue,
                value,
              });
            }}
          />
        </div>
      </FilterWrapper>
    );
  };
