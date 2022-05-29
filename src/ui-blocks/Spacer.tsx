import React from 'react';
import { SIZES } from '../constants/sizes';

type SpacerSize = 'xxs' | 'xs' | 'sm' | 'md' | 'xl' | 'xxl' | 'cp';

interface IProps {
  size?: SpacerSize;
}

const getMargin = (size: SpacerSize) => {
  if (size === 'xxs') {
    return SIZES.margin / 16;
  }
  if (size === 'xs') {
    return SIZES.margin / 8;
  }
  if (size === 'sm') {
    return SIZES.margin / 2;
  }
  if (size === 'xl') {
    return SIZES.margin * 1.5;
  }
  if (size === 'xxl') {
    return SIZES.margin * 2;
  }
  return SIZES.margin;
};

export const Spacer: React.FC<IProps> = ({ size = 'md' }) => {
  return <div style={{ margin: getMargin(size) }} />;
};

export const HSpacer: React.FC<IProps> = ({ size = 'md' }) => {
  return <div style={{ marginLeft: getMargin(size), marginRight: getMargin(size) }} />;
};
