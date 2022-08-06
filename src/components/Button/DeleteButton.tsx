import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { StyledSoftButton } from "./Button";
import { ConfirmAlert } from "../ConfirmAlert";

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
    <StyledSoftButton
      size={size}
      color="danger"
      type="button"
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
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : (
        <>
          <FontAwesomeIcon icon={faTrash} /> {text ? `Delete ${text}` : null}
        </>
      )}
    </StyledSoftButton>
  );
}
