import React from 'react';
import { Filter } from 'react-feather';
import { mapIdAndNameToSelectData } from '../../Form/mappers';
import { FormMultiSelect } from '../../Form/FormSelect';
import { FilterWrapper } from './_FilterWrapper';
import { FilterOperators, IColumnFilterBag, IFilterProps } from './types';
import { RenderFilterOperator } from './_FilterOperator';

export const FilterTableByListSelection = (
  bag: {
      onChange: (word: string) => void;
      selections: {id: string, name: string}[];
    },
) => function FilterTableByListSelectionImpl({
  column: {
    filterValue,
    setFilter,
  },
}: IFilterProps<IColumnFilterBag<string[]>>) {
  return (
    <FilterWrapper
      filterHasValue={!!filterValue?.value && filterValue.value.length > 0}
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
      <div style={{ minWidth: '250px' }}>
        <FormMultiSelect
          selectData={mapIdAndNameToSelectData(bag.selections)}
          values={filterValue?.value || []}
          onChange={(value) => {
            setFilter({
              ...filterValue,
              value,
            });
          }}
        />
      </div>
    </FilterWrapper>
  );
};
