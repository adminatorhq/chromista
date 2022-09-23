import React from "react";
import SkeletonLoader from "tiny-skeleton-loader-react";
import { sharedSkeletonProps } from "../constants";

export interface IProps {
  count?: number;
  // eslint-disable-next-line react/no-unused-prop-types
  height?: number;
}

export function ListSkeleton({ count = 5, height = 44 }: IProps) {
  return (
    <div data-testid="list-skeleton">
      {Array.from({ length: count }, (_, k) => k + 1).map((key) => (
        <SkeletonLoader
          key={key}
          background={sharedSkeletonProps.background}
          height={`${height}px`}
          radius="3px"
          style={{ marginBottom: "2px" }}
        />
      ))}
    </div>
  );
}
