import React, { useRef } from 'react';
import shallow from 'zustand/shallow';
import styled from 'styled-components';
import * as StyledGrid from 'styled-bootstrap-grid';
import useClickAway from 'react-use/lib/useClickAway';
import useKey from 'react-use/lib/useKey';
import { SectionBox } from '../../components/Section';
import { useSideBarStore } from '../sidebar.store';
import { ISelectionView } from '../types';
import { useNestedNavStore } from './nested-nav.store';
import { ViewMenuItems } from './ViewMenuItems';

const HOME_SELECTION = '__HOME__';

interface IProps {
  selectionView: ISelectionView[];
}

export const SecondaryLeftSideNav: React.FC<IProps> = ({ selectionView }) => {
  const [
    isFullSideBarOpen,
    currentMiniSideBar,
    closeFullSideBar,
  ] = useSideBarStore(
    state => [
      state.isFullSideBarOpen,
      state.currentMiniSideBar,
      state.closeFullSideBar,
    ],
    shallow
  );

  const rootRef = useRef(null);

  useKey('Escape', closeFullSideBar);
  useClickAway(rootRef, (e: MouseEvent) => {
    if (e.x <= 50) {
      return;
    }
    closeFullSideBar();
  });

  const [deepLinks, pop] = useNestedNavStore(state => [
    state.deepLinks,
    state.pop,
  ]);

  let currentSelection: ISelectionView | null | undefined = null;

  if (currentMiniSideBar) {
    currentSelection = selectionView.find(
      ({ link }) => link === currentMiniSideBar
    );
  }

  const hasDeepLinks = deepLinks.length > 0;

  const deepLinkAsBreadCrumb = deepLinks.map(
    ({ key, title: deepLinkTitle }) => ({
      label: deepLinkTitle,
      value: key,
    })
  );

  const currentViewBag = hasDeepLinks
    ? deepLinks[deepLinks.length - 1]
    : currentSelection;

  const { title, description, iconButtons = [] } = currentViewBag || {
    title: '',
    description: '',
    iconButtons: [],
  };

  const fullBreadCrumb = [
    {
      label: currentSelection?.title + '',
      value: HOME_SELECTION,
    },
    ...deepLinkAsBreadCrumb,
  ];

  return (
    <StyledWrapper
      show={!!currentMiniSideBar && isFullSideBarOpen}
      ref={rootRef}
    >
      <StyledHeightWrapper>
        <StyledHideScrollbar>
          <StyledContainer fluid={true}>
            {selectionView.map(({ view, link, viewMenuItems }) => {
              if (!view && !viewMenuItems) {
                throw new Error(
                  'Please pass what to render in the view, `view` or `viewMenuItems` is required to do this'
                );
              }
              return (
                <StyledRenderView key={link} show={link === currentMiniSideBar}>
                  <SectionBox
                    backLink={
                      hasDeepLinks
                        ? {
                            onClick: pop,
                            label:
                              fullBreadCrumb[fullBreadCrumb.length - 2].label,
                          }
                        : undefined
                    }
                    title={title}
                    description={description}
                    iconButtons={[
                      ...iconButtons,
                      {
                        icon: 'close',
                        onClick: closeFullSideBar,
                      },
                    ]}
                  >
                    {view ? (
                      view
                    ) : (
                      <ViewMenuItems viewMenuItems={viewMenuItems} />
                    )}
                  </SectionBox>
                </StyledRenderView>
              );
            })}
          </StyledContainer>
        </StyledHideScrollbar>
      </StyledHeightWrapper>
    </StyledWrapper>
  );
};

const StyledContainer = styled(StyledGrid.Container)`
  padding: 1.5rem 0.5rem;
`;

const StyledHideScrollbar = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
`;

const StyledHeightWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledWrapper = styled.div<{ show: boolean }>`
  position: absolute;
  top: 0;
  height: 100vh;
  left: 50px;
  width: 300px;
  flex-grow: 0;
  order: 1;
  z-index: 10;
  /* overflow-y: auto;
  overflow-x: hidden; */
  display: ${({ show }) => (show ? 'block' : 'none')};
`;

const StyledRenderView = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? 'block' : 'none')};
`;
