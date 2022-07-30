import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import {
  StyledButton,
  StyledOutlineButton,
  IStyledBaseButton,
} from "../Button";
import { Stack } from "../../../ui-blocks";

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
) => (isMakingRequest ? <FontAwesomeIcon icon={faSpinner} spin /> : text);

export function FormButton({
  text,
  disabled,
  isMakingRequest,
  onClick,
  isInverse,
  size,
  color = "primary",
  ...rest
}: IFormButton) {
  const options = {
    ...rest,
    color,
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
