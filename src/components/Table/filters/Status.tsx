import React from 'react';
import { Filter } from 'react-feather';
import { ISystemStatusForDisplay } from '../../../types';
import { SimpleSelect } from '../../Form/SimpleSelect';
import { IFilterProps, IColumnFilterBag, FilterOperators } from './types';
import { RenderFilterOperator } from './_FilterOperator';
import { FilterWrapper } from './_FilterWrapper';

export const FilterTableByStatus = (statuses:
  ISystemStatusForDisplay[]) => function StatusFilterImpl({
  column: { filterValue, setFilter },
}: IFilterProps<IColumnFilterBag<string>>) { // change to multiple select
  return (
    <FilterWrapper
      filterHasValue={filterValue?.value !== undefined}
      clearFilter={setFilter}
      IconComponent={Filter}
    >
      <RenderFilterOperator
        operators={[
          FilterOperators.IN,
          FilterOperators.NOT_IN,
        ]}
        filterValue={filterValue}
        setFilter={setFilter}
      />
      <SimpleSelect
        options={[{ label: '-- Select Status --', value: '' }, ...statuses]}
        onChange={(value: string) => {
          setFilter({
            ...filterValue,
            value,
          });
        }}
        fullWidth
        value={filterValue?.value || ''}
      />
    </FilterWrapper>
  );
};
