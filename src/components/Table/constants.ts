import { IPaginatedDataState } from "@hadmean/protozoa";

export const DEFAULT_TABLE_PARAMS: Required<IPaginatedDataState<unknown>> = {
  pageIndex: 0,
  pageSize: 10,
  hiddenColumns: [],
  filters: [],
  sortBy: [],
};
