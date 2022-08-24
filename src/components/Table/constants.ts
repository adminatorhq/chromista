import { IBEPaginatedDataState } from "@hadmean/protozoa";

export const DEFAULT_TABLE_PARAMS: Required<IBEPaginatedDataState> = {
  pageIndex: 0,
  pageSize: 10,
  hiddenColumns: [],
  filters: [],
  sortBy: [],
};
