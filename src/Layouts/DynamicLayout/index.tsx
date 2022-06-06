import React, { Fragment, ReactNode } from 'react';
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
    <Fragment>
      <PrimaryLeftSideNav navigation={selectionView} />
      <SecondaryLeftSideNav selectionView={selectionView} />
      <StyledPageWrapper isSidebarOpen={isFullSideBarOpen}>
        <StyledPageContent>{children}</StyledPageContent>
      </StyledPageWrapper>
    </Fragment>
  );
};

const StyledPageWrapper = styled.div<{ isSidebarOpen: boolean }>`
  flex: 1;
  padding: 0;
  display: block;
  margin-left: ${props => (props.isSidebarOpen ? 350 : 50)}px;
  background: #edf0f1;
`;

const StyledPageContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
  margin: 0;
`;
