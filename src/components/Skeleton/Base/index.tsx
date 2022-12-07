import React from "react";
import SkeletonLoader from "tiny-skeleton-loader-react";
import { sharedSkeletonProps } from "../constants";

export interface IProps {
  height: string;
  width?: string;
  bottom?: number;
  top?: number;
}

export function BaseSkeleton({ height, width, bottom, top }: IProps) {
  return (
    <SkeletonLoader
      background={sharedSkeletonProps.background}
      height={height}
      width={width}
      style={{ marginTop: top, marginBottom: bottom }}
    />
  );
}
