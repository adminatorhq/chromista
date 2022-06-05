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

export interface ITableColumn {
  Header: string;
  accessor?: string;
  disableSortBy?: boolean;
  disableFilters?: boolean;
  Filter?: (input: {
    columns: { filterValue: unknown; setFilter: (filter: unknown) => void };
  }) => JSX.Element;
  Cell?: (cellProps: {
    value: unknown;
    row: { original: Record<string, unknown> };
  }) => JSX.Element;
}

export interface ITableProps {
  url: string;
  columns: ITableColumn[];
  title: string;
  singular: string;
  createPath: string;
}
