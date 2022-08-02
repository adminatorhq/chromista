import Offcanvas from "react-bootstrap/Offcanvas";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { Divider, Text, Stack } from "../../ui-blocks";
import { SoftButton } from "../Button";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const StyledBody = styled.div`
  flex-grow: 1;
  padding: 1rem;
  padding-top: 0.5rem;
  overflow-y: auto;
`;

const StyledRoot = styled.div<{ width: number }>`
  position: fixed;
  bottom: 0;
  z-index: 1045;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  visibility: hidden;
  background-color: white;
  background-clip: padding-box;
  outline: 0;
  transition: transform 0.3s ease-in-out;

  top: 0;
  right: 0;
  width: ${(props) => props.width}px;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  transform: translateX(100%);

  &.show {
    transform: none;
  }
`;

export interface IProps {
  show: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  width?: number;
}

const DEFAULT_CANVAS_WIDTH = 400;

export function OffCanvas({
  show,
  onClose,
  title,
  children,
  width = DEFAULT_CANVAS_WIDTH,
}: IProps) {
  return (
    <StyledRoot
      as={Offcanvas}
      show={show}
      onHide={onClose}
      placement="end"
      width={width}
    >
      <StyledHeader>
        <Stack justify="space-between">
          <Text size="3">{title}</Text>
          <SoftButton justIcon icon="close" action={onClose} />
        </Stack>
      </StyledHeader>
      <Divider />
      <StyledBody>{children}</StyledBody>
    </StyledRoot>
  );
}
