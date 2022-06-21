import Offcanvas from 'react-bootstrap/Offcanvas';
import React, { ReactNode } from 'react';
import { Divider, Text } from '../../ui-blocks';
import styled from 'styled-components';
import { Stack } from '../../ui-blocks';
import { SoftButton } from '../Button';

export interface IProps {
  show: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export const OffCanvas = ({ show, onClose, title, children }: IProps) => {
  return (
    <StyledRoot as={Offcanvas} show={show} onHide={onClose} placement="end">
      <StyledHeader>
        <Stack justify="space-between">
          <Text size="3">{title}</Text>
          <SoftButton justIcon={true} icon="close" onClick={onClose} />
        </Stack>
      </StyledHeader>
      <Divider />
      <StyledBody>{children}</StyledBody>
    </StyledRoot>
  );
};

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

const StyledRoot = styled.div`
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
  width: 400px;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  transform: translateX(100%);

  &.show {
    transform: none;
  }
`;
