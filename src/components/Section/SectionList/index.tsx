import React, { ReactNode } from "react";
import { ChevronRight, Icon } from "react-feather";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import styled, { css } from "styled-components";
import { StyledBaseButton } from "../../Button/Button";
import { StyledListGroupFlush } from "../../Lists";
import { FormButton } from "../../Button/FormButton";

export enum OrderingDirection {
  Up = "up",
  Down = "down",
}

const StyledChevronRight = styled(ChevronRight)<{ $active?: boolean }>`
  width: 14px;
  color: ${(props) =>
    props.$active ? props.theme.colors.white : props.theme.colors.primary};
  margin-left: 0.25rem;
`;

const StyledSublabel = styled.p<{ $active?: boolean }>`
  color: ${(props) =>
    props.$active ? props.theme.colors.white : props.theme.text.muted};
  padding: 0;
  margin: 0;
  font-size: 10px;
  line-height: 0.6;
`;

export function SectionList({ children }: { children: ReactNode }) {
  return <StyledListGroupFlush>{children}</StyledListGroupFlush>;
}

const StyledIcon = styled.span`
  position: relative;
  bottom: 2px;
  margin-right: 0.5rem;
`;

const StyledOrderButton = styled(StyledBaseButton)`
  padding: 0 0.1rem;
  line-height: 0.8;
  color: ${(props) => props.theme.colors.primary};
  .active & {
    color: #fff;
  }
`;

const StyledListItem = styled.button<{
  active: boolean;
  disabled: boolean;
  size?: "xs";
}>`
  justify-content: space-between;
  align-items: center;
  display: flex;

  position: relative;
  padding: 12px 0.75rem;
  background-color: ${(props) => props.theme.colors.white};
  border-left: 0;
  border-right: 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};

  width: 100%;
  color: ${(props) => props.theme.text.main};
  cursor: pointer;
  text-align: inherit;

  & + & {
    border-top-width: 0;
  }

  & + &.active {
    margin-top: -1px;
    border-top-width: 1px;
  }

  &:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    border-top: 0;
  }

  &:last-child {
    // border-bottom-right-radius: inherit;
    // border-bottom-left-radius: inherit;
    // border-bottom: 0;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      color: #7081b9;
      pointer-events: none;
      background-color: ${(props) => props.theme.colors.white};
    `}

  ${({ size }) =>
    size === "xs" &&
    css`
      padding: 6px 0.75rem;
      font-size: 12px;
    `}

  &:hover,
  &:focus {
    z-index: 1;
    color: ${(props) => props.theme.text.main};
    text-decoration: none;
    background-color: #f8f8fc;
  }

  ${({ active, theme }) =>
    active &&
    css`
      z-index: 2;
      color: ${(props) => props.theme.text.white} !important;
      background-color: ${theme.colors.primary} !important;
      border-color: ${theme.colors.primary};
    `}

  &:active {
    color: ${(props) => props.theme.text.main};
    background-color: ${(props) => props.theme.colors.softBackground};
  }
`;

interface ISectionListItem {
  label: string;
  to?: string;
  size?: "xs";
  subLabel?: string;
  IconComponent?: Icon;
  disabled?: boolean;
  active?: boolean;
  toNoWhere?: true;
  onClick?: () => void;
  ordering?: {
    currentIndex: number;
    totalLength: number;
    onChange: (direction: OrderingDirection) => void;
  };
  actionButtons?: {
    isInverse: boolean;
    text: string;
    onClick: () => void;
    isMakingRequest: boolean;
  }[];
}

export function SectionListItem({
  label,
  IconComponent,
  disabled,
  subLabel,
  active,
  to,
  toNoWhere,
  ordering,
  onClick,
  size,
  actionButtons,
}: ISectionListItem) {
  const content = (
    <>
      <span>
        {IconComponent ? <StyledIcon as={IconComponent} size="16" /> : null}{" "}
        {label}
        {subLabel ? (
          <StyledSublabel $active={active}>{subLabel}</StyledSublabel>
        ) : null}
      </span>
      <span>
        {ordering ? (
          <span>
            {ordering.currentIndex > 0 ? (
              <StyledOrderButton
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  ordering.onChange(OrderingDirection.Up);
                }}
              >
                <FontAwesomeIcon icon={faArrowUp} />
              </StyledOrderButton>
            ) : null}
            {ordering.currentIndex < ordering.totalLength - 1 ? (
              <StyledOrderButton
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  ordering.onChange(OrderingDirection.Down);
                }}
              >
                <FontAwesomeIcon icon={faArrowDown} />
              </StyledOrderButton>
            ) : (
              <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            )}
          </span>
        ) : null}
        <span>
          {actionButtons ? (
            <>
              {actionButtons.map(
                ({ text, isInverse, onClick: onClick$1, isMakingRequest }) => (
                  <FormButton
                    text={text}
                    key={text}
                    size="xs"
                    isMakingRequest={isMakingRequest}
                    isInverse={isInverse}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      onClick$1();
                    }}
                  />
                )
              )}
            </>
          ) : null}
          {!(toNoWhere || disabled) ? (
            <StyledChevronRight $active={active} />
          ) : null}
        </span>
      </span>
    </>
  );

  const props = {
    active: !!active,
    disabled: !!disabled,
    size,
  };

  if (to) {
    return (
      <Link href={to} passHref>
        <StyledListItem as="a" {...props}>
          {content}
        </StyledListItem>
      </Link>
    );
  }

  return (
    <StyledListItem
      onClick={(e: { stopPropagation: () => void }) => {
        if (onClick) {
          e.stopPropagation();
          onClick();
        }
      }}
      {...props}
    >
      {content}
    </StyledListItem>
  );
}
