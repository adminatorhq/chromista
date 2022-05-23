import React, { useMemo, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import styled, { css } from 'styled-components';

interface ITabs {
  contents: {
    label: string;
    content: JSX.Element;
  }[];
}

export const Tabs: React.FC<ITabs> = ({ contents }) => {
  const [activeTab, setActiveTab] = useState(contents[0].label);

  const toggle = (tabIndex: string) => {
    if (activeTab !== tabIndex) {
      setActiveTab(tabIndex);
    }
  };

  const labels = useMemo(() => {
    return contents.map(({ label }) => label);
  }, [contents]);

  return (
    <>
      <StyledNav tabs>
        {labels.map(label => (
          <StyledNavItem key={label}>
            <StyledNavLink
              tag="button"
              active={activeTab === label}
              onClick={() => {
                toggle(label);
              }}
            >
              {label}
            </StyledNavLink>
          </StyledNavItem>
        ))}
      </StyledNav>
      <StyledTabContent activeTab={activeTab}>
        {contents.map(({ label, content }) => (
          <StyledTabPane tabId={label} key={label}>
            {content}
          </StyledTabPane>
        ))}
      </StyledTabContent>
    </>
  );
};

const StyledTabPane = styled(TabPane)`
  display: none;
  &.active {
    display: block;
  }
`;

const StyledTabContent = styled(TabContent)`
  padding-top: 1rem;
`;

const StyledNav = styled(Nav)`
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const StyledNavItem = styled(NavItem)`
  margin-bottom: -1px;
`;

const StyledNavLink = styled(NavLink)<{ active: boolean }>`
  display: block;
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.white};
  border: 1px solid transparent;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;

  ${props =>
    props.active
      ? css`
          color: ${props.theme.colors.primary};
          background-color: ${props.theme.colors.white};
          border-color: transparent transparent ${props.theme.colors.primary};
        `
      : css`
          color: ${props.theme.text.main};
        `}
`;
