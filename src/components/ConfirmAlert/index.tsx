import React from "react";
import { confirmAlert } from "react-confirm-alert";
import styled, { keyframes } from "styled-components";
import { SYSTEM_COLORS } from "../../AppWrapper/colors";
import { Z_INDEXES } from "../../constants/zIndex";
import { Stack } from "../../ui-blocks";

interface IProps {
  action: () => void;
  title: string;
  message: string;
}

const StyledButton = styled.button<{ danger?: boolean }>`
  outline: none;
  background: #fff;
  border: 1px solid
    ${(props) => (props.danger ? SYSTEM_COLORS.danger : SYSTEM_COLORS.accent)};
  display: inline-block;
  padding: 6px 18px;
  color: ${(props) =>
    props.danger ? SYSTEM_COLORS.danger : SYSTEM_COLORS.accent};
  margin-right: 10px;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background: ${(props) =>
      props.danger ? SYSTEM_COLORS.danger : SYSTEM_COLORS.accent};
    color: #fff;
  }
`;

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const StyledTitle = styled.h1`
  margin-top: 0;
  color: #303e67;
  font-size: 16px;
  font-weight: bold;
`;

const StyledBody = styled.div`
  width: 300px;
  padding: 30px;
  text-align: center;
  background: #fff;
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
  color: #a4abc5;
`;

const fadeIn = keyframes`
from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
`;

const StyledOverlay = styled(Stack).attrs({
  direction: "column",
  align: "center",
  justify: "center",
})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${Z_INDEXES.confirmDelete};
  background: rgba(255, 255, 255, 0.7);
  opacity: 0;
  animation: ${fadeIn} 0.1s 0.1s forwards;
`;

export interface IPresentationProps extends IProps {
  onClose: () => void;
}

export function Presentation({
  action,
  message,
  onClose,
  title,
}: IPresentationProps) {
  return (
    <StyledOverlay>
      <StyledBody>
        <StyledTitle>{title}</StyledTitle>
        {message}
        <StyledButtonGroup>
          <StyledButton
            danger
            onClick={() => {
              action();
              onClose();
            }}
          >
            Yes
          </StyledButton>
          <StyledButton onClick={onClose}>No</StyledButton>
        </StyledButtonGroup>
      </StyledBody>
    </StyledOverlay>
  );
}

export const ConfirmAlert = (props: IProps) =>
  confirmAlert({
    customUI: ({ onClose }) => <Presentation {...props} onClose={onClose} />,
  });
