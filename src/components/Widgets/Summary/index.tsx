import React from "react";
import styled from "styled-components";
import { StyledCard } from "../../Card";
import { Spacer, Stack, Typo } from "../../../ui-blocks";
import { WidgetHeader } from "../Header";
import { IWidgetHeaderProps } from "../types";
import { DirectionImplementation } from "./constants";

const StyledBox = styled.div`
  padding: 24px;
`;

const StyledIconRoot = styled.div<{ color: string }>`
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

const StyledRelativeCount = styled(Typo.XS)<{ directionColor: string }>`
  lineheight: 20.5px;
  color: ${(props) => props.directionColor};
`;

const StyledDirectionRoot = styled(Stack)<{ color: string }>`
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
          <StyledIconRoot
            color={color}
            aria-label={`${title} Icon`}
            dangerouslySetInnerHTML={{ __html: icon }}
          />
          <div style={{ width: "100%" }}>
            <WidgetHeader setting={setting} title={title} link={link} />
            <Spacer size="xs" />
            <Stack justify="space-between" align="end">
              <Typo.L weight="bold" aria-label="Total Count">
                {fullCount}
              </Typo.L>
              {relativeCount ? (
                <StyledDirectionRoot
                  color={directionColor}
                  spacing={2}
                  align="center"
                  aria-label="Relative Direction"
                >
                  <span aria-label={directionLabel}>
                    <DirectionIcon
                      size={20}
                      style={{ color: directionColor, verticalAlign: "sub" }}
                    />
                  </span>
                  <StyledRelativeCount
                    weight="bold"
                    aria-label="Relative Count"
                    directionColor={directionColor}
                  >
                    {relativeCount}
                  </StyledRelativeCount>
                </StyledDirectionRoot>
              ) : null}
            </Stack>
          </div>
        </Stack>
      </StyledBox>
    </StyledCard>
  );
}
