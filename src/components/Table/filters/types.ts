export interface IFilterProps<T> {
  column: {
    filterValue: T | undefined;
    setFilter: (value: T | undefined) => void;
  };
}
