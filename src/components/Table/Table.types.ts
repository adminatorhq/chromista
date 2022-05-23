enum NumberComparisions {
  GREATER_THAN = 'g',
  LESS_THAN = 'l',
  EQUAL_TO = 'e',
}
export interface ITableFilter {
  id: string;
  value: string | INumberComparision;
}
export interface INumberComparision {
  comparision: NumberComparisions;
  value: string;
}

export interface IFetchTableDataParams {
  pageSize: number;
  pageIndex: number;
  sortBy: { id: string; desc: boolean }[];
  hiddenColumns: unknown[];
  filters?: ITableFilter[];
}

export interface ITablePayload<T> {
  count: number;
  take: number;
  page: number;
  data: T[];
}

export interface ITableColumn {
  Header: string;
  accessor?: string;
  disableSortBy?: boolean;
  disableFilters?: boolean;
  Cell?: (cellProps: { value: unknown; row: { original: Record<string, unknown> } }) => JSX.Element;
}

export interface ITable {
  queryCachekey: string;
  url: string;
  columns: ITableColumn[];
  entityPath: {
    title: string;
    singular: string;
    prefix: string;
    paths: {
      Create: string;
    };
  };
}
