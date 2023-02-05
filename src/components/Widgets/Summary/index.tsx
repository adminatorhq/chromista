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
  background: ${(props) => props.color}2A;
  color: ${(props) => props.color};
  border: 1px solid ${(props) => props.color};
  width: 56px;
  min-width: 56px;
  border-radius: 56px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DirectionRoot = styled(Stack)<{ color: string }>`
  border: 1px solid transparent;
  width: auto;
  border-radius: 8px;
  padding: 0 4px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.color}0A;
  border-color: ${(props) => props.color};
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
  const {
    Icon: DirectionIcon,
    color: directionColor,
    label: directionLabel,
  } = DirectionImplementation[direction];

  return (
    <StyledCard>
      <StyledBox>
        <Stack spacing={18}>
          <IconRoot
            color={color}
            aria-label={`${title} Icon`}
            dangerouslySetInnerHTML={{ __html: icon }}
          />
          <div style={{ width: "100%" }}>
            <WidgetHeader setting={setting} title={title} link={link} />
            <Spacer size="xs" />
            <Stack justify="space-between" align="end">
              <Text size="3" weight="bold" aria-label="Total Count">
                {fullCount}
              </Text>
              {relativeCount ? (
                <DirectionRoot
                  color={directionColor}
                  spacing={2}
                  aria-label="Relative Direction"
                >
                  <span aria-label={directionLabel}>
                    <DirectionIcon
                      size={20}
                      style={{ color: directionColor }}
                    />
                  </span>
                  <Text
                    size="6"
                    weight="bold"
                    aria-label="Relative Count"
                    style={{ lineHeight: "20.5px", color: directionColor }}
                  >
                    {relativeCount}
                  </Text>
                </DirectionRoot>
              ) : null}
            </Stack>
          </div>
        </Stack>
      </StyledBox>
    </StyledCard>
  );
}
