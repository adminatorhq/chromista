export interface ISystemStatusForDisplay {
  label: string;
  value: string;
  color: string;
}

export interface IValueLabel {
  value: string;
  label: string;
}


export interface ISelectData {
  value: string;
  label: string;
}

export interface IdAndLabel {
  id: string;
  label: string;
}

export const idLabelToValueLabel = ({ id, label }: IdAndLabel) => ({ label, value: id });

export type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};
