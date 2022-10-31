import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { StyledSoftButton } from "./Button";
import { ConfirmAlert } from "../ConfirmAlert";
import { SYSTEM_COLORS } from "../../theme";

interface IProps {
  onDelete: () => void;
  isMakingDeleteRequest?: boolean;
  text?: string;
  size?: "sm" | "xs";
  shouldConfirmAlert?: boolean;
}

const StyledDeleteButton = styled(StyledSoftButton)`
  background-color: ${SYSTEM_COLORS.danger}1A;
  color: ${SYSTEM_COLORS.danger};

  &:hover {
    background-color: ${SYSTEM_COLORS.danger};
  }
`;

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
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : (
        <>
          <FontAwesomeIcon icon={faTrash} /> {text ? `Delete ${text}` : null}
        </>
      )}
    </StyledDeleteButton>
  );
}
