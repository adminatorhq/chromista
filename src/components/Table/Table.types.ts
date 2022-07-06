import { ReactNode } from 'react';
import { ISystemStatusForDisplay } from '../../types';
import { IDropDownMenuItem } from '../DropdownMenu';

enum NumberComparisions {
  GREATER_THAN = 'g',
  LESS_THAN = 'l',
  EQUAL_TO = 'e',
}

export interface INumberComparision {
  comparision: NumberComparisions;
  value: string;
}

export interface ITableFilter {
  id: string;
  value: string | INumberComparision;
}

export type TableFilterType =
  // TODO date
  // Boolean
  | { _type: 'number' }
  | { _type: 'string' }
  | { _type: 'status'; bag: ISystemStatusForDisplay[] }
  | { _type: 'list'; bag: { id: string; name: string }[] };

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

export interface ITableProps {
  url: string;
  columns: ITableColumn[];
  title: string;
  menuItems: IDropDownMenuItem[];
}
