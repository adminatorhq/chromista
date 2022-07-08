import { ISystemStatusForDisplay } from '../../../types';

export type TableFilterType =
  | { _type: 'boolean'; bag: ISystemStatusForDisplay[] }
  | { _type: 'date' }
  | { _type: 'number' }
  | { _type: 'string' }
  | { _type: 'status'; bag: ISystemStatusForDisplay[] }
  | { _type: 'list'; bag: {
    onChange: (word: string) => void;
    selections: {id: string, name: string}[];
  } };

export interface IFilterProps<T> {
  column: {
    filterValue: T | undefined;
    setFilter: (value: T | undefined) => void;
  };
}

export enum FilterOperators {
  GREATER_THAN = 'g',
  LESS_THAN = 'l',
  EQUAL_TO = 'e',
  NOT_IN = 'ni',
  BETWEEN = 'bt',
  IN = 'in',
  CONTAINS = 'co',
  // STARTS_WITH = 'sw',
  // ENDS_WITH = 'ew',
  NOT_EQUAL = 'ne',
}

export interface IColumnFilterBag<T> {
  operator?: FilterOperators;
  value?: T;
  value2?: T;
}
