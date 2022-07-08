import React from 'react';
// import * as StyledGrid from 'styled-bootstrap-grid';
import { Calendar } from 'react-feather';
// import styled from 'styled-components';
// import useDebounce from 'react-use/lib/useDebounce';
// import { SimpleSelect } from '../../Form/SimpleSelect';
import { FilterWrapper } from './_FilterWrapper';
// import { StyledInput } from '../../Form/Styles';
import { IColumnFilterBag, IFilterProps } from './types';
// import { SEARCH_DEBOUNCE_WAIT } from './constants';
// Special case

export function FilterTableByDate({
  column: {
    filterValue,
    setFilter,
  },
}: IFilterProps<IColumnFilterBag<string>>) {
  // const [localValue, setLocalValue] = useState(filterValue);

  // useDebounce(
  //   () => {
  //     setFilter(localValue);
  //   },
  //   SEARCH_DEBOUNCE_WAIT,
  //   [localValue],
  // );

  return (
    <FilterWrapper
      filterHasValue={filterValue?.value !== undefined && filterValue?.value2 !== undefined}
      clearFilter={setFilter}
      IconComponent={Calendar}
    >
      {/* <StyledGrid.Row>
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
      </StyledGrid.Row> */}
    </FilterWrapper>
  );
}

// On

// From
// now

// Past 1 hour
// 6 hours
// 12 hours
// 1 Day
// 3 days
// 1 Week
// 1 month
// Past 3 month
// 6 month
// 1 year
// Beginning of year
// custom date

// To
// Beggining of time
