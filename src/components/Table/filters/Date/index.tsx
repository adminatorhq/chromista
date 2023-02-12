import React, { useEffect, useState } from "react";
import useDebounce from "react-use/lib/useDebounce";
import {
  IColumnFilterBag,
  DATE_FILTER_OPTIONS,
  DATE_FILTER_VALUE,
} from "@hadmean/protozoa";
import { IFilterProps } from "../types";
import { SEARCH_DEBOUNCE_WAIT } from "../constants";
import { Spacer } from "../../../../ui-blocks";
import { DateSelection } from "./_Selection";
import { FormSwitch } from "../../../Form";
import { ControlledFormDateInput } from "../../../Form/FormDateInput";

export function FilterTableByDate({
  column: { filterValue, setFilter },
}: IFilterProps<IColumnFilterBag<string>, undefined>) {
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

  const [isOnCustomDate, setIsOnCustomDate] = useState(false);

  return (
    <>
      <FormSwitch
        name="custom_date"
        onChange={(newFormat) => {
          setIsOnCustomDate(newFormat);
          if (!newFormat) {
            setFilter({
              ...filterValue,
              value: DATE_FILTER_VALUE.BEGINNING_OF_TIME_VALUE,
              value2: DATE_FILTER_VALUE.NOW,
            });
          } else {
            setFilter({
              ...filterValue,
              value: new Date().toDateString(),
              value2: new Date().toDateString(),
            });
          }
        }}
        value={isOnCustomDate}
        size="sm"
        label="Custom Date"
      />
      {new Date(filterValue?.value || "").toString() !== "Invalid Date" ? (
        <>
          <ControlledFormDateInput
            onChange={(value) => {
              setFilter({
                ...filterValue,
                value: new Date(value || "").toDateString(),
              });
            }}
            value={new Date(filterValue?.value || "")}
          />
          <Spacer />
          <ControlledFormDateInput
            onChange={(value) => {
              setFilter({
                ...filterValue,
                value2: new Date(value || "").toDateString(),
              });
            }}
            value={new Date(filterValue?.value2 || "")}
          />
        </>
      ) : (
        <>
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
            dateOptions={DATE_FILTER_OPTIONS.filter(
              ({ hideOnTo }) => !hideOnTo
            )}
          />
        </>
      )}
    </>
  );
}
