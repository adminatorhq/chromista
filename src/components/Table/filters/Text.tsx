import React, { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import { IColumnFilterBag } from "@hadmean/protozoa";
import { StyledInput } from "../../Form/Styles";
import { SEARCH_DEBOUNCE_WAIT } from "./constants";
import { IFilterProps } from "./types";

export function FilterTableByText({
  column: { filterValue, setFilter },
}: IFilterProps<IColumnFilterBag<string>, undefined>) {
  const [localValue, setLocalValue] = useState(filterValue);

  // Coming for this

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
    <StyledInput
      value={localValue?.value || ""}
      onChange={(e: React.BaseSyntheticEvent) => {
        setLocalValue({
          ...filterValue,
          value: e.target.value || undefined,
        });
      }}
      placeholder="Search"
    />
  );
}
