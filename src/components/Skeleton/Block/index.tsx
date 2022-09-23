import React from "react";
import SkeletonLoader from "tiny-skeleton-loader-react";
import { sharedSkeletonProps } from "../constants";

export interface IProps {
  height: string;
}

export function BlockSkeleton({ height }: IProps) {
  return (
    <SkeletonLoader
      background={sharedSkeletonProps.background}
      height={height}
      radius="0px"
      style={{ marginBottom: "2px" }}
    />
  );
}
