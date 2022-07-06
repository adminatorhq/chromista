import React from 'react';
import SkeletonLoader from 'tiny-skeleton-loader-react';
import { sharedSkeletonProps } from '../constants';

interface IBlockSkeleton {
  height: string;
}

export function BlockSkeleton({ height }: IBlockSkeleton) {
  return (
    <SkeletonLoader
      background={sharedSkeletonProps.background}
      height={height}
      radius="0px"
      style={{ marginBottom: '2px' }}
    />
  );
}
