import React, { Fragment } from 'react';
import SkeletonLoader from 'tiny-skeleton-loader-react';
import { sharedSkeletonProps } from '../constants';

interface IFormSkeleton {
  schema: FormSkeletonSchema[];
}

export enum FormSkeletonSchema {
  Textarea = '83px',
  Input = '38px',
  Image = '200px',
  RichTextArea = '277px',
}

export const FormSkeleton: React.FC<IFormSkeleton> = ({ schema }) => (
  <div style={{ paddingTop: '8px' }}>
    {Array.from({ length: schema.length }, (_, k) => k).map((key) => (
      <Fragment key={key}>
        <SkeletonLoader
          {...sharedSkeletonProps}
          height="1em"
          width="50px"
          style={{ marginBottom: '5px' }}
        />
        <SkeletonLoader
          {...sharedSkeletonProps}
          height={schema[key]}
          style={{ marginBottom: '24px' }}
        />
      </Fragment>
    ))}
    <SkeletonLoader
      {...sharedSkeletonProps}
      height="3em"
      width="70px"
      style={{ marginBottom: '3px', float: 'right', marginTop: '-8px' }}
    />
  </div>
);
