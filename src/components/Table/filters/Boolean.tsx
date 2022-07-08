import React from 'react';
import { ToggleLeft } from 'react-feather';
import { ISystemStatusForDisplay } from '../../../types';
import { SimpleSelect } from '../../Form/SimpleSelect';
import { IFilterProps } from './types';
import { FilterWrapper } from './_FilterWrapper';

export const FilterTableByBooleans = (
  statuses: ISystemStatusForDisplay[],
) => function StatusFilterImpl({ column: { filterValue, setFilter } }: IFilterProps<string>) {
  return (
    <FilterWrapper
      filterHasValue={!!filterValue}
      clearFilter={setFilter}
      IconComponent={ToggleLeft}
    >
      <SimpleSelect
        options={[{ label: '-- Select Status --', value: '' }, ...statuses]}
        onChange={(value: string) => {
          setFilter(value || undefined);
        }}
        fullWidth
        value={filterValue || ''}
      />
    </FilterWrapper>
  );
};
