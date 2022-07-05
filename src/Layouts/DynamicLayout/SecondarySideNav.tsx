import React from 'react';
import shallow from 'zustand/shallow';
import styled from 'styled-components';
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
  const [isFullSideBarOpen, currentMiniSideBar, closeFullSideBar] = useSideBarStore(
    (state) => [
      state.isFullSideBarOpen,
      state.currentMiniSideBar,
      state.closeFullSideBar,
    ],
    shallow,
  );

  const [deepLinks, pop] = useNestedNavStore((state) => [
    state.deepLinks,
    state.pop,
  ]);

  let currentSelection: ISelectionView | null | undefined = null;

  if (currentMiniSideBar) {
    currentSelection = selectionView.find(
      ({ link }) => link === currentMiniSideBar,
    );
  }

  const hasDeepLinks = deepLinks.length > 0;

  const deepLinkAsBreadCrumb = deepLinks.map(
    ({ key, title: deepLinkTitle }) => ({
      label: deepLinkTitle,
      value: key,
    }),
  );

  const currentViewBag = hasDeepLinks
    ? deepLinks[deepLinks.length - 1]
    : currentSelection;

  const { description, iconButtons = [] } = currentViewBag || {
    description: '',
    iconButtons: [],
  };

  const fullBreadCrumb = [
    {
      label: `${currentSelection?.title}`,
      value: HOME_SELECTION,
    },
    ...deepLinkAsBreadCrumb,
  ];

  return (
    <Root show={!!currentMiniSideBar && isFullSideBarOpen}>
      <StyledHideScrollbar>
        {selectionView.map(({
          view, link, title, viewMenuItems,
        }) => {
          if (!view && !viewMenuItems && !link) {
            throw new Error(
              'Please pass what to render in the view, The view` or `viewMenuItems` is required to do this or pass the `link` prop to just go to a page',
            );
          }
          return (
            <StyledRenderView key={title} show={title === currentMiniSideBar}>
              <SectionBox
                backLink={
                  hasDeepLinks
                    ? {
                      onClick: pop,
                      label: fullBreadCrumb[fullBreadCrumb.length - 2].label,
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
                {view || <ViewMenuItems viewMenuItems={viewMenuItems} />}
              </SectionBox>
            </StyledRenderView>
          );
        })}
      </StyledHideScrollbar>
    </Root>
  );
};

const StyledHideScrollbar = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: 101vh;
`;

const Root = styled.div<{ show: boolean }>`
  height: 100vh;
  left: 50px;
  position: fixed;
  width: 300px;
  order: 1;
  z-index: 10;
  display: ${({ show }) => (show ? 'block' : 'none')};
`;

const StyledRenderView = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? 'block' : 'none')};
`;
