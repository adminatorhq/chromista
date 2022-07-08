import React, { useState } from 'react';
import { Search } from 'react-feather';
import { useDebounce } from 'react-use';
import { StyledInput } from '../../Form/Styles';
import { SEARCH_DEBOUNCE_WAIT } from './constants';
import { FilterOperators, IColumnFilterBag, IFilterProps } from './types';
import { RenderFilterOperator } from './_FilterOperator';
import { FilterWrapper } from './_FilterWrapper';

export function FilterTableByText({
  column: { filterValue, setFilter },
}: IFilterProps<IColumnFilterBag<string>>) {
  const [localValue, setLocalValue] = useState(filterValue);

  useDebounce(
    () => {
      setFilter(localValue);
    },
    SEARCH_DEBOUNCE_WAIT,
    [localValue],
  );

  return (
    <FilterWrapper
      filterHasValue={!!filterValue}
      clearFilter={setFilter}
      IconComponent={Search}
    >
      <RenderFilterOperator
        operators={[
          FilterOperators.EQUAL_TO,
          FilterOperators.CONTAINS,
          FilterOperators.NOT_EQUAL,
        ]}
        filterValue={filterValue}
        setFilter={setFilter}
      />
      <StyledInput
        value={localValue?.value || ''}
        onChange={(e: React.BaseSyntheticEvent) => {
          setLocalValue({
            ...localValue,
            value: e.target.value || undefined,
          });
        }}
        placeholder="Search"
      />
    </FilterWrapper>
  );
}

// starts with
// ends with
// not contain
