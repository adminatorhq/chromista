import React from "react";
import styled, { css } from "styled-components";
import { SYSTEM_COLORS, USE_ROOT_COLOR } from "../../theme";
import { ISystemStatusForDisplay } from "../../types";

const StyledBadge = styled.span<{ color: keyof typeof SYSTEM_COLORS }>`
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

const StyledSoftBadge = styled(StyledBadge)`
  background-color: ${USE_ROOT_COLOR("primary-shade-color")};
  color: ${USE_ROOT_COLOR("primary-color")};
  box-shadow: 0px 0px 13px 0px ${USE_ROOT_COLOR("primary-shade-color")};
`;

const StyledBadgePill = styled(StyledBadge)<{ isIconBadge?: true }>`
  background-color: ${USE_ROOT_COLOR("primary-color")};
  color: ${USE_ROOT_COLOR("text-on-primary")};
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
  color: keyof typeof SYSTEM_COLORS;
}

export function Badge({ text, color }: IBadge) {
  return <StyledSoftBadge color={color}>{text}</StyledSoftBadge>;
}

interface IBadgeBuilder {
  value: string;
  statusSelections: ISystemStatusForDisplay[];
}

export function BadgeBuilder({ value, statusSelections }: IBadgeBuilder) {
  const builderBagValue = statusSelections.find(
    (statusSelection) => statusSelection.value === value
  );
  if (!builderBagValue) {
    return null;
  }
  return (
    <Badge
      text={builderBagValue.label}
      color={(builderBagValue.color as keyof typeof SYSTEM_COLORS) || "info"}
    />
  );
}

interface IBadgePill {
  value: number;
  color: keyof typeof SYSTEM_COLORS;
  isIconBadge?: true;
}

export function BadgePill({ value, color, isIconBadge }: IBadgePill) {
  if (value === 0) {
    return null;
  }
  return (
    <StyledBadgePill color={color} isIconBadge={isIconBadge}>
      {value}
    </StyledBadgePill>
  );
}
