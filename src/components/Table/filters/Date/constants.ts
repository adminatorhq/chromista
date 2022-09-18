export interface IDateFilterOption {
  label: string;
  value: string;
  hideOnFrom?: true;
  hideOnTo?: true;
  countLimit?: number;
}

export const BEGINNING_OF_TIME_VALUE = "bot";
export const NOW_VALUE = "now";

export const DATE_FILTER_OPTIONS: IDateFilterOption[] = [
  {
    label: "Beggining of time",
    value: BEGINNING_OF_TIME_VALUE,
    hideOnTo: true,
  },
  {
    label: "Beggining of Year",
    value: "boy",
    hideOnTo: true,
  },
  {
    label: "Hour",
    value: "h",
    countLimit: 24,
  },
  {
    label: "Day",
    value: "d",
    countLimit: 7,
  },
  {
    label: "Week",
    value: "w",
    countLimit: 4,
  },
  {
    label: "Month",
    value: "m",
    countLimit: 12,
  },
  {
    label: "Year",
    value: "y",
    countLimit: 10,
  },
  {
    label: "Now",
    value: NOW_VALUE,
    hideOnFrom: true,
  },
];
