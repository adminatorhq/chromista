/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unstable-nested-components */
import * as React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styled, { css } from "styled-components";
import { ArrowUp } from "react-feather";
import { useEffect, useMemo, useState } from "react";
import { IPaginatedDataState } from "@hadmean/protozoa";
import { usePrevious } from "react-use";
import { USE_ROOT_COLOR } from "../../../theme";
import { DEFAULT_TABLE_STATE } from "../constants";
import { Stack, Text } from "../../../ui-blocks";
import { IProps, ITableColumn } from "../types";
import {
  buildTableStateToRefreshPageNumber,
  getPageCount,
  internalTableStateToStandard,
} from "./utils";
import { DelayedComponentIsLoading } from "../../ComponentIsLoading";
import { TablePagination } from "../_Pagination";
import { EmptyWrapper } from "../../EmptyWrapper";
import { ErrorAlert } from "../../Alert";
import { TableSkeleton } from "../../Skeleton/Table";

export { ITableColumn, IProps };

export { DEFAULT_TABLE_STATE };

const SHOW_FOOTER_THRESHOLD = 20;

const StyledBodyTR = styled.tr`
  padding: 4px;
  border-bottom: 1px solid ${USE_ROOT_COLOR("border-color")};
  page-break-inside: avoid;
  &:hover {
    background-color: ${USE_ROOT_COLOR("soft-color")};
  }
`;

const StyledTHead = styled.thead`
  background-color: ${USE_ROOT_COLOR("soft-color")};
`;

const StyledTFoot = styled.tfoot`
  background-color: ${USE_ROOT_COLOR("soft-color")};
`;

const StyledTableResponsive = styled.div`
  display: block;
  width: 100%;
  -webkit-overflow-scrolling: touch;
`;

const StyledTh = styled.th<{ $isSortable?: boolean }>`
  padding: 8px;
  vertical-align: middle;
  color: ${USE_ROOT_COLOR("main-text")};
  &:not(:last-child) {
    border-right: 1px solid ${USE_ROOT_COLOR("border-color")};
  }
  ${(props) =>
    props.$isSortable &&
    css`
      cursor: pointer;
    `}
`;

const StyledTd = styled.td`
  padding: 0.45rem;
  vertical-align: middle;
  font-weight: 400;

  &:not(:last-child) {
    border-right: 1px solid ${USE_ROOT_COLOR("border-color")};
  }
`;

const StyledTableRoot = styled.div<{ lean?: true }>`
  position: relative;
  overflow-x: auto;
  background: ${USE_ROOT_COLOR("base-color")};
  ${(props) => !props.lean && `min-height: 500px;`}
`;

const StyledTable = styled.table<{ $border?: boolean }>`
  width: 100%;
  margin-bottom: 1rem;
  color: ${USE_ROOT_COLOR("main-text")};
  border-collapse: collapse;
  .dropdown-toggle::after {
    display: none;
  }

  ${(props) =>
    props.$border &&
    css`
      border-right: 1px solid ${USE_ROOT_COLOR("border-color")};
      border-left: 1px solid ${USE_ROOT_COLOR("border-color")};
    `}
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

const StyledSorting = styled(ArrowUp)<{ $isSorted: boolean; $isDesc: boolean }>`
  color: ${USE_ROOT_COLOR("muted-text")};
  opacity: 0.7;
  cursor: pointer;
  margin-left: 0px;
  transition: transform 0.3s;
  ${(props) => props.$isDesc && "transform: rotate(180deg);"}

  ${(props) =>
    props.$isSorted &&
    css`
      color: ${USE_ROOT_COLOR("primary-color")};
      opacity: 1;
    `}
