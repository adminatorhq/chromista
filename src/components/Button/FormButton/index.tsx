import React from "react";
import { Icon, Loader } from "react-feather";
import {
  StyledButton,
  StyledOutlineButton,
  IStyledBaseButton,
} from "../Button";
import { Stack } from "../../../ui-blocks";
import { Spin } from "../../_/Spin";
import { ICON_MAP, ButtonIconTypes } from "../constants";

interface IFormButton extends IStyledBaseButton {
  text: string;
  icon?: ButtonIconTypes;
  isMakingRequest: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  isInverse?: boolean;
}

export const actionButtonIsMakingRequest = (
  isMakingRequest: boolean,
  text: string,
  IconCmp: Icon | null
) => {
  const iconProps = {
    size: 14,
    style: {
      marginRight: "4px",
    },
  };
  return isMakingRequest ? (
    <>
      <Spin as={Loader} {...iconProps} />
      <span>{text}</span>
    </>
  ) : (
    <>
      {IconCmp ? <IconCmp {...iconProps} /> : null}
      <span>{text}</span>
    </>
  );
};

export function FormButton({
  text,
  disabled,
  isMakingRequest,
  onClick,
  isInverse,
  size,
  icon,
  ...rest
}: IFormButton) {
  const options = {
    ...rest,
    disabled: disabled || isMakingRequest,
    onClick,
    type: "submit" as const,
    cursor: isMakingRequest ? ("progress" as const) : undefined,
    size,
  };

  const IconCmp = icon ? ICON_MAP[icon] : null;

  const toRender = actionButtonIsMakingRequest(isMakingRequest, text, IconCmp);

  return (
    <Stack justify="end">
      {isInverse ? (
        <StyledOutlineButton {...options}>{toRender}</StyledOutlineButton>
      ) : (
        <StyledButton {...options}>{toRender}</StyledButton>
      )}
    </Stack>
  );
}
