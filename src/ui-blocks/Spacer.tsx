import React from 'react';
import { DESIGN_SYSTEM_SIZES } from '../constants/sizes';

type SpacerSize = 'xxs' | 'xs' | 'sm' | 'md' | 'xl' | 'xxl' | 'cp';

interface IProps {
  size?: SpacerSize;
}

const getMargin = (size: SpacerSize) => {
  if (size === 'xxs') {
    return DESIGN_SYSTEM_SIZES.margin / 16;
  }
  if (size === 'xs') {
    return DESIGN_SYSTEM_SIZES.margin / 8;
  }
  if (size === 'sm') {
    return DESIGN_SYSTEM_SIZES.margin / 2;
  }
  if (size === 'xl') {
    return DESIGN_SYSTEM_SIZES.margin * 1.5;
  }
  if (size === 'xxl') {
    return DESIGN_SYSTEM_SIZES.margin * 2;
  }
  return DESIGN_SYSTEM_SIZES.margin;
};

export const Spacer: React.FC<IProps> = ({ size = 'md' }) => (
  <div style={{ margin: getMargin(size) }} />
);

export const HSpacer: React.FC<IProps> = ({ size = 'md' }) => (
  <div style={{ marginLeft: getMargin(size), marginRight: getMargin(size) }} />
);
