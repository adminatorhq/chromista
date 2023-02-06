import React from "react";
import { Loader, Trash2 } from "react-feather";
import { StyledDeleteButton } from "./Button";
import { ConfirmAlert } from "../ConfirmAlert";
import { Spin } from "../_/Spin";

interface IProps {
  onDelete: () => void;
  isMakingDeleteRequest?: boolean;
  text?: string;
  size?: "sm" | "xs";
  shouldConfirmAlert?: boolean;
}

export function DeleteButton({
  onDelete,
  isMakingDeleteRequest,
  text,
  size = "sm",
  shouldConfirmAlert = true,
}: IProps) {
  return (
    <StyledDeleteButton
      size={size}
      type="button"
      justIcon={!text}
      aria-label={text ? undefined : `Delete Button`}
      onClick={(e: React.BaseSyntheticEvent) => {
        e.stopPropagation();
        if (shouldConfirmAlert) {
          return ConfirmAlert({
            title: "Confirm Delete",
            message: "Are you sure you want to do this.",
            action: onDelete,
          });
        }
        return onDelete();
      }}
      disabled={isMakingDeleteRequest}
    >
      {isMakingDeleteRequest ? (
        <Spin as={Loader} size={14} />
      ) : (
        <>
          <Trash2 size={14} />
          {text ? ` Delete ${text}` : null}
        </>
      )}
    </StyledDeleteButton>
  );
}
