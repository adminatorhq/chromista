import { IPaginatedDataState } from "@hadmean/protozoa";
import { createColumnHelper, Table } from "@tanstack/react-table";
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
      return columnHelper.accessor(column.accessor, {
        id: column.accessor,
        meta: {
          filter: column.filter,
        },
        enableSorting: !column.disableSortBy,
        header: column.Header,
        enableColumnFilter: !!column.filter,
        cell: (props) =>
          column?.Cell
            ? column?.Cell({ value: "", row: props.row })
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
}
