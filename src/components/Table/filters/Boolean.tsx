import React from 'react';
import { ToggleLeft } from 'react-feather';
import { ISystemStatusForDisplay } from '../../../types';
import { SimpleSelect } from '../../Form/SimpleSelect';
import { FilterOperators, IColumnFilterBag, IFilterProps } from './types';
import { FilterWrapper } from './_FilterWrapper';

export const FilterTableByBooleans = (statuses:
   ISystemStatusForDisplay[]) => function StatusFilterImpl({
  column: { filterValue, setFilter },
}: IFilterProps<IColumnFilterBag<boolean>>) {
  return (
    <FilterWrapper
      filterHasValue={filterValue?.value !== undefined}
      clearFilter={setFilter}
      IconComponent={ToggleLeft}
    >
      <SimpleSelect
        options={[{ label: '-- Select State --', value: '' }, ...statuses]}
        onChange={(value: string) => {
          setFilter({ operator: FilterOperators.EQUAL_TO, value: value === '' ? undefined : value === 'true' });
        }}
        fullWidth
        // eslint-disable-next-line no-nested-ternary
        value={filterValue?.value === undefined ? '' : filterValue?.value ? 'true' : 'false'}
      />
    </FilterWrapper>
  );
};
