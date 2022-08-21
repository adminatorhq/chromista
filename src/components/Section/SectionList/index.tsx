import React, { ReactNode, useId } from "react";
import { ChevronRight, Icon } from "react-feather";
import Link from "next/link";
import styled, { css } from "styled-components";
import { StyledListGroupFlush } from "../../Lists";
import { FormButton } from "../../Button/FormButton";
import { Stack } from "../../../ui-blocks";
import { FormSwitch } from "../../Form/FormSwitch";
import { USE_ROOT_COLOR } from "../../../AppWrapper/colors";

const StyledChevronRight = styled(ChevronRight)<{ $active?: boolean }>`
  width: 14px;
  color: ${(props) =>
    props.$active
      ? USE_ROOT_COLOR("inverse-text")
      : USE_ROOT_COLOR("primary-color")};
  margin-left: 0.25rem;
`;

const StyledSublabel = styled.p<{ $active?: boolean }>`
  color: ${(props) =>
    props.$active
      ? USE_ROOT_COLOR("inverse-text")
      : USE_ROOT_COLOR("muted-text")};
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
  background-color: ${USE_ROOT_COLOR("base-color")};
  border-left: 0;
  border: 1px solid transparent;
  border-right: 0;
  border-bottom: 1px solid ${USE_ROOT_COLOR("border-color")};

  width: 100%;
  color: ${USE_ROOT_COLOR("main-text")};
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

  ${({ disabled }) =>
    disabled &&
    css`
      color: #7081b9;
      pointer-events: none;
      background-color: ${USE_ROOT_COLOR("base-color")};
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
    color: ${USE_ROOT_COLOR("main-text")};
    text-decoration: none;
    background-color: #f8f8fc;
  }

  ${({ active }) =>
    active &&
    css`
      z-index: 2;
      color: ${USE_ROOT_COLOR("inverse-text")} !important;
      background-color: ${USE_ROOT_COLOR("primary-color")} !important;
      border-color: ${USE_ROOT_COLOR("primary-color")};
    `}

  &:active {
    color: ${USE_ROOT_COLOR("main-text")};
    background-color: ${USE_ROOT_COLOR("soft-color")};
  }
`;

export interface IProps {
  label: string;
  action?: string | (() => void);
  size?: "xs";
  subLabel?: string;
  IconComponent?: Icon;
  disabled?: boolean;
  active?: boolean;
  toggle?: {
    selected: boolean;
    onChange: () => void;
  };
  actionButtons?: {
    isInverse: boolean;
    label: string;
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
  toggle,
  action,
  size,
  actionButtons = [],
}: IProps) {
  const id = useId();
  const content = (
    <Stack>
      <Stack align="center">
        {IconComponent ? <StyledIcon as={IconComponent} size="16" /> : null}{" "}
        <div>
          {label}
          {subLabel ? (
            <StyledSublabel $active={active}>{subLabel}</StyledSublabel>
          ) : null}
        </div>
      </Stack>
      <Stack justify="end" width="initial">
        <>
          {actionButtons.map(
            ({
              label: buttonLabel,
              isInverse,
              onClick: onClick$1,
              isMakingRequest,
            }) => (
              <FormButton
                text={buttonLabel}
                key={buttonLabel}
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
          {!(disabled || typeof action !== "string") ? (
            <div>
              <StyledChevronRight $active={active} />
            </div>
          ) : null}
          {toggle && (
            <FormSwitch
              name={id}
              onChange={toggle.onChange}
              value={toggle.selected}
            />
          )}
        </>
      </Stack>
    </Stack>
  );

  const buttonProps = {
    active: !!active,
    disabled: !!disabled,
    size,
  };

  if (typeof action === "string") {
    return (
      <Link href={action} passHref>
        <StyledListItem as="a" {...buttonProps}>
          {content}
        </StyledListItem>
      </Link>
    );
  }

  return (
    <StyledListItem
      onClick={(e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        action?.();
      }}
      {...buttonProps}
    >
      {content}
    </StyledListItem>
  );
}
