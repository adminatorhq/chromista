import React, { useEffect, useState } from "react";
import { Filter } from "react-feather";
import useDebounce from "react-use/lib/useDebounce";
import { FilterOperators, IColumnFilterBag } from "@hadmean/protozoa";
import { FilterWrapper } from "./_FilterWrapper";
import { StyledInput } from "../../Form/Styles";
import { IFilterProps } from "./types";
import { SEARCH_DEBOUNCE_WAIT } from "./constants";
import { Spacer } from "../../../ui-blocks/Spacer";
import { RenderFilterOperator } from "./_FilterOperator";

export function FilterTableByNumbers({
  column: { filterValue, setFilter },
}: IFilterProps<IColumnFilterBag<number>>) {
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
      filterHasValue={filterValue?.value !== undefined}
      clearFilter={setFilter}
      IconComponent={Filter}
      label="Number"
    >
      <RenderFilterOperator
        operators={[
          FilterOperators.EQUAL_TO,
          FilterOperators.NOT_EQUAL,
          FilterOperators.BETWEEN,
          FilterOperators.GREATER_THAN,
          FilterOperators.LESS_THAN,
        ]}
        filterValue={filterValue}
        setFilter={setFilter}
      />

      <StyledInput
        type="number"
        sm
        value={localValue?.value || ""}
        onChange={(e) =>
          setLocalValue({
            ...filterValue,
            value: +e.target.value || undefined,
          })
        }
      />
      {localValue?.operator === FilterOperators.BETWEEN && (
        <>
          <Spacer />
          <StyledInput
            type="number"
            sm
            value={localValue?.value2 || ""}
            onChange={(e) =>
              setLocalValue({
                ...filterValue,
                value2: +e.target.value || undefined,
              })
            }
          />
        </>
      )}
    </FilterWrapper>
  );
}
