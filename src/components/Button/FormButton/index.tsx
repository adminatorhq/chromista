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
) =>
  isMakingRequest ? (
    <>
      <Spin as={Loader} size={16} />
      <span style={{ marginLeft: "0.4rem" }}>{text}</span>
    </>
  ) : (
    text
  );

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
    type: "submit" as const,
    cursor: isMakingRequest ? ("progress" as const) : undefined,
    size,
  };

  const toRender = actionButtonIsMakingRequest(isMakingRequest, text);

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
