import React from "react";
import Link from "next/link";
import styled, { css } from "styled-components";
import { IValueLabel } from "../../types";

const StyledBreadcrumb = styled.ol`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  list-style: none;
  position: relative;
  border-radius: 0.25rem;
  font-size: 12px;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
  padding: 2px 0;
  background-color: transparent;
`;

const StyledBreadcrumbItem = styled.li`
  display: flex;
  color: ${(props) => props.theme.text.muted};

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
  font-weight: 500;
  border: none;
  padding: 0;
  background-color: transparent;
  color: ${(props) => props.theme.colors.primary};

  ${(props) =>
    props.active &&
    css`
      color: props.theme.text.muted;
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
