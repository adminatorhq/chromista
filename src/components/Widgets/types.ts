export interface IWidgetSettingProps {
  setId: () => void;
  delete: () => void;
}

export interface IWidgetHeaderProps {
  setting?: IWidgetSettingProps;
  title: string;
  link?: string;
}
