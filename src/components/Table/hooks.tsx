import { IPaginatedDataState } from "@hadmean/protozoa";
import {
  ColumnFiltersState,
  createColumnHelper,
  HeaderContext,
  Table,
  Updater,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { usePrevious } from "react-use";
import { ITableColumn } from "./types";
import {
  buildTableStateToRefreshPageNumber,
  internalTableStateToStandard,
} from "./utils";

const columnHelper = createColumnHelper<Record<string, unknown>>();

export const useInternalColumns = (columns: ITableColumn[]) => {
  return useMemo(() => {
    return columns.map((column) => {
      const columnHeader = column.Header;
      const header =
        typeof columnHeader === "string"
          ? columnHeader
          : (headerContext: HeaderContext<Record<string, unknown>, unknown>) =>
              columnHeader(headerContext);
      return columnHelper.accessor(column.accessor, {
        id: column.accessor,
        meta: {
          filter: column.filter,
        },
        enableSorting: !column.disableSortBy,
        header,
        footer: header,
        enableColumnFilter: !!column.filter,
        cell: (props) =>
          column?.Cell
            ? column?.Cell({ value: props.getValue(), row: props.row })
            : props.getValue(),
      });
    });
  }, [columns]);
};

export function useSyncTableState<T>(
  table: Table<Record<string, unknown>>,
  overridePaginatedDataState: IPaginatedDataState<T> | undefined,
  syncPaginatedDataStateOut: (params: IPaginatedDataState<T>) => void
) {
  const [resetPage, setResetPage] = useState(true);
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

    if (overridePaginatedDataState.filters) {
      table.setColumnFilters(
        overridePaginatedDataState.filters as unknown as Updater<ColumnFiltersState>
      );
    }

    if (typeof overridePaginatedDataState.pageIndex === "number") {
      table.setPageIndex(overridePaginatedDataState.pageIndex);
    }
  }, [JSON.stringify(overridePaginatedDataState)]);
}
