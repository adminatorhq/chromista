import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import styled, { keyframes } from 'styled-components';

interface IConfirmAlert {
  action: () => void;
  title: string;
  message: string;
}

export const ConfirmAlert = ({ action, title, message }: IConfirmAlert) =>
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <StyledOverlay>
          <StyledBody>
            <StyledTitle>{title}</StyledTitle>
            {message}
            <StyledButtonGroup>
              <StyledButton
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
    },
  });

const StyledButton = styled.button`
  outline: none;
  background: #fff;
  border: 1px solid #1761fd;
  display: inline-block;
  padding: 6px 18px;
  color: #1761fd;
  margin-right: 10px;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background: #1761fd;
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
  font-family: Arial, Helvetica, sans-serif;
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

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
  opacity: 0;
  animation: ${fadeIn} 0.1s 0.1s forwards;
`;
