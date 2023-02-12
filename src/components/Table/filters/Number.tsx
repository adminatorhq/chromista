import React, { useEffect, useState } from "react";
import useDebounce from "react-use/lib/useDebounce";
import { FilterOperators, IColumnFilterBag } from "@hadmean/protozoa";
import { StyledInput } from "../../Form/Styles";
import { IFilterProps } from "./types";
import { SEARCH_DEBOUNCE_WAIT } from "./constants";
import { Spacer } from "../../../ui-blocks/Spacer";

export function FilterTableByNumbers({
  column: { filterValue, setFilter },
}: IFilterProps<IColumnFilterBag<number>, undefined>) {
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
    <>
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
    </>
  );
}
