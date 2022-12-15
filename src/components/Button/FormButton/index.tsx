import React from "react";
import { Loader } from "react-feather";
import {
  StyledButton,
  StyledOutlineButton,
  IStyledBaseButton,
} from "../Button";
import { Stack } from "../../../ui-blocks";
import { Spin } from "../../_/Spin";

interface IFormButton extends IStyledBaseButton {
  text: string;
  isMakingRequest: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  isInverse?: boolean;
}

export const actionButtonIsMakingRequest = (
  isMakingRequest: boolean,
  text: string
) => (isMakingRequest ? <Spin as={Loader} size={16} /> : text);

export function FormButton({
  text,
  disabled,
  isMakingRequest,
  onClick,
  isInverse,
  size,
  ...rest
}: IFormButton) {
  const options = {
    ...rest,
    disabled: disabled || isMakingRequest,
    onClick,
    type: "submit" as "submit" | "button" | "reset" | undefined,
    size,
  };

  const toRender = actionButtonIsMakingRequest(isMakingRequest, text);

  if (isInverse) {
    return (
      <Stack justify="end">
        <StyledOutlineButton {...options}>{toRender}</StyledOutlineButton>
      </Stack>
    );
  }
  return (
    <Stack justify="end">
      <StyledButton {...options}>{toRender}</StyledButton>
    </Stack>
  );
}
