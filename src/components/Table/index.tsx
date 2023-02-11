import * as React from "react";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styled, { css } from "styled-components";
import { USE_ROOT_COLOR } from "../../theme";
import { DEFAULT_TABLE_STATE } from "./constants";
import { IProps, ITableColumn } from "./types";
import { getPageCount } from "./utils";
import { TablePagination } from "./_Pagination";
import { ErrorAlert } from "../Alert";
import { TableSkeleton } from "../Skeleton/Table";
import { BaseSkeleton } from "../Skeleton";
import { TableHead } from "./Head";
import { TableBody } from "./Body";
import { TableFoot } from "./Foot";
import { useInternalColumns, useSyncTableState } from "./hooks";

export { ITableColumn, IProps };

export { DEFAULT_TABLE_STATE };

const StyledTableResponsive = styled.div`
  display: block;
  width: 100%;
  -webkit-overflow-scrolling: touch;
`;

const StyledTableRoot = styled.div<{ lean?: true }>`
  position: relative;
  overflow-x: auto;
  background: ${USE_ROOT_COLOR("base-color")};
  ${(props) => !props.lean && `min-height: 500px;`}
`;

const StyledTable = styled.table<{ $border?: boolean }>`
  width: 100%;
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

  const totalPageCount = getPageCount(data.totalRecords, data.pageSize);

  const dataLength = data.data.length;

  const internalColumns = useInternalColumns(columns);

  const table = useReactTable({
    data: data.data,
    pageCount: totalPageCount,
    columns: internalColumns,
    manualPagination: true,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  useSyncTableState(
    table,
    overridePaginatedDataState,
    syncPaginatedDataStateOut
  );

  if (error) {
    return <ErrorAlert message={error} />;
  }

  if (isLoading) {
    return <TableSkeleton lean={lean} />;
  }

  const previousDataRender = isPreviousData ? (
    <BaseSkeleton
      height="3px"
      width="100%"
      style={{
        background: USE_ROOT_COLOR("primary-color"),
      }}
    />
  ) : null;

  return (
    <StyledTableResponsive>
      <StyledTableRoot lean={lean}>
        {previousDataRender}
        <StyledTable $border={border}>
          <TableHead table={table} />
          <TableBody
            table={table}
            dataLength={dataLength}
            emptyMessage={emptyMessage}
            isLoading={isLoading}
          />
          <TableFoot table={table} dataLength={dataLength} />
        </StyledTable>
        {previousDataRender}
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
