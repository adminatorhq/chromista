import React, { Fragment, ReactNode } from 'react';
import styled from 'styled-components';
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
  return (
    <Fragment>
      <PrimaryLeftSideNav navigation={selectionView} />
      <SecondaryLeftSideNav selectionView={selectionView} />
      <StyledPageWrapper isSidebarOpen={false}>
        <StyledPageContent>
          <StyledRendererWrapper>{children}</StyledRendererWrapper>
        </StyledPageContent>
      </StyledPageWrapper>
    </Fragment>
  );
};

const StyledPageWrapper = styled.div<{ isSidebarOpen: boolean }>`
  flex: 1;
  padding: 0;
  display: block;
  margin-left: ${props => (props.isSidebarOpen ? 220 : 50)}px;
  background: #edf0f1;
`;

const StyledPageContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;

  @media (max-width: 767.98px) {
    width: 100%;
    margin-top: 0;
    padding: 0 0 60px 0;
  }
`;

const StyledRendererWrapper = styled.div`
  position: fixed;
  top: 51px;
  height: calc(100% - 51px);
  overflow-y: scroll;
  overflow-x: scroll;
  width: calc(100% - 350px);
  display: flex;
  flex-grow: 1;
  flex-flow: column;
  min-width: 0;
  padding: 0.25rem;
`;
