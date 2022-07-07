import React from 'react';
import { ISystemStatusForDisplay } from '../../../types';
import { SimpleSelect } from '../../Form/SimpleSelect';
import { IFilterProps } from './types';
import { FilterWrapper } from './_FilterWrapper';

export const FilterTableByStatus = (
  statuses: ISystemStatusForDisplay[],
) => function StatusFilterImpl({ column: { filterValue, setFilter } }: IFilterProps<string>) {
  return (
    <FilterWrapper
      filterHasValue={!!filterValue}
      clearFilter={setFilter}
      iconType="filter"
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
