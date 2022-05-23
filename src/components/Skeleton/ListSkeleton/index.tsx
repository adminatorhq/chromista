import React from 'react';
import SkeletonLoader from 'tiny-skeleton-loader-react';
import { sharedSkeletonProps } from '../constants';

interface IListSkeleton {
  count?: number;
  height?: number;
}

export const ListSkeleton: React.FC<IListSkeleton> = ({ count = 5, height = 44 }) => {
  return (
    <div>
      {Array.from({ length: count }, (_, k) => k + 1).map(key => (
        <SkeletonLoader
          {...sharedSkeletonProps}
          key={key}
          height={`${height}px`}
          radius="3px"
          style={{ marginBottom: '2px' }}
        />
      ))}
    </div>
  );
};

export const SelectionListSkeleton: React.FC<IListSkeleton> = ({ count = 5 }) => {
  return (
    <>
      <SkeletonLoader
        {...sharedSkeletonProps}
        height="65px"
        radius="0px"
        style={{ marginBottom: '13px' }}
      />
      <div style={{ margin: '10px' }}>
        <ListSkeleton count={count} />
      </div>
    </>
  );
};
