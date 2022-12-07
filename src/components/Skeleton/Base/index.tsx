import React from "react";
import SkeletonLoader from "tiny-skeleton-loader-react";
import { sharedSkeletonProps } from "../constants";

export interface IProps {
  height: string;
  width?: string;
  bottom?: number;
  top?: number;
  style?: React.CSSProperties;
}

export function BaseSkeleton({ height, width, bottom, top, style }: IProps) {
  return (
    <SkeletonLoader
      background={sharedSkeletonProps.background}
      height={height}
      width={width}
      style={{ ...style, marginTop: top, marginBottom: bottom }}
    />
  );
}
