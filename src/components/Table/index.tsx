/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo } from "react";
import { useTable, usePagination, useSortBy, useFilters } from "react-table";
import classnames from "classnames";
import styled from "styled-components";
import usePrevious from "react-use/lib/usePrevious";
import { ComponentIsLoading } from "../ComponentIsLoading";
import { ErrorAlert } from "../Alert";
import { EmptyWrapper } from "../EmptyWrapper";
import { DEFAULT_TABLE_PARAMS } from "./constants";
import { Spacer, Stack, Text } from "../../ui-blocks";
import { DropDownMenu } from "../DropdownMenu";
import { mapFilterTypeToComponent } from "./filters";
import { TablePagination } from "./_Pagination";
import { USE_ROOT_COLOR } from "../../AppWrapper/colors";

import { IProps, ITableColumn, PaginatedDataState } from "./types";

export { ITableColumn, IProps };
export { DEFAULT_TABLE_PARAMS };
export { FilterOperators, IColumnFilterBag } from "./filters/types";

const StyledBodyTR = styled.tr`
  padding: 4px;
  border-top: 2px solid ${USE_ROOT_COLOR("border-color")};
  page-break-inside: avoid;
  &:hover {
    color: #303e67;
    background-color: #f8f8fc;
  }
`;

const StyledSorting = styled.span`
  cursor: pointer;

  &:before {
    left: 0.8em;
    content: "\\2191";
  }

  &:after {
    left: 0.3em;
    content: "\\2193";
  }

  &:after,
  &:before {
    color: rgb(48, 62, 103);
    opacity: 0.3;
  }

  &.desc:after,
  &.asc:before {
    color: ${USE_ROOT_COLOR("primary-color")};
    opacity: 1;
  }
`;

const StyledTHead = styled.thead`
  background-color: #f1f5fa;
`;

const StyledTableResponsive = styled.div`
  display: block;
  width: 100%;
  border: 0;
  -webkit-overflow-scrolling: touch;
  background: ${USE_ROOT_COLOR("base-color")};
  padding: 0.5rem;
`;

const StyledTh = styled.th`
  padding: 0.45rem;
  vertical-align: middle;
  border: 1px solid ${USE_ROOT_COLOR("border-color")};
  border-bottom-width: 2px;
  color: ${USE_ROOT_COLOR("main-text")};
  font-weight: 400;
  border-top: none;
`;

const StyledTd = styled.td`
  padding: 0.45rem;
  border: 1px solid ${USE_ROOT_COLOR("border-color")};
  vertical-align: middle;
  font-weight: 400;
  border-top: 1px solid ${USE_ROOT_COLOR("border-color")};
`;

const StyledTableTitle = styled.h4`
  line-height: 1.8em;
  margin: 0;
`;

const StyledTableRoot = styled.div`
  position: relative;
  overflow-x: auto;
  min-height: calc(100vh - 250px);
`;

const StyledTable = styled.table`
  width: 100%;
  margin-bottom: 1rem;
  color: ${USE_ROOT_COLOR("main-text")};
  border-collapse: collapse;
  border: 1px solid ${USE_ROOT_COLOR("border-color")};
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
`;

const DEFAULT_PAGE_SIZE = 10;

const buildTableStateToRefreshPageNumber = (
  input: PaginatedDataState | undefined
) => {
  return JSON.stringify([
    input?.filters || [],
    input?.pageSize || DEFAULT_PAGE_SIZE,
    input?.sortBy || [],
  ]);
};

