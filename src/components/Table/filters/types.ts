import { ISystemStatusForDisplay } from "../../../types";

export type TableFilterType =
  | { _type: "boolean"; bag: ISystemStatusForDisplay[] }
  | { _type: "date" }
  | { _type: "idField" }
  | { _type: "number" }
  | { _type: "string" }
  | { _type: "status"; bag: ISystemStatusForDisplay[] }
  | {
      _type: "list";
      bag: string;
    };

export interface IFilterProps<T> {
  column: {
    filterValue: T | undefined;
    setFilter: (value: T | undefined) => void;
  };
}
