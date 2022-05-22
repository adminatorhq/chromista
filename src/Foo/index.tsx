import React, { FC, HTMLAttributes, ReactChild } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactChild;
}

export const Foo: FC<Props> = ({ children }) => {
  return <div>{children || `Foo`}</div>;
};

