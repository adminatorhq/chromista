import { IPaginatedDataState, PaginatedData } from "@hadmean/protozoa";
import { ReactNode } from "react";
import { UseQueryResult } from "react-query";
import { TableFilterType } from "./filters/types";

export interface ITableColumn {
  Header: string;
  accessor: string;
  disableSortBy?: boolean;
  filter?: TableFilterType;
  Cell?: (cellProps: {
    value: unknown;
    row: { original: Record<string, unknown> };
  }) => ReactNode;
}

export interface IProps<T> {
  columns: ITableColumn[];
  tableData: Pick<
    UseQueryResult<PaginatedData<Record<string, unknown>>, unknown>,
    "data" | "isLoading" | "error" | "isPreviousData"
  >;
  lean?: true;
  border?: boolean;
  overridePaginatedDataState?: IPaginatedDataState<T>;
  syncPaginatedDataStateOut: (params: IPaginatedDataState<T>) => void;
  emptyMessage?: string;
}
