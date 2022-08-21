import React from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { StyledSoftButton } from "./Button";
import { SoftButtonIconTypes, ICON_MAP } from "./SoftButton.types";
import { SYSTEM_COLORS } from "../../AppWrapper/colors";

interface ISoftButton {
  label?: string;
  icon?: SoftButtonIconTypes;
  size?: "sm" | "xs";
  block?: true;
  disabled?: boolean;
  color?: keyof typeof SYSTEM_COLORS;
  action: string | (() => void);
  secondaryAction?: () => void;
  justIcon?: true;
  className?: string;
  type?: "button";
  isMakingActionRequest?: boolean;
}
const StyledLabel = styled.span<{ $hasLabel: boolean }>`
  ${(props) =>
    props.$hasLabel &&
    css`
      margin-left: 0.4rem;
    `}
`;

export function SoftButton({
  label,
  block,
  color,
  size = "sm",
  icon,
  justIcon,
  type,
  disabled,
  isMakingActionRequest,
  action,
  secondaryAction,
  className,
}: ISoftButton) {
  const content = isMakingActionRequest ? (
    <FontAwesomeIcon icon={faSpinner} spin />
  ) : (
    <>
      {icon ? <FontAwesomeIcon icon={ICON_MAP[icon]} /> : null}
      {label && !justIcon ? (
        <StyledLabel $hasLabel={!!label}>{label}</StyledLabel>
      ) : null}
    </>
  );

  const buttonProps = {
    className,
    size,
    block,
    disabled,
    color,
    "aria-label": justIcon ? label : undefined,
  };

  if (typeof action === "string") {
    return (
      <Link href={action} passHref>
        <StyledSoftButton {...buttonProps} as="a">
          {secondaryAction ? (
            <span onClick={secondaryAction} aria-hidden="true">
              {content}
            </span>
          ) : (
            content
          )}
        </StyledSoftButton>
      </Link>
    );
  }

  return (
    <StyledSoftButton
      {...buttonProps}
      type={type}
      onClick={(e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        action();
      }}
    >
      {content}
    </StyledSoftButton>
  );
}
