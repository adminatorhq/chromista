import React from 'react';
import styled, { css } from 'styled-components';
import { ColorTypes } from '../../styles/types';
import { getColor } from '../../styles/utils';
import { ISystemStatusForDisplay } from '../../types';

const StyledBadge = styled.span<{ color: ColorTypes }>`
  display: inline-block;
  padding: 0.36em 0.4em;
  font-weight: 400;
  line-height: 1;
  box-shadow: none;
  font-size: 11px;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
// line-height: 10px

const StyledSoftBadge = styled(StyledBadge)`
  background-color: ${getColor(0.15)};
  color: ${getColor()};
  box-shadow: 0px 0px 13px 0px ${getColor(0.05)};
`;

const StyledBadgePill = styled(StyledBadge)<{ isIconBadge?: true }>`
  background-color: ${getColor()};
  color: ${props => props.theme.text.white};
  padding-right: 0.6em;
  padding-left: 0.6em;
  border-radius: 10rem;

  ${({ isIconBadge }) =>
    isIconBadge &&
    css`
      display: inline-block;
      position: absolute;
      top: 9px;
      right: 8px;
      border: 2px solid rgba(255, 255, 255, 0.6);
      border-radius: 50%;
      padding: 1px 4px 1px;
      font-size: 8px !important;
    `}
`;

interface IBadge {
  text: string;
  color: ColorTypes;
}

export const Badge: React.FC<IBadge> = ({ text, color }) => {
  return <StyledSoftBadge color={color}>{text}</StyledSoftBadge>;
};

interface IBadgeBuilder {
  value: string;
  statusSelections: ISystemStatusForDisplay[];
}

export const BadgeBuilder: React.FC<IBadgeBuilder> = ({ value, statusSelections }) => {
  const builderBagValue = statusSelections.find(statusSelection => statusSelection.value === value);
  if (!builderBagValue) {
    return null;
  }
  return (
    <Badge
      text={builderBagValue.label}
      color={(builderBagValue.color as ColorTypes) || 'primary'}
    />
  );
};

interface IBadgePill {
  value: number;
  color: ColorTypes;
  isIconBadge?: true;
}

export const BadgePill: React.FC<IBadgePill> = ({ value, color, isIconBadge }) => {
  if (value === 0) {
    return null;
  }
  return (
    <StyledBadgePill color={color} isIconBadge={isIconBadge}>
      {value}
    </StyledBadgePill>
  );
};