`;

const columnHelper = createColumnHelper<Record<string, unknown>>();

export function Table<T extends unknown>({
  overridePaginatedDataState,
  tableData,
  syncPaginatedDataStateOut,
  columns,
  lean,
  border,
  emptyMessage,
}: IProps<T>) {
  const {
    data = {
      data: [],
      pageIndex: 0,
      pageSize: DEFAULT_TABLE_STATE.pageSize,
      totalRecords: 0,
    },
    isLoading,
    error,
    isPreviousData,
  } = tableData;

  const [resetPage, setResetPage] = useState(true);

  const totalPageCount = getPageCount(
    data.totalRecords,
    tableData.data?.pageSize
  );

  const internalColumns = useMemo(() => {
    return columns.map((column) => {
      return columnHelper.accessor(column.accessor, {
        id: column.accessor,
        enableSorting: !column.disableSortBy,
        header: column.Header,
        cell: (props) => (
          <>
            {column?.Cell
              ? column?.Cell({ value: "", row: props.row })
              : props.getValue()}
          </>
        ),
      });
    });
  }, [columns]);

  const table = useReactTable({
    data: data.data,
    pageCount: totalPageCount,
    columns: internalColumns,
    manualPagination: true,
    // enableMultiSort: true,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  const tableState = internalTableStateToStandard<T>(table.getState());

  const previousTableState = usePrevious<IPaginatedDataState<T>>(tableState);

  useEffect(() => {
    if (
      resetPage &&
      buildTableStateToRefreshPageNumber(previousTableState) !==
        buildTableStateToRefreshPageNumber(tableState)
    ) {
      table.setPageIndex(0);
    }

    setResetPage(true);
    syncPaginatedDataStateOut(tableState);
  }, [JSON.stringify(tableState)]);

  useEffect(() => {
    if (!overridePaginatedDataState) {
      return;
    }

    setResetPage(false);

    if (overridePaginatedDataState.pageSize) {
      table.setPageSize(overridePaginatedDataState.pageSize);
    }

    if (overridePaginatedDataState.sortBy) {
      table.setSorting(overridePaginatedDataState.sortBy);
    }

    // if (overridePaginatedDataState.filters) {
    //   table.setGlobalFilters(overridePaginatedDataState.filters);
    // }

    if (typeof overridePaginatedDataState.pageIndex === "number") {
      table.setPageIndex(overridePaginatedDataState.pageIndex);
    }

    // if (overridePaginatedDataState.hiddenColumns) {
    //   table.setColumnVisibility(overridePaginatedDataState.hiddenColumns);
    // }
  }, [JSON.stringify(overridePaginatedDataState)]);

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
          // TODO change this to progress bar
          <StyledOverlay>
            <StyledOverlayText>
              <DelayedComponentIsLoading />
            </StyledOverlayText>
          </StyledOverlay>
        ) : null}
        <StyledTable $border={border}>
          <StyledTHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <StyledTh
                      key={header.id}
                      $isSortable={header.column.getCanSort()}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <Stack justify="space-between" align="center">
                        <Text size="6" weight="bold" as="span">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </Text>
                        <Stack
                          justify="end"
                          width="auto"
                          align="center"
                          spacing={0}
                        >
                          {header.column.getCanSort() && (
                            <StyledSorting
                              size={18}
                              aria-label={`Sort By ${header.id} ${
                                // eslint-disable-next-line no-nested-ternary
                                header.column.getIsSorted()
                                  ? header.column.getIsSorted() === "desc"
                                    ? "Desc"
                                    : "Asc"
                                  : ""
                              }`}
                              $isSorted={!!header.column.getIsSorted()}
                              $isDesc={header.column.getIsSorted() === "desc"}
                            />
                          )}
                          {/* {column.canFilter ? column.render("Filter") : null} */}
                        </Stack>
                      </Stack>
                    </StyledTh>
                  );
                })}
              </tr>
            ))}
          </StyledTHead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <StyledBodyTR key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <StyledTd key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </StyledTd>
                ))}
              </StyledBodyTR>
            ))}
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
          {data.data.length > SHOW_FOOTER_THRESHOLD && (
            <StyledTFoot>
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <StyledTh key={header.id}>
                      <Stack justify="center">
                        <Text size="6" weight="bold" as="span">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.footer,
                                header.getContext()
                              )}
                        </Text>
                      </Stack>
                    </StyledTh>
                  ))}
                </tr>
              ))}
            </StyledTFoot>
          )}
        </StyledTable>
      </StyledTableRoot>
      {!lean && (
        <TablePagination
          {...{
            setPageSize: table.setPageSize,
            totalRecords: data.totalRecords,
            pageSize: table.getState().pagination.pageSize,
            pageIndex: table.getState().pagination.pageIndex,
            totalPageCount,
            gotoPage: table.setPageIndex,
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

// columns.map(({ filter, ...column }) => ({
//     Filter: filter ? mapFilterTypeToComponent(filter) : undefined,
//   })),
// [columns.length]
