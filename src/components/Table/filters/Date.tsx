import React, { useState } from 'react';
import * as StyledGrid from 'styled-bootstrap-grid';
import { Calendar } from 'react-feather';
import styled from 'styled-components';
import useDebounce from 'react-use/lib/useDebounce';
import { SimpleSelect } from '../../Form/SimpleSelect';
import { FilterWrapper } from './_FilterWrapper';
import { StyledInput } from '../../Form/Styles';
import { IFilterProps } from './types';
import { SEARCH_DEBOUNCE_WAIT } from './constants';

const StyledSecondGrid = styled(StyledGrid.Col)`
  padding-left: 0.25rem;
`;

export function FilterTableByDate({
  column: {
    filterValue = { comparision: undefined, value: undefined },
    setFilter,
  },
}: IFilterProps<{
  comparision: string | undefined;
  value: number | undefined;
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
      IconComponent={Calendar}
    >
      <StyledGrid.Row>
        <StyledGrid.Col sm={4}>
          <SimpleSelect
            options={[
              { label: '', value: '' },
              { label: '<', value: 'l' },
              { label: '>', value: 'g' },
              { label: '=', value: 'e' },
              { label: '<>', value: 'between' },
            ]}
            onChange={(value) => {
              setLocalValue({
                value: filterValue.value,
                comparision: value || undefined,
              });
            }}
            value={filterValue.comparision || ''}
          />
        </StyledGrid.Col>
        <StyledSecondGrid sm={8}>
          <StyledInput
            type="number"
            sm
            value={filterValue.value || ''}
            onChange={(e) => setLocalValue({
              comparision: filterValue.comparision,
              value: +e.target.value || undefined,
            })}
          />
        </StyledSecondGrid>
      </StyledGrid.Row>
    </FilterWrapper>
  );
}