export function Table({
  paginatedDataState,
  tableData,
  setPaginatedDataState,
  title,
  columns,
  menuItems,
}: IProps) {
  const {
    data = {
      data: [],
      pageIndex: 0,
      pageSize: DEFAULT_PAGE_SIZE,
      totalRecords: 0,
    },
    isLoading,
    error,
    isPreviousData,
  } = tableData;
  const totalPageCount =
    data.totalRecords === 0
      ? 0
      : Math.ceil(
          data.totalRecords /
            (paginatedDataState?.pageSize ?? DEFAULT_TABLE_PARAMS.pageSize)
        );

  const tableColumns = useMemo(
    () =>
      columns.map(({ filter, ...column }) => ({
        ...column,
        Filter: filter ? mapFilterTypeToComponent(filter) : undefined,
        disableFilters: !filter,
      })),
    [columns.length]
  );

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
      columns: tableColumns,
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
        Filter: null,
      },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const previousTableState = usePrevious<PaginatedDataState>(tableState);

  useEffect(() => {
    if (
      buildTableStateToRefreshPageNumber(previousTableState) !==
      buildTableStateToRefreshPageNumber(tableState)
    ) {
      gotoPage(0);
    }

    setPaginatedDataState(tableState);
  }, [JSON.stringify(tableState)]);

  return (
    <>
      {error ? (
        <>
          <Spacer />
          <ErrorAlert message={error} />
          <Spacer />
        </>
      ) : null}
      <StyledTableResponsive>
        <Stack justify="space-between">
          <StyledTableTitle>{title}</StyledTableTitle>
          <DropDownMenu menuItems={menuItems} />
        </Stack>
        <Spacer />
        <StyledTableRoot>
          {(isLoading || isPreviousData) && !error ? (
            <StyledOverlay>
              <StyledOverlayText>
                <ComponentIsLoading />
              </StyledOverlayText>
            </StyledOverlay>
          ) : null}
          <StyledTable {...getTableProps()}>
            <StyledTHead>
              {headerGroups.map((headerGroup: any) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: any) => (
                    <StyledTh
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={column.Header}
                    >
                      <Stack justify="space-between" align="center">
                        <Text size="6" weight="bold" as="span">
                          {column.render("Header")}
                        </Text>
                        <Stack justify="end" width="auto">
                          {column.canSort && (
                            <StyledSorting
                              className={classnames({
                                desc: column.isSorted && column.isSortedDesc,
                                asc: column.isSorted && !column.isSortedDesc,
                              })}
                            />
                          )}
                          {column.canFilter ? column.render("Filter") : null}
                        </Stack>
                      </Stack>
                    </StyledTh>
                  ))}
                </tr>
              ))}
            </StyledTHead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row: any) => {
                prepareRow(row);
                return (
                  <StyledBodyTR {...row.getRowProps()} key={row.id}>
                    {row.cells.map((cell: any) => (
                      <StyledTd
                        {...cell.getCellProps()}
                        key={cell.column.Header}
                      >
                        {cell.render("Cell")}
                      </StyledTd>
                    ))}
                  </StyledBodyTR>
                );
              })}
              {data.data.length === 0 ? (
                <StyledBodyTR>
                  <StyledTd colSpan={10000}>
                    {isLoading ? (
                      <div style={{ height: "204px" }} />
                    ) : (
                      <EmptyWrapper text="No Data" />
                    )}
                  </StyledTd>
                </StyledBodyTR>
              ) : null}
            </tbody>
          </StyledTable>
        </StyledTableRoot>
        <TablePagination
          {...{
            setPageSize,
            totalRecords: data.totalRecords,
            pageSize: tableState.pageSize,
            pageIndex: tableState.pageIndex,
            totalPageCount,
            gotoPage,
          }}
        />
      </StyledTableResponsive>
    </>
  );
}

// nice to have, column ordering
// https://react-table.tanstack.com/docs/examples/row-selection-and-pagination
// https://react-table.tanstack.com/docs/examples/editable-data
// https://react-table.tanstack.com/docs/examples/column-hiding
// https://react-table.tanstack.com/docs/examples/column-resizing
// https://react-table.tanstack.com/docs/examples/full-width-table
// https://react-table.tanstack.com/docs/examples/full-width-resizable-table
