import React from "react";
import Link from "next/link";
import styled, { css } from "styled-components";
import { IValueLabel } from "../../types";
import { USE_ROOT_COLOR } from "../../AppWrapper/colors";

const StyledBreadcrumb = styled.ol`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  list-style: none;
  position: relative;
  border-radius: 0.25rem;
  font-size: 12px;
  font-weight: 500;
  padding: 2px 0;
  background-color: transparent;
`;

const StyledBreadcrumbItem = styled.li`
  display: flex;
  color: ${USE_ROOT_COLOR("muted-text")};

  & + & {
    padding-left: 0.3rem;

    &:hover {
      &::before {
        text-decoration: none;
      }
    }

    &::before {
      display: inline-block;
      padding-right: 0.3rem;
      color: #7081b9;
      content: "/";
    }
  }
`;

const StyledBreadcrumbItemLink = styled.button<{ active: boolean }>`
  font-weight: 400;
  border: none;
  padding: 0;
  background-color: transparent;
  color: ${USE_ROOT_COLOR("primary-color")};

  ${(props) =>
    props.active &&
    css`
      color: ${USE_ROOT_COLOR("muted-text")};
    `}
`;

export interface IProps {
  items: IValueLabel[];
  onCrumbClick: (index: number) => void;
}

export function Breadcrumbs({ items, onCrumbClick }: IProps) {
  const itemsLength = items.length;
  return (
    <StyledBreadcrumb>
      {items.map(({ label, value }, index) => {
        const isLastElement = index === itemsLength - 1;
        return (
          <StyledBreadcrumbItem key={value}>
            {/* eslint-disable-next-line no-nested-ternary */}
            {isLastElement ? (
              label
            ) : onCrumbClick ? (
              <StyledBreadcrumbItemLink
                active={isLastElement}
                onClick={() => onCrumbClick(index)}
              >
                {label}
              </StyledBreadcrumbItemLink>
            ) : (
              <Link href={value} passHref>
                <StyledBreadcrumbItemLink active={isLastElement}>
                  {label}
                </StyledBreadcrumbItemLink>
              </Link>
            )}
          </StyledBreadcrumbItem>
        );
      })}
    </StyledBreadcrumb>
  );
}
