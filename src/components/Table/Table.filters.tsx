/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactNode } from 'react';
import { Filter, Search } from 'react-feather';
import * as StyledGrid from 'styled-bootstrap-grid';
import styled from 'styled-components';
import { SoftButton } from '../Button/SoftButton';
import { SimpleSelect } from '../Form/SimpleSelect';
import { mapIdAndNameToSelectData } from '../Form/mappers';
import { FormMultiSelect } from '../Form/FormSelect';
import { StyledInput } from '../Form/Styles';
import { themeContext } from '../../AppWrapper/Global';
import { ISystemStatusForDisplay } from '../../types';
import { Dropdown } from '../Dropdown';
import { APP_COLORS } from '../../constants/colors';
import { Stack } from '../../ui-blocks';
import { TableFilterType } from './Table.types';

interface IProps {
  children: ReactNode;
  filterValue: unknown;
  setFilter: (filter: unknown) => void;
  iconType: 'search' | 'filter' | 'numeric' | 'list';
}

const StyledSoftButton = styled(SoftButton)`
  margin-bottom: 0.25rem;
`;

const Root = styled.div`
  cursor: pointer;
`;

const DownRoot = styled(Stack)`
  background: ${APP_COLORS.white};
  padding: 8px;
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.border};
  min-width: 250px;
`;

function FilterWrapper({
  children,
  filterValue,
  setFilter,
  iconType,
}: IProps) {
  const iconProps = {
    size: 15,
    color: filterValue ? themeContext.colors.primary : 'rgb(48, 62, 103)',
    style: { opacity: filterValue ? 1 : 0.3 },
  };
  return (
    <span
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Dropdown
        preserveVisibiltyOnClick
        target={(
          <Root>
            {iconType === 'search' ? (
              <Search {...iconProps} />
            ) : (
              <Filter {...iconProps} />
            )}
          </Root>
        )}
      >
        <DownRoot direction="column">
          <div>{children}</div>
          <StyledSoftButton
            onClick={() => {
              setFilter(undefined);
            }}
            size="xs"
            icon="close"
            label="Reset"
          />
        </DownRoot>
      </Dropdown>
    </span>
  );
}

export const StatusFilter = (
  statuses: ISystemStatusForDisplay[],
) => function StatusFilterImpl({ column: { filterValue, setFilter } }: any) {
  return (
    <FilterWrapper
      filterValue={filterValue}
      setFilter={setFilter}
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

export const ListSelectionFilter = (
  bag: {
    onChange: (word: string) => void;
    selections: {id: string, name: string}[];
  },
) => function ListSelectionFilterImpl({ column: { filterValue = [], setFilter } }: any) {
  return (
    <FilterWrapper
      filterValue={filterValue.length}
      setFilter={setFilter}
      iconType="list"
    >
      <div style={{ minWidth: '250px' }}>
        <FormMultiSelect
          selectData={mapIdAndNameToSelectData(bag.selections)}
          values={filterValue}
          onChange={setFilter}
        />
      </div>
    </FilterWrapper>
  );
};

const StyledSecondGrid = styled(StyledGrid.Col)`
  padding-left: 0.25rem;
`;

export function NumberSelectionFilter({
  column: { filterValue = { comparision: '', value: '' }, setFilter },
}: any) {
  return (
    <FilterWrapper
      filterValue={filterValue.value}
      setFilter={setFilter}
      iconType="numeric"
    >
      <StyledGrid.Row>
        <StyledGrid.Col sm={4}>
          <SimpleSelect
            options={[
              { label: '', value: '' },
              { label: '<', value: 'l' },
              { label: '>', value: 'g' },
              { label: '=', value: 'e' },
              { label: '<>', value: 'between' }, // TODO
            ]}
            onChange={(value) => {
              setFilter({
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
            onChange={(e) => setFilter({
              comparision: filterValue.comparision,
              value: e.target.value || undefined,
            })}
          />
        </StyledSecondGrid>
      </StyledGrid.Row>
    </FilterWrapper>
  );
}

export function TextSearchFilter({ column: { filterValue, setFilter } }: any) {
  return (
    <FilterWrapper
      filterValue={filterValue}
      setFilter={setFilter}
      iconType="search"
    >
      <StyledInput
        value={filterValue || ''}
        onChange={(e: React.BaseSyntheticEvent) => {
          setFilter(e.target.value || undefined);
        }}
        placeholder="Search"
      />
    </FilterWrapper>
  );
}

export const mapFilterTypeToComponent = (
  type: TableFilterType,
): ((input: {
  columns: { filterValue: unknown; setFilter: (filter: unknown) => void };
}) => ReactNode) => {
  switch (type._type) {
    case 'number':
      return NumberSelectionFilter;
    case 'string':
      return TextSearchFilter;
    case 'status':
      return StatusFilter(type.bag);
    case 'list':
      // return ListSelectionFilter(type.config);
      return ListSelectionFilter(type.config);
    default:
      throw new Error('Filter type not implemented');
  }
};

// TODO date range
// TODO debounce all the keyboard input
