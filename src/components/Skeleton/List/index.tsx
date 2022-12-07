import React from "react";
import { BaseSkeleton } from "../Base";

export interface IProps {
  count: number;
  // eslint-disable-next-line react/no-unused-prop-types
  height?: number;
}

export function ListSkeleton({ count, height = 44 }: IProps) {
  return (
    <>
      {Array.from({ length: count }, (_, k) => k + 1).map((key) => (
        <BaseSkeleton key={key} height={`${height}px`} bottom={2} />
      ))}
    </>
  );
}
