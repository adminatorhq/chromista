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

const StyledTableRoot = styled.div<{ $enforceHeight?: boolean }>`
  position: relative;
  overflow-x: auto;
  background: ${USE_ROOT_COLOR("base-color")};
  ${(props) => props.$enforceHeight && `min-height: 500px;`}
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

  const tableDataStringified = React.useMemo(() => {
    return data.data.map((datum) =>
      Object.fromEntries(
        Object.entries(datum).map(([key, value]) => [
          key,
          typeof value === "number" ? `${value}` : value,
        ])
      )
    );
  }, [data.data]);

  const table = useReactTable({
    data: tableDataStringified,
    pageCount: totalPageCount,
    columns: internalColumns,
    manualPagination: true,
    manualSorting: true,
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
      height="2px"
      width="100%"
      style={{
        background: USE_ROOT_COLOR("primary-color"),
      }}
    />
  ) : (
    <div
      style={{
        height: dataLength === 0 || lean ? "0px" : "2px",
        width: "100%",
        background: USE_ROOT_COLOR("soft-color"),
      }}
    />
  );

  return (
    <StyledTableResponsive>
      <StyledTableRoot $enforceHeight={dataLength > 0 && !lean}>
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
