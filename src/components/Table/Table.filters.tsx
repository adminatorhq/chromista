import React, { ReactNode } from 'react';
import { Filter, Search } from 'react-feather';
import { SoftButton } from '../Button/SoftButton';
import { SimpleSelect } from '../Form/SimpleSelect';
import { mapIdAndNameToSelectData } from '../Form/mappers';
import { FormMultiSelect } from '../Form/FormSelect';
import * as StyledGrid from 'styled-bootstrap-grid';
import { StyledInput } from '../Form/Styles';
import styled from 'styled-components';
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

export const mapFilterTypeToComponent = (
  type: TableFilterType
): ((input: {
  columns: { filterValue: unknown; setFilter: (filter: unknown) => void };
}) => JSX.Element) => {
  switch (type._type) {
    case 'number':
      return NumberSelectionFilter;
    case 'string':
      return TextSearchFilter;
    case 'status':
      return StatusFilter(type.bag);
    case 'list':
      return ListSelectionFilter(type.bag);
  }
};

const FilterWrapper: React.FC<IProps> = ({
  children,
  filterValue,
  setFilter,
  iconType,
}) => {
  const iconProps = {
    size: 15,
    color: filterValue ? themeContext.colors.primary : 'rgb(48, 62, 103)',
    style: { opacity: filterValue ? 1 : 0.3 },
  };
  return (
    <span
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Dropdown
        preserveVisibiltyOnClick={true}
        target={
          <Root>
            {iconType === 'search' ? (
              <Search {...iconProps} />
            ) : (
              <Filter {...iconProps} />
            )}
          </Root>
        }
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
};

const DownRoot = styled(Stack)`
  background: ${APP_COLORS.white};
  padding: 8px;
  border-radius: 2px;
  border: 1px solid ${props => props.theme.colors.border};
  min-width: 250px;
`;

export const StatusFilter = (statuses: ISystemStatusForDisplay[]) => ({
  column: { filterValue, setFilter },
}: any) => {
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
        fullWidth={true}
        value={filterValue || ''}
      />
    </FilterWrapper>
  );
};

export const ListSelectionFilter = (
  selections: { id: string; name: string }[]
) => ({ column: { filterValue = [], setFilter } }: any) => {
  return (
    <FilterWrapper
      filterValue={filterValue.length}
      setFilter={setFilter}
      iconType="list"
    >
      <div style={{ minWidth: '250px' }}>
        <FormMultiSelect
          selectData={mapIdAndNameToSelectData(selections)}
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

export const NumberSelectionFilter = ({
  column: { filterValue = { comparision: '', value: '' }, setFilter },
}: any) => {
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
            onChange={value => {
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
            sm={true}
            value={filterValue.value || ''}
            onChange={e =>
              setFilter({
                comparision: filterValue.comparision,
                value: e.target.value || undefined,
              })
            }
          />
        </StyledSecondGrid>
      </StyledGrid.Row>
    </FilterWrapper>
  );
};

export const TextSearchFilter = ({
  column: { filterValue, setFilter },
}: any) => {
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
        placeholder={`Search`}
      />
    </FilterWrapper>
  );
};

const StyledSoftButton = styled(SoftButton)`
  margin-bottom: 0.25rem;
`;

const Root = styled.div`
  cursor: pointer;
`;

// TODO date range
// TODO debounce all the keyboard input
