import { ReactNode } from "react";

export interface IOffCanvasProps {
  show: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  width?: number;
}
