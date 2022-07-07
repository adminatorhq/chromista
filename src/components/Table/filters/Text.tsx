import React, { useState } from 'react';
import { useDebounce } from 'react-use';
import { StyledInput } from '../../Form/Styles';
import { SEARCH_DEBOUNCE_WAIT } from './constants';
import { IFilterProps } from './types';
import { FilterWrapper } from './_FilterWrapper';

export function FilterTableByText({ column: { filterValue, setFilter } }: IFilterProps<string>) {
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
      iconType="search"
    >
      <StyledInput
        value={filterValue || ''}
        onChange={(e: React.BaseSyntheticEvent) => {
          setLocalValue(e.target.value || undefined);
        }}
        placeholder="Search"
      />
    </FilterWrapper>
  );
}
