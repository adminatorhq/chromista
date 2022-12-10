import React from "react";
import SkeletonLoader from "tiny-skeleton-loader-react";
import { USE_ROOT_COLOR } from "../../../theme";

export interface IProps {
  height: string;
  width?: string;
  bottom?: number;
  top?: number;
  circle?: true;
  style?: React.CSSProperties;
}

export function BaseSkeleton({
  height,
  width,
  bottom,
  top,
  style,
  circle,
}: IProps) {
  return (
    <SkeletonLoader
      data-testid="skeleton"
      height={height}
      width={width}
      circle={circle}
      style={{
        marginTop: top,
        marginBottom: bottom,
        background: USE_ROOT_COLOR("soft-color"),
        ...style,
      }}
    />
  );
}
