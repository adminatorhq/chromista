import React, { useState } from 'react';
import { Filter } from 'react-feather';
import useDebounce from 'react-use/lib/useDebounce';
import { SimpleSelect } from '../../Form/SimpleSelect';
import { FilterWrapper } from './_FilterWrapper';
import { StyledInput } from '../../Form/Styles';
import { IFilterProps } from './types';
import { SEARCH_DEBOUNCE_WAIT } from './constants';
import { Spacer } from '../../../ui-blocks/Spacer';

const BETWEEN_VALUE = 'b';

export function FilterTableByNumbers({
  column: {
    filterValue = {
      comparision: undefined,
      value: undefined,
      value2: undefined,
    },
    setFilter,
  },
}: IFilterProps<{
  comparision: string | undefined;
  value: number | undefined;
  value2: number | undefined;
}>) {
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
      filterHasValue={!!filterValue.value}
      clearFilter={setFilter}
      IconComponent={Filter}
    >
      <SimpleSelect
        options={[
          { label: '', value: '' },
          { label: 'Equal To', value: 'e' },
          { label: 'Greater Than', value: 'l' },
          { label: 'Less Than', value: 'g' },
          { label: 'Not Equal To', value: 'n' },
          { label: 'Between', value: BETWEEN_VALUE },
        ]}
        fullWidth
        onChange={(value) => {
          setLocalValue({
            ...filterValue,
            comparision: value || undefined,
          });
        }}
        value={localValue.comparision || ''}
      />
      <Spacer />
      <StyledInput
        type="number"
        sm
        value={localValue.value || ''}
        onChange={(e) => setLocalValue({
          ...filterValue,
          value: +e.target.value || undefined,
        })}
      />
      {localValue.comparision === BETWEEN_VALUE && (
        <>
          <Spacer />
          <StyledInput
            type="number"
            sm
            value={localValue.value2 || ''}
            onChange={(e) => setLocalValue({
              ...filterValue,
              value2: +e.target.value || undefined,
            })}
          />
        </>
      )}
    </FilterWrapper>
  );
}
