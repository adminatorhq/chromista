/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo } from "react";
import { useTable, usePagination, useSortBy, useFilters } from "react-table";
import classnames from "classnames";
import styled from "styled-components";
import usePrevious from "react-use/lib/usePrevious";
import { IPaginatedDataState } from "@hadmean/protozoa";
import { DelayedComponentIsLoading } from "../ComponentIsLoading";
import { ErrorAlert } from "../Alert";
import { EmptyWrapper } from "../EmptyWrapper";
import { DEFAULT_TABLE_PARAMS } from "./constants";
import { Stack, Text } from "../../ui-blocks";
import { mapFilterTypeToComponent } from "./filters";
import { TablePagination } from "./_Pagination";
import { USE_ROOT_COLOR } from "../../theme";

import { IProps, ITableColumn } from "./types";
import { TableSkeleton } from "../Skeleton";

export { ITableColumn, IProps };
export { DEFAULT_TABLE_PARAMS };

const StyledBodyTR = styled.tr`
  padding: 4px;
  border-top: 2px solid ${USE_ROOT_COLOR("border-color")};
  page-break-inside: avoid;
  &:hover {
    background-color: ${USE_ROOT_COLOR("soft-color")};
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
    color: ${USE_ROOT_COLOR("main-text")};
    opacity: 0.4;
  }

  &.desc:after,
  &.asc:before {
    color: ${USE_ROOT_COLOR("primary-color")};
    opacity: 1;
  }
`;

const StyledTHead = styled.thead`
  background-color: ${USE_ROOT_COLOR("soft-color")};
`;

const StyledTableResponsive = styled.div`
  display: block;
  width: 100%;
  border: 0;
  -webkit-overflow-scrolling: touch;
`;

const StyledTh = styled.th`
  padding: 0.65rem 0.45rem;
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

const StyledTableRoot = styled.div<{ lean?: true }>`
  position: relative;
  overflow-x: auto;
  background: ${USE_ROOT_COLOR("base-color")};
  ${(props) => !props.lean && `min-height: 500px;`}
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

const buildTableStateToRefreshPageNumber = (
  input: IPaginatedDataState<unknown> | undefined
) => {
  return JSON.stringify([
    input?.filters || [],
    input?.pageSize || DEFAULT_TABLE_PARAMS.pageSize,
    input?.sortBy || [],
  ]);
};

export function Table<T extends unknown>({
  paginatedDataState,
  tableData,
  setPaginatedDataState,
  columns,
  lean,
  emptyMessage,
}: IProps<T>) {
  const {
    data = {
      data: [],
      pageIndex: 0,
      pageSize: DEFAULT_TABLE_PARAMS.pageSize,
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
      initialState: paginatedDataState
        ? { ...DEFAULT_TABLE_PARAMS, ...paginatedDataState }
        : DEFAULT_TABLE_PARAMS,
      defaultColumn: {
        Filter: null,
      },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const previousTableState = usePrevious<IPaginatedDataState<T>>(tableState);

  useEffect(() => {
    if (
      buildTableStateToRefreshPageNumber(previousTableState) !==
      buildTableStateToRefreshPageNumber(tableState)
    ) {
      gotoPage(0);
    }

    setPaginatedDataState(tableState);
  }, [JSON.stringify(tableState)]);

  if (error) {
    return <ErrorAlert message={error} />;
  }

  if (isLoading) {
    return <TableSkeleton lean={lean} />;
  }

  return (
    <StyledTableResponsive>
      <StyledTableRoot lean={lean}>
        {isPreviousData ? (
          <StyledOverlay>
            <StyledOverlayText>
              <DelayedComponentIsLoading />
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
                    title={undefined}
                  >
                    <Stack justify="space-between" align="center">
                      <Text size="5" weight="bold" as="span">
                        {column.render("Header")}
                      </Text>
                      <Stack justify="end" width="auto">
                        {column.canSort && (
                          <StyledSorting
                            aria-label={`Sort By ${column.render("Header")} ${
                              // eslint-disable-next-line no-nested-ternary
                              column.isSorted
                                ? column.isSortedDesc
                                  ? "Asc"
                                  : "Desc"
                                : ""
                            }`}
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
                    <StyledTd {...cell.getCellProps()} key={cell.column.Header}>
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
                    <EmptyWrapper text={emptyMessage || "No Data"} />
                  )}
                </StyledTd>
              </StyledBodyTR>
            ) : null}
          </tbody>
        </StyledTable>
      </StyledTableRoot>
      {!lean && (
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
      )}
    </StyledTableResponsive>
  );
}

// nice to have, column ordering
// https://react-table.tanstack.com/docs/examples/row-selection-and-pagination
// https://react-table.tanstack.com/docs/examples/editable-data
// https://react-table.tanstack.com/docs/examples/column-hiding
// https://react-table.tanstack.com/docs/examples/column-resizing
// https://react-table.tanstack.com/docs/examples/full-width-table
// https://react-table.tanstack.com/docs/examples/full-width-resizable-table
