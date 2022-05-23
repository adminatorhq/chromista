import React, { useState, ReactNode } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Filter, Search } from 'react-feather';
import { SoftButton } from '../Form/Done/SoftButton';
import { SimpleSelect } from '../Form/Done/SimpleSelect';
import { mapIdAndNameToSelectData } from '../Form/Done/mappers';
import { FormMultiSelect } from '../Form/Done/FormSelect';
import * as StyledGrid from 'styled-bootstrap-grid';
import { StyledInput } from '../Form/Done/Styles';
import styled from 'styled-components';
import { themeContext } from '../../styles/Global';
import { ISystemStatusForDisplay } from '../../types';

const togglePreviousState = (prev: boolean) => !prev;

interface IProps {
  children: ReactNode;
  filterValue: unknown;
  setFilter: (filter: undefined) => void;
  iconType: 'search' | 'filter' | 'numeric' | 'list';
}

const FilterWrapper: React.FC<IProps> = ({
  children,
  filterValue,
  setFilter,
  iconType,
}) => {
  const [isFilterDropDownOpen, setFilterDropDownOpen] = useState(false);
  const toggleFilterDropDown = () => setFilterDropDownOpen(togglePreviousState);
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
        isOpen={isFilterDropDownOpen}
        toggle={toggleFilterDropDown}
        tag="span"
        className="float-right"
        style={{ marginBottom: '-5px' }}
      >
        <DropdownToggle tag="a" className="dropdown-toggle waves-effect waves-light">
          {iconType === 'search' ? <Search {...iconProps} /> : <Filter {...iconProps} />}
        </DropdownToggle>
        <DropdownMenu right={true} className="dropdown-menu dropdown-menu-right p-1">
          {children}
          <StyledSoftButton
            onClick={() => {
              setFilter(undefined);
            }}
            size="xs"
            icon="close"
            label="Reset"
          />
        </DropdownMenu>
      </Dropdown>
    </span>
  );
};

export const StatusFilter =
  (statuses: ISystemStatusForDisplay[]) =>
  ({ column: { filterValue, setFilter } }: any) => {
    return (
      <FilterWrapper filterValue={filterValue} setFilter={setFilter} iconType="filter">
        <SimpleSelect
          options={[{ label: '-- Select Status --', value: '' }, ...statuses]}
          onChange={value => {
            setFilter(value || undefined);
          }}
          fullWidth={true}
          value={filterValue || ''}
        />
      </FilterWrapper>
    );
  };

export const ListSelectionFilter =
  (selections: { id: string; name: string }[]) =>
  ({ column: { filterValue = [], setFilter } }: any) => {
    return (
      <FilterWrapper filterValue={filterValue.length} setFilter={setFilter} iconType="list">
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
    <FilterWrapper filterValue={filterValue.value} setFilter={setFilter} iconType="numeric">
      <StyledGrid.Row>
        <StyledGrid.Col sm={4}>
          <SimpleSelect
            options={[
              { label: '', value: '' },
              { label: '<', value: 'l' },
              { label: '>', value: 'g' },
              { label: '=', value: 'e' },
            ]}
            onChange={value => {
              setFilter({ value: filterValue.value, comparision: value || undefined });
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

export const TextSearchFilter = ({ column: { filterValue, setFilter } }: any) => {
  return (
    <FilterWrapper filterValue={filterValue} setFilter={setFilter} iconType="search">
      <StyledInput
        value={filterValue || ''}
        onChange={e => {
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

// TODO date range
// TODO debounce all the keyboard input
