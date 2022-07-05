import React from 'react';
import SkeletonLoader from 'tiny-skeleton-loader-react';
import { sharedSkeletonProps } from '../constants';

interface IBlockSkeleton {
  height: string;
}

export const BlockSkeleton: React.FC<IBlockSkeleton> = ({ height }) => (
  <SkeletonLoader
    {...sharedSkeletonProps}
    height={height}
    radius="0px"
    style={{ marginBottom: '2px' }}
  />
);
