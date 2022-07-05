import React, { ReactNode } from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
import { useSideBarStore } from '../sidebar.store';
import { ISelectionView } from '../types';
import { PrimaryLeftSideNav } from './PrimaryLeftSideNav';
import { SecondaryLeftSideNav } from './SecondarySideNav';

export interface IProps {
  children: ReactNode;
  selectionView: ISelectionView[];
}

export const DynamicLayout: React.FC<IProps> = ({
  children,
  selectionView,
}): JSX.Element => {
  const [isFullSideBarOpen] = useSideBarStore(
    state => [state.isFullSideBarOpen],
    shallow
  );
  return (
    <Root>
      <PrimaryLeftSideNav navigation={selectionView} />
      <SecondaryLeftSideNav selectionView={selectionView} />
      <StyledPage isSidebarOpen={isFullSideBarOpen}>{children}</StyledPage>
    </Root>
  );
};

const Root = styled.div`
  width: 100%;
`;

const StyledPage = styled.div<{ isSidebarOpen: boolean }>`
  padding: 16px;
  min-height: 100vh;
  display: block;
  margin-left: ${props => (props.isSidebarOpen ? 350 : 50)}px;
  width: calc(100% - ${props => (props.isSidebarOpen ? 350 : 50)}px);
  background: #edf0f1;
`;
