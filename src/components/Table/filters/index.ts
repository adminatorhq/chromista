import { FilterTableByStatus } from './Status';
import { TableFilterType } from './types';
import { FilterTableByListSelection } from './List';
import { FilterTableByText } from './Text';
import { FilterTableByNumbers } from './Number';
import { FilterTableByBooleans } from './Boolean';
import { FilterTableByDate } from './Date';

export function mapFilterTypeToComponent(
  type: TableFilterType,
) {
  switch (type._type) {
    case 'number':
      return FilterTableByNumbers;
    case 'date':
      return FilterTableByDate;
    case 'boolean':
      return FilterTableByBooleans(type.bag);
    case 'string':
      return FilterTableByText;
    case 'status':
      return FilterTableByStatus(type.bag);
    case 'list':
      return FilterTableByListSelection(type.bag);
  }
}
