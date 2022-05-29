import React, { useState, Fragment, useEffect } from 'react';
import { useTable, usePagination, useSortBy, useFilters } from 'react-table';
import ReactPaginate from 'react-paginate';
import classnames from 'classnames';
import { ComponentIsLoading } from '../ComponentIsLoading';
import { ErrorAlert } from '../Alert';
import { SimpleSelect } from '../Form';
import { EmptyWrapper } from '../EmptyWrapper';
import { useFetchTableData } from './Table.hooks';
import { IFetchTableDataParams, ITable, ITableFilter } from './Table.types';
import { SoftButton } from '../Button/SoftButton';
import * as StyledGrid from 'styled-bootstrap-grid';
import styled from 'styled-components';

// TODO when I click on products the state should be preserved when returning back for navigation
// and keep all the settings in localstorage except the pageIndex
const DEFAULT_TABLE_PARAMS = {
  pageIndex: 0,
  pageSize: 10,
  sortBy: [],
  hiddenColumns: [],
  filters: [],
};

export const Table: React.FC<ITable> = ({
  columns,
  url,
  createPath,
  singular,
  title,
}) => {
  const [fetchTableDataParams, setFetchTableDataParams] = useState<
    IFetchTableDataParams
  >(DEFAULT_TABLE_PARAMS);

  const {
    data = { count: 0, data: [] },
    isLoading,
    error,
    isPreviousData,
  } = useFetchTableData(url, fetchTableDataParams);

  const totalPageCount =
    data.count === 0
      ? 0
      : Math.ceil(data.count / fetchTableDataParams.pageSize);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    gotoPage,
    setPageSize,
    state: tableState,
  } = useTable(
    {
      columns,
      data: data.data,
      pageCount: totalPageCount,
      manualPagination: true,
      manualFilters: true,
      manualSortBy: true,
      disableMultiSort: true,
      autoResetSortBy: false,
      autoResetPage: false,
      autoResetFilters: false,
      initialState: DEFAULT_TABLE_PARAMS,
      defaultColumn: {
        Filter: <Fragment />,
      },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    if (
      tableState.filters.length === 0 ||
      tableState.filters.some(({ value }: ITableFilter) => {
        if (typeof value === 'string' && value.length < 3) {
          // TODO clean the false posities when my select value is less than three characters
          // BY adding a new field to the parameter to check and filter out
          return false;
        }
        if (typeof value === 'object') {
          return !Object.values(value).some(value$1 => !value$1);
        }
        return true;
      })
    ) {
      setFetchTableDataParams(tableState);
    }
  }, [tableState]);

  return (
    <StyledGrid.Container fluid={true}>
      {error ? (
        <StyledErrorWrapper>
          <ErrorAlert message={error} />
        </StyledErrorWrapper>
      ) : null}
      <StyledTableResponsive>
        <StyledTableTitle>
          {title}
          <StyledSoftButton
            to={createPath}
            label={`New ${singular}`}
            icon="add"
          />
        </StyledTableTitle>
        <div style={{ position: 'relative' }}>
          {(isLoading || isPreviousData) && !error ? (
            <StyledOverlay>
              <StyledOverlayText>
                <ComponentIsLoading />
              </StyledOverlayText>
            </StyledOverlay>
          ) : null}
          <StyledTable
            {...getTableProps()}
            className="table-bordered table-hover nowrap"
          >
            <thead>
              {headerGroups.map((headerGroup: any, key2: number) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={key2}>
                  {headerGroup.headers.map((column: any, key1: number) => {
                    return (
                      <StyledTh
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        key={key1}
                      >
                        <b className="mt-1">{column.render('Header')}</b>
                        <span
                          className={classnames({
                            sorting: column.canSort,
                            sorting_desc:
                              column.isSorted && column.isSortedDesc,
                            sorting_asc:
                              column.isSorted && !column.isSortedDesc,
                          })}
                        />
                        {column.canFilter ? column.render('Filter') : null}
                      </StyledTh>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row: any, key3: number) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={key3}>
                    {row.cells.map((cell: any, key: number) => {
                      return (
                        <td {...cell.getCellProps()} key={key}>
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              {data.data.length === 0 ? (
                <tr>
                  <StyledTd colSpan={10000}>
                    {isLoading ? (
                      <div style={{ height: '204px' }} />
                    ) : (
                      <EmptyWrapper text="No Data" />
                    )}
                  </StyledTd>
                </tr>
              ) : null}
            </tbody>
          </StyledTable>
        </div>
        <div className="row p-1">
          <StyledGrid.Col sm={12} md={6}>
            <label>
              Showing{' '}
              <SimpleSelect
                options={[10, 25, 50].map(option => ({
                  value: `${option}`,
                  label: `${option}`,
                }))}
                onChange={value => setPageSize(Number(value))}
                value={tableState.pageSize}
              />{' '}
              entries of <b>{data.count}</b> results
            </label>
          </StyledGrid.Col>
          <StyledGrid.Col sm={12} md={6}>
            <ReactPaginate
              previousLabel={'prev'}
              nextLabel={'next'}
              breakLabel={'...'}
              pageCount={totalPageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              breakClassName={'page-item'}
              nextClassName={'page-item'}
              previousClassName={'page-item'}
              pageClassName={'page-item'}
              breakLinkClassName={'page-link'}
              pageLinkClassName={'page-link'}
              nextLinkClassName={'page-link'}
              previousLinkClassName={'page-link'}
              containerClassName={'pagination float-right'}
              activeClassName={'active'}
              onPageChange={({ selected }) => {
                gotoPage(selected);
              }}
            />
          </StyledGrid.Col>
        </div>
      </StyledTableResponsive>
    </StyledGrid.Container>
  );
};

const StyledSoftButton = styled(SoftButton)`
  margin-bottom: 0.5rem;
  float: right;
`;

// nice  to have, column ordering
// https://react-table.tanstack.com/docs/examples/row-selection-and-pagination
// https://react-table.tanstack.com/docs/examples/editable-data
// https://react-table.tanstack.com/docs/examples/column-hiding
// https://react-table.tanstack.com/docs/examples/column-resizing
// https://react-table.tanstack.com/docs/examples/full-width-table
// https://react-table.tanstack.com/docs/examples/full-width-resizable-table

const StyledErrorWrapper = styled.div`
  margin-bottom: 0.5rem;
`;

const StyledTableResponsive = styled.div`
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  background: ${props => props.theme.colors.white};
  padding: 0.5rem;
`;

const StyledTh = styled.th`
  padding: 0.45rem;
  vertical-align: middle;
  border-top: 1px solid #eaf0f7;
  vertical-align: bottom;
  border: 1px solid #eaf0f7;
  border-bottom: 2px solid #eaf0f7;
  border-bottom: 1px solid #eaf0f7;
  color: ${props => props.theme.text.main};
  font-weight: 500;
  border-top: none;
`;

const StyledTd = styled.td`
  padding: 0.45rem;
  border: 1px solid #eaf0f7;
  vertical-align: middle;
  font-weight: 400;
  border-top: 1px solid #eaf0f7;
`;

const StyledTableTitle = styled.h4`
  line-height: 1.8em;
  margin: 0;
`;

const StyledTable = styled.table`
  width: 100%;
  margin-bottom: 1rem;
  color: ${props => props.theme.text.main};
  border-collapse: collapse;
  border: 1px solid #eaf0f7;
  .dropdown-toggle::after {
    display: none;
  }
`;

const StyledOverlay = styled.div`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.6);
  z-index: 4;
  cursor: pointer;
`;

const StyledOverlayText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 50px;
  color: white;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
`;
