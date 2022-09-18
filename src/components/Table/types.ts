import {
  PaginatedData,
  IBEPaginatedDataState,
  IFEPaginatedDataState,
} from "@hadmean/protozoa";
import { ReactNode } from "react";
import { UseQueryResult } from "react-query";
import { TableFilterType } from "./filters/types";

export interface ITableColumn {
  Header: string;
  accessor?: string;
  disableSortBy?: boolean;
  filter?: TableFilterType;
  Cell?: (cellProps: {
    value: unknown;
    row: { original: Record<string, unknown> };
  }) => ReactNode;
}

export type PaginatedDataState =
  | IBEPaginatedDataState
  | IFEPaginatedDataState<any>;

export interface IProps {
  columns: ITableColumn[];
  tableData: Pick<
    UseQueryResult<PaginatedData<Record<string, unknown>>, unknown>,
    "data" | "isLoading" | "error" | "isPreviousData"
  >;
  lean?: true;
  paginatedDataState: PaginatedDataState;
  setPaginatedDataState: (params: PaginatedDataState) => void;
}
