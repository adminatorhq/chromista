import React from "react";
import styled from "styled-components";
import { StyledCard } from "../../Card";
import { Spacer, Stack, Text } from "../../../ui-blocks";
import { WidgetHeader } from "../Header";
import { IWidgetHeaderProps } from "../types";
import { DirectionImplementation } from "./constants";

const StyledBox = styled.div`
  padding: 24px;
`;

const IconRoot = styled.div<{ color: string }>`
  background: ${(props) => props.color}2a;
  color: ${(props) => props.color};
  border: 1px solid ${(props) => props.color};
  width: 64px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface IProps extends IWidgetHeaderProps {
  color: string;
  fullCount: string;
  relativeCount: string;
  icon: string;
  direction: "up" | "down" | "side";
}

export function SummaryWidget({
  color,
  fullCount,
  relativeCount,
  link,
  direction,
  setting,
  title,
  icon,
}: IProps) {
  const { Icon: DirectionIcon, color: directionColor } =
    DirectionImplementation[direction];

  return (
    <StyledCard>
      <StyledBox>
        <Stack spacing={18}>
          <IconRoot color={color} dangerouslySetInnerHTML={{ __html: icon }} />
          <div style={{ width: "100%" }}>
            <WidgetHeader setting={setting} title={title} link={link} />
            <Spacer size="xs" />
            <Stack justify="space-between" align="end">
              <Text size="3" weight="bold">
                {fullCount}
              </Text>
              {relativeCount ? (
                <Text size="6">
                  <DirectionIcon size={20} style={{ color: directionColor }} />
                  <span style={{ color: directionColor }}>{relativeCount}</span>
                </Text>
              ) : null}
            </Stack>
          </div>
        </Stack>
      </StyledBox>
    </StyledCard>
  );
}
